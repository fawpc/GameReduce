import React from 'react';
import styles from '../../style.module.css';
const MainPremios = () => {
    const handleResgatar = (event) => {
        event.preventDefault();
        // Coloque aqui a lógica para resgatar o prêmio
    }

    return (
        <main id="dat">
            <div id={styles.ora}>    
                <div id={styles.dados}>
                    <br />
                    <h4>Prêmios Para o seu perfil:</h4><br />
                    <form onSubmit={handleResgatar}>
                        <input type="radio" id="amz20" name="prem" value="amz20" />
                        <label htmlFor="amz20">Vale presente livros Amazon 20<br />
                            custo 300 <img src="../imagens/coin.png" alt="sino" width="30" height="30" />
                        </label><br />
                        {/* Adicione os outros radio buttons aqui com seus respectivos labels */}
                        <br />
                        <input type="submit" value="Resgatar" />
                    </form>    
                    <br /><br />    
                    <a href="">outros prêmios</a>    
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default MainPremios;