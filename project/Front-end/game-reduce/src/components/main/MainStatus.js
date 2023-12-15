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

const MainStatus = () => {
    const [userData, setUserData] = useState(null);
    const idU = getId();
    useEffect(() => {
        fetch('https://gamereduceback.azurewebsites.net/stats', {
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
                    <br />
                    <h1>Stats </h1>
                    <div id={styles.dtext}>
                        {userData ? (
                            <p>
                                Nome: {userData.nome} <br />
                                Classe: {userData.estilo} <br />
                                Limite diário: {userData.tempomax.hours} horas = ({userData.pontos_gametime} <img src="../imagens/coin.png" alt="sino" width="30" height="30" /> por dia)<br />
                                Tempo de foco: {userData.tempo.hours} horas = ({userData.pontos_focustime} <img src="../imagens/coin.png" alt="sino" width="30" height="30" /> por dia)<br />
                                Moedas: {userData.valor} <img src="../imagens/coin.png" alt="sino" width="30" height="30" /> <br />
                                Último Resgate: {userData.dataresgate ? `${formatarData(userData.dataresgate)}` : 'Sem resgates anteriores'}<br /><br /><br /><br /><br /><br /><br />
                                <Link to='/edit' id={styles.subz}>         Para editar seu perfil clique aqui !!!</Link>
                            </p>
                        ) : (
                            <p>Carregando dados...</p>
                        )}
                    </div>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>
        </main>
    );
}

export default WithAuth(MainStatus);