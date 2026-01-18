import React, { useState, useEffect } from 'react';
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa';

const HeroSection = ({ avatar }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showCodeWindow, setShowCodeWindow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCodeWindow(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    console.error('Failed to load avatar image');
    setImageLoaded(false);
  };

  const codeContent = React.useMemo(() => {
    return `// Мой стек технологий
const techStack = {
  frontend: ["React", "Node JS", "JavaScript",
			"Jquery"],
  styling: ["CSS3", "SCSS", "Tailwind",
			 "Bootstrap"],
  tools: ["Git", "Vite", "Figma"],
  backend: ["Express", "MongoDB", "SQLite"],
  content: ["Копирайтинг", "UX/UI дизайн"],
  deployment: ["Vercel", "Render", "GitHub 
			Pages"]
	
}

// Доступность
function startProject(requirements) {
  return develop({
    deadline: "в срок",
    quality: "высокая",
    communication: "прозрачная",
    support: "техническая поддержка"
  })
}

// Готова к сотрудничеству!
const isAvailable = true;`;
  }, []);

  return (
    <section id="home" className="hero pt-[70px]">
      <div className="container">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
          <div className="hero-left">
            <div className="avatar-section flex items-center gap-8 mb-12 flex-col sm:flex-row sm:text-left text-center">
              <div className="avatar-large relative shrink-0">
                <img
                  src={avatar}
                  alt="Наталья Воробьева"
                  className={`avatar-img w-48 h-48 rounded-full object-cover border-4 border-primary shadow-[0_15px_40px_rgba(102,126,234,0.3)] transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  decoding="async"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{
                    contentVisibility: 'auto',
                    contain: 'layout style paint'
                  }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 w-48 h-48 rounded-full bg-gray-700 animate-pulse border-4 border-primary/30"></div>
                )}
                <div className="avatar-status absolute bottom-4 right-4 w-5 h-5 rounded-full bg-success border-4 border-dark"></div>
              </div>
              <div className="name-display">
                <h1 className="main-name text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-light to-primary bg-clip-text text-transparent leading-tight">
                  Наталья Воробьева
                </h1>
                <p className="main-title text-lg sm:text-xl text-gray-300 mb-6 font-medium">
                  Frontend Developer
                  <span className="mx-2 opacity-70">•</span>
                  <span className="main-subtitle text-sm">Санкт-Петербург</span>
                </p>               
              </div>
            </div>

            <div className="hero-text">
              <h2 className="text-3xl sm:text-4xl leading-tight mb-6 bg-gradient-to-r from-light to-primary bg-clip-text text-transparent">
                Создаю современные веб-приложения
              </h2>
              <p className="text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed">
                Специализируюсь на разработке пользовательских интерфейсов с использованием React, JavaScript и современных подходов к фронтенд-разработке.
                Каждый проект - это решение конкретной бизнес-задачи.
              </p>
              <div className="tech-stack flex gap-4 mb-10 flex-wrap">
                <span className="tech-badge bg-primary/10 px-4 py-2 rounded-full flex items-center gap-3 border border-primary/30 transition-all duration-300 font-medium hover:bg-primary/20">
                  <FaReact className="text-primary text-lg" /> React
                </span>
                <span className="tech-badge bg-primary/10 px-4 py-2 rounded-full flex items-center gap-3 border border-primary/30 transition-all duration-300 font-medium hover:bg-primary/20">
                  <FaNodeJs className="text-primary text-lg" /> Node.js
                </span>
                <span className="tech-badge bg-primary/10 px-4 py-2 rounded-full flex items-center gap-3 border border-primary/30 transition-all duration-300 font-medium hover:bg-primary/20">
                  <FaDatabase className="text-primary text-lg" /> Databases
                </span>
              </div>
            </div>
          </div>

          {showCodeWindow && (
            <div className="hero-image">
              <div className="code-window bg-gray-700 rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.4)] border border-primary/20 transform">
                <div className="window-header bg-gray-800 px-6 py-3 flex items-center gap-3 border-b border-primary/10">
                  <span className="dot w-3.5 h-3.5 rounded-full bg-red-500"></span>
                  <span className="dot w-3.5 h-3.5 rounded-full bg-yellow-500"></span>
                  <span className="dot w-3.5 h-3.5 rounded-full bg-green-500"></span>
                  <span className="window-title ml-auto text-sm text-gray-400 font-mono">
                    portfolio.js
                  </span>
                </div>
                <div className="code-content p-3 sm:p-6 md:p-8 overflow-x-auto">
                  <pre 
                    className="text-teal-300 font-mono text-[11px] sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap max-w-full break-words"
                    style={{
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {codeContent}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);