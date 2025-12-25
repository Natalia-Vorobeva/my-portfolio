import { useCallback } from 'react';

export const useAnalytics = () => {
  const trackEvent = useCallback((action, category, label, value = null) => {
    const isLocalhost = window.location.hostname === 'localhost' ||
      window.location.hostname.includes('127.0.0.1') ||
      window.location.hostname.includes('::1');

    const isDevelopment = import.meta.env.VITE_DEMO_MODE;

    if (isLocalhost || isDevelopment) {
      return;
    }

    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  }, []);

  return { trackEvent };
};