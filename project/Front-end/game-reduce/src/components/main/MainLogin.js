import React, { useState } from 'react';
// eslint-disable-next-line
import { Link, useNavigate , Redirect  } from 'react-router-dom';
import styles from '../../style.module.css';

const MainLogin = () => {
    const navigate  = useNavigate ();
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });

    const [error, setError] = useState('');
    // eslint-disable-next-line
    const isUserLoggedIn = () => {
        return !!localStorage.getItem('auth-token');
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email || !formData.senha) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        fetch('https://gamereduceback.azurewebsites.net/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const token = data.token;
            const idU = data.idU;
            localStorage.setItem('auth-token', token);
            localStorage.setItem('idU', idU);
            navigate('/main');
        })
        .catch((error) => {
            console.error('Erro:', error);
            setError('Senha incorreta !!!');
        });
    }

    return (
        <main>
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <br /><br /><br /><br /><br />
                    <div id={styles.forms}>
                        <form onSubmit={handleSubmit} id={styles.formCad}>
                        Email: <input type="text" name="email" onChange={handleChange} /><br />
                        Senha: <input type="password" name="senha" onChange={handleChange} /><br />
                        <br />
                        <input type="submit" value="Login"  id={styles.subz}/>
                        <br />
                        Não possui conta? <Link to='/cadastro'>Clique aqui!!!</Link><br /><br /><br />
                        {error && <p>{error}</p>}
                        </form>
 
                    </div>

                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>  
        </main>
    );
}

export default MainLogin;
