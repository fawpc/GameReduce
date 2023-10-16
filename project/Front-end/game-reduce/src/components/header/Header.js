import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../style.module.css';
const Header = () => {
  return (
    <header>
      <div id={styles.tlogo}>
        <nav>
          <input id={styles.menu_hamburguer} type="checkbox" />
          <label htmlFor={styles.menu_hamburguer}>
            <div className={styles.menu}>
              <span className={styles.hamburguer}></span>
            </div>
          </label>
          <ul id={styles.hamb}>
            <li><Link to='/status'>Stats</Link></li>
            <li><Link to='/moedas'>Moedas</Link></li>
            <li><Link to='/premios'>Prêmios</Link></li>
            <li><Link to='/metas'>Metas</Link></li>
            <li><Link to='/focus'>Focus Time</Link></li>
            <li><Link to='/avatar'>Avatar</Link></li>
            {/* Adicione mais links conforme necessário */}
            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div id={styles.log}>
              <li><Link to='/cadastro'>Cadastre-se</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </div>
            <p id={styles.time}>Tempo Restante: 00:01</p>
          </ul>
        </nav>

        <Link to='/' id={styles.logo}>Game Reduce</Link>
        <div id={styles.valores}>
          <Link to='/'><img src="../imagens/bell.png" alt="sino" width="60" height="60" id={styles.noti} /></Link>
          <Link to='/moedas'><img src="../imagens/coin.png" alt="sino" width="60" height="60" id={styles.moeda} /></Link>
          <p>500</p>
        </div>
      </div>
    </header>
  );
}

export default Header;