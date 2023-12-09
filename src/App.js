import React from 'react';
import styles from './style.module.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Status from './pages/status';
import Moedas from './pages/moedas';
import Premios from './pages/premios';
import Metas from './pages/metas';
import Focus from './pages/focus';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import Games from './pages/games';

function App() {
  return (
    <Router>
      <div id={styles.tdjog}>
        <Header />
        <Routes>
          <Route path="/status" element={<Status />} />
          <Route path="/moedas" element={<Moedas />} />
          <Route path="/premios" element={<Premios />} />
          <Route path="/metas" element={<Metas />} />
          <Route path="/focus" element={<Focus />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Games />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;