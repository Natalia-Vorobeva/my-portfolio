import { useState } from 'react';
import { trackEvent } from '../utils/tracking';

export const useAnalytics = () => {
  const [showAnalytics, setShowAnalytics] = useState(false);

  const toggleAnalytics = () => {
    setShowAnalytics(!showAnalytics);
    trackEvent('analytics_toggle', 'engagement', showAnalytics ? 'Close Analytics' : 'Open Analytics');
  };

  return { showAnalytics, toggleAnalytics };
};