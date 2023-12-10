import React, { useState, useEffect } from 'react';
import styles from '../../style.module.css';
import WithAuth from './withAuth';
import Modal from 'react-modal';

function isUserLoggedIn1() {
    return !!localStorage.getItem('auth-token');
  }
  function getId() {
    if (isUserLoggedIn1()) {
      return localStorage.getItem('idU');
    }
    return null;
  }

const MainPremios = () => {
    const [premiosEstiloUsuario, setPremiosEstiloUsuario] = useState([]);
    const [premiosOutrosEstilos, setPremiosOutrosEstilos] = useState([]);
    const [numeroMoedas, setNumeroMoedas] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({title: '', message: '',});
    const [formValues, setFormValues] = useState({
        valor: '',
        descricao: '',
        idprem: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "premioSelecionado") {
            const descricao = e.target.nextSibling.textContent.split(' - ')[0];
            const idprem = e.target.getAttribute('data-idprem');
            setFormValues({ ...formValues, valor: value, descricao: descricao, idprem: idprem });
        }
    }

    const handleResgatar = async (e) => {
        e.preventDefault();
        if (!formValues.valor) {
            console.error('Por favor, selecione um prêmio antes de clicar em resgatar.');
            openModal('Erro!', 'Por favor, selecione um prêmio antes de clicar em resgatar.');
            return;
          }
        if(parseInt(formValues.valor) > numeroMoedas){
            console.error('Você não possui moedas suficiente para este prêmio.');
            openModal('Erro!', 'Você não possui moedas suficiente para este prêmio.');
            return;   
        }
        try {
            const response = await fetch('https://gamereduceback.azurewebsites.net/resg', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'idu': idU,
                  'auth-token': localStorage.getItem('auth-token')
              },
              body: JSON.stringify(formValues)
            });
        
            if (response.ok) {
                const data = await response.json();
                console.log('Prêmio resgatado com sucesso!');
                openModal(`Chave para resgatar o ${formValues.descricao}: `, `${data.chave}`);
            } else {
                console.error('Falha ao resgatar prêmio. Status:', response.status);
            }              
          } catch (error) {
            console.error('Erro ao resgatar prêmio:', error);
          }       
    };
    const openModal = (title, message) => {
        setModalContent({ title, message });
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
        /*setTimeout(() => {
            window.location.reload();
          }, 3000);*/
      };
    

    const idU = getId();
    useEffect(() => {
        fetch('https://gamereduceback.azurewebsites.net/premios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
                'idu': idU
            }
        })
        .then(response => response.json())
        .then(data => {
            setPremiosEstiloUsuario(data.premiosEstiloUsuario || []);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do usuário:', error);
        });
    }, [idU]);

    useEffect(() => {
        fetch('https://gamereduceback.azurewebsites.net/otherspremios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
                'idu': idU
            }
        })
        .then(response => response.json())
        .then(data => {
            setPremiosOutrosEstilos(data.premiosOutrosEstilos  || []);
        })
        .catch(error => {
            console.error('Erro ao buscar os outros prêmios:', error);
        });
    }, [idU]);

    fetch('https://gamereduceback.azurewebsites.net/coin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token'),
          'idU': idU,
        },
      })
      .then(response => response.json())
      .then(data => {
        setNumeroMoedas(data.moedas);
      })
      .catch(error => {
        console.error('Erro ao obter número de moedas:', error);
      });

    const getFontSizeBasedOnScreenWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 1258) {
        return '70%'; 
        } else {
        return '30%';
        }
    };

    const getPositionBasedOnScreenWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 1258) {
        return '17%'; 
        } else {
        return '35%';
        }
    };  

    return (
        <main id="dat">
            <div id={styles.ora}>
                <div id={styles.dados}>
                <br />
                    <h4>Prêmios para o seu estilo:</h4><br />
                    <form onSubmit={handleResgatar}>
                        <div className={styles.centralizar}>
                            {premiosEstiloUsuario.map((premio, idprem) => (
                                <div key={idprem}>
                                    <input
                                        type="radio"
                                        id={`premio${idprem}`}
                                        name="premioSelecionado"
                                        value={premio.valor}
                                        data-idprem={premio.idprem}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor={`premio${idprem}`}>
                                        {premio.descricao} - Custo: {premio.valor}
                                    </label>
                                </div>
                            ))}
                        </div>
                            <br />
                            <hr />
                            <br />
                            <h5> Prêmio para Outros estilos:</h5><br />
                        <div className={styles.centralizar}>
                            {premiosOutrosEstilos.map((premio, idprem) => (
                                <div key={idprem}>
                                    <input
                                        type="radio"
                                        id={`premioOutros${idprem}`}
                                        name="premioSelecionado"
                                        value={premio.valor}
                                        data-idprem={premio.idprem}
                                        onChange={handleInputChange}
                                    />
                                    <label htmlFor={`premioOutros${idprem}`}>
                                        {premio.descricao} - Custo: {premio.valor}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <br />
                        <input type="submit" value="Resgatar"  id={styles.subz}/>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            ariaHideApp={false}
                            contentLabel="Erro"
                            style={{
                                overlay: {
                                  position: 'fixed',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: 'rgba(255, 255, 255, 0.75)'
                                },
                                content: {
                                  position: 'absolute',
                                  width:'30%',
                                  height:'20%',
                                  top: '50%',
                                  left: '35%',
                                  right: '50%',
                                  bottom: '50%',
                                  border: '1px solid #ccc',
                                  background: '#FD7900',
                                  overflow: 'auto',
                                  WebkitOverflowScrolling: 'touch',
                                  borderRadius: '4px',
                                  outline: 'none',
                                  padding: '20px',
                                // eslint-disable-next-line
                                  width: getFontSizeBasedOnScreenWidth(),
                                 // eslint-disable-next-line
                                  left:getPositionBasedOnScreenWidth()
                                }
                              }}
                        >
                            <h2 className={styles.centralize}>{modalContent.title}</h2>
                            <p className={styles.centralize}>{modalContent.message}</p>
                            <button onClick={closeModal} className={styles.centralize}>Fechar</button>
                        </Modal>
                    </form>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default WithAuth(MainPremios);