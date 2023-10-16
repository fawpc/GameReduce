import React, { useState } from 'react';
import styles from '../../style.module.css';

const MainCadastro = () => {
    const [formValues, setFormValues] = useState({
        Nome: '',
        Email: '',
        Senha: '',
        Idade: '',
        Estilo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode lidar com a submissão do formulário, por exemplo, enviar para o backend
    }

    return (
        <main>
            <div id={styles.ora}>
                <div id={styles.dados}>
                    <h1>Cadastro</h1>
                    <form onSubmit={handleSubmit}>
                        Nome: <input type="text" name="Nome" value={formValues.Nome} onChange={handleInputChange} /><br />
                        Email: <input type="text" name="Email" value={formValues.Email} onChange={handleInputChange} /><br />
                        Senha: <input type="text" name="Senha" value={formValues.Senha} onChange={handleInputChange} /><br />
                        Idade:  <input type="date" name="Idade" value={formValues.Idade} onChange={handleInputChange} /><br />
                        Selecione um Perfil:<select id="estilo" name="Estilo" value={formValues.Estilo} onChange={handleInputChange}>
                            {/* Options aqui */}
                        </select>
                        <br />
                        <input type="submit" value="Enviar" />
                    </form>
                </div>
                <img id={styles.pac} src="../imagens/pacv1.gif" alt="propaganda" height="100%" width="5%" />
                <img id={styles.pac1} src="../imagens/pacv2.gif" alt="propaganda" height="100%" width="5%" />
            </div>  
        </main>
    );
}

export default MainCadastro;