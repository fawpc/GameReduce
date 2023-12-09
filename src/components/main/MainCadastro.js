import React, { useState, useEffect } from 'react';
import styles from '../../style.module.css';
// eslint-disable-next-line
import {useNavigate , Redirect  } from 'react-router-dom';
import Modal from 'react-modal';

const MainCadastro = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', gifUrl: '' });
    const navigate  = useNavigate ();
    const [formValues, setFormValues] = useState({
        nome: '',
        email: '',
        senha: '',
        datanasc: '',
        fk_perfil: '',
        fk_game: '',
        fk_focus: ''

    });
    const [errorMessage, setErrorMessage] = useState('');
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const [allGameTimeData, setAllGameTimeData] = useState([]);
    const [allFocusTimeData, setAllFocusTimeData] = useState([]);
    const [allStylesData, setAllStyleData] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateEmail = (email) => {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        };

        if (!validateEmail(formValues.email)) {
          console.error('Por favor, insira um e-mail válido.');
          setErrorMessage('Por favor, insira um e-mail válido.');
          return;
        }
        if (!formValues.nome) {
            console.error('Por favor, preencha o campo de nome.');
            setErrorMessage('Por favor, preencha o campo de nome.');
            return;
          }
        if (!formValues.email) {
            console.error('Por favor, preencha o campo de email.');
            setErrorMessage('Por favor, preencha o campo de email.');
            return;
          }
        if (!formValues.senha) {
            console.error('Por favor, preencha o campo de senha.');
            setErrorMessage('Por favor, preencha o campo de senha.');
            return;
          }
        if ( !formValues.datanasc) {
            console.error('Por favor, preencha o campo de data de nascimento.');
            setErrorMessage('Por favor, preencha o campo de data de nascimento.');
            return;
          }     
        if (!formValues.fk_perfil) {
            console.error('Por favor, selecione uma opção válida de estilo.');
            setErrorMessage('Por favor, selecione uma opção válida de estilo.');
            return;
          } 
        if (!formValues.fk_game) {
            console.error('Por favor, selecione uma opção válida de Game Time.');
            setErrorMessage('Por favor, selecione uma opção válida de Game Time.');
            return;
          } 
        if (!formValues.fk_focus) {
            console.error('Por favor, selecione uma opção de Focus Time.');
            setErrorMessage('Por favor, selecione uma opção de Focus Time.');
            return;
          } 
        setErrorMessage('');

        try {
          const response = await fetch('https://gamereduceback.azurewebsites.net/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValues)
          });
      
          if (response.ok) {
            console.log('Usuário cadastrado com sucesso!');
            navigate('/');
          } else {
            console.error('Falha ao cadastrar usuário. Status:', response.status);
          }
        } catch (error) {
          console.error('Erro ao cadastrar usuário:', error);
        }
      };


    useEffect(() => {
        fetch('https://gamereduceback.azurewebsites.net/allfocus', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setAllFocusTimeData(data);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do Focus Time:', error);
        });
    }, []);

    useEffect(() => {
        fetch('https://gamereduceback.azurewebsites.net/allgame', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setAllGameTimeData(data);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do Game Time:', error);
        });
    }, []);

    useEffect(() => {
        fetch('https://gamereduceback.azurewebsites.net/allstyles', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setAllStyleData(data);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados de perfil de usuario:', error);
        });
    }, []);

    const show = () => {
        setModalContent({
          title: 'O que é Game Time?',
          message: 'Game Time é o tempo dedicado a jogar e se divertir com jogos diversos. Nele há perda de pontos por exceder o limite.',
          gifUrl: '../imagens/bt.gif'
        });
        setModalIsOpen(true);
      };
    
      const show1 = () => {
        setModalContent({
          title: 'O que é Focus Time?',
          message: 'Focus Time é o tempo dedicado a se concentrar em atividades específicas para aumentar a produtividade. Nele há apenas ganho de pontos.',
          gifUrl: '../imagens/pt.gif'
        });
        setModalIsOpen(true);
      };
    
      const closeModal = () => {
        setModalIsOpen(false);
      };

    const getFontSizeBasedOnScreenWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 900) {
        return '100%'; 
        }
    };

    const getPositionBasedOnScreenWidth = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 900) {
        return '0%'; 
        }
    };

    return (
        <main>
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <h1>Cadastro</h1>
                    <div id={styles.forms}>
                        <form onSubmit={handleSubmit} id={styles.formCad}>
                            Nome: <input type="text" name="nome" value={formValues.nome} onChange={handleInputChange} /><br />
                            Email: <input type="text" name="email" value={formValues.email} onChange={handleInputChange} /><br />
                            Senha: <input type="password" name="senha" value={formValues.senha} onChange={handleInputChange} /><br />
                            Data de nascimento:  <input type="date" name="datanasc" value={formValues.datanasc} onChange={handleInputChange} /><br />
                            <select name="fk_perfil" value={formValues.fk_perfil} onChange={handleInputChange}>
                                <option value="">Selecione o seu Estilo ...</option>
                                {allStylesData.map(perfil => (
                                <option key={perfil.idp} value={perfil.idp}>
                                    {perfil.estilo}
                                </option>
                                ))}
                            </select><br />
                            <select name="fk_game" value={formValues.fk_game} onChange={handleInputChange}>
                                <option value="">Selecione o limite do Game Time...</option>
                                {allGameTimeData.map(game => (
                                <option key={game.idg} value={game.idg}>
                                    Tempo de Gameplay: {game.tempomax && game.tempomax.hours} Hora(s) Pontos Ganhos: {game.pontos_gametime} Pontos Perdidos: {game.perdapontos}
                                </option>
                                ))}
                            </select><p className={styles.ps}>O que é Game Time? <button className={styles.butons} onClick={show}>Clique Aqui</button></p> <br />
                            <select name="fk_focus" value={formValues.fk_focus} onChange={handleInputChange}>
                                <option value="">Selecione o mínimo do Focus Time...</option>
                                {allFocusTimeData.map(focus => (
                                <option key={focus.idf} value={focus.idf}>
                                    Tempo de Foco: {focus.tempo && focus.tempo.hours} Hora(s) Pontos Ganhos: {focus.pontos_focustime}
                                </option>
                                ))}
                            </select><p className={styles.ps}>O que é Focus Time? <button className={styles.butons} onClick={show1}>Clique Aqui</button></p><br /><br />
                            <input type="submit" value="Cadastrar" id={styles.subz}/><br /><br /><br />
                            <div id="errorMessage">{errorMessage}</div>
                        </form>
                        <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            contentLabel="Modal"
                            ariaHideApp={false}
                            style={{
                                overlay: {
                                  position: 'fixed',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                                },
                                content: {
                                  position: 'absolute',
                                  width:'20%',
                                  height:'65%',
                                  top: '30%',
                                  left: '50%',
                                  right: '12%',
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
                            {modalContent.gifUrl && <img src={modalContent.gifUrl} alt="GIF" className={styles.centralize}/>}<br />
                            <button onClick={closeModal} className={styles.centralize}>Fechar</button>
                        </Modal>
                    </div>

                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>  
        </main>
    );
}

export default MainCadastro;