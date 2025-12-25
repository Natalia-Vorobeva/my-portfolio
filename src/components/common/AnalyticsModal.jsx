import React from 'react';
import { FiBarChart2, FiX } from 'react-icons/fi';
import AnalyticsDashboard from '../AnalyticsDashboard';

const AnalyticsModal = ({ showAnalytics, setShowAnalytics, shouldShowAnalytics }) => {
  if (!showAnalytics) return null;

  return (
    <div className="analytics-modal-overlay" onClick={() => setShowAnalytics(false)}>
      <div className="analytics-modal" onClick={(e) => e.stopPropagation()}>
        <div className="analytics-modal-header flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <h2 className="analytics-modal-title text-2xl text-accent flex items-center gap-3">
            <FiBarChart2 /> Статистика посещений
          </h2>
          <button
            className="analytics-modal-close bg-transparent border-none text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 hover:rotate-90"
            onClick={() => setShowAnalytics(false)}
            aria-label="Закрыть статистику"
          >
            <FiX />
          </button>
        </div>
        
        <div className="analytics-modal-content max-h-[calc(85vh-150px)] overflow-y-auto py-4">
          {shouldShowAnalytics ? (
            <AnalyticsDashboard />
          ) : (
            <div className="analytics-dev-message text-center p-12 bg-white/5 rounded-2xl border border-white/10">
              <h3 className="text-xl text-accent mb-4">📊 Статистика доступна только на продакшн-сайте</h3>
              <p className="text-gray-300 mb-2 leading-relaxed">
                В режиме разработки данные аналитики не собираются.
              </p>
              <p className="text-gray-300 leading-relaxed">
                После деплоя на хостинг здесь будет отображаться реальная статистика посещений.
              </p>
            </div>
          )}
        </div>
        
        <div className="analytics-modal-footer mt-6 pt-4 border-t border-white/10 text-center text-gray-400 text-sm">
          <p><small>Данные обновляются в реальном времени с Google Analytics</small></p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsModal;