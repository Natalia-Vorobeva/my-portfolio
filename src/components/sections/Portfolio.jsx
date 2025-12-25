import React from 'react';
import PortfolioCard from '../../portfolio/PortfolioCard.jsx';
import { portfolioItems } from '../../constants/portfolioItems.jsx';

const Portfolio = ({ openCodeModal, trackEvent }) => {
  const handleProjectClick = (projectName) => {
    trackEvent('project_click', 'portfolio', projectName);
  };

  return (
    <section id="portfolio" className="portfolio py-20 animate-fade-in">
      <div className="container">
        <h2 className="section-title">Готовые решения</h2>
        <p className="section-subtitle">
          Примеры реализованных блоков, компонентов и элементов интерфейса для различных проектов
        </p>

        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {portfolioItems.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onClick={() => handleProjectClick(item.title)}
              openCodeModal={openCodeModal}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;