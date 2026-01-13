export const trackEvent = (action, category, label, value = null) => {
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
};

export const trackProjectClick = (projectName) => {
  trackEvent('project_click', 'portfolio', projectName);
};

export const trackButtonClick = (buttonName) => {
  trackEvent('button_click', 'engagement', buttonName);
};

export const trackFormInteraction = (action, field = '') => {
  if (field) {
    trackEvent(`form_${action}`, 'contact', field);
  } else {
    trackEvent(`form_${action}`, 'contact', 'Contact Form');
  }
};