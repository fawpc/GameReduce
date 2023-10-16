import React from 'react';
import styles from '../../style.module.css';
const MainLogin = () => {
    return (
        <main>
            <div id={styles.ora}>    
                <div id={styles.dados}>
                    <br /><br /><br /><br /><br />
                    <form>
                        Email: <input type="text" name="Email" /><br />
                        Senha: <input type="text" name="Senha" /><br />
                        <br />
                        <input type="submit" value="Login" />
                    </form>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>  
        </main>
    );
}

export default MainLogin;