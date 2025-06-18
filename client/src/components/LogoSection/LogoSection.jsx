import React from 'react';
import logo from '../../assets/images/logo.jpg';
import './LogoSection.css';

const LogoSection = () => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Kudoboard Logo" className="logo" />
    </div>
  );
};

export default LogoSection;
