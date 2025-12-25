import React from 'react';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';
import foto from '../../assets/images/Fotoram.io.jpg';

const Hero = ({ trackEvent }) => {
  const handleButtonClick = (buttonName) => {
    trackEvent('button_click', 'engagement', buttonName);
  };

  return (
    <section id="home" className="hero py-20 animate-fade-in">
      <div className="container">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
          <div className="hero-left">
            <AvatarSection />
            <HeroText onButtonClick={handleButtonClick} />
          </div>
          <div className="hero-image">
            <CodeWindow />
          </div>
        </div>
      </div>
    </section>
  );
};

const AvatarSection = () => (
  <div className="avatar-section flex items-center gap-8 mb-12 flex-col sm:flex-row sm:text-left text-center">
    <div className="avatar-large relative shrink-0">
      <img
        src={foto}
        alt="Наталья Воробьева"
        className="avatar-img"
      />
      <div className="avatar-status"></div>
    </div>
    <div className="name-display">
      <h1 className="main-name">Наталья Воробьева</h1>
      <p className="main-title">
        Frontend Developer
        <span className="mx-2 opacity-70">•</span>
        <span className="main-subtitle">Санкт-Петербург</span>
      </p>
      <TechTags />
    </div>
  </div>
);

const TechTags = () => (
  <div className="title-tags flex gap-3 flex-wrap">
    {['React', 'JavaScript', 'SCSS', 'Node.js', 'Tailwindcss'].map((tag) => (
      <span key={tag} className="tag">{tag}</span>
    ))}
  </div>
);

const HeroText = ({ onButtonClick }) => (
  <div className="hero-text">
    <h2 className="text-3xl sm:text-4xl leading-tight mb-6">Создаю современные веб-приложения</h2>
    <p className="text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed">
      Специализируюсь на разработке пользовательских интерфейсов с использованием React, JavaScript и современных подходов к фронтенд-разработке.
      Каждый проект - это решение конкретной бизнес-задачи.
    </p>
    <TechStack />
    <div className="hero-buttons flex gap-6 flex-wrap">
      <a
        href="#contact"
        className="cta-button primary"
        onClick={() => onButtonClick('hero_contact_button')}
      >
        Обсудить проект
      </a>
      <a
        href="https://visit-card-vorobeva.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-button secondary"
        onClick={() => onButtonClick('hero_visit_card_button')}
      >
        Больше инфо
      </a>
    </div>
  </div>
);

const TechStack = () => (
  <div className="tech-stack flex gap-4 mb-10 flex-wrap">
    <TechBadge icon={<FaReact />} text="React" />
    <TechBadge icon={<FaNodeJs />} text="Node.js" />
    <TechBadge icon={<FaDatabase />} text="Databases" />
  </div>
);

const TechBadge = ({ icon, text }) => (
  <span className="tech-badge">
    {icon} {text}
  </span>
);

const CodeWindow = () => (
  <div className="code-window">
    <div className="window-header">
      <span className="dot bg-red-500"></span>
      <span className="dot bg-yellow-500"></span>
      <span className="dot bg-green-500"></span>
      <span className="window-title">portfolio.js</span>
    </div>
    <div className="code-content">
      <pre>
        {`// Мой стек технологий
const techStack = {
  frontend: ["React", "Node JS", "JavaScript"],
  styling: ["CSS3", "SCSS", "Tailwind"],
  tools: ["Git", "Vite", "Figma"],
  backend: ["Express", "MongoDB", "SQLite"]
}

// Доступен для вашего проекта
function startProject(requirements) {
  return develop({
    deadline: "в срок",
    quality: "высокая",
    communication: "прозрачная"
  })
}

// Готова к сотрудничеству!
const isAvailable = true;`}
      </pre>
    </div>
  </div>
);

export default Hero;