import { useCallback, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiZoomIn, FiX } from 'react-icons/fi';

const ImageGallery = ({ images, initialIndex = 0, onIndexChange }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  const handlePrevImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const handleNextImage = useCallback((e) => {
    e?.stopPropagation();
    setCurrentIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  // Навигация клавишами
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };

    if (isLightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isLightboxOpen, handlePrevImage, handleNextImage]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const hasMultipleImages = images.length > 1;

  return (
    <div className="h-full flex flex-col">
      {/* Основное изображение - занимает все доступное пространство */}
      <div className="flex-1 min-h-0 relative bg-gradient-to-br from-gray-900/50 to-dark/50 rounded-xl border border-gray-800/50 overflow-hidden shadow-lg group">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
          {currentImage ? (
            <>
              <img
                src={currentImage}
                alt={`Скриншот проекта - изображение ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() => setIsLightboxOpen(true)}
                loading="lazy"
              />
              
              {/* Кнопка увеличения */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50 z-10"
                title="Увеличить изображение"
                aria-label="Увеличить изображение"
              >
                <FiZoomIn className="text-xl" />
              </button>

              {/* Навигационные стрелки для нескольких изображений */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50 z-10"
                    title="Предыдущее изображение"
                    aria-label="Предыдущее изображение"
                  >
                    <FiChevronLeft className="text-xl" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary/50 z-10"
                    title="Следующее изображение"
                    aria-label="Следующее изображение"
                  >
                    <FiChevronRight className="text-xl" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="text-8xl text-primary/20 mb-6">💻</div>
              <p className="text-gray-500 text-center max-w-md">
                Изображение недоступно
              </p>
            </div>
          )}
        </div>

        {/* Счетчик изображений вверху */}
        {hasMultipleImages && (
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-xs text-white z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Превью миниатюр - фиксированная высота внизу */}
      {hasMultipleImages && (
        <div className="mt-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <FiZoomIn className="text-gray-500" />
              Выберите миниатюру:
            </p>
            <div className="text-xs text-gray-500 flex items-center gap-2">
              <span className="flex gap-1">
                {images.map((_, idx) => (
                  <span
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full ${idx === currentIndex ? 'bg-primary' : 'bg-gray-600'}`}
                  />
                ))}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto custom-scrollbar-horizontal pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${idx === currentIndex 
                  ? 'border-primary shadow-lg shadow-primary/20 scale-[1.02]' 
                  : 'border-gray-700 hover:border-gray-500'
                }`}
                title={`Показать изображение ${idx + 1}`}
                aria-label={`Показать изображение ${idx + 1}`}
              >
                <div className="relative w-full h-full">
                  <img
                    src={img}
                    alt={`Миниатюра ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 transition-all duration-200 ${idx === currentIndex 
                    ? 'bg-primary/20' 
                    : 'bg-black/30 hover:bg-black/10'
                  }`}></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Лайтбокс */}
      {isLightboxOpen && currentImage && (
        <div 
          className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-3 text-white hover:text-primary transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full z-10"
            aria-label="Закрыть лайтбокс"
          >
            <FiX className="text-3xl" />
          </button>
          
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={currentImage}
              alt="Увеличенное изображение"
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {hasMultipleImages && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 z-10"
                  aria-label="Предыдущее изображение"
                >
                  <FiChevronLeft className="text-2xl" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 z-10"
                  aria-label="Следующее изображение"
                >
                  <FiChevronRight className="text-2xl" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm z-10">
                  {currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;