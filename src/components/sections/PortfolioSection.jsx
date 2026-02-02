import { useState, useMemo, useEffect, useCallback } from 'react';
import PortfolioCard from '../ui/PortfolioCard';
import { portfolioItems } from '../../constants/portfolioItems';
import { trackProjectClick } from '../../utils/tracking';
import PreviewModal from '../ui/PreviewModal';
import FilterProjects from './FilterProjects'

const PortfolioSection = ({ onOpenCodeModal }) => {
	const [activeFilter, setActiveFilter] = useState('all');
	const [isGrid, setIsGrid] = useState(true);

	const [previewModal, setPreviewModal] = useState({
		isOpen: false,
		item: null
	});

	const handleOpenPreviewModal = useCallback((item) => {
		setPreviewModal({
			isOpen: true,
			item: item
		});
	}, []);

	const handleClosePreviewModal = useCallback(() => {
		setPreviewModal({
			isOpen: false,
			item: null
		});
	}, []);

	const filterCategories = useMemo(() => [
		{
			id: 'all',
			label: 'Все проекты',
			icon: '💼',
			gradient: 'from-primary/90 via-secondary/70 to-primary/90',
			pattern: 'cells',
			animation: 'flow'
		},
		{
			id: 'fullstack',
			label: 'Fullstack',
			icon: 'Ⓕ',
			gradient: 'from-accentLight/80 via-accent/60 to-accentLight/80',
			pattern: 'circuit',
			animation: 'pulse',
			desc: 'React + Node.js + БД'
		},
		{
			id: 'react',
			label: 'React',
			icon: 'Ⓡ',
			gradient: 'from-cyan-500/70 via-blue-500/50 to-cyan-500/70',
			pattern: 'waves',
			animation: 'ripple'
		},
		{
			id: 'landing',
			label: 'Визитки',
			icon: 'Ⓑ',
			gradient: 'from-purple-500/70 via-pink-500/50 to-purple-500/70',
			pattern: 'dots',
			animation: 'float'
		},
		{
			id: 'i18n',
			label: 'Мультиязычность',
			icon: 'Ⓘ',
			gradient: 'from-green-500/70 via-teal-500/50 to-green-500/70',
			pattern: 'grid',
			animation: 'slide',
			desc: 'Поддержка нескольких языков'
		},
		{
			id: 'email',
			label: 'Email-письма',
			icon: '✉️', // Замените на нужную иконку
			gradient: 'from-yellow-500/70 via-orange-500/50 to-yellow-500/70',
			pattern: 'lines',
			animation: 'scan',
			desc: 'Адаптивные email-шаблоны'
		},
		{
			id: 'tailwind',
			label: 'Tailwind',
			icon: 'Ⓣ',
			gradient: 'from-cyan-400/70 via-blue-400/50 to-cyan-400/70',
			pattern: 'lines',
			animation: 'scan'
		},
		{
			id: 'bootstrap',
			label: 'Bootstrap',
			icon: 'Ⓑ',
			gradient: 'from-violet-500/70 via-purple-500/50 to-violet-500/70',
			pattern: 'checker',
			animation: 'bounce'
		},
		{
			id: 'sliders',
			label: 'Слайдеры',
			icon: 'Ⓒ',
			gradient: 'from-orange-500/70 via-red-500/50 to-orange-500/70',
			pattern: 'zigzag',
			animation: 'slide-right'
		},
		{
			id: 'd3',
			label: 'D3.js',
			icon: 'Ⓓ',
			gradient: 'from-emerald-500/70 via-green-500/50 to-emerald-500/70',
			pattern: 'graph',
			animation: 'draw',
			desc: 'Визуализация данных'
		},
	], []);

	const projectsWithCategories = useMemo(() => {
		return portfolioItems.map(item => {
			const categories = ['all'];

			if (item.tech.some(t => t.includes('Express') || t.includes('Node') || t.includes('PostgreSQL') || t.includes('SQLite'))) {
				categories.push('fullstack');
			}
			if (item.tech.some(t => t.includes('React'))) {
				categories.push('react');
			}
			if (item.tech.some(t => t.includes('Tailwind'))) {
				categories.push('tailwind');
			}
			if (item.tech.some(t => t.includes('Bootstrap'))) {
				categories.push('bootstrap');
			}
			if (item.title.includes('слайдер') || item.title.includes('Карусель') || item.tech.some(t => t.includes('Swiper') || t.includes('Embla'))) {
				categories.push('sliders');
			}
			if (item.tech.some(t => t.includes('d3'))) {
				categories.push('d3');
			}
			if (item.title.includes('визитка') || item.description.includes('визитка') ||
				item.description.includes('сайт-визитка') || item.title.includes('Сайт')) {
				categories.push('landing');
			}
			if (item.tech.some(t => t.includes('i18n') || item.description.includes('язык') ||
				item.description.includes('мультиязыч'))) {
				categories.push('i18n');
			}
			// Добавляем категорию email-писем
			if (item.title.includes('email') || item.title.includes('Email') ||
				item.title.includes('письм') || item.description.includes('email') ||
				item.tech.some(t => t.includes('MJML') || t.includes('email') || t.includes('шаблон'))) {
				categories.push('email');
			}

			return { ...item, categories: [...new Set(categories)] };
		});
	}, []);

	const filteredItems = useMemo(() => {
		if (activeFilter === 'all') {
			return projectsWithCategories;
		}

		return projectsWithCategories.filter(item =>
			item.categories?.includes(activeFilter)
		);
	}, [activeFilter, projectsWithCategories]);

	// Обновляем счетчики в фильтрах
	const updatedFilterCategories = useMemo(() => {
		return filterCategories.map(category => {
			const count = category.id === 'all'
				? projectsWithCategories.length
				: projectsWithCategories.filter(item =>
					item.categories?.includes(category.id)
				).length;

			return { ...category, count };
		});
	}, [filterCategories, projectsWithCategories]);

	const StatsCounter = ({ value, label }) => {
		const [displayValue, setDisplayValue] = useState(0);

		useEffect(() => {
			const timer = setTimeout(() => {
				const increment = value / 20;
				let current = 0;
				const interval = setInterval(() => {
					current += increment;
					if (current >= value) {
						setDisplayValue(value);
						clearInterval(interval);
					} else {
						setDisplayValue(Math.floor(current));
					}
				}, 50);

				return () => clearInterval(interval);
			}, 300);

			return () => clearTimeout(timer);
		}, [value]);

		return (
			<div className="stat bg-gradient-to-br from-gray-900/70 to-dark/90 p-6 rounded-xl text-center border border-primary/15 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_10px_25px_rgba(102,126,234,0.2)]">
				<div className="stat-number block text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
					{displayValue}+
				</div>
				<div className="stat-label text-gray-300 text-sm font-medium">{label}</div>
			</div>
		);
	};

	return (
		<section id="portfolio" className="portfolio-section mt-20 pt-32 pb-16 md:py-20 animate-fade-in">
			<div className="container">
				<div className="text-center mb-12">
					<h2 className="section-title">Проекты</h2>
					<p>
						Разработка с использованием современных подходов, библиотек и фреймворков
					</p>
				</div>

				{/* Используем новый компонент фильтра */}
				<FilterProjects
					categories={updatedFilterCategories}
					activeFilter={activeFilter}
					onFilterChange={setActiveFilter}
					variant="compact" // Можно менять: 'organic', 'compact', 'grid', 'segmented', 'scroll'
					size="medium"     // Можно менять: 'small', 'medium', 'large'
					showTitle={true}
					showActiveIndicator={true}
				/>

				{filteredItems.length > 0 ? (
					<>
						<div className={`portfolio-grid gap-6 ${isGrid
							? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
							: 'flex flex-col gap-6'
							}`}>
							{filteredItems.map((item) => (
								<PortfolioCard
									key={item.id}
									item={item}
									onOpenCodeModal={onOpenCodeModal}
									onTrackClick={() => trackProjectClick(item.title)}
									isGrid={isGrid}
									onOpenPreviewModal={handleOpenPreviewModal}
								/>
							))}
						</div>
						<PreviewModal
							isOpen={previewModal.isOpen}
							onClose={handleClosePreviewModal}
							item={previewModal.item}
							onOpenCodeModal={onOpenCodeModal}
						/>
					</>
				) : (
					<div className="empty-state text-center py-16 animate-fade-in">
						<div className="text-gray-600 text-6xl mb-6 animate-float">🔍</div>
						<h3 className="text-2xl font-bold text-light mb-4">
							Проекты не найдены
						</h3>
						<p className="text-gray-400 max-w-md mx-auto mb-8">
							Попробуйте выбрать другую категорию или просмотреть все проекты
						</p>
						<button
							onClick={() => setActiveFilter('all')}
							className="cta-button primary px-8 py-3"
						>
							Показать все проекты
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default PortfolioSection;