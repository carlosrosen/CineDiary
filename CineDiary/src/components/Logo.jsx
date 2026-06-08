import React from 'react';
import '../styles/Logo.css';
import '../styles/globalStyle.css'

function Logo() {
  return (
    <div className="logo-container">
      <p className="logo-icon">🎞️</p>
      <h1 className="logo-text">
        <span className="text-white">Cine</span>
        <span className="text-red">Diary</span>
      </h1>
    </div>
  );
}

export default Logo;
