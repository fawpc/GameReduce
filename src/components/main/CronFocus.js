import React, { useState, useEffect } from 'react';
import styles from '../../style.module.css';
import Modal from 'react-modal';

const Cronometro = ({ focusfeito, tempo}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState({title: '', message: '',});
    function timeStringToSeconds(timeString) {
      const [hours, minutes, seconds] = timeString.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }
  
    function formatTime(totalSeconds) {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      return formattedTime;
    }
    const [isRunning, setIsRunning] = useState(false);
    const [focusInvisivel, setfocusInvisivel] = useState(0);
    const [focusDecrescente, setfocusDecrescente] = useState(0);

    const savedfocusDecrescenteAtual = localStorage.getItem('focusDecrescenteAtual');
    const [focusDecrescenteAtual, setfocusDecrescenteAtual] = useState(
      savedfocusDecrescenteAtual ? Number(savedfocusDecrescenteAtual) : focusDecrescente
    );
    const [tempoRestanteModal, setTempoRestanteModal] = useState(formatTime(focusDecrescenteAtual));

    const openModal = (title, message) => {
      setModalContent({ title, message });
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };  

  function exibirAviso30MinutosRestantes() {
    const tempoRestante = focusDecrescenteAtual
    if (tempoRestante <= 30 * 60) {
      console.log('Restam 30 minutos!');
      openModal('Atenção Restam Menos de 30 minutos! de Focus Time', 'TEMPO RESTANTE: ');
    }
  }
  
  function exibirAviso10MinutosRestantes() {
    const tempoRestante = focusDecrescenteAtual
    if (tempoRestante <= 10 * 60) { 
      console.log('Restam 10 minutos!');
      openModal('Atenção Restam Menos de 10 minutos! de Focus Time', 'TEMPO RESTANTE: ');
    }
  }

  function exibirAvisoTeste() {
    const tempoRestante = focusDecrescenteAtual
    if (tempoRestante <= 159 * 60) { 
      console.log('Restam xx minutos!');
      openModal('Atenção Restam Menos de xx minutos! de Focus Time', 'TEMPO RESTANTE: ');
    }
  }

    useEffect(() => {
      const secondstempo = timeStringToSeconds(tempo);
      const secondsfocusfeito = timeStringToSeconds(focusfeito);
      const focusDecrescenteInicial = secondstempo - secondsfocusfeito;
      setfocusDecrescente(focusDecrescenteInicial);
    }, [tempo, focusfeito]);
  
    useEffect(() => {
      setfocusDecrescenteAtual(focusDecrescente);
    }, [focusDecrescente]);
  
    useEffect(() => {
      let timerDecrescente, timerInvisivel;
  
      if (isRunning) {
        let count = 0;
        timerDecrescente = setInterval(() => {
          setfocusDecrescenteAtual(prevfocus => {
            count++;
            if (count === 10) {
              exibirAviso30MinutosRestantes();
              exibirAviso10MinutosRestantes();
              exibirAvisoTeste();
              count = 0;
            }
            setTempoRestanteModal(formatTime(prevfocus)); 
            return prevfocus - 1;
          });
        }, 1000);
        
        timerInvisivel = setInterval(() => {
          setfocusInvisivel(prevfocus => prevfocus + 1);
        }, 1000);
      } else {
        clearInterval(timerDecrescente);
        clearInterval(timerInvisivel);
      }
  
      return () => {
        clearInterval(timerDecrescente);
        clearInterval(timerInvisivel);
      };
      // eslint-disable-next-line
    }, [isRunning]);
  
  
    const handleStart = () => {
      setIsRunning(prevState => {
        if (!prevState) {
          sendDataToBackend1('inicio');
        }
        return !prevState;
      });
    };
  
    const handlePause = () => {
      setIsRunning(prevState => !prevState);
    };
  
    const handleStop = () => {
        if (isRunning) {
            setIsRunning(false);
            localStorage.setItem('focusDecrescenteAtual', focusDecrescenteAtual.toString());
            const focusInvisivelFormatado = formatTime(focusInvisivel);
            setfocusInvisivel(0);
            sendDataToBackend('fim', focusInvisivelFormatado);
            /*setTimeout(() => {
                window.location.reload();
              }, 3000);*/
          }
    };


    const sendDataToBackend1 = (tpregistro) => {
      const now = new Date();
      const year = now.getFullYear();
      const month = ('0' + (now.getMonth() + 1)).slice(-2);
      const currentDay = ('0' + now.getDate()).slice(-2);
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      fetch('https://gamereduceback.azurewebsites.net/upfocus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'idU': localStorage.getItem('idU'),
          'focusfeito': '00:00:00',
          'dia': `${year}-${month}-${currentDay}`,
          'horario': `${currentHour}:${currentMinute}:00`,
          'tpregistro': tpregistro,
          'auth-token': localStorage.getItem('auth-token')
        }
      })
      .catch(error => {
        console.error('Erro ao atualizar o banco de dados:', error);
      });
    };

  
  const sendDataToBackend = (tpregistro, focusInvisivelFormatado) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const currentDay = ('0' + now.getDate()).slice(-2);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    fetch('https://gamereduceback.azurewebsites.net/upfocus', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'idU': localStorage.getItem('idU'),
        'focusfeito': focusInvisivelFormatado,
        'dia': `${year}-${month}-${currentDay}`,
        'horario': `${currentHour}:${currentMinute}:00`,
        'tpregistro': tpregistro,
        'auth-token': localStorage.getItem('auth-token')
      }
    })
    .catch(error => {
      console.error('Erro ao atualizar o banco de dados:', error);
    });
  };
  
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
    <div>
      <p id={styles.cro}>{formatTime(focusDecrescenteAtual)}</p> <br />
      <div id={styles.didadi}>
        <div id={styles.bo}>
            <img src="../imagens/play.png" alt="start" width="90" height="90" id="play1" onClick={handleStart} />
            <img src="../imagens/stop.png" alt="stop" width="90" height="90" id="play2" onClick={handleStop} />
            <img src="../imagens/pause.png" alt="pause" width="90" height="90" id="play3" onClick={handlePause} />
        </div>
      </div>
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
              <p className={styles.centralize}>{modalContent.message} {tempoRestanteModal}</p>
              <button onClick={closeModal} className={styles.centralize}>Fechar</button>
          </Modal>
    </div>
  );
};

export default Cronometro;