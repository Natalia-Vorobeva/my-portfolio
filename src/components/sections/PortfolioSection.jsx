import PortfolioCard from '../ui/PortfolioCard';
import { portfolioItems } from '../../constants/portfolioItems';
import { trackProjectClick } from '../../utils/tracking';

const PortfolioSection = ({ onOpenCodeModal }) => {
  return (
    <section id="portfolio" className="portfolio py-20 animate-fade-in">
      <div className="container">
        <h2 className="section-title">Готовые решения</h2>
        <p className="section-subtitle">Примеры реализованных блоков, компонентов и элементов интерфейса для различных проектов</p>

        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {portfolioItems.map((item, index) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={index}
              onOpenCodeModal={onOpenCodeModal}
              onTrackClick={() => trackProjectClick(item.title)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;