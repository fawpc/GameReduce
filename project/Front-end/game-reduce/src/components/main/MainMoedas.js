import React from 'react';
import styles from '../../style.module.css';
const MainMoedas = () => {
    return (
        <main id="dat">
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <div id={styles.saldao}>
                        <p id={styles.saldo}>Saldo Total: 500<img src="../imagens/coin.png" alt="sino" width="40" height="40" /></p><br />
                    </div>

                    <h1>Ultimos Resgates:</h1><br />
                    <div id={styles.dtext}>
                        <p>
                            Vale presente livros Amazom R$50<br />
                            -600 <img src="../imagens/coin.png" alt="sino" width="30" height="30" /> Data de resgate: 30/09/2023<br />
                            Vale presente livros Amazom R$20<br />
                            -300 <img src="../imagens/coin.png" alt="sino" width="30" height="30" /> Data de resgate: 30/09/2023<br />
                            Vale presente livros Saraiva R$50 <br />
                            -500 <img src="../imagens/coin.png" alt="sino" width="30" height="30" /> Data de resgate: 30/09/2023<br />
                            Vale presente livros Saraiva R$30 <br />
                            -300 <img src="../imagens/coin.png" alt="sino" width="30" height="30" /> Data de resgate: 30/09/2023<br />
                        </p>
                    </div>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default MainMoedas;