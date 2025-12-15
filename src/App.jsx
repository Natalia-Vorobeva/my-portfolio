import React, { useState, useEffect, useRef, useLayoutEffect, Suspense } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import { portfolioItems } from './constants/portfolioItems.jsx';
import {
	FiMail,
	FiPhone,
	FiGithub,
	FiExternalLink,
	FiHome,
	FiCheck,
	FiAlertCircle,
	FiRefreshCw,
	FiSend,
	FiInfo,
	FiFileText,
	FiX,
	FiChevronLeft,
	FiChevronRight,
	FiBarChart2
} from 'react-icons/fi';
import {
	FaReact,
	FaNodeJs,
	FaDatabase,
	FaRobot
} from 'react-icons/fa';
import foto from './assets/images/Fotoram.io.jpg';
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx';
import TimelineResult from './components/TimelineResult.jsx';
const BackgroundSwitcher = React.lazy(() => import('./components/BackgroundSwitcher'));
import AuroraWaves from './components/backgrounds/AuroraWaves';
import GradientWaves from './components/backgrounds/GradientWaves';
import NeonWaves from './components/backgrounds/NeonWaves';
import SpaceOcean from './components/backgrounds/SpaceOcean';

const trackEvent = (action, category, label, value = null) => {
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

function App() {
	const CONFIG = {
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
	}

	const backgrounds = [
		<NeonWaves key="neon" />,
		<AuroraWaves key="aurora" />,
		<GradientWaves key="gradient" />,
		<SpaceOcean key="space" />
	];

	const switchBackground = () => {
		setBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
	};

	const [backgroundIndex, setBackgroundIndex] = useState(0);
	const [isBackgroundReady, setIsBackgroundReady] = useState(false);
	const [codeFiles, setCodeFiles] = useState(null);
	const [showAnalytics, setShowAnalytics] = useState(false);
	const [formData, setFormData] = useState({ name: '', email: '', message: '' });
	const [captcha, setCaptcha] = useState({ question: '', answer: 0, userAnswer: '' });
	const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: false, message: '' });
	const [errors, setErrors] = useState({});
	const isFormValid = formData.name && formData.email && formData.message;
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [activeSection, setActiveSection] = useState('home');
	const [isVisible, setIsVisible] = useState(false);
	const [formStartTime] = useState(Date.now());
	const honeypotRef = useRef(null);
	const menuRef = useRef(null);
	const formRef = useRef(null);
	const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
	const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
	const [copied, setCopied] = useState(false);

	const shouldShowAnalytics = !window.location.hostname.includes('localhost') &&
		!window.location.hostname.includes('127.0.0.1') &&
		CONFIG.IS_PRODUCTION;

	useEffect(() => {
		const handleSmoothScroll = (e) => {
			const target = e.target.closest('a[href^="#"]');
			if (target) {
				e.preventDefault();
				const id = target.getAttribute('href');
				if (id === '#') return;

				const element = document.querySelector(id);
				if (element) {
					const headerOffset = 80;
					const elementPosition = element.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: 'smooth'
					});
				}
			}
		};

		document.addEventListener('click', handleSmoothScroll);
		return () => document.removeEventListener('click', handleSmoothScroll);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsBackgroundReady(true);
		}, 100);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		trackEvent('page_view', 'engagement', 'Portfolio Page View');
	}, []);

	const trackProjectClick = (projectName) => {
		trackEvent('project_click', 'portfolio', projectName);
	};

	const trackButtonClick = (buttonName) => {
		trackEvent('button_click', 'engagement', buttonName);
	};

	const trackFormInteraction = (action, field = '') => {
		if (field) {
			trackEvent(`form_${action}`, 'contact', field);
		} else {
			trackEvent(`form_${action}`, 'contact', 'Contact Form');
		}
	};

	const toggleAnalytics = () => {
		setShowAnalytics(!showAnalytics);
		trackEvent('analytics_toggle', 'engagement', showAnalytics ? 'Close Analytics' : 'Open Analytics');
	};

	useLayoutEffect(() => {
		if (isCodeModalOpen) {
			const codeElements = document.querySelectorAll('.code-content code');
			codeElements.forEach((element) => {
				Prism.highlightElement(element);
			});
		}
	}, [isCodeModalOpen, currentCodeIndex]);

	const handleCopy = () => {
		navigator.clipboard.writeText(codeFiles[currentCodeIndex].content);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
		trackEvent('code_copy', 'engagement', 'Copy Code');
	};

	const nextCode = () => {
		setCurrentCodeIndex((prev) => prev === codeFiles.length - 1 ? 0 : prev + 1);
	};

	const prevCode = () => {
		setCurrentCodeIndex((prev) => prev === 0 ? codeFiles.length - 1 : prev - 1);
	};

	const openCodeModal = (index) => {
		setIsCodeModalOpen(true);
		setCurrentCodeIndex(0);
		setCodeFiles(portfolioItems[index].code);
		trackEvent('view_code', 'portfolio', portfolioItems[index].title);
	};

	const closeCodeModal = () => {
		setIsCodeModalOpen(false);
	};

	useEffect(() => {
		generateCaptcha();
	}, []);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
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

	const handleCaptchaChange = (e) => {
		const value = e.target.value.replace(/[^0-9]/g, '');
		setCaptcha(prev => ({ ...prev, userAnswer: value }));
		trackFormInteraction('captcha_input', 'CAPTCHA');
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
	// const [activeSection, setActiveSection] = useState('home');

	return (
		<div className={`app ${isCodeModalOpen ? "no-scroll" : ""} relative min-h-screen`}>
			{backgrounds[backgroundIndex]}

			<BackgroundSwitcher
				onSwitch={switchBackground}
				currentBackground={backgroundIndex}
			/>

			<div className="content-wrapper relative z-10">
				<header className="header sticky top-0 py-3 sm:py-4 bg-dark/50 backdrop-blur-xl border-b border-primary/10 z-[1000] animate-fade-in">
					<div className="container flex justify-between items-center px-4 sm:px-6">
						<div className="header-left flex items-center gap-2 sm:gap-3">
							<div className="header-avatar">
								<button
									onClick={() => {
										window.scrollTo({ top: 0, behavior: 'smooth' });
										trackEvent('navigation', 'engagement', 'Scroll to Top');
									}}
									className="avatar-scroll-btn border-none bg-transparent p-0 cursor-pointer rounded-full transition-transform duration-300 hover:scale-105 active:scale-95"
									aria-label="Вернуться наверх"
								>
									<img
										src={foto}
										alt="Наталья Воробьева"
										className="avatar-small w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary transition-transform duration-300"
									/>
								</button>
							</div>
							<div className="header-name">
								<h1 className="name-title text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-light to-primary bg-clip-text text-transparent leading-tight">
									Наталья Воробьева
								</h1>
								<p className="name-subtitle text-xs sm:text-sm text-gray-400 leading-tight">Frontend Developer</p>
							</div>
						</div>

						{/* Десктопная навигация */}
						<nav className="nav hidden md:flex gap-4 lg:gap-6 items-center">
							<a
								href="#home"
								className={`nav-link text-light font-medium transition-all duration-300 hover:text-primary relative py-2 text-sm lg:text-base group ${activeSection === 'home' ? 'text-primary' : ''}`}
								onClick={() => trackEvent('navigation', 'engagement', 'Home Section')}
							>
								{activeSection === 'home' && (
									<span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
								)}
								<span className="relative z-10">Главная</span>
								<span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
								<span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
							</a>
							<a
								href="#portfolio"
								className="nav-link text-light font-medium transition-all duration-300 hover:text-primary relative py-2 text-sm lg:text-base group"
								onClick={() => trackEvent('navigation', 'engagement', 'Portfolio Section')}
							>
								<span className="relative z-10">Портфолио</span>
								<span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
								<span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
							</a>
							<a
								href="#about"
								className="nav-link text-light font-medium transition-all duration-300 hover:text-primary relative py-2 text-sm lg:text-base group"
								onClick={() => trackEvent('navigation', 'engagement', 'About Section')}
							>
								<span className="relative z-10">Обо мне</span>
								<span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
								<span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
							</a>
							<a
								href="#contact"
								className="nav-link text-light font-medium transition-all duration-300 hover:text-primary relative py-2 text-sm lg:text-base group"
								onClick={() => trackEvent('navigation', 'engagement', 'Contact Section')}
							>
								<span className="relative z-10">Контакты</span>
								<span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
								<span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
							</a>
						</nav>

						{/* Бургер-меню для мобильных */}
						<div className="md:hidden">
							<button
								className="text-light hover:text-primary transition-colors duration-300"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
							>
								{isMenuOpen ? (
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
									</svg>
								) : (
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
									</svg>
								)}
							</button>
						</div>

						{/* Мобильное меню (выпадающее) */}
						<div className={`md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-xl border-b border-primary/10 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
							<div className="container px-4 py-4">
								<div className="flex flex-col gap-4">
									<a
										href="#home"
										onClick={() => {
											setIsMenuOpen(false);
											trackEvent('navigation', 'engagement', 'Home Section');
										}}
										className="text-light hover:text-primary transition-colors py-2 text-center md:text-left"
									>
										Главная
									</a>
									<a
										href="#portfolio"
										onClick={() => {
											setIsMenuOpen(false);
											trackEvent('navigation', 'engagement', 'Portfolio Section');
										}}
										className="text-light hover:text-primary transition-colors py-2 text-center md:text-left"
									>
										Портфолио
									</a>
									<a
										href="#about"
										onClick={() => {
											setIsMenuOpen(false);
											trackEvent('navigation', 'engagement', 'About Section');
										}}
										className="text-light hover:text-primary transition-colors py-2 text-center md:text-left"
									>
										Обо мне
									</a>
									<a
										href="#contact"
										onClick={() => {
											setIsMenuOpen(false);
											trackEvent('navigation', 'engagement', 'Contact Section');
										}}
										className="text-light hover:text-primary transition-colors py-2 text-center md:text-left"
									>
										Контакты
									</a>
								</div>
							</div>
						</div>
					</div>
				</header>

				<section id="home" className="hero py-20 animate-fade-in">
					<div className="container">
						<div className="hero-content grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
							<div className="hero-left">
								<div className="avatar-section flex items-center gap-8 mb-12 flex-col sm:flex-row sm:text-left text-center">
									<div className="avatar-large relative shrink-0">
										<img
											src={foto}
											alt="Наталья Воробьева"
											className="avatar-img w-48 h-48 rounded-full object-cover border-4 border-primary shadow-[0_15px_40px_rgba(102,126,234,0.3)] transition-transform duration-300 hover:scale-103"
										/>
										<div className="avatar-status absolute bottom-4 right-4 w-5 h-5 rounded-full bg-success border-4 border-dark animate-pulse"></div>
									</div>
									<div className="name-display">
										<h1 className="main-name text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-light to-primary bg-clip-text text-transparent leading-tight">Наталья Воробьева</h1>
										<p className="main-title text-lg sm:text-xl text-gray-300 mb-6 font-medium">
											Frontend Developer
											<span className="mx-2 opacity-70">•</span>
											<span className="main-subtitle text-sm">Санкт-Петербург</span>
										</p>
										<div className="title-tags flex gap-3 flex-wrap">
											{['React', 'JavaScript', 'SCSS', 'Node.js', 'Tailwindcss'].map((tag) => (
												<span key={tag} className="tag bg-primary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold border border-primary/30 transition-all duration-300 hover:bg-primary/25 hover:-translate-y-0.5">
													{tag}
												</span>
											))}
										</div>
									</div>
								</div>

								<div className="hero-text">
									<h2 className="text-3xl sm:text-4xl leading-tight mb-6 bg-gradient-to-r from-light to-primary bg-clip-text text-transparent">Создаю современные веб-приложения</h2>
									<p className="text-lg text-gray-300 mb-10 max-w-2xl leading-relaxed">
										Специализируюсь на разработке пользовательских интерфейсов с использованием React, JavaScript и современных подходов к фронтенд-разработке.
										Каждый проект - это решение конкретной бизнес-задачи.
									</p>
									<div className="tech-stack flex gap-4 mb-10 flex-wrap">
										<span className="tech-badge bg-primary/10 px-4 py-2 rounded-full flex items-center gap-3 border border-primary/30 transition-all duration-300 font-medium hover:bg-primary/20 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(102,126,234,0.2)]"><FaReact className="text-primary text-lg" /> React</span>
										<span className="tech-badge bg-primary/10 px-4 py-2 rounded-full flex items-center gap-3 border border-primary/30 transition-all duration-300 font-medium hover:bg-primary/20 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(102,126,234,0.2)]"><FaNodeJs className="text-primary text-lg" /> Node.js</span>
										<span className="tech-badge bg-primary/10 px-4 py-2 rounded-full flex items-center gap-3 border border-primary/30 transition-all duration-300 font-medium hover:bg-primary/20 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(102,126,234,0.2)]"><FaDatabase className="text-primary text-lg" /> Databases</span>
									</div>
									<div className="hero-buttons flex gap-6 flex-wrap">
										<a
											href="#contact"
											className="cta-button primary"
											onClick={() => trackButtonClick('hero_contact_button')}
										>
											Обсудить проект
										</a>
									</div>
								</div>
							</div>

							<div className="hero-image">
								<div className="code-window bg-gray-700 rounded-2xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.4)] border border-primary/20 transform perspective-1000 -rotate-y-2 transition-transform duration-500 hover:rotate-y-0">
									<div className="window-header bg-gray-800 px-6 py-3 flex items-center gap-3 border-b border-primary/10">
										<span className="dot w-3.5 h-3.5 rounded-full bg-red-500"></span>
										<span className="dot w-3.5 h-3.5 rounded-full bg-yellow-500"></span>
										<span className="dot w-3.5 h-3.5 rounded-full bg-green-500"></span>
										<span className="window-title ml-auto text-sm text-gray-400 font-mono">portfolio.js</span>
									</div>
									<div className="code-content p-3 sm:p-6 md:p-8 overflow-x-auto">
										<pre className="text-teal-300 font-mono text-[11px] sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap sm:whitespace-pre max-w-full break-words sm:break-normal">
											{`// Мой стек технологий
const techStack = {
  frontend: ["React", "Node JS", "JavaScript"],
  styling: ["CSS3", "SCSS", "Tailwind"],
  tools: ["Git", "Vite", "Figma"],
  backend: ["Express", "MongoDB", "SQLite"]
}

// Доступен для вашего проекта
function startProject(requirements) {
  return develop({
    deadline: "в срок",
    quality: "высокая",
    communication: "прозрачная"
  })
}

// Готова к сотрудничеству!
const isAvailable = true;`}
										</pre>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<TimelineResult />

				<section id="portfolio" className="portfolio py-20 animate-fade-in">
					<div className="container">
						<h2 className="section-title">Готовые решения</h2>
						<p className="section-subtitle">Примеры реализованных блоков, компонентов и элементов интерфейса для различных проектов</p>

						<div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
							{portfolioItems.map((item, index) => (
								<div key={item.id} className="portfolio-card bg-gradient-to-br from-gray-900/70 to-dark/90 rounded-2xl p-8 transition-all duration-500 border border-primary/15 relative overflow-hidden h-full flex flex-col hover:-translate-y-4 hover:border-primary/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)]" onClick={() => trackProjectClick(item.title)}>
									<div className="card-icon text-4xl text-primary mb-6 transition-transform duration-300">{item.icon}</div>
									<h3 className="text-xl font-bold text-light mb-4">{item.title}</h3>
									<p className="text-gray-300 leading-relaxed mb-6 flex-grow">{item.description}</p>
									<div className="tech-tags flex flex-wrap gap-2 mb-8">
										{item.tech.map((tech, idx) => (
											<span key={idx} className="tech-tag bg-primary/15 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-primary/30 transition-all duration-300 hover:bg-primary/25 hover:-translate-y-0.5">{tech}</span>
										))}
									</div>
									<div className="card-buttons flex gap-4 mt-auto">
										<a
											href={item.demo}
											target="_blank"
											rel="noopener noreferrer"
											className="card-demo flex-1 text-center px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-primary to-secondary text-white border-none cursor-pointer hover:bg-gradient-to-r hover:from-accentLight hover:to-accent hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(79,172,254,0.3)]"
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												trackEvent('project_demo_click', 'portfolio', item.title);
												window.open(item.demo, '_blank', 'noopener,noreferrer');
											}}
										>
											Демо →
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				<section id="about" className="about py-20 animate-fade-in">
					<div className="container">
						<div className="about-content max-w-4xl mx-auto">
							<div className="about-text">
								<h2 className="section-title">Обо мне</h2>
								<p className="text-lg text-gray-300 text-center mb-12 leading-relaxed max-w-3xl mx-auto">
									Фронтенд-разработчик с фокусом на создании интуитивных и производительных интерфейсов.
									Имею опыт работы с современными технологиями и фреймворками.
									Верю, что качественный код — это код, который решает проблемы пользователей и бизнеса.
								</p>

								<div className="about-details grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
									<div className="detail-item bg-gray-900/50 p-8 rounded-xl border border-primary/10 transition-transform duration-300 hover:-translate-y-2 hover:border-primary/30">
										<h4 className="text-xl font-semibold text-light mb-4">Подход к работе</h4>
										<p className="text-gray-300">Анализирую задачу, предлагаю оптимальное решение, тестирую и оптимизирую результат.</p>
									</div>
									<div className="detail-item bg-gray-900/50 p-8 rounded-xl border border-primary/10 transition-transform duration-300 hover:-translate-y-2 hover:border-primary/30">
										<h4 className="text-xl font-semibold text-light mb-4">Коммуникация</h4>
										<p className="text-gray-300">Прозрачная работа, регулярные отчеты о прогрессе, открытость к правкам.</p>
									</div>
									<div className="detail-item bg-gray-900/50 p-8 rounded-xl border border-primary/10 transition-transform duration-300 hover:-translate-y-2 hover:border-primary/30">
										<h4 className="text-xl font-semibold text-light mb-4">Технологии</h4>
										<p className="text-gray-300">Постоянно изучаю новые инструменты и лучшие практики разработки.</p>
									</div>
								</div>

								<div className="stats grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
									<div className="stat bg-gradient-to-br from-gray-900/70 to-dark/90 p-8 rounded-xl text-center border border-primary/15 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
										<div className="stat-number block text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">10+</div>
										<div className="stat-label text-gray-300 font-medium">Проектов</div>
									</div>
									<div className="stat bg-gradient-to-br from-gray-900/70 to-dark/90 p-8 rounded-xl text-center border border-primary/15 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
										<div className="stat-number block text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"><span className="text-3xl">100%</span></div>
										<div className="stat-label text-gray-300 font-medium">Соблюдение сроков</div>
									</div>
									<div className="stat bg-gradient-to-br from-gray-900/70 to-dark/90 p-8 rounded-xl text-center border border-primary/15 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
										<div className="stat-number block text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">24/7</div>
										<div className="stat-label text-gray-300 font-medium">Поддержка</div>
									</div>
									<div className="stat bg-gradient-to-br from-gray-900/70 to-dark/90 p-8 rounded-xl text-center border border-primary/15 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
										<div className="stat-number block text-4xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">2+</div>
										<div className="stat-label text-gray-300 font-medium">Года опыта</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="contact" className="contact py-20 bg-black/20 animate-fade-in">
					<div className="container">
						<h2 className="section-title">Свяжитесь со мной</h2>
						<p className="section-subtitle">Готова обсудить ваш проект и предложить решение</p>

						<div className="security-note flex items-center justify-center gap-3 px-6 py-4 bg-primary/10 border border-primary/25 rounded-xl max-w-xs mx-auto my-8 text-primary font-semibold text-sm md:text-base backdrop-blur-sm">
							<FaRobot className="text-lg" />
							<span>Форма защищена от спама и ботов</span>
						</div>

						<div className="contact-grid grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-12">
							<div className="contact-info">
								<div className="contact-block mb-10">
									<h3 className="text-xl font-semibold text-light mb-6 pb-3 border-b-2 border-primary/30">Прямые контакты</h3>
									<a href={`mailto:${CONFIG.CONTACT_EMAIL}`} className="contact-item flex items-start gap-4 p-4 bg-gray-900/40 rounded-xl mb-4 text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:translate-x-2"
										onClick={() => trackEvent('contact_click', 'engagement', 'Email Contact')}>
										<FiMail className="text-primary text-xl mt-1 shrink-0" />
										<div>
											<span className="contact-label block text-sm text-gray-400 mb-1">Email для заказов</span>
											<span className="contact-value block text-base font-semibold text-light">{CONFIG.CONTACT_EMAIL}</span>
										</div>
									</a>
									<a href={`tel:${CONFIG.CONTACT_PHONE.replace(/\s/g, '')}`} className="contact-item flex items-start gap-4 p-4 bg-gray-900/40 rounded-xl mb-4 text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:translate-x-2"
										onClick={() => trackEvent('contact_click', 'engagement', 'Phone Contact')}>
										<FiPhone className="text-primary text-xl mt-1 shrink-0" />
										<div>
											<span className="contact-label block text-sm text-gray-400 mb-1">Телефон / WhatsApp</span>
											<span className="contact-value block text-base font-semibold text-light">{CONFIG.CONTACT_PHONE}</span>
										</div>
									</a>
									<a href="https://t.me/vorobjevaa" target="_blank" rel="noopener noreferrer" className="contact-item flex items-start gap-4 p-4 bg-gray-900/40 rounded-xl mb-4 text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:translate-x-2"
										onClick={() => trackEvent('social_click', 'engagement', 'Telegram Profile')}>
										<FiSend className="text-primary text-xl mt-1 shrink-0" />
										<div>
											<span className="contact-label block text-sm text-gray-400 mb-1">Telegram</span>
											<span className="contact-value block text-base font-semibold text-light">@vorobjevaa</span>
											<span className="contact-note text-xs text-gray-400 mt-1">Быстрый ответ</span>
										</div>
									</a>
								</div>
								<div className="contact-block">
									<h3 className="text-xl font-semibold text-light mb-4">Время работы</h3>
									<div className="working-hours bg-gray-900/40 p-6 rounded-xl border border-primary/10 mt-8">
										<p className="text-gray-300 mb-2 text-sm md:text-base">Пн-Пт: 10:00 - 19:00</p>
										<p className="text-gray-300 mb-2 text-sm md:text-base">Сб-Вс: по договоренности</p>
										<p className="note text-xs text-gray-400 italic mt-4 pt-4 border-t border-primary/10">В Telegram отвечаю быстрее</p>
									</div>
								</div>
							</div>

							<div className="contact-form-container">
								<form className="contact-form bg-gradient-to-br from-gray-900/70 to-dark/90 p-8 rounded-2xl border border-primary/15" onSubmit={handleSubmit} ref={formRef} noValidate>
									<div className="honeypot-field hidden">
										<input type="text" id="url" name="url" tabIndex="-1" autoComplete="off" ref={honeypotRef} />
									</div>

									<div className="form-group">
										<label htmlFor="name" className="block mb-2 text-light font-medium">Имя *</label>
										<input
											type="text"
											id="name"
											value={formData.name}
											onChange={(e) => {
												setFormData({ ...formData, name: e.target.value });
												trackFormInteraction('input', 'Name');
											}}
											className={`form-group input ${errors.name ? 'border-error' : formData.name.length >= 2 ? 'border-success' : ''}`}
											placeholder="Ваше имя"
										/>
										{errors.name && <span className="validation-error">{errors.name}</span>}
									</div>

									<div className="form-group">
										<label htmlFor="email" className="block mb-2 text-light font-medium">Email *</label>
										<input
											type="email"
											id="email"
											value={formData.email}
											onChange={(e) => {
												setFormData({ ...formData, email: e.target.value });
												trackFormInteraction('input', 'Email');
											}}
											className={`form-group input ${errors.email ? 'border-error' : validateEmail(formData.email) ? 'border-success' : ''}`}
											placeholder="example@email.com"
										/>
										{errors.email && <span className="validation-error">{errors.email}</span>}
									</div>

									<div className="form-group">
										<label htmlFor="message" className="block mb-2 text-light font-medium">Сообщение *</label>
										<textarea
											id="message"
											value={formData.message}
											onChange={(e) => {
												setFormData({ ...formData, message: e.target.value });
												trackFormInteraction('input', 'Message');
											}}
											className={`form-group input ${errors.message ? 'border-error' : formData.message.length >= 10 ? 'border-success' : ''}`}
											placeholder="Ваше сообщение (минимум 10 символов)"
											rows="4"
										/>
										<div className="char-counter">
											{formData.message.length < 10 ? (
												<div className="char-count">
													<span className="min-chars opacity-70 text-sm">минимум символов:</span>
													<span className="count font-semibold text-error">{formData.message.length}/10</span>
												</div>
											) : (
												<div className="char-ok animate-fade-in">
													<span className="ok-text bg-success/10 px-3 py-1 rounded-full text-sm">OK</span>
												</div>
											)}
										</div>
										{errors.message && <span className="validation-error">{errors.message}</span>}
									</div>

									<div className="captcha-section">
										<div className="captcha-header">
											<label className="text-lg font-bold text-light flex items-center gap-2">
												Подтвердите, что вы не робот *
											</label>
											<button
												type="button"
												className="refresh-captcha bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-pointer transition-all duration-300 font-medium border-none hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(102,126,234,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
												onClick={() => {
													generateCaptcha();
													trackEvent('captcha_refresh', 'security', 'Refresh CAPTCHA');
												}}
												disabled={formStatus.loading}
											>
												<FiRefreshCw className="text-sm" /> Новая задача
											</button>
										</div>

										<div className="captcha-container">
											<div className="captcha-question">
												<span className="captcha-icon text-2xl">🧮</span>
												<span className="captcha-text text-xl font-bold text-light font-mono">{captcha.question}</span>
											</div>

											<div className="captcha-input-group">
												<input
													type="text"
													placeholder="Введите ответ цифрами"
													value={captcha.userAnswer}
													onChange={handleCaptchaChange}
													required
													disabled={formStatus.loading}
													pattern="[0-9]*"
													inputMode="numeric"
													maxLength="3"
												/>
												<span className="captcha-hint absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 italic">Только цифры</span>
											</div>
										</div>
									</div>

									<button
										type="submit"
										className={`submit-button w-full p-4 text-white rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden shadow-[0_4px_15px_rgba(102,126,234,0.3)] mt-5 ${formStatus.loading ? 'loading' : ''} ${formStatus.error ? 'error-state' : ''} ${!isFormValid ? 'disabled' : ''}`}
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
										<div className={`form-feedback ${formStatus.success ? 'success' : 'error'}`}>
											<div className="feedback-content">
												{formStatus.success ?
													<FiCheck className="feedback-icon success-icon text-success text-xl" /> :
													<FiAlertCircle className="feedback-icon error-icon text-error text-xl" />
												}
												<span className="feedback-text">{formStatus.message}</span>
											</div>
											{formStatus.error && (
												<div className="error-details">
													<p className="error-help flex items-center gap-2 text-sm text-gray-300 mt-3">
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
						</div>
					</div>
				</section>

				{showAnalytics && (
					<div className="analytics-modal-overlay" onClick={() => setShowAnalytics(false)}>
						<div className="analytics-modal" onClick={(e) => e.stopPropagation()}>
							<div className="analytics-modal-header flex justify-between items-center mb-6 pb-4 border-b border-white/10">
								<h2 className="analytics-modal-title text-2xl text-accent flex items-center gap-3">
									<FiBarChart2 /> Статистика посещений
								</h2>
								<button
									className="analytics-modal-close bg-transparent border-none text-white text-2xl w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-white/10 hover:rotate-90"
									onClick={() => setShowAnalytics(false)}
									aria-label="Закрыть статистику"
								>
									<FiX />
								</button>
							</div>
							<div className="analytics-modal-content max-h-[calc(85vh-150px)] overflow-y-auto py-4">
								{shouldShowAnalytics ? (
									<AnalyticsDashboard />
								) : (
									<div className="analytics-dev-message text-center p-12 bg-white/5 rounded-2xl border border-white/10">
										<h3 className="text-xl text-accent mb-4">📊 Статистика доступна только на продакшн-сайте</h3>
										<p className="text-gray-300 mb-2 leading-relaxed">В режиме разработки данные аналитики не собираются.</p>
										<p className="text-gray-300 leading-relaxed">После деплоя на хостинг здесь будет отображаться реальная статистика посещений.</p>
									</div>
								)}
							</div>
							<div className="analytics-modal-footer mt-6 pt-4 border-t border-white/10 text-center text-gray-400 text-sm">
								<p><small>Данные обновляются в реальном времени с Google Analytics</small></p>
							</div>
						</div>
					</div>
				)}

				<footer className="footer py-8 md:py-12 bg-dark/90 border-t border-primary/10 animate-fade-in">
					<div className="container px-4 sm:px-6">
						<div className="footer-content flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8 gap-6">
							<div className="footer-logo text-center md:text-left order-1 md:order-1">
								<h3 className="text-lg md:text-xl font-bold text-light mb-2">Наталья Воробьева</h3>
								<p className="text-gray-400 text-xs md:text-sm">Frontend Developer</p>
							</div>

							<div className="footer-links flex flex-wrap gap-3 md:gap-4 justify-center order-3 md:order-2 mt-4 md:mt-0">
								<a
									href="#home"
									className="text-gray-300 no-underline transition-colors duration-300 font-medium hover:text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-white/5"
									onClick={() => trackEvent('footer_navigation', 'engagement', 'Home')}
								>
									Главная
								</a>
								<a
									href="#portfolio"
									className="text-gray-300 no-underline transition-colors duration-300 font-medium hover:text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-white/5"
									onClick={() => trackEvent('footer_navigation', 'engagement', 'Portfolio')}
								>
									Портфолио
								</a>
								<a
									href="#about"
									className="text-gray-300 no-underline transition-colors duration-300 font-medium hover:text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-white/5"
									onClick={() => trackEvent('footer_navigation', 'engagement', 'About')}
								>
									Обо мне
								</a>
								<a
									href="#contact"
									className="text-gray-300 no-underline transition-colors duration-300 font-medium hover:text-primary text-xs md:text-sm px-2 py-1 rounded hover:bg-white/5"
									onClick={() => trackEvent('footer_navigation', 'engagement', 'Contact')}
								>
									Контакты
								</a>
							</div>

							<div className="footer-social flex gap-3 md:gap-4 order-2 md:order-3">
								<a
									href="https://t.me/vorobjevaa"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gray-900/40 rounded-xl text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:scale-105 active:scale-95"
									onClick={() => trackEvent('social_click', 'engagement', 'Telegram Profile')}
									aria-label="Telegram"
								>
									<FiSend className="text-base md:text-lg" />
								</a>
								<button
									className="analytics-trigger hidden-style cursor-none bg-transparent border-0"
									onClick={toggleAnalytics}
									aria-hidden="true"
								></button>
							</div>
						</div>

						<div className="footer-bottom text-center pt-6 md:pt-8 border-t border-primary/10">
							<p className="text-gray-400 text-xs md:text-sm mb-2">
								© Наталья Воробьева. Все права защищены {new Date().getFullYear()}
							</p>
							<p className="footer-note text-xs text-gray-500 mb-2">
								Сайт-портфолио фронтенд-разработчика
							</p>
							<p className="analytics-info text-xs text-gray-600">
								<small>Используется Google Analytics для сбора анонимной статистики посещений</small>
							</p>
						</div>
					</div>
				</footer>

				{isCodeModalOpen && (
					<div className="code-modal-overlay" onClick={closeCodeModal}>
						<div className="code-modal" onClick={(e) => e.stopPropagation()}>
							<div className="code-modal-header flex justify-between items-center mb-6">
								<div className="code-file-info flex items-center gap-3">
									<FiFileText className="file-icon text-primary text-xl" />
									<h3 className="text-xl font-bold text-light">{codeFiles[currentCodeIndex].name}</h3>
									<span className="code-language bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
										{codeFiles[currentCodeIndex].language}
									</span>
								</div>
								<button className="close-modal-btn bg-transparent border-none text-white text-xl cursor-pointer hover:opacity-70" onClick={closeCodeModal}>
									<FiX />
								</button>
							</div>

							<div className="code-navigation flex justify-between items-center mb-6">
								<button
									className="nav-btn prev-btn flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 cursor-pointer transition-all duration-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
									onClick={prevCode}
									disabled={codeFiles.length <= 1}
								>
									<FiChevronLeft /> Предыдущий
								</button>

								<div className="nav-indicator">
									<span className="current-index bg-primary/20 text-primary px-4 py-2 rounded-lg font-bold">{currentCodeIndex + 1}/{codeFiles.length}</span>
								</div>

								<button
									className="nav-btn prev-btn flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 border border-gray-700 cursor-pointer transition-all duration-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
									onClick={nextCode}
									disabled={codeFiles.length <= 1}
								>
									Следующий <FiChevronRight />
								</button>
							</div>

							<div className="file-thumbnails flex flex-wrap gap-2 mb-6">
								{codeFiles.map((file, index) => (
									<button
										key={file.id}
										className={`file-thumbnail flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${index === currentCodeIndex ? 'bg-primary/30 text-primary border border-primary/50' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}
										onClick={() => setCurrentCodeIndex(index)}
									>
										<FiFileText />
										<span>{file.name}</span>
									</button>
								))}
							</div>

							<div className="code-container bg-gray-900 rounded-xl overflow-hidden flex-1 flex flex-col">
								<div className="code-header bg-gray-800 px-4 py-3 flex justify-between items-center">
									<span className="line-numbers text-sm text-gray-400">Строки: {codeFiles[currentCodeIndex].content.split('\n').length}</span>
									<button
										className={`copy-btn px-4 py-2 rounded-lg font-medium transition-all duration-300 ${copied ? 'bg-success/20 text-success' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}
										onClick={handleCopy}
									>
										{copied ? 'Скопировано!' : 'Скопировать код'}
									</button>
								</div>
								<div className="code-content flex-1 overflow-auto p-4">
									<pre className="m-0">
										<code className={`language-${codeFiles[currentCodeIndex].language} text-sm`}>
											{codeFiles[currentCodeIndex].content}
										</code>
									</pre>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;