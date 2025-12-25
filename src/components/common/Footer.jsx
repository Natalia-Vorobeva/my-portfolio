import React from 'react';
import { FiSend } from 'react-icons/fi';

const Footer = ({ trackEvent, toggleAnalytics }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer py-8 md:py-12 bg-dark/90 border-t border-primary/10 animate-fade-in">
      <div className="container px-4 sm:px-6">
        <div className="footer-content">
          {/* Логотип */}
          <div className="footer-logo">
            <h3>Наталья Воробьева</h3>
            <p>Frontend Developer</p>
          </div>

          {/* Ссылки */}
          <div className="footer-links">
            <FooterLink href="#home" label="Главная" trackEvent={trackEvent} />
            <FooterLink href="#portfolio" label="Портфолио" trackEvent={trackEvent} />
            <FooterLink href="#about" label="Обо мне" trackEvent={trackEvent} />
            <FooterLink href="#contact" label="Контакты" trackEvent={trackEvent} />
          </div>

          {/* Социальные сети */}
          <div className="footer-social">
            <SocialLink
              href="https://t.me/vorobjevaa"
              icon={<FiSend />}
              label="Telegram"
              trackEvent={trackEvent}
            />
          </div>
        </div>

        <div className="footer-bottom">
          <p>© Наталья Воробьева. Все права защищены {currentYear}</p>
          <p className="footer-note">Сайт-портфолио фронтенд-разработчика</p>
          <p className="analytics-info">
            <small>Используется Google Analytics для сбора анонимной статистики посещений</small>
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, label, trackEvent }) => (
  <a
    href={href}
    className="footer-link"
    onClick={() => trackEvent('footer_navigation', 'engagement', label)}
  >
    {label}
  </a>
);

const SocialLink = ({ href, icon, label, trackEvent }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
    onClick={() => trackEvent('social_click', 'engagement', `${label} Profile`)}
    aria-label={label}
  >
    {icon}
  </a>
);

export default Footer;