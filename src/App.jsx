import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import AuroraWaves from './components/backgrounds/AuroraWaves';
import GradientWaves from './components/backgrounds/GradientWaves';
import NeonWaves from './components/backgrounds/NeonWaves';
import SpaceOcean from './components/backgrounds/SpaceOcean';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import ContactSection from './components/sections/ContactSection';
import TimelineResult from './components/sections/TimelineResult';
import CodeModal from './components/ui/CodeModal';
import AnalyticsModal from './components/ui/AnalyticsModal';
import { useCodeModal } from './hooks/useCodeModal';
import { useAnalytics } from './hooks/useAnalytics';
import { trackEvent } from './utils/tracking';
import { portfolioItems } from './constants/portfolioItems';
import photo from './assets/images/Fotoram.io.jpg';

const NeonMarquee = lazy(() => import('./components/shared/NeonMarquee'));
const PortfolioSection = React.lazy(() => import('./components/sections/PortfolioSection'));
const BackgroundSwitcherLazy = React.lazy(() => import('./components/layout/BackgroundSwitcher'));
const AboutSection = React.lazy(() => import('./components/sections/AboutSection'));

const App = () => {
	const backgrounds = [
		<NeonWaves key="neon" />,
		<AuroraWaves key="aurora" />,
		<GradientWaves key="gradient" />,
		<SpaceOcean key="space" />
	];

	const [backgroundIndex, setBackgroundIndex] = useState(0);
	const [isBackgroundReady, setIsBackgroundReady] = useState(false);
	const [activeSection, setActiveSection] = useState('home');

	const {
		isCodeModalOpen,
		currentCodeIndex,
		codeFiles,
		copied,
		openCodeModal,
		closeCodeModal,
		nextCode,
		prevCode,
		handleCopy,
		setCurrentCodeIndex
	} = useCodeModal();

	const { showAnalytics, toggleAnalytics } = useAnalytics();
	const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
	useEffect(() => {
		trackEvent('page_view', 'engagement', 'Portfolio Page View');

		const handleScroll = () => {
			const sections = ['home', 'portfolio', 'contact'];
			const scrollPosition = window.scrollY + 150;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(section);
						break;
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleOpenPreviewModal = useCallback(() => {
		window.scrollTo({
			top: 100,
			behavior: 'smooth'
		});

		setIsPreviewModalOpen(true);
		setActiveSection('portfolio');
	}, []);

	const handleClosePreviewModal = useCallback(() => {
		setIsPreviewModalOpen(false);
	}, []);

	const handleMenuClick = useCallback((section) => {
		if (isPreviewModalOpen) {
			setIsPreviewModalOpen(false);
		}

		setActiveSection(section);

	}, [isPreviewModalOpen]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsBackgroundReady(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	const calculateScrollOffset = () => {
		const header = document.querySelector('header');
		const marquee = document.querySelector('.marquee-container');
		const headerHeight = header ? header.offsetHeight : 80;
		const marqueeHeight = marquee ? marquee.offsetHeight : 0;
		return headerHeight + marqueeHeight;
	};

	const switchBackground = () => {
		setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
	};

	const handleOpenCodeModal = (index) => {
		const item = portfolioItems[index];
		if (item.link && item.link.length > 0) {
			openCodeModal(index, item.link);
		} else {
			openCodeModal(index, [{
				fileName: 'README.md',
				language: 'markdown',
				content: `# Проект "${item.title}"\n\n**Описание:** ${item.description}\n\n**Технологии:** ${item.tech.join(', ')}\n\n**Демо:** ${item.demo}\n\n*Исходный код временно недоступен для публичного просмотра. Свяжитесь со мной для получения доступа.*`
			}]);
		}
	};
	console.log(isPreviewModalOpen, 'isPreviewModalOpen')
	return (
		<div className={`app ${isCodeModalOpen ? "no-scroll" : ""} relative min-h-screen`}>
			{backgrounds[backgroundIndex]}

			<Suspense fallback={<div className="background-switcher-loading"></div>}>
				{isPreviewModalOpen == false && (
					<BackgroundSwitcherLazy
						onSwitch={switchBackground}
						currentBackground={backgroundIndex}
					/>
				)}
			</Suspense>

			<div className="content-wrapper relative z-10">
				<Header
					avatar={photo}
					activeSection={activeSection}
					onMenuClick={handleMenuClick}
				/>
				<Suspense fallback={<div className="h-12 bg-gray-900" />}>
					<NeonMarquee />
				</Suspense>
				<HeroSection avatar={photo} />
				{/* <TimelineResult /> */}
				<Suspense fallback={
					<div className="flex flex-col items-right justify-center py-20">
						<div className="flex space-x-2">
							<div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
							<div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
							<div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
						</div>
					</div>
				}>
					<PortfolioSection
						isPreviewModalOpen={isPreviewModalOpen}
						onPreviewModalChange={setIsPreviewModalOpen}
						onOpenCodeModal={handleOpenCodeModal} />
				</Suspense>
				{/* <AboutSection /> */}
				<ContactSection />
				<Footer onToggleAnalytics={toggleAnalytics} />
				{showAnalytics && (
					<AnalyticsModal onClose={toggleAnalytics} />
				)}

				<CodeModal
					isOpen={isCodeModalOpen}
					onClose={closeCodeModal}
					codeFiles={codeFiles}
					currentCodeIndex={currentCodeIndex}
					onPrev={prevCode}
					onNext={nextCode}
					onCopy={handleCopy}
					onSetCurrentIndex={setCurrentCodeIndex}
					copied={copied}
				/>
			</div>
		</div>
	);
};

export default App;