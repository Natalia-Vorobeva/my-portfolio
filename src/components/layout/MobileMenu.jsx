import React from 'react';
import { trackEvent } from '../../utils/tracking';

const MobileMenu = ({ isOpen, items, onClose, activeSection }) => {
	const handleClick = (e, href) => {
		e.preventDefault();
		const targetId = href.substring(1);
		const element = document.getElementById(targetId);
		if (element) {

			const header = document.querySelector('header');
			const marquee = document.querySelector('.marquee-container');
			const headerHeight = header ? header.offsetHeight : 80;
			const marqueeHeight = marquee ? marquee.offsetHeight : 0;
			const totalOffset = headerHeight + marqueeHeight;

			const elementPosition = element.offsetTop - totalOffset;
			window.scrollTo({
				top: elementPosition,
				behavior: 'smooth'
			});
		}
		onClose();
		trackEvent('navigation', 'engagement', `${href.substring(1)} Section`);
	};

	return (
		<div className={`md:hidden fixed top-0 left-0 right-0 h-screen bg-dark/95 backdrop-blur-xl border-b border-primary/10 transition-all duration-300 z-[1000] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ paddingTop: '80px' }}>
			<div className="container px-4 py-4 h-full overflow-y-auto">
				<div className="flex flex-col gap-4">
					{items.map((item) => {
						const Icon = item.icon;
						const isActive = activeSection === item.href.substring(1);

						return (
							<button
								key={item.href}
								onClick={(e) => handleClick(e, item.href)}
								className={`mobile-nav-item flex items-center justify-center space-x-2 py-3 px-4 text-center transition-all duration-300 rounded-lg ${isActive
										? 'text-primary bg-primary/10 border border-primary/30'
										: 'text-light hover:text-primary hover:bg-dark/50'
									}`}
							>
								{Icon && <Icon className="w-5 h-5" />}
								<span className="font-medium text-lg">{item.label}</span>
							</button>
						);
					})}
				</div>

				<div className="mt-8 pt-8 border-t border-gray-800/50 text-center">
					<button
						onClick={onClose}
						className="text-gray-400 hover:text-light transition-colors"
					>
						Закрыть меню
					</button>
				</div>
			</div>
		</div>
	);
};

export default MobileMenu;