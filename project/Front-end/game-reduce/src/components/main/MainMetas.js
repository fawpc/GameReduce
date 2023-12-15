import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import styles from '../../style.module.css';
import WithAuth from './withAuth';

function isUserLoggedIn1() {
    return !!localStorage.getItem('auth-token');
  }
  function getId() {
    if (isUserLoggedIn1()) {
      return localStorage.getItem('idU');
    }
    return null;
  }

const MainMetas = () => {
    const [gametimeData, setGametimeData] = useState(null);
    const idU = getId();
    // eslint-disable-next-line
    const [tempomax, setTempoMax] = useState('00:00:00');
    // eslint-disable-next-line
    const [tempo, settempo] = useState('00:00:00');
    // eslint-disable-next-line
    const [tempototal, settempototal] = useState('00:00:00');
    // eslint-disable-next-line
    const [focustotal, setfocustotal] = useState('00:00:00');

    useEffect(() => {
      fetch('https://gamereduceback.azurewebsites.net/metas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'idu': idU,
          'auth-token': localStorage.getItem('auth-token')
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          const userData = data.user || {};
          
          if (userData.tempomax) {
            setTempoMax(formatTime(userData.tempomax));
          }
          if (userData.tempo) {
            settempo(formatTime(userData.tempo));
          }
          if (userData.tempototal) {
            settempototal(formatTime(userData.tempototal));
          }
          if (userData.focustotal) {
            setfocustotal(formatTime(userData.focustotal));
          }

          setGametimeData(userData); 
        } else {
          console.error('Dados do usuário não encontrados ou inválidos');
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
    
    useEffect(() => {
      if (gametimeData && Object.keys(gametimeData).length > 0) {
        const labels = [];
        const tempoTotal = [];
        const tempoMax = [];
    
        Object.values(gametimeData).forEach((item) => {
          if (typeof item === 'object' && 'dia' in item && 'tempototal' in item && 'tempomax' in item) {
            const date = new Date(item.dia);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            labels.push(formattedDate);
            const tempoTotalFeito = item.tempototal || '00:00:00';
            if (typeof tempoTotalFeito === 'object') {
              const totalHours = tempoTotalFeito.hours || 0;
              const totalMinutes = tempoTotalFeito.minutes || 0;
              const totalSeconds = tempoTotalFeito.seconds || 0;
        
              const totalTimeInSeconds =
                totalHours * 3600 + totalMinutes * 60 + totalSeconds;
              tempoTotal.push(totalTimeInSeconds);
            }
        
            const tempoMaximoDiario = item.tempomax || '00:00:00';
            if (typeof tempoMaximoDiario === 'object') {
              const maxHours = tempoMaximoDiario.hours || 0;
              const maxMinutes = tempoMaximoDiario.minutes || 0;
              const maxSeconds = tempoMaximoDiario.seconds || 0;
        
              const maxTimeInSeconds = maxHours * 3600 + maxMinutes * 60 + maxSeconds;
              tempoMax.push(maxTimeInSeconds);
              
          } else {
            console.error('Alguma(s) propriedade(s) essencial(is) não encontrada(s) no objeto gametimeData:', item);
          }
        }});
        const data = {
          labels: labels,
          datasets: [
            {
              label: 'Tempo Total Feito',
              backgroundColor: 'rgba(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: tempoTotal,
            },
            {
              label: 'Limite Diário',
              backgroundColor: 'rgba(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: tempoMax,
            },
          ],
        };
  
        const options = {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Tempo (HH:mm:ss)',
              },
              ticks: {
                callback: function (value) {
                  const hours = Math.floor(value / 3600);
                  const minutes = Math.floor((value % 3600) / 60);
                  const seconds = value % 60;
        
                  return `${hours.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                },
              },
            },
            x: {
              title: {
                display: true,
                text: 'Dias',
              },
            },
          },
        };
  
        const ctx = document.getElementById('myChart');
        if (ctx) {
          if (window.myChart instanceof Chart) {
            window.myChart.destroy();
          }
    
          window.myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options,
          });
        }
      }
    }, [gametimeData]);

    useEffect(() => {
      if (gametimeData && Object.keys(gametimeData).length > 0) {
        const labels = [];
        const focusTotal = [];
        const tempo = [];

        Object.values(gametimeData).forEach((item) => {
          if (typeof item === 'object' && 'dia' in item && 'focustotal' in item && 'tempo' in item) {
            const date = new Date(item.dia);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;
            labels.push(formattedDate);
            const tempoTotalFeito = item.focustotal || '00:00:00';
            if (typeof tempoTotalFeito === 'object') {
              const totalHours = tempoTotalFeito.hours || 0;
              const totalMinutes = tempoTotalFeito.minutes || 0;
              const totalSeconds = tempoTotalFeito.seconds || 0;
        
              const totalTimeInSeconds =
                totalHours * 3600 + totalMinutes * 60 + totalSeconds;
              focusTotal.push(totalTimeInSeconds);
            }
        
            const tempoMaximoDiario = item.tempo || '00:00:00';
            if (typeof tempoMaximoDiario === 'object') {
              const maxHours = tempoMaximoDiario.hours || 0;
              const maxMinutes = tempoMaximoDiario.minutes || 0;
              const maxSeconds = tempoMaximoDiario.seconds || 0;
        
              const maxTimeInSeconds = maxHours * 3600 + maxMinutes * 60 + maxSeconds;
              tempo.push(maxTimeInSeconds);
              
          } else {
            console.error('Alguma(s) propriedade(s) essencial(is) não encontrada(s) no objeto gametimeData:', item);
          }
        }});
        const data = {
          labels: labels,
          datasets: [
            {
              label: 'Foco Total Feito',
              backgroundColor: 'rgba(75, 192, 192)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: focusTotal,
            },
            {
              label: 'Minimo Diário',
              backgroundColor: 'rgba(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
              data: tempo,
            },
          ],
        };
  
        const options = {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Tempo (HH:mm:ss)',
              },
              ticks: {
                callback: function (value) {
                  const hours = Math.floor(value / 3600);
                  const minutes = Math.floor((value % 3600) / 60);
                  const seconds = value % 60;
        
                  return `${hours.toString().padStart(2, '0')}:${minutes
                    .toString()
                    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                },
              },
            },
            x: {
              title: {
                display: true,
                text: 'Dias',
              },
            },
          },
        };
  
        const ctx1 = document.getElementById('myChartFocus');
        if (ctx1) {
          if (window.myChart1 instanceof Chart) {
            window.myChart1.destroy();
          }
    
          window.myChart1 = new Chart(ctx1, {
            type: 'bar',
            data: data,
            options: options,
          });
        }
      }
    }, [gametimeData]);

    // eslint-disable-next-line
    const [gametimeData2, setGametimeData2] = useState(null);
    const [tempoMax1, setTempoMax1] = useState('00:00:00');
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
        setGametimeData2(data.user);
  
        if (typeof data.user.tempomax === 'string' && data.user.tempomax.trim() !== '') {
          setTempoMax1(formatTime(data.user.tempomax));
        }

      })
      .catch(error => {
        console.error('Erro ao buscar os dados do gametime:', error);
      });
    }, [idU]);
    // eslint-disable-next-line
    const [focusTimeData, setFocusTimeData] = useState(null);
    const [tempo2, settempo2] = useState('00:00:00'); 
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
              settempo2(formatTime(data.user.tempo));
          }
      })
      .catch(error => {
          console.error('Erro ao buscar os dados do Focus Time:', error);
      });
  }, [idU]);

    return (
        <main id="dat">
            <div id={styles.ora}>    
                <div id={styles.dados}>
                    <br />
                    <h1>Meta de Redução de Horas</h1>
                    <br />
                    <div className={styles.ruler}>
                        <div className={styles.line}></div>
                        <div className={styles.marks}>
                            <div className={styles.mark}></div>
                            <div className={styles.mark}></div>
                            <div className={styles.mark}></div>
                            <div className={styles.mark}></div>
                        </div>
                        <div className={styles.values}>
                            <div className={styles.value}>4HRS</div>
                            <div className={styles.value}>3HRS</div>
                            <div className={styles.value}>2HRS</div>
                            <div className={styles.value}>1HR</div>
                        </div>
                    </div><br />
                    <h3>Quantidade de pontos ganhos por redução de horas totais consumidas:</h3><br /><br />
                    <div id={styles.dtext}>
                        <p>
                            4 Horas:<br />
                            pontos máx ao não estourar o limite:
                            05 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            3 Horas:<br />
                            pontos máx ao não estourar o limite:
                            10 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            2 Horas:<br />
                            pontos máx ao não estourar o limite:
                            20 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            1 Hora:<br />
                            pontos máx ao não estourar o limite:
                            40 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                        </p>
                    </div>
                    <br />
                    <h4>LIMITE DIÁRIO ATUAL: {tempoMax1}</h4>
                    <br />
                    <canvas id="myChart"></canvas><br /><br />
                    <h1>Meta de Horas Produtivas</h1>
                    <div className={styles.ruler}>
                        <div className={styles.line}></div>
                        <div className={styles.marks}>
                            <div className={styles.mark}></div>
                            <div className={styles.mark}></div>
                            <div className={styles.mark}></div>
                            <div className={styles.mark}></div>
                        </div>
                        <div className={styles.values}>
                            <div className={styles.value}>4HRS</div>
                            <div className={styles.value}>3HRS</div>
                            <div className={styles.value}>2HRS</div>
                            <div className={styles.value}>1HR</div>
                        </div>
                    </div><br />
                    <h3>Quantidade de pontos ganhos por horas produtivas de foco:</h3><br /><br />
                    <div id={styles.dtext}>
                        <p>
                            4 Horas:<br />
                            pontos máx:
                            30 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            3 Horas:<br />
                            pontos máx:
                            30 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            2 Horas:<br />
                            pontos máx:
                            20 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            1 Hora:<br />
                            pontos máx:
                            10 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                        </p>
                    </div>
                    <br />
                    <h4>TEMPO DE FOCO DIÁRIO ATUAL: {tempo2}</h4>
                    <br />
                    <canvas id="myChartFocus"></canvas>
                    <br />
                </div>

                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default WithAuth(MainMetas);