import React from 'react';
import styles from '../../style.module.css';
const MainInicio = () => {
    return (
        <main id="dat">
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <br />
                    <h1>Iniciar Game Time</h1><br />
                    <img src="../imagens/cron.png" alt="sino" width="500" height="500" id={styles.cron}/><br />
                    <div id={styles.didadi}>
                        <div id={styles.bo}>
                            <a href=""><img src="../imagens/play.png" alt="start" width="90" height="90" id="play1" /></a>
                            <a href=""><img src="../imagens/stop.png" alt="stop" width="90" height="90" id="play2" /></a>
                            <a href=""><img src="../imagens/pause.png" alt="pause" width="90" height="90" id="play3" /></a>
                        </div>
                    </div>
                    <h4>SEU LIMITE DIÁRIO DE HORAS JOGADAS É ∞?</h4>
                    <div id={styles.dtext}>
                        <p>
                            Você sente que poderia estar fazendo melhor uso do seu tempo?<br />
                            Que tal um app que lhe auxilie a lidar com isso?
                            Com recompensas interessantes <img src="../imagens/coin.png" alt="sino" width="60" height="60" /><br /><br />
                        </p>
                    </div>
                    <h5><a href="/form">Cadastre-se Aqui !!!</a> </h5><br />
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default MainInicio;