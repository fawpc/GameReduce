import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const MainMoedas = () => {
    const [userData, setUserData] = useState(null);
    const [resgData, setResgData] = useState([]);
    const idU = getId();

    useEffect(() => {
        fetch('https://gamereduceback.azurewebsites.net/moedas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
                'idu': idU
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserData(data.user);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do usuário:', error);
        });

        fetch('https://gamereduceback.azurewebsites.net/rfeitos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token'),
                'idu': idU
            }
        })
        .then(response => response.json())
        .then(data => {
            setResgData(data);
        })
        .catch(error => {
            console.error('Erro ao buscar os dados do usuário:', error);
        });
    }, [idU]);

    function formatarData(dataString) {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
      
        return `${dia}/${mes}/${ano}`;
      }


    return (
        <main id="dat">
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <div id={styles.saldao}>
                        {userData && (
                            <p id={styles.saldo}>
                                <br />
                                Saldo Total: {userData.valor}
                                <img src="../imagens/coin.png" alt="sino" width="40" height="40" />
                            </p>
                        )}
                    </div>

                    <h1>Últimos Resgates:</h1>
                    <br />
                    <div id={styles.dtext}>
                        {resgData && resgData.resgates && resgData.resgates.length > 0 ? (
                            <ul>
                                {resgData.resgates.map((resgate, index) => (
                                    <li key={index}>
                                        {resgate.descricao} Chave de Resgate:  
                                        {resgate.chave}
                                        <br /> Custo: 
                                        {resgate.valor} <img src="../imagens/coin.png" alt="sino" width="30" height="30" /> Data do resgate: {formatarData(resgate.dataresgate)}<br />
                                        <br />    
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhum resgate foi realizado anteriomente. <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                            <Link to='/premios' id={styles.subz}>         Revindique Prêmios aqui !!!</Link>
                            </p>
                        )}
                    </div>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default WithAuth(MainMoedas);