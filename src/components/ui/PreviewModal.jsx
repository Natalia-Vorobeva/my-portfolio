// eslint-disable react-hooks/exhaustive-deps
import { useState, useEffect, useCallback, useRef } from 'react';
import { FiX, FiExternalLink, FiCode, FiInfo } from 'react-icons/fi';
import { FaGithub, FaReact, FaNodeJs, FaDatabase, FaSass, FaBootstrap, FaPaintBrush } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import ImageGallery from './ImageGallery';

const PreviewModal = ({ isOpen, onClose, item, onOpenCodeModal }) => {
  const modalRef = useRef(null);
  
  // Генерируем массив изображений
  const projectImages = useCallback(() => {
    if (!item) return [];
    
    const images = item?.images || (item?.image ? [item.image] : []);
    
    // Если изображений меньше 2, добавляем дубликаты для демонстрации
    if (images.length < 2 && images.length > 0) {
      const repeatedImages = [...images];
      // Добавляем еще 2 копии первого изображения
      for (let i = repeatedImages.length; i < 3; i++) {
        repeatedImages.push(images[0]);
      }
      return repeatedImages;
    }
    
    return images;
  }, [item]);

  // Проверяем, есть ли исходный код
  const hasCode = useCallback(() => {
    if (!item?.link) return false;
    
    if (typeof item.link === 'string') {
      return item.link.trim().length > 0;
    }
    
    if (Array.isArray(item.link)) {
      return item.link.length > 0;
    }
    
    if (typeof item.link === 'object' && item.link !== null) {
      return Object.keys(item.link).length > 0;
    }
    
    return false;
  }, [item?.link]);

  // Определяем тип ссылки на код
  const getCodeLinkType = useCallback(() => {
    if (!item?.link) return null;
    
    if (typeof item.link === 'string') {
      if (item.link.includes('github.com')) {
        return 'github';
      }
      return 'external';
    }
    
    if (Array.isArray(item.link) || (typeof item.link === 'object' && item.link !== null)) {
      return 'files';
    }
    
    return null;
  }, [item?.link]);

  const handleCodeClick = useCallback(() => {
    const codeType = getCodeLinkType();
    
    if (codeType === 'github' || codeType === 'external') {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else if (codeType === 'files') {
      onClose();
      if (onOpenCodeModal && item?.id) {
        setTimeout(() => {
          const index = parseInt(item.id) - 1;
          onOpenCodeModal(index >= 0 ? index : 0);
        }, 300);
      }
    }
  }, [onClose, onOpenCodeModal, item?.id, item?.link, getCodeLinkType]);

  // Обработка Escape и блокировка скролла
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  const getProjectType = () => {
    if (!item?.tech) return 'Веб-приложение';

    const techLower = item.tech.map(t => t.toLowerCase());
    if (techLower.some(t => t.includes('fullstack') || t.includes('node') || t.includes('express'))) {
      return 'Fullstack';
    }
    if (techLower.some(t => t.includes('react'))) {
      return 'React App';
    }
    if (item.title?.toLowerCase().includes('визитка')) {
      return 'Сайт-визитка';
    }
    if (techLower.some(t => t.includes('landing'))) {
      return 'Лендинг';
    }
    if (techLower.some(t => t.includes('d3') || t.includes('визуализация'))) {
      return 'Визуализация данных';
    }
    return 'Веб-приложение';
  };

  const getTechIcon = (tech) => {
    const t = tech.toLowerCase();
    if (t.includes('react')) return <FaReact className="inline mr-1.5 text-cyan-400" />;
    if (t.includes('node')) return <FaNodeJs className="inline mr-1.5 text-green-500" />;
    if (t.includes('express')) return <FaNodeJs className="inline mr-1.5 text-emerald-500" />;
    if (t.includes('sql') || t.includes('база') || t.includes('database')) return <FaDatabase className="inline mr-1.5 text-amber-500" />;
    if (t.includes('tailwind')) return <SiTailwindcss className="inline mr-1.5 text-cyan-500" />;
    if (t.includes('bootstrap')) return <FaBootstrap className="inline mr-1.5 text-purple-500" />;
    if (t.includes('sass') || t.includes('scss')) return <FaSass className="inline mr-1.5 text-pink-500" />;
    if (t.includes('jwt')) return <span className="inline mr-1.5 text-red-400">🔐</span>;
    if (t.includes('websocket')) return <span className="inline mr-1.5 text-blue-400">🔌</span>;
    if (t.includes('css') || t.includes('стили')) return <FaPaintBrush className="inline mr-1.5 text-blue-400" />;
    return null;
  };

if (!isOpen || !item) return null;

  const images = projectImages();
  const codeAvailable = hasCode();
  const codeType = getCodeLinkType();

  return (
    <div
      className="fixed inset-0 z-[1001] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-gradient-to-br from-gray-900/95 to-dark/95 rounded-2xl border border-primary/20 w-full max-w-6xl overflow-hidden animate-modal-appear shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
        tabIndex="-1"
        style={{ maxHeight: '90vh' }}
      >
        {/* Заголовок */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-dark/50 backdrop-blur-sm flex-shrink-0">
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-3 mb-2">
              <h2 id="modal-title" className="text-2xl font-bold text-light truncate">
                {item.title}
              </h2>
              <span className="flex-shrink-0 text-xs px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">
                {getProjectType()}
              </span>
            </div>
            <p className="text-gray-300 text-sm line-clamp-2" title={item.description}>
              {item.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2.5 hover:bg-gray-800/50 rounded-xl transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-primary/50 flex-shrink-0"
            title="Закрыть (Esc)"
            aria-label="Закрыть модальное окно"
          >
            <FiX className="text-2xl text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Основное содержимое - без вертикального скролла */}
        <div className="flex flex-col md:flex-row" style={{ height: 'calc(90vh - 120px)' }}>
          {/* ЛЕВАЯ КОЛОНКА - ГАЛЕРЕЯ */}
          <div className="md:w-3/5 p-6 border-r border-gray-800/50 overflow-hidden">
            <ImageGallery 
              images={images}
              initialIndex={0}
              onIndexChange={(index) => console.log('Selected image:', index)}
            />
          </div>

          {/* ПРАВАЯ КОЛОНКА - ИНФОРМАЦИЯ с вертикальным скроллом только здесь */}
          <div className="md:w-2/5 p-6 overflow-y-auto custom-scrollbar">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-light mb-4 flex items-center gap-2">
                <FiCode className="text-primary" />
                <span>Технологии</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {item.tech?.length || 0} технологий
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tech?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 bg-gray-800/40 text-gray-300 rounded-lg text-sm border border-gray-700/50 hover:border-primary/50 transition-all duration-300 flex items-center"
                    title={tech}
                  >
                    {getTechIcon(tech)}
                    <span className="truncate max-w-[120px]">{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 font-medium w-full group focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <FiExternalLink className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg font-semibold">Открыть демо-версию</span>
              </a>

              <div className={`grid ${(codeAvailable || item.github) ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                {codeAvailable && (
                  <button
                    onClick={handleCodeClick}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium border border-gray-700/50 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    title={
                      codeType === 'github' ? 'Открыть репозиторий на GitHub' :
                      codeType === 'external' ? 'Открыть исходный код' :
                      'Просмотреть исходный код'
                    }
                  >
                    <FiCode />
                    <span>
                      {codeType === 'github' ? 'GitHub' : 'Исходный код'}
                    </span>
                  </button>
                )}

                {item.github && !(codeType === 'github' && codeAvailable) && (
                  <a
                    href={item.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium border border-gray-700/50 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-800/50">
              <h4 className="text-sm font-medium text-gray-400 mb-3">Технические детали</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="truncate">
                  <span className="text-gray-500">Тип проекта:</span>
                  <span className="text-gray-300 ml-2 truncate">{getProjectType()}</span>
                </div>
                <div className="truncate">
                  <span className="text-gray-500">Изображений:</span>
                  <span className="text-gray-300 ml-2">{images.length}</span>
                </div>
                <div className="truncate">
                  <span className="text-gray-500">Код:</span>
                  <span className={`ml-2 ${codeAvailable ? 'text-green-400' : 'text-gray-400'}`}>
                    {codeAvailable 
                      ? (codeType === 'github' ? 'GitHub' : 'Доступен') 
                      : 'По запросу'
                    }
                  </span>
                </div>
                <div className="truncate">
                  <span className="text-gray-500">Верстка:</span>
                  <span className="text-gray-300 ml-2 truncate">
                    {item.tech?.some(t => t.toLowerCase().includes('tailwind')) ? 'TailwindCSS' :
                      item.tech?.some(t => t.toLowerCase().includes('bootstrap')) ? 'Bootstrap' :
                        item.tech?.some(t => t.toLowerCase().includes('sass') || t.toLowerCase().includes('scss')) ? 'SCSS/SASS' : 'Custom CSS'}
                  </span>
                </div>
                <div className="col-span-2 truncate">
                  <span className="text-gray-500">ID проекта:</span>
                  <span className="text-gray-300 ml-2">#{item.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;