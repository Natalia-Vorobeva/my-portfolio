export const CONFIG = {
  TELEGRAM_BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '',
  TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || '',
  DEMO_MODE: import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Портфолио Наталья Воробьевой',
  CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'vorobjeva.natalia76@yandex.ru',
  CONTACT_PHONE: import.meta.env.VITE_CONTACT_PHONE || '+7 (911) 208-04-79',
  PROFILE_URL: import.meta.env.VITE_PROFILE_URL,
  BOT_URL: import.meta.env.VITE_BOT_URL,
  TELEGRAM_BOT_URL: import.meta.env.VITE_TELEGRAM_BOT_TOKEN
    ? `https://t.me/${import.meta.env.VITE_TELEGRAM_BOT_TOKEN.split(':')[0]}`
    : import.meta.env.VITE_BOT_URL,
  GOOGLE_ANALYTICS_ID: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
  IS_PRODUCTION: import.meta.env.PROD,
};