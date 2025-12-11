import { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
	FiChevronRight
} from 'react-icons/fi';
import {
	FaReact,
	FaNodeJs,
	FaDatabase,
	// FaTicketAlt,
	// FaCheckCircle,
	// FaComments,
	FaRobot
} from 'react-icons/fa';
import foto from '../public/images/Fotoram.io.jpg'

function App() {
	const CONFIG = {
		// Telegram настройки (из .env)
		TELEGRAM_BOT_TOKEN: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || '',
		TELEGRAM_CHAT_ID: import.meta.env.VITE_TELEGRAM_CHAT_ID || '',
		DEMO_MODE: import.meta.env.VITE_DEMO_MODE === 'true' || !import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
		NODE_ENV: import.meta.env.VITE_NODE_ENV,
		// Контактная информация (из .env)
		SITE_NAME: import.meta.env.VITE_SITE_NAME || 'Портфолио Наталья Воробьевой',
		CONTACT_EMAIL: import.meta.env.VITE_CONTACT_EMAIL || 'vorobjeva.natalia76@yandex.ru',
		CONTACT_PHONE: import.meta.env.VITE_CONTACT_PHONE || '+7 (911) 208-04-79',
		PROFILE_URL: import.meta.env.VITE_PROFILE_URL,
		BOT_URL: import.meta.env.VITE_BOT_URL,

		// URL проекта
		TELEGRAM_BOT_URL: import.meta.env.VITE_TELEGRAM_BOT_TOKEN
			? `https://t.me/${import.meta.env.VITE_TELEGRAM_BOT_TOKEN.split(':')[0]}`
			: import.meta.env.VITE_BOT_URL,
	}

	const [codeFiles, setCodeFiles] = useState(null)

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

	// ========== ПЕРЕМЕННЫЕ ОКРУЖЕНИЯ ДЛЯ ОТЛАДКИ ==========
	const [envDebug, setEnvDebug] = useState({
		hasTelegramToken: !!CONFIG.TELEGRAM_BOT_TOKEN,
		hasTelegramChatId: !!CONFIG.TELEGRAM_CHAT_ID,
		isDemoMode: CONFIG.DEMO_MODE,
		envLoaded: true
	})

	const [isCodeModalOpen, setIsCodeModalOpen] = useState(false)
	const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
	const [copied, setCopied] = useState(false)


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
	}

	const handleCaptchaChange = (e) => {
		const value = e.target.value.replace(/[^0-9]/g, '') // Только цифры
		setCaptcha(prev => ({
			...prev,
			userAnswer: value
		}))
	}

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return re.test(email)
	}

	const [errors, setErrors] = useState({})

	const validateForm = () => {
		const newErrors = {}

		// Имя
		if (!formData.name.trim()) {
			newErrors.name = 'Имя обязательно'
		} else if (formData.name.trim().length < 2) {
			newErrors.name = 'Имя слишком короткое'
		}

		// Email
		if (!formData.email.trim()) {
			newErrors.email = 'Email обязателен'
		} else if (!validateEmail(formData.email)) {
			newErrors.email = 'Введите корректный email'
		}

		// Сообщение
		if (!formData.message.trim()) {
			newErrors.message = 'Сообщение обязательно'
		} else if (formData.message.trim().length < 10) {
			newErrors.message = 'Сообщение слишком короткое (минимум 10 символов)'
		}

		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}
	// Отправка формы
	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!validateForm()) {
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
			generateCaptcha()
		}
	}

	return (
		<div className={`app ${isCodeModalOpen ? "no-scroll" : ""}`}>

			<header className="header">
				<div className="container">
					<div className="header-left">
						<div className="header-avatar">
							<img
								src={foto}
								alt="Наталья Воробьева"
								className="avatar-small"
							/>
						</div>
						<div className="header-name">
							<h1 className="name-title">Наталья Воробьева</h1>
							<p className="name-subtitle">Frontend Developer</p>
						</div>
					</div>

					<nav className="nav">
						<a href="#home" className="nav-link active">
							<FiHome /> Главная
						</a>
						<a href="#portfolio" className="nav-link">
							Портфолио
						</a>
						<a href="#about" className="nav-link">
							Обо мне
						</a>
						<a href="#contact" className="nav-link">
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
									<p className="main-title">Frontend Developer</p>
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
								<p>Специализируюсь на разработке пользовательских интерфейсов с использованием React, JavaScript и современных подходов к фронтенд-разработке. Каждый проект — это решение конкретной бизнес-задачи.</p>
								<div className="tech-stack">
									<span className="tech-badge"><FaReact /> React</span>
									<span className="tech-badge"><FaNodeJs /> Node.js</span>
									<span className="tech-badge"><FaDatabase /> Databases</span>
								</div>
								<div className="hero-buttons">
									<a href="#contact" className="cta-button primary">Обсудить проект</a>
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

// Готов к сотрудничеству!
const isAvailable = true;`}</pre>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="portfolio" className="portfolio">
				<div className="container">
					<h2 className="section-title">Мои проекты</h2>
					<p className="section-subtitle">Реализованные решения, демонстрирующие мой опыт и навыки</p>

					<div className="portfolio-grid">
						{portfolioItems.map((item, index) => (
							<div key={item.id} className="portfolio-card">
								<div className="card-icon">{item.icon}</div>
								<h3>{item.title}</h3>
								<p>{item.description}</p>
								<div className="tech-tags">
									{item.tech.map((tech, index) => (
										<span key={index} className="tech-tag">{tech}</span>
									))}
								</div>
								<div className="card-buttons">
									{/* <a href={item.link}  onClick={() => openCodeModal(index)} className="card-link">
										Код <FiExternalLink />
									</a> */}

									<a href={item.demo} target="_blank" className="card-demo">
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
									<span className="stat-number small">100%</span>
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
								<a href={`mailto:${CONFIG.CONTACT_EMAIL}`} className="contact-item">
									<FiMail />
									<div>
										<span className="contact-label">Email для заказов</span>
										<span className="contact-value">{CONFIG.CONTACT_EMAIL}</span>
									</div>
								</a>
								<a href={`tel:${CONFIG.CONTACT_PHONE.replace(/\s/g, '')}`} className="contact-item">
									<FiPhone />
									<div>
										<span className="contact-label">Телефон / WhatsApp</span>
										<span className="contact-value">{CONFIG.CONTACT_PHONE}</span>
									</div>
								</a>

								<a href={CONFIG.TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer" className="contact-item">
									<FiSend />
									<div>
										<span className="contact-label">Telegram</span>
										<span className="contact-value">Написать в бота</span>
										<span className="contact-note">Быстрый ответ</span>
									</div>
								</a>
							</div>

							<div className="contact-block">
								<h3>Социальные сети</h3>
								<a href="https://t.me/vorobjevaa" target="_blank" rel="noopener noreferrer" className="contact-item">
									<FiSend />
									<div>
										<span className="contact-label">Telegram</span>
										<span className="contact-value">@vorobjevaa</span>
										<span className="contact-note">Быстрый ответ</span>
									</div>
								</a>
							</div>
							<div className="working-hours">
								<h3>Время работы</h3>
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
										onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
										onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
										onChange={(e) => setFormData({ ...formData, message: e.target.value })}
										className={errors.message ? 'error' : formData.message.length >= 10 ? 'valid' : ''}
										placeholder="Ваше сообщение (минимум 10 символов)"
										rows="4"
									/>
									<div className="char-count">
										{formData.message.length}/10
									</div>
									{errors.message && <span className="validation-error">{errors.message}</span>}
								</div>

								<div className="form-group captcha-section">
									<div className="captcha-header">
										<label>Подтвердите, что вы не робот *</label>
										<button
											type="button"
											className="refresh-captcha"
											onClick={generateCaptcha}
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
													onClick={() => window.location.reload()}
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
									<p>✓ Защищено от спама</p>
									<p>✓ {CONFIG.DEMO_MODE ? 'Демо-режим (без Telegram)' : 'Отправляется в Telegram'}</p>
									<p className="privacy">
										Отправляя форму, вы соглашаетесь с обработкой персональных данных
									</p>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>

			<footer className="footer">
				<div className="container">
					<div className="footer-content">
						<div className="footer-logo">
							<h3>Наталья Воробьева</h3>
							<p>Frontend Developer</p>
						</div>

						<div className="footer-links">
							<a href="#home">Главная</a>
							<a href="#portfolio">Портфолио</a>
							<a href="#about">Обо мне</a>
							<a href="#contact">Контакты</a>
						</div>

						<div className="footer-social">
							<a href="mailto:vorobjeva.natalia76@yandex.ru">
								<FiMail />
							</a>
							<a href="https://t.me/vorobjevaa" aria-label="Telegram">
								<FiSend />
							</a>
							<a href="https://github.com" target="_blank" rel="noreferrer">
								<FiGithub />
							</a>
						</div>
					</div>

					<div className="footer-bottom">
						<p>© {new Date().getFullYear()} Наталья Воробьева. Все права защищены.</p>
						<p className="footer-note">Сайт-портфолио фронтенд-разработчика</p>
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
								<span className="separator">из</span>
								<span className="total-files">{codeFiles.length}</span>
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
							{/* <pre className="code-content" dangerouslySetInnerHTML={{
								__html: highlightCode(codeFiles[currentCodeIndex].content, codeFiles[currentCodeIndex].language)
							}} /> */}
							{/* <pre className="code-content">
								<code>{codeFiles[currentCodeIndex].content}</code>
							</pre> */}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default App