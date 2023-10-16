import React from 'react';
import styles from '../../style.module.css';
const MainGame = () => {
    return (
        <main>
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <br />
                    <h1>Iniciar Game Time</h1>
                    <br />
                    <img src="../imagens/cron.png" alt="sino" width="500" height="500" id={styles.cron}/>
                    <br />
                    <div id={styles.didadi}>
                        <div id={styles.bo}>
                            <a href=""><img src="../imagens/play.png" alt="start" width="90" height="90" id="play1" /></a>
                            <a href=""><img src="../imagens/stop.png" alt="stop" width="90" height="90" id="play2" /></a>
                            <a href=""><img src="../imagens/pause.png" alt="pause" width="90" height="90" id="play3" /></a>
                        </div>
                    </div>
                    <h4>SEU LIMITE DIÁRIO É:</h4>
                    <div id={styles.dtext}>
                        <p>
                            2 horas = 40 <img src="../imagens/coin.png" alt="sino" width="30" height="30" /><br />
                            Você perderá moedas ao estourar tempo. <br />
                            Você perde -2   <img src="../imagens/coin.png" alt="sino" width="30" height="30" />   a cada 10 minutos <br />
                            Você perde -20   <img src="../imagens/coin.png" alt="sino" width="30" height="30" />   a cada 1 hora <br /><br />
                        </p>
                    </div>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default MainGame;