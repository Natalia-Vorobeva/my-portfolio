import { useState, useMemo, useCallback, memo } from 'react';
import { FaCode, FaExternalLinkAlt, FaGithub, FaGlobe, FaExpand } from 'react-icons/fa';
import { portfolioItems } from '../../constants/portfolioItems';

const PortfolioCard = ({ item, onOpenCodeModal, onTrackClick, onOpenPreviewModal, isGrid = true }) => {
	const [isHovered, setIsHovered] = useState(false);
	const [hasImageError, setHasImageError] = useState(false);
	const [isPreviewHovered, setIsPreviewHovered] = useState(false);

	const handleDemoClick = useCallback((e) => {
		e.stopPropagation();
		onTrackClick();
		window.open(item.demo, '_blank', 'noopener,noreferrer');
	}, [item.demo, onTrackClick]);

	const handleCodeClick = useCallback((e) => {
		e.stopPropagation();
		const index = portfolioItems.findIndex(portfolioItem => portfolioItem.id === item.id);
		if (index !== -1) {
			onOpenCodeModal(index);
		} else {
			onOpenCodeModal(0);
		}
	}, [item.id, onOpenCodeModal]);

	const handlePreviewClick = useCallback((e) => {
		e.stopPropagation();
		if (onOpenPreviewModal) {
			onOpenPreviewModal(item);
		}
	}, [item, onOpenPreviewModal]);

	const hasImage = useMemo(() => item.image && !hasImageError, [item.image, hasImageError]);

	const hasCode = useMemo(() => {
		return !!item.link && (
			Array.isArray(item.link) ||
			(typeof item.link === 'object' && item.link !== null)
		);
	}, [item.link]);

	const handleCardClick = useCallback((e) => {
		e.stopPropagation();
		if (onOpenPreviewModal) {
			onOpenPreviewModal();
		}
	}, [onOpenPreviewModal]);

	return (
		<div 
  className={`portfolio-card group relative overflow-hidden transition-all duration-300 ${
    isGrid 
      ? 'bg-gradient-to-br from-gray-900/80 to-dark/90 rounded-2xl border border-primary/15 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5' 
      : 'bg-gradient-to-r from-gray-900/80 to-dark/80 rounded-xl border border-primary/10 hover:border-primary/30'
  }`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
  onClick={(e) => {
    if (onOpenPreviewModal) {
      onOpenPreviewModal();
    }
  }}
  style={{
    transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
    animation: 'fadeIn 0.6s ease-out',
    cursor: 'pointer'
  }}
>
			<div className="flex h-40">
				<div className="w-2/5 relative overflow-hidden">
					{hasImage ? (
						<div
							className="relative w-full h-full group/preview cursor-pointer"
							onClick={handlePreviewClick}
							onMouseEnter={() => setIsPreviewHovered(true)}
							onMouseLeave={() => setIsPreviewHovered(false)}
						>
							<div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
								<img
									src={item.image}
									alt={`Скриншот проекта ${item.title}`}
									className="max-w-full max-h-full object-contain p-1"
									onError={() => setHasImageError(true)}
									loading="lazy"
									decoding="async"
								/>
							</div>
							<div className="absolute inset-0 bg-black/60 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
								<div className="text-white text-xs text-center px-2 transform group-hover/preview:scale-100 scale-90 transition-transform duration-300">
									<span className="block font-medium mb-0.5">Посмотреть детали</span>
									<span className="text-white/80 text-[10px]">(Кликните по изображению)</span>
								</div>
							</div>
						</div>
					) : (
						<div
							className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex flex-col items-center justify-center cursor-pointer"
							onClick={handlePreviewClick}
							onMouseEnter={() => setIsPreviewHovered(true)}
							onMouseLeave={() => setIsPreviewHovered(false)}
						>
							<div className="text-3xl text-primary/50 mb-2">
								{item.icon}
							</div>
							{isPreviewHovered && (
								<div className="text-xs text-primary/70 text-center px-2">
									Кликните для просмотра деталей
								</div>
							)}
						</div>
					)}
				</div>
				
				<div className="w-3/5 p-4 flex flex-col">
					<div className="flex items-start justify-between mb-2">
						<h3
							className="portfolio-title font-bold text-base text-light group-hover:text-primary transition-colors overflow-hidden"
							title={item.title}
						>
							<span className="block truncate">
								{item.title}
							</span>
						</h3>
					</div>
					
					<div className="flex-grow mb-3 min-h-0">
						<p
							className="text-sm text-gray-300 line-clamp-2 overflow-hidden"
							style={{
								display: '-webkit-box',
								WebkitLineClamp: 2,
								WebkitBoxOrient: 'vertical',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								maxHeight: '2.8em',
								lineHeight: '1.4em'
							}}
							title={item.description}
						>
							{item.description}
						</p>
					</div>
					<div className="flex gap-2 mt-auto">
						<button
							onClick={handleDemoClick}
							className="demo-btn flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-xs font-medium"
							title="Открыть демо-версию проекта"
						>
							<FaExternalLinkAlt className="text-xs" />
							<span>Демо</span>
						</button>

						<button
							onClick={handleCodeClick}
							className={`code-btn flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 text-xs font-medium ${hasCode
								? 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-primary hover:text-primary hover:bg-gray-800/80'
								: 'bg-gray-900/50 text-gray-500 border border-gray-800 cursor-not-allowed'
								}`}
							disabled={!hasCode}
							title={hasCode ? 'Показать исходный код' : 'Исходный код временно недоступен'}
						>
							<FaCode className="text-xs" />
							<span>Код</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default memo(PortfolioCard);