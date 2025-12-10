import React, { useState, useRef, useEffect } from 'react';
import { FiHome } from 'react-icons/fi';
import Navbar from './Navbar';
import MobileMenu from './MobileMenu';
import { trackEvent } from '../../utils/tracking';

const Header = ({ avatar, activeSection }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const navItems = [
		{ href: '#home', label: 'Главная' },
		{ href: '#portfolio', label: 'Портфолио' },
		{ href: '#contact', label: 'Контакты' },
	];

	const handleAvatarClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		trackEvent('navigation', 'engagement', 'Scroll to Top');
	};

	return (
		<header className="header sticky top-0 py-4 bg-dark/80 backdrop-blur-xl border-b border-primary/10 z-[1000] animate-fade-in">
			<div className="container flex justify-between items-center px-4 sm:px-6">
				<div className="header-left flex items-center gap-3">
					<div className="header-avatar">
						<button
							onClick={handleAvatarClick}
							className="avatar-button border-none bg-transparent p-0 cursor-pointer"
							aria-label="Вернуться наверх"
						>
							<img
								src={avatar}
								alt="Наталья Воробьева"
								className="avatar-small w-12 h-12 rounded-full object-cover border-2 border-primary hover:scale-105 transition-transform duration-300"
							/>
						</button>
					</div>
					<div className="header-name">
						<h1 className="name-title text-xl font-bold text-light">Наталья Воробьева</h1>
						<p className="name-subtitle text-sm text-gray-400">Frontend Developer</p>
					</div>
				</div>

				<Navbar items={navItems} activeSection={activeSection} />

				<div className="md:hidden">
					<button
						className="text-light hover:text-primary transition-colors duration-300"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
					>
						{isMenuOpen ? (
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</button>
				</div>

				<MobileMenu
					isOpen={isMenuOpen}
					items={navItems}
					onClose={() => setIsMenuOpen(false)}
					activeSection={activeSection}
				/>
			</div>
		</header>
	);
};

export default Header;