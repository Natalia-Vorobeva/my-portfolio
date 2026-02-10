export const trackEvent = (action, category, label, value = null) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackPageView = (pageName) => {
  trackEvent('page_view', 'navigation', pageName);
};

export const trackButtonClick = (buttonName) => {
  trackEvent('click', 'button', buttonName);
};

export const trackFormSubmit = (formName) => {
  trackEvent('submit', 'form', formName);
};

export const trackProjectView = (projectName) => {
  trackEvent('view', 'project', projectName);
};