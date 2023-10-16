import React from 'react';
import styles from '../../style.module.css';

const MainStatus = () => {
    return (
        <main id="dat">
            <div id={styles.ora}>   
                <div id={styles.dados}>
                    <br />
                    <h1>Stats </h1>
                    <div id={styles.dtext}>
                        <p>
                            Nome: Pedro <br />
                            Classe: Caseiro <br />
                            Subclasse: Leitor <br />
                            Limite diário: 2 horas = (40 <img src="../imagens/coin.png" alt="sino"width="30" height="30" /> por dia)<br />
                            Moedas: 500  <img src="../imagens/coin.png" alt="sino"width="30" height="30" /> <br />
                            Ultimo Resgate: 05/10/2023
                        </p>
                    </div>

                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>

        </main>
    );
}

export default MainStatus;