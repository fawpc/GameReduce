import React, { useState, useEffect } from 'react';
import styles from '../../style.module.css';
import WithAuth from './withAuth';
import Cronometro from './CronFocus'

function isUserLoggedIn1() {
    return !!localStorage.getItem('auth-token');
  }
  function getId() {
    if (isUserLoggedIn1()) {
      return localStorage.getItem('idU');
    }
    return null;
  }

const MainFocus = () => {
    const [focusTimeData, setFocusTimeData] = useState(null);
    const [allFocusTimeData, setAllFocusTimeData] = useState([]);
    const idU = getId();
    const [tempo, settempo] = useState('00:00:00'); 
    const [focusfeito, setfocusfeito] = useState('00:00:00');
    useEffect(() => {
        const idU = localStorage.getItem('idU');
        fetch('https://gamereduceback.azurewebsites.net/focus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'idu': idU,
                'auth-token': localStorage.getItem('auth-token')
            }
        })
        .then(response => response.json())
        .then(data => {
            setFocusTimeData(data.user);
            if (typeof data.user.tempo === 'string' && data.user.tempo.trim() !== '') {
                settempo(formatTime(data.user.tempo));
            }
        
            if (typeof data.user.focusfeito === 'string' && data.user.focusfeito.trim() !== '') {
                setfocusfeito(formatTime(data.user.focusfeito));
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do Focus Time:', error);
        });
    }, [idU]);

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

    
    const formatTime = (time) => {
      if (!time || typeof time !== 'string') {
        console.log('Tempo vazio ou não é uma string.');
        return '00:00:00';
      }
  
    
      const [hours, minutes, seconds] = time.split(':').map(Number);
    
      const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
      ].join(':');
  
      return formattedTime;
    };
    const a = false;

    if (a === true) { 
        console.log(focusTimeData);
    }
    return (
        <main>
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <br />
                    <h1>INICIAR FOCUS TIME</h1>
                    <br />
                    <img src="../imagens/cron1.png" alt="sino" width="500" height="500" id={styles.cron}/>
                    <br />
                    <Cronometro
                            focusfeito={focusfeito}
                            tempo={tempo}
                        />
                    <br />
                    <p id={styles.foca}>Suas horas de foco podem lhe render pontos também !!!</p>
                    <br /><h3>DURAÇÃO - MOEDAS:</h3><br />
                    {allFocusTimeData && allFocusTimeData.length > 0 &&
                        <div id={styles.dtext}>
                            <p>
                                {allFocusTimeData[0]?.tempo?.hours} Hora: {allFocusTimeData[0]?.pontos_focustime } <img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br />
                                {allFocusTimeData[1]?.tempo?.hours} Horas: {allFocusTimeData[1]?.pontos_focustime } <img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br />
                                {allFocusTimeData[2]?.tempo?.hours} Horas: {allFocusTimeData[2]?.pontos_focustime } <img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br />
                                {allFocusTimeData[3]?.tempo?.hours} Horas: {allFocusTimeData[3]?.pontos_focustime } <img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br /><br />
                            </p>
                        </div>
                    }<br /><br /><br /><br /><br /><br /><br /><br />
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default WithAuth (MainFocus);