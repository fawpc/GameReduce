import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../style.module.css';
const Footer = () => {
  return (
    <footer>
      <div id={styles.empty}>
        <Link to="/"><img src="../imagens/home.png" alt="home" width="100" height="90vh" /></Link>
      </div>
      <div id={styles.full}>
        <ul id={styles.redes}>
          <li><Link to="https://www.instagram.com/SEU_USUARIO_INSTAGRAM" target="_blank"><img src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png" alt="instagram" /></Link></li>
          <li><Link to="https://www.facebook.com/SEU_USUARIO_FACEBOOK" target="_blank"><img src="https://img.icons8.com/ios-filled/50/000000/facebook-circled.png" alt="facebook" /></Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;