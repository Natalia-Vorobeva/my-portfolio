import React, { useState, useEffect, useRef, useLayoutEffect, Suspense } from 'react';
import './App.scss';
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
import './components/Backgrounds.scss'
import foto from './assets/images/Fotoram.io.jpg'
import AnalyticsDashboard from './components/AnalyticsDashboard.jsx';
// import GoogleAnalytics from './components/GoogleAnalytics';
import TimelineResults from './components/TimelineResults.jsx';
const BackgroundSwitcher = React.lazy(() => import('./components/BackgroundSwitcher'));
const BackgroundToggleButton = React.lazy(() => import('./components/BackgroundToggleButton'));

// Функция для трекинга событий с проверкой на разработку
const trackEvent = (action, category, label, value = null) => {
	// Проверяем, не находимся ли мы на localhost
	const isLocalhost = window.location.hostname === 'localhost' ||
		window.location.hostname.includes('127.0.0.1') ||
		window.location.hostname.includes('::1');

	// Проверяем режим разработки
	const isDevelopment = import.meta.env.VITE_DEMO_MODE

	// Если это разработка, логируем в консоль, но не отправляем в GA
	if (isLocalhost || isDevelopment) {
		// console.log('[DEV Analytics]', {
		// 	action,
		// 	category,
		// 	label,
		// 	value,
		// 	hostname: window.location.hostname,
		// 	path: window.location.pathname
		// });
		return; // Не отправляем события в GA
	}

	// Отправляем только в продакшене
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

	// проверить env
	const [backgroundType, setBackgroundType] = useState('neon-waves')
	const [isBackgroundReady, setIsBackgroundReady] = useState(false);
	const [codeFiles, setCodeFiles] = useState(null)

	// Новое состояние для отображения статистики
	const [showAnalytics, setShowAnalytics] = useState(false)

	// Состояние формы
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		message: ''
	})

	// Состояние капчи
	const [captcha, setCaptcha] = useState({
		question: '',
		answer: 0,
		userAnswer: ''
	})

	// Состояние отправки формы
	const [formStatus, setFormStatus] = useState({
		loading: false,
		success: false,
		error: false,
		message: ''
	})

	const isFormValid = formData.name && formData.email && formData.message
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [activeSection, setActiveSection] = useState('home')
	const [isVisible, setIsVisible] = useState(false)
	const [formStartTime] = useState(Date.now())
	const honeypotRef = useRef(null)
	const menuRef = useRef(null)
	const formRef = useRef(null)

	const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)
	const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
	const [copied, setCopied] = useState(false)

	// Определяем, показывать ли раздел статистики
	const shouldShowAnalytics = !window.location.hostname.includes('localhost') &&
		!window.location.hostname.includes('127.0.0.1') &&
		CONFIG.IS_PRODUCTION;

	// Добавьте в начало компонента после useState
	useEffect(() => {
		// Функция для плавного скролла
		const handleSmoothScroll = (e) => {
			const target = e.target.closest('a[href^="#"]');
			if (target) {
				e.preventDefault();
				const id = target.getAttribute('href');
				if (id === '#') return;

				const element = document.querySelector(id);
				if (element) {
					const headerOffset = 80; // Высота хедера
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
		}, 100); // Небольшая задержка для стабильности

		return () => clearTimeout(timer);
	}, []);

	// Трекинг просмотра портфолио
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

	// Функция для открытия/закрытия статистики
	const toggleAnalytics = () => {
		setShowAnalytics(!showAnalytics);
		trackEvent('analytics_toggle', 'engagement', showAnalytics ? 'Close Analytics' : 'Open Analytics');
	};

	useLayoutEffect(() => {
		if (isCodeModalOpen) {
			const codeElements = document.querySelectorAll('.code-content code')
			codeElements.forEach((element) => {
				Prism.highlightElement(element)
			});
		}
	}, [isCodeModalOpen, currentCodeIndex])

	const handleCopy = () => {
		navigator.clipboard.writeText(codeFiles[currentCodeIndex].content)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
		trackEvent('code_copy', 'engagement', 'Copy Code');
	}

	// Функции для навигации
	const nextCode = () => {
		setCurrentCodeIndex((prev) =>
			prev === codeFiles.length - 1 ? 0 : prev + 1
		)
	}

	const prevCode = () => {
		setCurrentCodeIndex((prev) =>
			prev === 0 ? codeFiles.length - 1 : prev - 1
		)
	}

	const openCodeModal = (index) => {
		setIsCodeModalOpen(true)
		setCurrentCodeIndex(0)
		setCodeFiles(portfolioItems[index].code)
		trackEvent('view_code', 'portfolio', portfolioItems[index].title);
	}

	const closeCodeModal = () => {
		setIsCodeModalOpen(false)
	}

	// Генерируем капчу при загрузке компонента
	useEffect(() => {
		generateCaptcha()
	}, [])

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsMenuOpen(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [])

	// Генерация математической капчи
	const generateCaptcha = () => {
		const operators = ['+', '-', '×']
		const operator = operators[Math.floor(Math.random() * operators.length)]
		let num1, num2, answer

		switch (operator) {
			case '+':
				num1 = Math.floor(Math.random() * 10) + 1
				num2 = Math.floor(Math.random() * 10) + 1
				answer = num1 + num2
				break
			case '-':
				num1 = Math.floor(Math.random() * 10) + 5
				num2 = Math.floor(Math.random() * 5) + 1
				answer = num1 - num2
				break
			case '×':
				num1 = Math.floor(Math.random() * 5) + 1
				num2 = Math.floor(Math.random() * 5) + 1
				answer = num1 * num2
				break
			default:
				num1 = 2
				num2 = 3
				answer = 5
		}

		setCaptcha({
			question: `Сколько будет ${num1} ${operator} ${num2}?`,
			answer: answer,
			userAnswer: ''
		})
		trackEvent('captcha_generated', 'security', 'Generate New Captcha');
	}

	const handleCaptchaChange = (e) => {
		const value = e.target.value.replace(/[^0-9]/g, '') // Только цифры
		setCaptcha(prev => ({
			...prev,
			userAnswer: value
		}))
		trackFormInteraction('captcha_input', 'CAPTCHA');
	}

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return re.test(email)
	}

	const [errors, setErrors] = useState({})

	const validateForm = () => {
		const newErrors = {}

		// Имя - разрешаем апостроф
		if (!formData.name.trim()) {
			newErrors.name = 'Имя обязательно'
		} else if (formData.name.trim().length < 2) {
			newErrors.name = 'Имя слишком короткое'
		}

		// Email - используем более гибкую валидацию
		if (!formData.email.trim()) {
			newErrors.email = 'Email обязателен'
		} else {
			// Более гибкая проверка email (разрешает апостроф)
			const emailRegex = /^[^\s@']+@[^\s@']+\.[^\s@']+$/;
			if (!emailRegex.test(formData.email)) {
				newErrors.email = 'Введите корректный email'
			}
		}

		// Сообщение - разрешаем апостроф
		const message = formData.message.trim();
		if (!message) {
			newErrors.message = 'Сообщение обязательно'
		} else if (message.length < 10) {
			newErrors.message = 'Сообщение слишком короткое (минимум 10 символов)'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	// Отправка формы
	const handleSubmit = async (e) => {
		e.preventDefault()

		// Трекинг отправки формы
		trackEvent('form_submit_attempt', 'contact', 'Contact Form Submit');

		if (!validateForm()) {
			trackEvent('form_validation_failed', 'contact', 'Form Validation Failed');
			return
		}

		// Сброс статуса
		setFormStatus({ loading: false, success: false, error: false, message: '' })

		// Проверка honeypot поля
		if (honeypotRef.current && honeypotRef.current.value) {
			setFormStatus({
				loading: false,
				success: false,
				error: true,
				message: 'Обнаружена подозрительная активность'
			})
			trackEvent('spam_detected', 'security', 'Honeypot Field Triggered');
			generateCaptcha()
			return
		}

		// Проверка капчи
		const userAnswer = parseInt(captcha.userAnswer.trim())
		if (isNaN(userAnswer) || userAnswer !== captcha.answer) {
			setFormStatus({
				loading: false,
				success: false,
				error: true,
				message: '❌ Неверный ответ на капчу. Попробуйте еще раз.'
			})
			trackEvent('captcha_failed', 'security', 'Wrong CAPTCHA Answer');
			generateCaptcha()
			return
		}

		// Проверка времени заполнения
		const formFillTime = Date.now() - formStartTime
		if (formFillTime < 2000) {
			setFormStatus({
				loading: false,
				success: false,
				error: true,
				message: '⚠️ Форма заполнена слишком быстро'
			})
			trackEvent('form_too_fast', 'security', 'Form Filled Too Quickly');
			generateCaptcha()
			return
		}

		// Валидация email
		if (!validateEmail(formData.email)) {
			setFormStatus({
				loading: false,
				success: false,
				error: true,
				message: '❌ Введите корректный email'
			})
			trackEvent('email_validation_failed', 'contact', 'Invalid Email Format');
			return
		}

		// Проверка длины сообщения
		if (formData.message.length < 10) {
			setFormStatus({
				loading: false,
				success: false,
				error: true,
				message: '❌ Сообщение слишком короткое (минимум 10 символов)'
			})
			trackEvent('message_too_short', 'contact', 'Message Length Validation Failed');
			return
		}

		// Демо-режим (если нет токена)
		if (CONFIG.DEMO_MODE) {
			setFormStatus({
				loading: true,
				success: false,
				error: false,
				message: '⏳ Демо-режим: имитация отправки...'
			})

			setTimeout(() => {
				setFormStatus({
					loading: false,
					success: true,
					error: false,
					message: `✅ Демо: Форма работает! Настройте Telegram бота в .env.local файле.\n\nТокен бота: ${CONFIG.TELEGRAM_BOT_TOKEN ? '✓ Установлен' : '✗ Отсутствует'}\nChat ID: ${CONFIG.TELEGRAM_CHAT_ID ? '✓ Установлен' : '✗ Отсутствует'}`
				})

				setFormData({ name: '', email: '', message: '' })
				generateCaptcha()

				trackEvent('form_demo_success', 'contact', 'Demo Mode Form Submission');

				setTimeout(() => {
					setFormStatus({ loading: false, success: false, error: false, message: '' })
				}, 8000)
			}, 1500)
			return
		}

		setFormStatus({
			loading: true,
			success: false,
			error: false,
			message: '⏳ Отправка в Telegram...'
		})

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
      `

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
			})

			const result = await response.json()

			if (result.ok) {
				setFormStatus({
					loading: false,
					success: true,
					error: false,
					message: '✅ Заявка отправлена в Telegram! Я свяжусь с вами в ближайшее время.'
				})

				// Трекинг успешной отправки
				trackEvent('form_submit_success', 'contact', 'Telegram Message Sent', 1);

				// Очистка формы
				setFormData({ name: '', email: '', message: '' })
				generateCaptcha()

				// Сброс статуса через 5 секунд
				setTimeout(() => {
					setFormStatus({ loading: false, success: false, error: false, message: '' })
				}, 5000)
			} else {
				throw new Error(result.description || 'Ошибка Telegram API')
			}
		} catch (error) {
			console.error('Ошибка отправки в Telegram:', error)

			let errorMessage = '❌ Ошибка отправки. '

			if (error.message.includes('chat not found')) {
				errorMessage += 'Chat ID неверный. Проверьте .env.local файл.'
			} else if (error.message.includes('Not Found')) {
				errorMessage += 'Токен бота неверный. Проверьте .env.local файл.'
			} else if (error.message.includes('Network Error')) {
				errorMessage += 'Проблемы с сетью. Попробуйте использовать VPN.'
			} else {
				errorMessage += 'Попробуйте еще раз или свяжитесь другим способом.'
			}

			setFormStatus({
				loading: false,
				success: false,
				error: true,
				message: errorMessage
			})

			// Трекинг ошибки отправки
			trackEvent('form_submit_error', 'contact', error.message || 'Unknown Error');

			generateCaptcha()
		}
	}





	return (
		<div className={`app ${isCodeModalOpen ? "no-scroll" : ""}`}>


			{!isBackgroundReady && (
				<div className="simple-background">
					<div className="simple-gradient"></div>
				</div>
			)}

			{/* Ленивая загрузка фонов */}
			<Suspense fallback={
				<div className="background-loading-placeholder">
					<div className="pulse-gradient"></div>
				</div>
			}>
				{isBackgroundReady && <BackgroundSwitcher backgroundType={backgroundType} />}

				{/* Кнопка переключения фона тоже лениво */}
				<BackgroundToggleButton
					backgroundType={backgroundType}
					setBackgroundType={setBackgroundType}
				/>
			</Suspense>

			<div className="content-wrapper">
				<header className="header">
					<div className="container">
						<div className="header-left">
							<div className="header-avatar">
								<button
									onClick={() => {
										window.scrollTo({
											top: 0,
											behavior: 'smooth'
										});
										trackEvent('navigation', 'engagement', 'Scroll to Top');
									}}
									className="avatar-scroll-btn"
									aria-label="Вернуться наверх"
								>
									<img
										src={foto}
										alt="Наталья Воробьева"
										className="avatar-small"
									/>
								</button>
							</div>
							<div className="header-name">
								<h1 className="name-title">Наталья Воробьева</h1>
								<p className="name-subtitle">Frontend Developer</p>
							</div>
						</div>

						<nav className="nav">
							<a href="#home" className="nav-link active" onClick={() => trackEvent('navigation', 'engagement', 'Home Section')}>
								<FiHome /> Главная
							</a>
							<a href="#portfolio" className="nav-link" onClick={() => trackEvent('navigation', 'engagement', 'Portfolio Section')}>
								Портфолио
							</a>
							<a href="#about" className="nav-link" onClick={() => trackEvent('navigation', 'engagement', 'About Section')}>
								Обо мне
							</a>
							<a href="#contact" className="nav-link" onClick={() => trackEvent('navigation', 'engagement', 'Contact Section')}>
								Контакты
							</a>
						</nav>
					</div>
				</header>

				<section id="home" className="hero">
					<div className="container">
						<div className="hero-content">
							<div className="hero-left">
								<div className="avatar-section">
									<div className="avatar-large">
										<img
											src={foto}
											alt="Наталья Воробьева"
											className="avatar-img"
										/>
										<div className="avatar-status"></div>
									</div>
									<div className="name-display">
										<h1 className="main-name">Наталья Воробьева</h1>
										<p className="main-title">
											Frontend Developer
											<span style={{ margin: "0 8px", opacity: 0.7 }}>•</span>
											<span className="main-subtitle">Санкт-Петербург</span>
										</p>

										<div className="title-tags">
											<span className="tag">React</span>
											<span className="tag">JavaScript</span>
											<span className="tag">SCSS</span>
											<span className="tag">Node.js</span>
											<span className="tag">Tailwindcss</span>
										</div>
									</div>
								</div>

								<div className="hero-text">
									<h2>Создаю современные и эффективные веб-приложения</h2>
									<p>Специализируюсь на разработке пользовательских интерфейсов с использованием React, JavaScript и современных подходов к фронтенд-разработке.
										Каждый проект - это решение конкретной бизнес-задачи.</p>
									<div className="tech-stack">
										<span className="tech-badge"><FaReact /> React</span>
										<span className="tech-badge"><FaNodeJs /> Node.js</span>
										<span className="tech-badge"><FaDatabase /> Databases</span>
									</div>
									<div className="hero-buttons">
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
								<div className="code-window">
									<div className="window-header">
										<span className="dot red"></span>
										<span className="dot yellow"></span>
										<span className="dot green"></span>
										<span className="window-title">portfolio.js</span>
									</div>
									<div className="code-content">
										<pre>{`
// Мой стек технологий
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
const isAvailable = true;`}</pre>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<TimelineResults />
				<section id="portfolio" className="portfolio">
					<div className="container">
						<h2 className="section-title">Мои проекты</h2>
						<p className="section-subtitle">Реализованные решения, демонстрирующие мой опыт и навыки</p>

						<div className="portfolio-grid">
							{portfolioItems.map((item, index) => (
								<div key={item.id} className="portfolio-card"
									onClick={() => trackProjectClick(item.title)}>
									<div className="card-icon">{item.icon}</div>
									<h3>{item.title}</h3>
									<p>{item.description}</p>
									<div className="tech-tags">
										{item.tech.map((tech, index) => (
											<span key={index} className="tech-tag">{tech}</span>
										))}
									</div>
									<div className="card-buttons">
  <a 
    href={item.demo} 
    target="_blank"
    rel="noopener noreferrer"
    className="card-demo"
    onClick={(e) => {
      e.stopPropagation(); // Останавливаем всплытие события
      e.preventDefault(); // Предотвращаем стандартное поведение
      
      trackEvent('project_demo_click', 'portfolio', item.title);
      
      // Открываем ссылку в новом окне
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
				<section id="about" className="about">
					<div className="container">
						<div className="about-content">
							<div className="about-text">
								<h2 className="section-title">Обо мне</h2>
								<p>Фронтенд-разработчик с фокусом на создании интуитивных и производительных интерфейсов. Имею опыт работы с современными технологиями и фреймворками. Верю, что качественный код — это код, который решает проблемы пользователей и бизнеса.</p>

								<div className="about-details">
									<div className="detail-item">
										<h4>Подход к работе</h4>
										<p>Анализирую задачу, предлагаю оптимальное решение, тестирую и оптимизирую результат.</p>
									</div>
									<div className="detail-item">
										<h4>Коммуникация</h4>
										<p>Прозрачная работа, регулярные отчеты о прогрессе, открытость к правкам.</p>
									</div>
									<div className="detail-item">
										<h4>Технологии</h4>
										<p>Постоянно изучаю новые инструменты и лучшие практики разработки.</p>
									</div>
								</div>

								<div className="stats">
									<div className="stat">
										<span className="stat-number">10+</span>
										<span className="stat-label">Проектов</span>
									</div>
									<div className="stat">
										<span className="stat-number"><span className="small">100%</span></span>
										<span className="stat-label">Соблюдение сроков</span>
									</div>
									<div className="stat">
										<span className="stat-number">24/7</span>
										<span className="stat-label">Поддержка</span>
									</div>
									<div className="stat">
										<span className="stat-number">2+</span>
										<span className="stat-label">Года опыта</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="contact" className="contact">
					<div className="container">
						<h2 className="section-title">Свяжитесь со мной</h2>
						<p className="section-subtitle">Готова обсудить ваш проект и предложить решение</p>

						<div className="security-note">
							<FaRobot />
							<span>Форма защищена от спама и ботов</span>
						</div>

						<div className="contact-grid">
							<div className="contact-info">
								<div className="contact-block">
									<h3>Прямые контакты</h3>
									<a href={`mailto:${CONFIG.CONTACT_EMAIL}`} className="contact-item cursor-none"
										onClick={() => trackEvent('contact_click', 'engagement', 'Email Contact')}>
										<FiMail />
										<div>
											<span className="contact-label">Email для заказов</span>
											<span className="contact-value">{CONFIG.CONTACT_EMAIL}</span>
										</div>
									</a>
									<a href={`tel:${CONFIG.CONTACT_PHONE.replace(/\s/g, '')}`} className="contact-item cursor-none"
										onClick={() => trackEvent('contact_click', 'engagement', 'Phone Contact')}>
										<FiPhone />
										<div>
											<span className="contact-label">Телефон / WhatsApp</span>
											<span className="contact-value">{CONFIG.CONTACT_PHONE}</span>
										</div>
									</a>

									<a href="https://t.me/vorobjevaa" target="_blank" rel="noopener noreferrer" className="contact-item"
										onClick={() => trackEvent('social_click', 'engagement', 'Telegram Profile')}>
										<FiSend />
										<div>
											<span className="contact-label">Telegram</span>
											<span className="contact-value">@vorobjevaa</span>
											<span className="contact-note">Быстрый ответ</span>
										</div>
									</a>
								</div>
								<div className="contact-block">
									<h3>Время работы</h3>
								</div>
								<div className="working-hours">
									<p>Пн-Пт: 10:00 - 19:00</p>
									<p>Сб-Вс: по договоренности</p>
									<p className="note">В Telegram отвечаю быстрее</p>
								</div>
							</div>

							<div className="contact-form-container">
								<form className="contact-form" onSubmit={handleSubmit} ref={formRef} noValidate>
									{/* Honeypot поле для ботов */}
									<div className="honeypot-field">
										<input
											type="text"
											id="url"
											name="url"
											tabIndex="-1"
											autoComplete="off"
											ref={honeypotRef}
										/>
									</div>

									<div className="form-group">
										<label htmlFor="name">Имя *</label>
										<input
											type="text"
											id="name"
											value={formData.name}
											onChange={(e) => {
												setFormData({ ...formData, name: e.target.value });
												trackFormInteraction('input', 'Name');
											}}
											className={errors.name ? 'error' : formData.name.length >= 2 ? 'valid' : ''}
											placeholder="Ваше имя"
										/>
										{errors.name && <span className="validation-error">{errors.name}</span>}
									</div>

									<div className="form-group">
										<label htmlFor="email">Email *</label>
										<input
											type="email"
											id="email"
											value={formData.email}
											onChange={(e) => {
												setFormData({ ...formData, email: e.target.value });
												trackFormInteraction('input', 'Email');
											}}
											className={errors.email ? 'error' : validateEmail(formData.email) ? 'valid' : ''}
											placeholder="example@email.com"
										/>
										{errors.email && <span className="validation-error">{errors.email}</span>}
									</div>

									<div className="form-group">
										<label htmlFor="message">Сообщение *</label>
										<textarea
											id="message"
											value={formData.message}
											onChange={(e) => {
												setFormData({ ...formData, message: e.target.value });
												trackFormInteraction('input', 'Message');
											}}
											className={errors.message ? 'error' : formData.message.length >= 10 ? 'valid' : ''}
											placeholder="Ваше сообщение (минимум 10 символов)"
											rows="4"
										/>

										{/* Обновленный счетчик символов */}
										<div className="char-counter">
											{formData.message.length < 10 ? (
												<div className="char-count">
													<span className="min-chars">минимум символов:</span>
													<span className="count">{formData.message.length}/10</span>
												</div>
											) : (
												<div className="char-ok">
													<span className="ok-text">OK</span>
												</div>
											)}
										</div>

										{errors.message && <span className="validation-error">{errors.message}</span>}
									</div>

									<div className="form-group captcha-section">
										<div className="captcha-header">
											<label>Подтвердите, что вы не робот *</label>
											<button
												type="button"
												className="refresh-captcha"
												onClick={() => {
													generateCaptcha();
													trackEvent('captcha_refresh', 'security', 'Refresh CAPTCHA');
												}}
												disabled={formStatus.loading}
											>
												<FiRefreshCw /> Новая задача
											</button>
										</div>

										<div className="captcha-container">
											<div className="captcha-question">
												<span className="captcha-icon">🧮</span>
												<span className="captcha-text">{captcha.question}</span>
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
												<span className="captcha-hint">Только цифры</span>
											</div>
										</div>
									</div>

									<button
										type="submit"
										className={`submit-button ${formStatus.loading ? 'loading' : ''} ${formStatus.error ? 'error-state' : ''} ${!isFormValid ? 'disabled' : ''}`}
										disabled={formStatus.loading || !isFormValid}
										onClick={() => trackFormInteraction('submit_button_click')}
									>
										{formStatus.loading ? (
											<>
												<span className="spinner"></span>
												<span className="button-text">Отправка в Telegram...</span>
											</>
										) : (
											<span className="button-text">Отправить заявку</span>
										)}
									</button>

									{formStatus.message && (
										<div className={`form-feedback ${formStatus.success ? 'success' : 'error'}`}>
											<div className="feedback-content">
												{formStatus.success ?
													<FiCheck className="feedback-icon success-icon" /> :
													<FiAlertCircle className="feedback-icon error-icon" />
												}
												<span className="feedback-text">{formStatus.message}</span>
											</div>
											{formStatus.error && (
												<div className="error-details">
													<p className="error-help">
														<FiInfo className="info-icon" />
														Проверьте подключение и настройки Telegram бота
													</p>
													<button
														className="retry-button"
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

									<div className="form-note">
										<p> Защищено от спама</p>
										<p>{CONFIG.DEMO_MODE ? 'Демо-режим (без Telegram)' : 'Отправляется в Telegram'}</p>
										<p className="privacy">
											Отправляя форму, вы соглашаетесь с обработкой персональных данных
										</p>
									</div>
								</form>
							</div>
						</div>
					</div>
				</section>

				{/* Модальное окно для статистики */}
				{showAnalytics && (
					<div className="analytics-modal-overlay" onClick={() => setShowAnalytics(false)}>
						<div className="analytics-modal" onClick={(e) => e.stopPropagation()}>
							<div className="analytics-modal-header">
								<h2 className="analytics-modal-title">
									<FiBarChart2 /> Статистика посещений
								</h2>
								<button
									className="analytics-modal-close"
									onClick={() => setShowAnalytics(false)}
									aria-label="Закрыть статистику"
								>
									<FiX />
								</button>
							</div>
							<div className="analytics-modal-content">
								{shouldShowAnalytics ? (
									<AnalyticsDashboard />
								) : (
									<div className="analytics-dev-message">
										<h3>📊 Статистика доступна только на продакшн-сайте</h3>
										<p>В режиме разработки данные аналитики не собираются.</p>
										<p>После деплоя на хостинг здесь будет отображаться реальная статистика посещений.</p>
									</div>
								)}
							</div>
							<div className="analytics-modal-footer">
								<p><small>Данные обновляются в реальном времени с Google Analytics</small></p>
							</div>
						</div>
					</div>
				)}

				<footer className="footer">
					<div className="container">
						<div className="footer-content">
							<div className="footer-logo">
								<h3>Наталья Воробьева</h3>
								<p>Frontend Developer</p>
							</div>

							<div className="footer-links">
								<a href="#home" onClick={() => trackEvent('footer_navigation', 'engagement', 'Home')}>Главная</a>
								<a href="#portfolio" onClick={() => trackEvent('footer_navigation', 'engagement', 'Portfolio')}>Портфолио</a>
								<a href="#about" onClick={() => trackEvent('footer_navigation', 'engagement', 'About')}>Обо мне</a>
								<a href="#contact" onClick={() => trackEvent('footer_navigation', 'engagement', 'Contact')}>Контакты</a>
							</div>

							<div className="footer-social">
								<a href="https://t.me/vorobjevaa" target="_blank" rel="noopener noreferrer" className="contact-item"
									onClick={() => trackEvent('social_click', 'engagement', 'Telegram Profile')}>
									<FiSend />
								</a>

								{/* Маленький элемент для открытия статистики */}
								<button
									className="analytics-trigger hidden-style"
									onClick={toggleAnalytics}
								>
								</button>
							</div>
						</div>

						<div className="footer-bottom">
							<p>© Наталья Воробьева. Все права защищены. {new Date().getFullYear()}</p>
							<p className="footer-note">Сайт-портфолио фронтенд-разработчика</p>
							{/* Информация об аналитике */}
							<p className="analytics-info">
								<small>Используется Google Analytics для сбора анонимной статистики посещений</small>
							</p>
						</div>
					</div>
				</footer>

				{isCodeModalOpen && (
					<div className="code-modal-overlay" onClick={closeCodeModal}>
						<div className="code-modal" onClick={(e) => e.stopPropagation()}>
							{/* Заголовок модального окна */}
							<div className="code-modal-header">
								<div className="code-file-info">
									<FiFileText className="file-icon" />
									<h3>{codeFiles[currentCodeIndex].name}</h3>
									<span className="code-language">
										{codeFiles[currentCodeIndex].language}
									</span>
								</div>
								<button className="close-modal-btn" onClick={closeCodeModal}>
									<FiX />
								</button>
							</div>

							{/* Навигация по файлам */}
							<div className="code-navigation">
								<button
									className="nav-btn prev-btn"
									onClick={prevCode}
									disabled={codeFiles.length <= 1}
								>
									<FiChevronLeft />
									Предыдущий
								</button>

								<div className="nav-indicator">
									<span className="current-index">{currentCodeIndex + 1}</span>
								</div>

								<button
									className="nav-btn next-btn"
									onClick={nextCode}
									disabled={codeFiles.length <= 1}
								>
									Следующий
									<FiChevronRight />
								</button>
							</div>

							{/* Список файлов (миниатюры) */}
							<div className="file-thumbnails">
								{codeFiles.map((file, index) => (
									<button
										key={file.id}
										className={`file-thumbnail ${index === currentCodeIndex ? 'active' : ''}`}
										onClick={() => setCurrentCodeIndex(index)}
									>
										<FiFileText />
										<span>{file.name}</span>
									</button>
								))}
							</div>

							{/* Область с кодом */}
							<div className="code-container">
								<div className="code-header">
									<span className="line-numbers">Строки: {codeFiles[currentCodeIndex].content.split('\n').length}</span>
									<button
										className={`copy-btn ${copied ? 'copied' : ''}`}
										onClick={handleCopy}
									>
										{copied ? 'Скопировано!' : 'Скопировать код'}
									</button>
								</div>
								<pre className="code-content">
									<code className={`language-${codeFiles[currentCodeIndex].language}`}>
										{codeFiles[currentCodeIndex].content}
									</code>
								</pre>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default App