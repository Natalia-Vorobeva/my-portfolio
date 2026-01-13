import React, { useState, useEffect } from 'react';
import { FiUsers, FiEye, FiMousePointer, FiClock, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import { trackEvent } from '../../utils/tracking';

const AnalyticsDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState({
    visitors: { total: 0, today: 0 },
    pageViews: { total: 0, average: 0 },
    engagement: { rate: 0, time: 0 },
    sources: [],
    popularPages: [],
    loading: true
  });

  useEffect(() => {
    setTimeout(() => {
      setAnalyticsData({
        visitors: { total: 1248, today: 42 },
        pageViews: { total: 3567, average: 2.8 },
        engagement: { rate: 68, time: 3.2 },
        sources: [
          { name: 'Прямые заходы', value: 45 },
          { name: 'Поисковые системы', value: 30 },
          { name: 'Социальные сети', value: 15 },
          { name: 'Рефералы', value: 10 }
        ],
        popularPages: [
          { name: 'Главная страница', views: 1248 },
          { name: 'Портфолио', views: 892 },
          { name: 'Контакты', views: 567 },
          { name: 'Обо мне', views: 432 }
        ],
        loading: false
      });
    }, 1000);
  }, []);

  if (analyticsData.loading) {
    return (
      <div className="analytics-loading flex flex-col items-center justify-center p-12">
        <div className="spinner w-12 h-12 border-4 border-primary/30 rounded-full border-t-primary animate-spin mb-4"></div>
        <p className="text-gray-300">Загрузка данных аналитики...</p>
      </div>
    );
  }

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-header mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-light">📈 Обзор посещаемости</h3>
          <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-lg">
            Данные за последние 30 дней
          </span>
        </div>
      </div>

      <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="stat-card bg-gradient-to-br from-gray-900/70 to-dark/90 p-6 rounded-xl border border-primary/15">
          <div className="stat-header flex items-center justify-between mb-4">
            <div className="stat-icon bg-primary/15 p-3 rounded-lg">
              <FiUsers className="text-primary text-xl" />
            </div>
            <span className="text-sm text-success bg-success/10 px-2 py-1 rounded">+12%</span>
          </div>
          <h4 className="text-2xl font-bold text-light mb-2">{analyticsData.visitors.total.toLocaleString()}</h4>
          <p className="text-gray-300 text-sm mb-1">Всего посетителей</p>
          <p className="text-gray-400 text-xs">
            <span className="text-primary font-semibold">{analyticsData.visitors.today}</span> сегодня
          </p>
        </div>

        <div className="stat-card bg-gradient-to-br from-gray-900/70 to-dark/90 p-6 rounded-xl border border-primary/15">
          <div className="stat-header flex items-center justify-between mb-4">
            <div className="stat-icon bg-primary/15 p-3 rounded-lg">
              <FiEye className="text-primary text-xl" />
            </div>
            <span className="text-sm text-success bg-success/10 px-2 py-1 rounded">+8%</span>
          </div>
          <h4 className="text-2xl font-bold text-light mb-2">{analyticsData.pageViews.total.toLocaleString()}</h4>
          <p className="text-gray-300 text-sm mb-1">Просмотров страниц</p>
          <p className="text-gray-400 text-xs">
            <span className="text-primary font-semibold">{analyticsData.pageViews.average}</span> в среднем на посетителя
          </p>
        </div>

        <div className="stat-card bg-gradient-to-br from-gray-900/70 to-dark/90 p-6 rounded-xl border border-primary/15">
          <div className="stat-header flex items-center justify-between mb-4">
            <div className="stat-icon bg-primary/15 p-3 rounded-lg">
              <FiClock className="text-primary text-xl" />
            </div>
            <span className="text-sm text-success bg-success/10 px-2 py-1 rounded">+5%</span>
          </div>
          <h4 className="text-2xl font-bold text-light mb-2">{analyticsData.engagement.time} мин</h4>
          <p className="text-gray-300 text-sm mb-1">Среднее время на сайте</p>
          <p className="text-gray-400 text-xs">
            <span className="text-primary font-semibold">{analyticsData.engagement.rate}%</span> вовлеченность
          </p>
        </div>
      </div>

      <div className="charts-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="chart-section">
          <div className="chart-header flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-light flex items-center gap-2">
              <FiGlobe className="text-primary" /> Источники трафика
            </h4>
          </div>
          <div className="sources-list">
            {analyticsData.sources.map((source, index) => (
              <div key={index} className="source-item flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                <div className="source-info flex items-center gap-3">
                  <div className="source-color w-3 h-3 rounded-full" 
                       style={{ backgroundColor: getSourceColor(index) }}></div>
                  <span className="text-gray-300">{source.name}</span>
                </div>
                <div className="source-stats flex items-center gap-4">
                  <span className="text-light font-semibold">{source.value}%</span>
                  <div className="progress-bar w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div className="progress-fill h-full rounded-full" 
                         style={{ 
                           width: `${source.value}%`,
                           backgroundColor: getSourceColor(index)
                         }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <div className="chart-header flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-light flex items-center gap-2">
              <FiTrendingUp className="text-primary" /> Популярные страницы
            </h4>
          </div>
          <div className="pages-list">
            {analyticsData.popularPages.map((page, index) => (
              <div key={index} className="page-item flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0">
                <div className="page-info">
                  <div className="page-name text-gray-300">{page.name}</div>
                  <div className="page-url text-xs text-gray-500 truncate max-w-[200px]">
                    /{page.name.toLowerCase().replace(/\s+/g, '-')}
                  </div>
                </div>
                <div className="page-stats">
                  <span className="page-views text-light font-semibold">
                    {page.views.toLocaleString()} просмотров
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-footer mt-8 pt-8 border-t border-gray-800">
        <div className="note text-center text-gray-400 text-sm">
          <p>Данные обновляются каждые 24 часа. Статистика собирается анонимно.</p>
          <p className="mt-2 text-xs text-gray-500">
            Для настройки реальной аналитики настройте Google Analytics в .env файле
          </p>
        </div>
      </div>
    </div>
  );
};

const getSourceColor = (index) => {
  const colors = [
    '#667eea', 
    '#764ba2', 
    '#f093fb', 
    '#4facfe', 
    '#43e97b', 
    '#fa709a' 
  ];
  return colors[index % colors.length];
};

export default AnalyticsDashboard;