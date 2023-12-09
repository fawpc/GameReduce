import React, { useState, useEffect } from 'react';
import styles from '../../style.module.css';
import WithAuth from './withAuth';
import Cronometros from './Cronometros';

function isUserLoggedIn1() {
    return !!localStorage.getItem('auth-token');
  }
  function getId() {
    if (isUserLoggedIn1()) {
      return localStorage.getItem('idU');
    }
    return null;
  }

const MainGame = () => {
    const [gametimeData, setGametimeData] = useState(null);
    const idU = getId();
    const [tempoMax, setTempoMax] = useState('00:00:00');
    const [tempofeito, setTempofeito] = useState('00:00:00');
  
    useEffect(() => {
      fetch('https://gamereduceback.azurewebsites.net/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'idu': idU,
          'auth-token': localStorage.getItem('auth-token')
        }
      })
      .then(response => response.json())
      .then(data => {
        setGametimeData(data.user);

        if (typeof data.user.tempomax === 'string' && data.user.tempomax.trim() !== '') {
          setTempoMax(formatTime(data.user.tempomax));
        }
  
        if (typeof data.user.tempofeito === 'string' && data.user.tempofeito.trim() !== '') {
          setTempofeito(formatTime(data.user.tempofeito));
        }
      })
      .catch(error => {
        console.error('Erro ao buscar os dados do gametime:', error);
      });
    }, [idU]);

    const formatTime = (time) => {
      if (!time || typeof time !== 'string') {
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
  
    return (
        <main>
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <br />
                    <h1>Iniciar Game Time</h1>
                    <br />
                    <img src="../imagens/cron1.png" alt="sino" width="500" height="500" id={styles.cron}/>
                    <br />
                        <Cronometros
                            tempofeito={tempofeito}
                            tempoMax={tempoMax}
                        />
                    <br /><h3>SEU LIMITE DIÁRIO É:</h3><br />
                    <div id={styles.dtext}>
                        {gametimeData && (
                            <>
                                <p>
                                    {formatTime(gametimeData.tempomax).split(':')[0]} horas =   
                                    {gametimeData.pontos_gametime}<img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br />
                                    Você perderá moedas ao estourar tempo. <br />
                                    Você perde - {gametimeData.perdapontos} <img src="../imagens/coin.png" alt="sino" width="30" height="30" />   a cada 30 minutos 
                                    <br /><br />
                                </p>
                            </>
                        )}
                    </div>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}
export default WithAuth(MainGame);