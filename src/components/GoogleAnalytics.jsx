// import { useEffect } from 'react';

// const GoogleAnalytics = () => {
//   useEffect(() => {
//     const isProduction = import.meta.env.PROD;
//     const isLocalhost = window.location.hostname === 'localhost' || 
//                        window.location.hostname.includes('127.0.0.1') ||
//                        window.location.hostname.includes('::1');
    
//     const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';
//     const gaId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
    
//     // Инициализируем GA только в продакшене, не на localhost и не в демо-режиме
//     if (isProduction && !isLocalhost && !isDemoMode && gaId) {
//       const script = document.createElement('script');
//       script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
//       script.async = true;
//       document.head.appendChild(script);
      
//       window.dataLayer = window.dataLayer || [];
//       // eslint-disable-next-line no-undef
//       function gtag() { dataLayer.push(arguments); }
//       gtag('js', new Date());
      
//       // Настройка Google Analytics с дополнительными параметрами
//       gtag('config', gaId, {
//         'send_page_view': true,
//         'anonymize_ip': true, // Анонимизация IP
//         'cookie_flags': 'SameSite=None;Secure',
//         'debug_mode': import.meta.env.DEV, // Режим отладки только в разработке
//       });
      
//       console.log('Google Analytics инициализирован для продакшена');
//     } else {
//       console.log('Google Analytics отключен. Причина:', {
//         isProduction,
//         isLocalhost,
//         isDemoMode,
//         hasGaId: !!gaId
//       });
//     }
//   }, []);
  
//   return null;
// };

// export default GoogleAnalytics;