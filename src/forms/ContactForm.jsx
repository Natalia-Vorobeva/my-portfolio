import React, { useState, useEffect, useRef } from 'react';
import { 
  FiRefreshCw, 
  FiCheck, 
  FiAlertCircle, 
  FiInfo, 
  FiSend,
  FiFileText
} from 'react-icons/fi';

const ContactForm = ({ CONFIG, trackEvent, trackFormInteraction }) => {
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
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const operators = ['+', '-', '×'];
    const operator = operators[Math.floor(Math.random() * operators.length)];
    let num1, num2, answer;

    switch (operator) {
      case '+':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        answer = num1 + num2;
        break;
      case '-':
        num1 = Math.floor(Math.random() * 10) + 5;
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 - num2;
        break;
      case '×':
        num1 = Math.floor(Math.random() * 5) + 1;
        num2 = Math.floor(Math.random() * 5) + 1;
        answer = num1 * num2;
        break;
      default:
        num1 = 2;
        num2 = 3;
        answer = 5;
    }

    setCaptcha({
      question: `Сколько будет ${num1} ${operator} ${num2}?`,
      answer: answer,
      userAnswer: ''
    });
    trackEvent('captcha_generated', 'security', 'Generate New Captcha');
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
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
    } else {
      const emailRegex = /^[^\s@']+@[^\s@']+\.[^\s@']+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Введите корректный email';
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    trackEvent('form_submit_attempt', 'contact', 'Contact Form Submit');

    if (!validateForm()) {
      trackEvent('form_validation_failed', 'contact', 'Form Validation Failed');
      return;
    }

    setFormStatus({ loading: false, success: false, error: false, message: '' });

    if (honeypotRef.current && honeypotRef.current.value) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Обнаружена подозрительная активность'
      });
      trackEvent('spam_detected', 'security', 'Honeypot Field Triggered');
      generateCaptcha();
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
      generateCaptcha();
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
      generateCaptcha();
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: '❌ Введите корректный email'
      });
      trackEvent('email_validation_failed', 'contact', 'Invalid Email Format');
      return;
    }

    if (formData.message.length < 10) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: '❌ Сообщение слишком короткое (минимум 10 символов)'
      });
      trackEvent('message_too_short', 'contact', 'Message Length Validation Failed');
      return;
    }

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
        generateCaptcha();
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

      const result = await response.json();

      if (result.ok) {
        setFormStatus({
          loading: false,
          success: true,
          error: false,
          message: '✅ Заявка отправлена в Telegram! Я свяжусь с вами в ближайшее время.'
        });

        trackEvent('form_submit_success', 'contact', 'Telegram Message Sent', 1);
        setFormData({ name: '', email: '', message: '' });
        generateCaptcha();

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
      generateCaptcha();
    }
  };

  return (
    <form className="contact-form bg-gradient-to-br from-gray-900/70 to-dark/90 p-8 rounded-2xl border border-primary/15" 
          onSubmit={handleSubmit} noValidate>
      {/* ... остальная часть формы ... */}
      {/* (Этот код можно оставить таким же как в оригинале, только вставить в соответствующие места) */}
    </form>
  );
};

export default ContactForm;