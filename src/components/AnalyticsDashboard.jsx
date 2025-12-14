// eslint-disable react-hooks/exhaustive-deps

'use client';

import { useState, useEffect } from 'react';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    pageviews: 0,
    avgTime: 0,
  });

  useEffect(() => {
    // для простоты используем localStorage
    const pageviews = parseInt(localStorage.getItem('pageviews') || '0') + 1;
    localStorage.setItem('pageviews', pageviews);
    
    setStats(prev => ({
      ...prev,
      pageviews,
    }));
  }, []);

  return (
    <div className="analytics-dashboard">
      <h3> Статистика сайта</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{stats.pageviews}</div>
          <div className="stat-label">Просмотров</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.users}</div>
          <div className="stat-label">Посетителей</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{stats.avgTime}s</div>
          <div className="stat-label">Среднее время</div>
        </div>
      </div>
      <div className="analytics-note">
        <small>Полная статистика в Google Analytics</small>
      </div>
    </div>
  );
}