import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import styles from '../../style.module.css';

function isUserLoggedIn1() {
  return !!localStorage.getItem('auth-token');
}
function getId() {
  if (isUserLoggedIn1()) {
    return localStorage.getItem('idU');
  }
  return null;
}

const Header = () => {
  const [numeroMoedas, setNumeroMoedas] = useState(0);
  const isLoggedIn = isUserLoggedIn1();
  const idU = getId();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('idU');
    localStorage.removeItem('focusDecrescenteAtual');
    localStorage.removeItem('tempoDecrescenteAtual');
    handleCloseMenu();
    navigate('/');
  };
  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  if (idU !== null) {
    fetch('https://gamereduceback.azurewebsites.net/coin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('auth-token'),
        'idU': idU,
      },
    })
    .then(response => response.json())
    .then(data => {
      setNumeroMoedas(data.moedas);
    })
    .catch(error => {
      console.error('Erro ao obter número de moedas:', error);
    });
  }

  return (
    <header>
      <div id={styles.tlogo}>
        <nav>
          <input id={styles.menu_hamburguer} type="checkbox" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)}/>
          <label htmlFor={styles.menu_hamburguer}>
            <div className={styles.menu}>
              <span className={styles.hamburguer}></span>
            </div>
          </label>
          <ul id={styles.hamb}>
            {isLoggedIn && <li><Link to='/status' onClick={handleCloseMenu}>Stats</Link></li>}
            {isLoggedIn && <li><Link to='/moedas' onClick={handleCloseMenu}>Moedas</Link></li>}
            {isLoggedIn && <li><Link to='/premios' onClick={handleCloseMenu}>Prêmios</Link></li>}
            {isLoggedIn && <li><Link to='/metas' onClick={handleCloseMenu}>Metas</Link></li>}
            {isLoggedIn && <li><Link to='/focus' onClick={handleCloseMenu}>Focus Time</Link></li>}
            {isLoggedIn && <li><Link to='/main' onClick={handleCloseMenu}>Game Time</Link></li>}
            
            <div id={styles.log}>
              {!isLoggedIn && <li><Link to='/cadastro' onClick={handleCloseMenu}>Cadastre-se</Link></li>}
              <p id={styles.nothing}>aaaa</p>
              {!isLoggedIn && <li><Link to='/' onClick={handleCloseMenu}>Login</Link></li>}
              {isLoggedIn && <button onClick={handleLogout} className={styles.butLogout}>Logout</button>}
            </div>
          </ul>
        </nav>

        <Link to='/main' id={styles.logo}>Game Reduce</Link>
        <div id={styles.valores}>
          <Link to='/main'><img src="../imagens/bell.png" alt="sino" width="60" height="60" id={styles.noti} /></Link>
          <Link to='/moedas'><img src="../imagens/coin.png" alt="sino" width="60" height="60" id={styles.moeda} /></Link>
          {isLoggedIn &&<p>{numeroMoedas}</p>}
        </div>
      </div>
    </header>
  );
}

export default Header;