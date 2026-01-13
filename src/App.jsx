import React, { useState, useEffect, Suspense } from 'react';
import AuroraWaves from './components/backgrounds/AuroraWaves';
import GradientWaves from './components/backgrounds/GradientWaves';
import NeonWaves from './components/backgrounds/NeonWaves';
import SpaceOcean from './components/backgrounds/SpaceOcean';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import PortfolioSection from './components/sections/PortfolioSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import TimelineResult from './components/sections/TimelineResult';
import NeonMarquee from './components/shared/NeonMarquee';
import BackgroundSwitcher from './components/layout/BackgroundSwitcher';
import CodeModal from './components/ui/CodeModal';
import AnalyticsModal from './components/ui/AnalyticsModal';
import { useCodeModal } from './hooks/useCodeModal';
import { useAnalytics } from './hooks/useAnalytics';
import { trackEvent } from './utils/tracking';
import { portfolioItems } from './constants/portfolioItems';
import foto from './assets/images/Fotoram.io.jpg';

const BackgroundSwitcherLazy = React.lazy(() => import('./components/layout/BackgroundSwitcher'));

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBackgroundReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    trackEvent('page_view', 'engagement', 'Portfolio Page View');
    
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
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

  const switchBackground = () => {
    setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
  };

  const handleOpenCodeModal = (index) => {
    openCodeModal(index, portfolioItems[index].code);
  };

  return (
    <div className={`app ${isCodeModalOpen ? "no-scroll" : ""} relative min-h-screen`}>
      {backgrounds[backgroundIndex]}

      <Suspense fallback={<div className="background-switcher-loading"></div>}>
        <BackgroundSwitcherLazy
          onSwitch={switchBackground}
          currentBackground={backgroundIndex}
        />
      </Suspense>

      <div className="content-wrapper relative z-10">
        <Header avatar={foto} activeSection={activeSection} />
        <NeonMarquee />
        <HeroSection avatar={foto} />
        {/* <TimelineResult /> */}
        <PortfolioSection onOpenCodeModal={handleOpenCodeModal} />
        <AboutSection />
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