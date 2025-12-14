import React, { lazy, Suspense, useState, useEffect } from 'react';

// Ленивая загрузка фонов
const GradientWaves = lazy(() => import('./backgrounds/GradientWaves'));
const NeonWaves = lazy(() => import('./backgrounds/NeonWaves'));
const SpaceOcean = lazy(() => import('./backgrounds/SpaceOcean'));
const AuroraWaves = lazy(() => import('./backgrounds/AuroraWaves'));

// Компоненты предзагрузки
const backgroundComponents = {
  'gradient-waves': GradientWaves,
  'neon-waves': NeonWaves,
  'space-ocean': SpaceOcean,
  'aurora-waves': AuroraWaves,
};

const BackgroundSwitcher = ({ backgroundType }) => {
  const [preloadedBackgrounds, setPreloadedBackgrounds] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Предзагрузка следующего фона при изменении
  useEffect(() => {
    // Предзагружаем все фоны при первом рендере
    const preloadAll = async () => {
      const imports = Object.entries(backgroundComponents).map(async ([key, Component]) => {
        try {
          await Component._payload._result; // Предзагрузка компонента
          setPreloadedBackgrounds(prev => ({ ...prev, [key]: true }));
        } catch (error) {
          console.error(`Failed to preload ${key}:`, error);
        }
      });
      
      Promise.all(imports).then(() => setIsLoaded(true));
    };

    preloadAll();
  }, []);

  // Получаем текущий компонент фона
  const BackgroundComponent = backgroundComponents[backgroundType];

  return (
    <div className="background-container">
      {/* Фоновый компонент */}
      <Suspense fallback={
        <div className="background-loading">
          <div className="loading-spinner"></div>
          <span>Загрузка фона...</span>
        </div>
      }>
        {BackgroundComponent && <BackgroundComponent />}
      </Suspense>
      
      {/* Простой фолбэк фон пока грузится основной */}
      {!isLoaded && (
        <div className="background-fallback">
          <div className="fallback-gradient"></div>
        </div>
      )}
    </div>
  );
};

export default BackgroundSwitcher;