import React from 'react';
import { FiSend } from 'react-icons/fi';
import { trackEvent } from '../../utils/tracking';

const Footer = ({ onToggleAnalytics }) => {
  return (
    <footer className="footer py-8 md:py-12 bg-dark/90 border-t border-primary/10 animate-fade-in">
      <div className="container px-4 sm:px-6">
        <div className="footer-content flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-6">
          <div className="footer-logo text-center md:text-left order-1 md:order-1">
            <h3 className="text-lg md:text-xl font-bold text-light mb-2">Наталья Воробьева</h3>
            <p className="text-gray-400 text-xs md:text-sm">Frontend Developer</p>
          </div>

          <div className="footer-links flex flex-wrap gap-3 md:gap-4 justify-center order-3 md:order-2 mt-4 md:mt-0">
            <a
              href="#home"
              className="text-gray-300 no-underline transition-colors duration-300 font-medium hover:text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-white/5"
              onClick={() => trackEvent('footer_navigation', 'engagement', 'Home')}
            >
              Главная
            </a>
            <a
              href="#portfolio"
              className="text-gray-300 no-underline transition-colors duration-300 font-medium hover:text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-white/5"
              onClick={() => trackEvent('footer_navigation', 'engagement', 'Portfolio')}
            >
              Портфолио
            </a>
            <a
              href="#about"
              className="text-gray-300 no-underline transition-colors duration-300 font-medium hover:text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-white/5"
              onClick={() => trackEvent('footer_navigation', 'engagement', 'About')}
            >
              Обо мне
            </a>
            <a
              href="#contact"
              className="text-gray-300 no-underline transition-colors duration-300 font-medium hover:text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-white/5"
              onClick={() => trackEvent('footer_navigation', 'engagement', 'Contact')}
            >
              Контакты
            </a>
          </div>

          <div className="footer-social flex gap-3 md:gap-4 order-2 md:order-3">
            <a
              href="https://t.me/vorobjevaa"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-900/40 rounded-xl text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:scale-105 active:scale-95"
              onClick={() => trackEvent('social_click', 'engagement', 'Telegram Profile')}
              aria-label="Telegram"
            >
              <FiSend className="text-base md:text-lg" />
            </a>
            <button
              className="analytics-trigger hidden-style cursor-none bg-transparent border-0"
              onClick={onToggleAnalytics}
              aria-hidden="true"
            ></button>
          </div>
        </div>

        <div className="footer-bottom text-center pt-6 md:pt-8 border-t border-primary/10">
          <p className="text-gray-400 text-xs md:text-sm mb-2">
            © Наталья Воробьева. Все права защищены {new Date().getFullYear()}
          </p>
          <p className="footer-note text-xs text-gray-500 mb-2">
            Сайт-портфолио фронтенд-разработчика
          </p>
          <p className="analytics-info text-xs text-gray-600">
            <small>Используется Google Analytics для сбора анонимной статистики посещений</small>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;