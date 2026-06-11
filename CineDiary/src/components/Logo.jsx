import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Logo.css';
import '../styles/globalStyle.css'

function Logo() {
  return (
    <Link to="/" className="logo-container">
      <p className="logo-icon">🎞️</p>
      <h1 className="logo-text">
        <span className="text-white">Cine</span>
        <span className="text-red">Diary</span>
      </h1>
    </Link>
  );
}

export default Logo;
