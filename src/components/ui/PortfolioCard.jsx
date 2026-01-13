import { trackEvent } from '../../utils/tracking';

const PortfolioCard = ({ item, index, onOpenCodeModal, onTrackClick }) => {
  return (
    <div 
      key={item.id} 
      className="portfolio-card bg-gradient-to-br from-gray-900/70 to-dark/90 rounded-2xl p-8 transition-all duration-500 border border-primary/15 relative overflow-hidden h-full flex flex-col hover:-translate-y-4 hover:border-primary/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)]" 
      onClick={onTrackClick}
    >
      <div className="card-icon text-4xl text-primary mb-6 transition-transform duration-300">{item.icon}</div>
      <h3 className="text-xl font-bold text-light mb-4">{item.title}</h3>
      <p className="text-gray-300 leading-relaxed mb-6 flex-grow">{item.description}</p>
      <div className="tech-tags flex flex-wrap gap-2 mb-8">
        {item.tech.map((tech, idx) => (
          <span key={idx} className="tech-tag bg-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-primary/30 transition-all duration-300 hover:bg-primary/25 hover:-translate-y-0.5">{tech}</span>
        ))}
      </div>
      <div className="card-buttons flex gap-4 mt-auto">
													{/* <a href={item.link}  onClick={() => onOpenCodeModal(index)} className="card-link">
										Код  */}
										{/* <FiExternalLink /> */}
									{/* </a> */}
        <a
          href={item.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="card-demo flex-1 text-center px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-white border-none cursor-pointer hover:bg-gradient-to-r hover:from-accentLight hover:to-accent hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(79,172,254,0.3)]"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            trackEvent('project_demo_click', 'portfolio', item.title);
            window.open(item.demo, '_blank', 'noopener,noreferrer');
          }}
        >
          Перейти →
        </a>
      </div>
    </div>
  );
};

export default PortfolioCard;