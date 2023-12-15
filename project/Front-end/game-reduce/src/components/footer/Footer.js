import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../style.module.css';

function isUserLoggedIn2() {
  return !!localStorage.getItem('token');
}
const Footer = () => {
  const isLoggedIn = isUserLoggedIn2();
  return (
    <footer>
      <div id={styles.empty}>
      {isLoggedIn &&<Link to="/main"><img src="../imagens/home.png" alt="home" width="100" height="90vh" /></Link>}
      </div>
      <div id={styles.full}>
        <ul id={styles.redes}>
          <li><Link to="/main"><img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="instagram" /></Link></li>
          <li><Link to="/main"><img src="https://img.icons8.com/ios-filled/50/000000/facebook-circled.png" alt="facebook" /></Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;