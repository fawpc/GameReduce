import React from 'react';
import styles from '../../style.module.css';
const MainFocus = () => {
    return (
        <main>
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <br />
                    <h1>INICIAR FOCUS TIME</h1>
                    <br />
                    <img src="../imagens/cron.png" alt="sino" width="500" height="500" id={styles.cron} />
                    <br />
                    <div id={styles.didadi}>
                        <div id={styles.bo}>
                            <a href=""><img src="../imagens/play.png" alt="start" width="90" height="90" id="play1" /></a>
                            <a href=""><img src="../imagens/stop.png" alt="stop" width="90" height="90" id="play2" /></a>
                            <a href=""><img src="../imagens/pause.png" alt="pause" width="90" height="90" id="play3" /></a>
                        </div>
                    </div>

                    <h4>DURAÇÃO - MOEDAS:</h4>
                    <div id={styles.dtext}>
                        <p>
                            1 Hora: 10  <img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br />
                            2 Horas: 20   <img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br />
                            4 Horas: 40   <img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br /><br />
                        </p>
                    </div>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default MainFocus;