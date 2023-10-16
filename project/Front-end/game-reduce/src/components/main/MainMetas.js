import React from 'react';
import styles from '../../style.module.css';
const MainMetas = () => {
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
                            <div className={styles.mark}></div>
                        </div>
                        <div className={styles.values}>
                            <div className={styles.value}>5HRS</div>
                            <div className={styles.value}>4HRS</div>
                            <div className={styles.value}>3HRS</div>
                            <div className={styles.value}>2HRS</div>
                            <div className={styles.value}>1HR</div>
                        </div>
                    </div><br />
                    <h3>Quantidade de pontos ganhos por redução de horas totais consumidas:</h3><br /><br />
                    <div id={styles.dtext}>
                        <p>
                            5 Horas:<br />
                            pontos máx ao não estourar o limite:
                            10 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            4 Horas:<br />
                            pontos máx ao não estourar o limite:
                            20 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            3 Horas:<br />
                            pontos máx ao não estourar o limite:
                            30 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            2 Horas:<br />
                            pontos máx ao não estourar o limite:
                            40 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                            1 Hora:<br />
                            pontos máx ao não estourar o limite:
                            100 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /><br />
                        </p>
                    </div>
                    <br />
                    <h4>LIMITE ATUAL: 2 HORAS</h4>
                    <br />
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default MainMetas;