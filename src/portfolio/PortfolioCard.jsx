import React from 'react';

const PortfolioCard = ({ item, onClick, openCodeModal }) => {
  const handleDemoClick = (e) => {
    e.stopPropagation();
    window.open(item.demo, '_blank', 'noopener,noreferrer');
  };

  return (
    <div 
      className="portfolio-card" 
      onClick={onClick}
    >
      <div className="card-icon">{item.icon}</div>
      <h3 className="text-xl font-bold text-light mb-4">{item.title}</h3>
      <p className="text-gray-300 leading-relaxed mb-6 flex-grow">{item.description}</p>
      
      <div className="tech-tags flex flex-wrap gap-2 mb-8">
        {item.tech.map((tech, idx) => (
          <span key={idx} className="tech-tag">{tech}</span>
        ))}
      </div>
      
      <div className="card-buttons flex gap-4 mt-auto">
        <button
          className="card-demo"
          onClick={handleDemoClick}
        >
          Перейти →
        </button>
        
        {item.code && (
          <button
            className="card-code"
            onClick={(e) => {
              e.stopPropagation();
              openCodeModal(item);
            }}
          >
            Код
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;