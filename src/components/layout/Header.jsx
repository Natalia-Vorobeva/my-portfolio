import React, { useState, useRef, useEffect } from 'react';
import { FiHome } from 'react-icons/fi';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import { trackEvent } from '../../utils/tracking';

const Header = ({ avatar, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { href: '#home', label: 'Главная', icon: FiHome },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#about', label: 'Обо мне' },
    { href: '#contact', label: 'Контакты' },
  ];

  return (
    <header className="header sticky top-0 py-3 sm:py-4 bg-dark/50 backdrop-blur-xl border-b border-primary/10 z-[1000] animate-fade-in">
      <div className="container flex justify-between items-center px-4 sm:px-6">
        <div className="header-left flex items-center gap-2 sm:gap-3">
          <div className="header-avatar">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                trackEvent('navigation', 'engagement', 'Scroll to Top');
              }}
              className="avatar-scroll-btn border-none bg-transparent p-0 cursor-pointer rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="Вернуться наверх"
            >
              <img
                src={avatar}
                alt="Наталья Воробьева"
                className="avatar-small w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary transition-transform duration-300"
              />
            </button>
          </div>
          <div className="header-name">
            <h1 className="name-title text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-light to-primary bg-clip-text text-transparent leading-tight">
              Наталья Воробьева
            </h1>
            <p className="name-subtitle text-xs sm:text-sm text-gray-400 leading-tight">Frontend Developer</p>
          </div>
        </div>

        <Navbar items={navItems} activeSection={activeSection} />
        
        <div className="md:hidden">
          <button
            className="text-light hover:text-primary transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen} 
          items={navItems} 
          onClose={() => setIsMenuOpen(false)} 
        />
      </div>
    </header>
  );
};

export default Header;