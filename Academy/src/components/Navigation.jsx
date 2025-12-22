// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import './Navigation.css';
// Import the logo image
import logo from '../assets/logo.png';
import AdmissionPopup from './AdmissionPopup';
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Aboutus', href: '/aboutus' },
    { name: 'Programs', href: '/programs' },
    { name: 'Facilities', href: '/facilities' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
   
 
  ];

  const handleBookTrial = () => {
    navigate('/');
    setTimeout(() => {
      const trialForm = document.getElementById('trial-form');
      if (trialForm) {
        trialForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        {/* Logo Section */}
        <div className="nav-logo">
          <Link to="/" className="logo-link">
            <img src={logo} alt="SSBA Academy Logo" className="logo-image" />
            <span className="logo-text">SSBA</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li key={item.name} className="nav-item">
              <Link 
                to={item.href} 
                className={`nav-link ${location.pathname === item.href ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
            <li className="nav-item">
            <AdmissionPopup />
          </li>
        </ul>

        {/* CTA Button */}
        <div className="nav-cta">
          <Link 
            to="/" 
            className="cta-primary nav-cta-btn" 
            onClick={(e) => {
              e.preventDefault();
              setIsMenuOpen(false);
              handleBookTrial();
            }}
          >
            Book Free Trial
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
