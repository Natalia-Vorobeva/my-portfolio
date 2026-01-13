import { useState, useEffect, useRef } from 'react';
import { 
  FiCheck, 
  FiAlertCircle, 
  FiRefreshCw, 
  FiInfo 
} from 'react-icons/fi';
import { CONFIG } from '../shared/config';
import { trackFormInteraction, trackEvent } from '../../utils/tracking';
import { generateCaptcha, validateEmail } from '../../utils/formValidation';

const ContactForm = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [captcha, setCaptcha] = useState({ 
    question: '', 
    answer: 0, 
    userAnswer: '' 
  });
  const [formStatus, setFormStatus] = useState({ 
    loading: false, 
    success: false, 
    error: false, 
    message: '' 
  });
  const [errors, setErrors] = useState({});
  const [formStartTime] = useState(Date.now());
  const honeypotRef = useRef(null);
  const isFormValid = formData.name && formData.email && formData.message;

  useEffect(() => {
    generateNewCaptcha();
  }, []);

  const generateNewCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptcha(newCaptcha);
    trackEvent('captcha_generated', 'security', 'Generate New Captcha');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    trackFormInteraction('input', field.charAt(0).toUpperCase() + field.slice(1));
  };

  const handleCaptchaChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setCaptcha(prev => ({ ...prev, userAnswer: value }));
    trackFormInteraction('captcha_input', 'CAPTCHA');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя слишком короткое';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    const message = formData.message.trim();
    if (!message) {
      newErrors.message = 'Сообщение обязательно';
    } else if (message.length < 10) {
      newErrors.message = 'Сообщение слишком короткое (минимум 10 символов)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendTelegramMessage = async () => {
    const messageText = `
🎯 *НОВАЯ ЗАЯВКА С САЙТА-ПОРТФОЛИО*

👤 *Имя:* ${formData.name}
📧 *Email:* \`${formData.email}\`
📝 *Сообщение:*
${formData.message}

📊 *Детали:*
🕐 ${new Date().toLocaleString('ru-RU')}
🌐 ${window.location.hostname}
✅ Капча пройдена
    `;

    const response = await fetch(`https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CONFIG.TELEGRAM_CHAT_ID,
        text: messageText,
        parse_mode: 'Markdown',
        reply_markup: {
          inline_keyboard: [[
            {
              text: '📧 Ответить клиенту',
              url: CONFIG.PROFILE_URL
            }
          ]]
        }
      })
    });

    return await response.json();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    trackEvent('form_submit_attempt', 'contact', 'Contact Form Submit');

    if (!validateForm()) {
      trackEvent('form_validation_failed', 'contact', 'Form Validation Failed');
      return;
    }

    setFormStatus({ loading: true, success: false, error: false, message: '' });

    if (honeypotRef.current && honeypotRef.current.value) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Обнаружена подозрительная активность'
      });
      trackEvent('spam_detected', 'security', 'Honeypot Field Triggered');
      generateNewCaptcha();
      return;
    }

    const userAnswer = parseInt(captcha.userAnswer.trim());
    if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: '❌ Неверный ответ на капчу. Попробуйте еще раз.'
      });
      trackEvent('captcha_failed', 'security', 'Wrong CAPTCHA Answer');
      generateNewCaptcha();
      return;
    }

    const formFillTime = Date.now() - formStartTime;
    if (formFillTime < 2000) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: '⚠️ Форма заполнена слишком быстро'
      });
      trackEvent('form_too_fast', 'security', 'Form Filled Too Quickly');
      generateNewCaptcha();
      return;
    }

    // Demo mode
    if (CONFIG.DEMO_MODE) {
      setFormStatus({
        loading: true,
        success: false,
        error: false,
        message: '⏳ Демо-режим: имитация отправки...'
      });

      setTimeout(() => {
        setFormStatus({
          loading: false,
          success: true,
          error: false,
          message: `✅ Демо: Форма работает! Настройте Telegram бота в .env.local файле.\n\nТокен бота: ${CONFIG.TELEGRAM_BOT_TOKEN ? '✓ Установлен' : '✗ Отсутствует'}\nChat ID: ${CONFIG.TELEGRAM_CHAT_ID ? '✓ Установлен' : '✗ Отсутствует'}`
        });

        setFormData({ name: '', email: '', message: '' });
        generateNewCaptcha();
        trackEvent('form_demo_success', 'contact', 'Demo Mode Form Submission');

        setTimeout(() => {
          setFormStatus({ loading: false, success: false, error: false, message: '' });
        }, 8000);
      }, 1500);
      return;
    }

    setFormStatus({
      loading: true,
      success: false,
      error: false,
      message: '⏳ Отправка в Telegram...'
    });

    try {
      const result = await sendTelegramMessage();

      if (result.ok) {
        setFormStatus({
          loading: false,
          success: true,
          error: false,
          message: '✅ Заявка отправлена в Telegram! Я свяжусь с вами в ближайшее время.'
        });

        trackEvent('form_submit_success', 'contact', 'Telegram Message Sent', 1);
        setFormData({ name: '', email: '', message: '' });
        generateNewCaptcha();

        setTimeout(() => {
          setFormStatus({ loading: false, success: false, error: false, message: '' });
        }, 5000);
      } else {
        throw new Error(result.description || 'Ошибка Telegram API');
      }
    } catch (error) {
      console.error('Ошибка отправки в Telegram:', error);
      let errorMessage = '❌ Ошибка отправки. ';

      if (error.message.includes('chat not found')) {
        errorMessage += 'Chat ID неверный. Проверьте .env.local файл.';
      } else if (error.message.includes('Not Found')) {
        errorMessage += 'Токен бота неверный. Проверьте .env.local файл.';
      } else if (error.message.includes('Network Error')) {
        errorMessage += 'Проблемы с сетью. Попробуйте использовать VPN.';
      } else {
        errorMessage += 'Попробуйте еще раз или свяжитесь другим способом.';
      }

      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: errorMessage
      });

      trackEvent('form_submit_error', 'contact', error.message || 'Unknown Error');
      generateNewCaptcha();
    }
  };

  return (
    <div className="contact-form-container">
      <form className="contact-form bg-gradient-to-br from-gray-900/70 to-dark/90 p-8 rounded-2xl border border-primary/15" 
            onSubmit={handleSubmit} 
            noValidate>
        
        <div className="honeypot-field hidden">
          <input type="text" id="url" name="url" tabIndex="-1" autoComplete="off" ref={honeypotRef} />
        </div>

        <div className="form-group">
          <label htmlFor="name" className="block mb-2 text-light font-medium">Имя *</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`form-input w-full p-3 bg-gray-800/70 border rounded-lg text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.name ? 'border-error' : formData.name.length >= 2 ? 'border-success' : 'border-gray-700'
            }`}
            placeholder="Ваше имя"
          />
          {errors.name && <span className="validation-error text-error text-sm mt-1 block">{errors.name}</span>}
        </div>

        <div className="form-group mt-4">
          <label htmlFor="email" className="block mb-2 text-light font-medium">Email *</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`form-input w-full p-3 bg-gray-800/70 border rounded-lg text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 ${
              errors.email ? 'border-error' : validateEmail(formData.email) ? 'border-success' : 'border-gray-700'
            }`}
            placeholder="example@email.com"
          />
          {errors.email && <span className="validation-error text-error text-sm mt-1 block">{errors.email}</span>}
        </div>

        <div className="form-group mt-4">
          <label htmlFor="message" className="block mb-2 text-light font-medium">Сообщение *</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`form-input w-full p-3 bg-gray-800/70 border rounded-lg text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 resize-none ${
              errors.message ? 'border-error' : formData.message.length >= 10 ? 'border-success' : 'border-gray-700'
            }`}
            placeholder="Ваше сообщение (минимум 10 символов)"
            rows="4"
          />
          <div className="char-counter mt-2 flex justify-between items-center">
            {formData.message.length < 10 ? (
              <div className="char-count flex items-center gap-2">
                <span className="min-chars opacity-70 text-sm">минимум символов:</span>
                <span className="count font-semibold text-error">{formData.message.length}/10</span>
              </div>
            ) : (
              <div className="char-ok animate-fade-in">
                <span className="ok-text bg-success/10 px-3 py-1 rounded-full text-sm">OK</span>
              </div>
            )}
          </div>
          {errors.message && <span className="validation-error text-error text-sm mt-1 block">{errors.message}</span>}
        </div>

        <div className="captcha-section mt-6">
          <div className="captcha-header flex justify-between items-center mb-4">
            <label className="text-lg font-bold text-light flex items-center gap-2">
              Подтвердите, что вы не робот *
            </label>
            <button
              type="button"
              className="refresh-captcha bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer transition-all duration-300 font-medium border-none hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(102,126,234,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={generateNewCaptcha}
              disabled={formStatus.loading}
            >
              <FiRefreshCw className="text-sm" /> Новая задача
            </button>
          </div>

          <div className="captcha-container bg-gray-900/50 p-4 rounded-xl border border-primary/20">
            <div className="captcha-question flex items-center gap-3 mb-4">
              <span className="captcha-icon text-2xl">🧮</span>
              <span className="captcha-text text-xl font-bold text-light font-mono">{captcha.question}</span>
            </div>

            <div className="captcha-input-group relative">
              <input
                type="text"
                value={captcha.userAnswer}
                onChange={handleCaptchaChange}
                required
                disabled={formStatus.loading}
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength="3"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-light font-bold text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="?"
              />
              <span className="captcha-hint absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 italic">Только цифры</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`submit-button w-full p-4 text-white rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden shadow-[0_4px_15px_rgba(102,126,234,0.3)] mt-6 ${
            formStatus.loading 
              ? 'bg-gradient-to-r from-gray-700 to-gray-800 cursor-not-allowed' 
              : formStatus.error 
                ? 'bg-gradient-to-r from-error/80 to-error cursor-pointer hover:shadow-[0_4px_20px_rgba(239,68,68,0.4)]'
                : !isFormValid 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-800 cursor-not-allowed opacity-70'
                  : 'bg-gradient-to-r from-primary to-secondary cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(102,126,234,0.5)]'
          }`}
          disabled={formStatus.loading || !isFormValid}
          onClick={() => trackFormInteraction('submit_button_click')}
        >
          {formStatus.loading ? (
            <>
              <span className="spinner w-5 h-5 border-2 border-white/30 rounded-full border-t-white animate-spin"></span>
              <span className="button-text animate-pulse">Отправка в Telegram...</span>
            </>
          ) : (
            <span className="button-text">Отправить заявку</span>
          )}
        </button>

        {formStatus.message && (
          <div className={`form-feedback mt-6 p-4 rounded-xl border ${
            formStatus.success 
              ? 'bg-success/10 border-success/30 text-success' 
              : 'bg-error/10 border-error/30 text-error'
          }`}>
            <div className="feedback-content flex items-start gap-3">
              {formStatus.success ?
                <FiCheck className="feedback-icon success-icon text-success text-xl flex-shrink-0 mt-0.5" /> :
                <FiAlertCircle className="feedback-icon error-icon text-error text-xl flex-shrink-0 mt-0.5" />
              }
              <span className="feedback-text whitespace-pre-line">{formStatus.message}</span>
            </div>
            {formStatus.error && (
              <div className="error-details mt-4 pt-4 border-t border-error/20">
                <p className="error-help flex items-center gap-2 text-sm text-gray-300">
                  <FiInfo className="info-icon" />
                  Проверьте подключение и настройки Telegram бота
                </p>
                <button
                  className="retry-button flex items-center gap-2 mt-3 px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 transition-all duration-300 hover:bg-gray-700 border-none cursor-pointer"
                  onClick={() => {
                    window.location.reload();
                    trackEvent('form_retry', 'contact', 'Retry Form Submission');
                  }}
                  type="button"
                >
                  <FiRefreshCw className="retry-icon" />
                  Попробовать снова
                </button>
              </div>
            )}
          </div>
        )}

        <div className="form-note mt-8 text-center text-sm text-gray-400 leading-relaxed">
          <p className="flex items-center justify-center gap-2 mb-2">
            ✓ Защищено от спама
          </p>
          <p className="flex items-center justify-center gap-2 mb-2">
            ✓ {CONFIG.DEMO_MODE ? 'Демо-режим (без Telegram)' : 'Отправляется в Telegram'}
          </p>
          <p className="privacy mt-4 pt-4 border-t border-primary/10 text-xs text-gray-500">
            Отправляя форму, вы соглашаетесь с обработкой персональных данных
          </p>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;