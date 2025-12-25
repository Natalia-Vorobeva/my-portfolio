import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import foto from '../../assets/images/Fotoram.io.jpg';

const Header = ({ activeSection, trackEvent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (section) => {
    trackEvent('navigation', 'engagement', `${section} Section`);
  };

  return (
    <header className="header sticky top-0 py-3 sm:py-4 bg-dark/50 backdrop-blur-xl border-b border-primary/10 z-[1000] animate-fade-in">
      <div className="container flex justify-between items-center px-4 sm:px-6">
        {/* ... Header content ... */}
        <div className="header-left flex items-center gap-2 sm:gap-3">
          <div className="header-avatar">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                trackEvent('navigation', 'engagement', 'Scroll to Top');
              }}
              className="avatar-scroll-btn"
              aria-label="Вернуться наверх"
            >
              <img
                src={foto}
                alt="Наталья Воробьева"
                className="avatar-small"
              />
            </button>
          </div>
          <div className="header-name">
            <h1 className="name-title">Наталья Воробьева</h1>
            <p className="name-subtitle">Frontend Developer</p>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav className="nav hidden md:flex gap-4 lg:gap-6 items-center">
          <NavLink href="https://visit-card-vorobeva.vercel.app/" label="Сайт-визитка" onClick={() => handleNavClick('Visit Card')} />
          <NavLink href="#home" label="Главная" active={activeSection === 'home'} onClick={() => handleNavClick('Home')} />
          <NavLink href="#portfolio" label="Портфолио" onClick={() => handleNavClick('Portfolio')} />
          <NavLink href="#about" label="Обо мне" onClick={() => handleNavClick('About')} />
          <NavLink href="#contact" label="Контакты" onClick={() => handleNavClick('Contact')} />
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            className="text-light hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {/* Hamburger icon */}
          </button>
        </div>

        {/* Mobile menu */}
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} trackEvent={trackEvent} />
      </div>
    </header>
  );
};

const NavLink = ({ href, label, active, onClick }) => (
  <a
    href={href}
    className={`nav-link ${active ? 'text-primary' : ''}`}
    onClick={onClick}
  >
    <span className="relative z-10">{label}</span>
    {active && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>}
    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
  </a>
);

const MobileMenu = ({ isOpen, onClose, trackEvent }) => (
  <div className={`md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-xl border-b border-primary/10 transition-all ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
    <div className="container px-4 py-4">
      <div className="flex flex-col gap-4">
        <MobileMenuItem href="#home" label="Главная" onClose={onClose} trackEvent={trackEvent} />
        <MobileMenuItem href="#portfolio" label="Портфолио" onClose={onClose} trackEvent={trackEvent} />
        <MobileMenuItem href="#about" label="Обо мне" onClose={onClose} trackEvent={trackEvent} />
        <MobileMenuItem href="#contact" label="Контакты" onClose={onClose} trackEvent={trackEvent} />
        <MobileMenuItem href="https://visit-card-vorobeva.vercel.app/" label="Сайт-визитка" external onClose={onClose} trackEvent={trackEvent} />
      </div>
    </div>
  </div>
);

const MobileMenuItem = ({ href, label, external, onClose, trackEvent }) => (
  <a
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    onClick={() => {
      onClose();
      trackEvent('navigation', 'engagement', `${label} Section`);
    }}
    className="text-light hover:text-primary transition-colors py-2 text-center md:text-left"
  >
    {label}
  </a>
);

export default Header;