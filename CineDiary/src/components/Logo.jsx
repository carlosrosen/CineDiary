import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Logo.css';
import '../styles/globalStyle.css'

function Logo() {
  return (
    <nav className="logo-nav-container">
      <Link to="/" className="logo-brand">
        <p className="logo-icon">🎞️</p>
        <h1 className="logo-text">
          <span className="text-white">Cine</span>
          <span className="text-red">Diary</span>
        </h1>
      </Link>
      
      <ul className="logo-nav-links">
        <li><Link to="/">Início</Link></li>
        <li><Link to="/avaliacoes">Avaliações</Link></li>
        <li><Link to="/adicionar">Adicionar</Link></li>
      </ul>
    </nav>
  );
}

export default Logo;
