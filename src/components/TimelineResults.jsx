import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiClock, FiTrendingUp, FiZap, FiUsers, FiTarget, FiArrowRight, FiStar, FiAward } from 'react-icons/fi';

const TimelineResults = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [autoPlay, setAutoPlay] = useState(true);
	const [hoveredStep, setHoveredStep] = useState(null);

	const timelineSteps = [
		{
			day: 'День 1',
			title: 'Анализ и план',
			tasks: ['Бесплатный брифинг', 'Выбор образца', 'Уточнение деталей'],
			clientResult: 'Четкий план работы',
			icon: <FiTarget />,
			color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			accentColor: '#667eea'
		},
		{
			day: 'День 2',
			title: 'Дизайн и верстка',
			tasks: ['Адаптация под ваш бренд', 'Создание структуры', 'Подбор цветов'],
			clientResult: 'Прототип для согласования',
			icon: <FiZap />,
			color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
			accentColor: '#f5576c'
		},
		{
			day: 'День 3',
			title: 'Разработка и тесты',
			tasks: ['Верстка всех страниц', 'Адаптивная версия', 'Тестирование скорости'],
			clientResult: 'Готовый работающий сайт',
			icon: <FiCheckCircle />,
			color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
			accentColor: '#4facfe'
		},
		{
			day: 'День 4-5',
			title: 'Запуск и поддержка',
			tasks: ['Наполнение контентом', 'Оптимизация SEO', 'Подключение аналитики'],
			clientResult: 'Сайт онлайн 24/7',
			icon: <FiTrendingUp />,
			color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
			accentColor: '#43e97b'
		}
	];

	useEffect(() => {
		if (!autoPlay) return;

		const interval = setInterval(() => {
			setActiveStep(prev => (prev === timelineSteps.length - 1 ? 0 : prev + 1));
		}, 4000);

		return () => clearInterval(interval);
	}, [autoPlay, timelineSteps.length]);

	const handleStepClick = (index) => {
		setActiveStep(index);
		setAutoPlay(false);
	};

	return (
		<div className="compact-timeline ">

			{/* Заголовок */}
			<div className="timeline-header-compact">
				<div className="header-content">
					<div className="title-section">
						<h3 className="timeline-title">
							Путь к вашему сайту
						</h3>
						<div className="timeline-subtitle">
							От идеи до результата за <span className="duration-badge">3-5 дней</span>
						</div>
					</div>
					<button
						className={`autoplay-toggle ${autoPlay ? 'active' : ''}`}
						onClick={() => setAutoPlay(!autoPlay)}
						title={autoPlay ? 'Остановить автопереключение' : 'Включить автопереключение'}
					>
						<span className="toggle-icon">
							{autoPlay ? '⏸' : '▶'}
						</span>
						<span className="toggle-text">
							{autoPlay ? 'Пауза' : 'Автоплей'}
						</span>
					</button>
				</div>
			</div>

			{/* Сам путь (основная линия) */}
			<div className="path-container">
				<div className="path-line-wrapper">
					{/* Градиентная линия */}
					<div className="path-line-gradient"></div>
					{/* Основная линия */}
					<div className="path-line">
						{/* Активная подсветка линии */}
						<div
							className="path-line-active"
							style={{
								width: `${(activeStep / (timelineSteps.length - 1)) * 100}%`,
								background: timelineSteps[activeStep].color
							}}
						/>

						{/* Точки пути */}
						{timelineSteps.map((step, index) => (
							<div
								key={index}
								className="path-point-wrapper"
								style={{ left: `${(index / (timelineSteps.length - 1)) * 100}%` }}
							>
								<button
									className={`path-point ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
									onClick={() => handleStepClick(index)}
									onMouseEnter={() => setHoveredStep(index)}
									onMouseLeave={() => setHoveredStep(null)}
									style={{
										borderColor: step.accentColor,
										background: activeStep === index ? step.color : 'var(--bg-color)',
										boxShadow: activeStep === index
											? `0 0 0 4px ${step.accentColor}20, 0 10px 20px ${step.accentColor}30`
											: hoveredStep === index
												? `0 0 0 3px ${step.accentColor}10`
												: 'none'
									}}
								>
									<div className="point-outer">
										<div className="point-inner">
											{step.icon}
											{index < activeStep && (
												<div className="completed-check">
													<FiCheckCircle />
												</div>
											)}
										</div>
									</div>

									{/* Метка дня с акцентным фоном */}
									<div
										className="point-label"
										style={{
											background: step.color,
											opacity: hoveredStep === index ? 1 : 0.9
										}}
									>
										<span className="point-day">{step.day}</span>
										<div className="label-triangle"></div>
									</div>

									{/* Всплывающая подсказка при наведении */}
									{hoveredStep === index && activeStep !== index && (
										<div className="point-hint" style={{ borderTopColor: step.accentColor }}>
											{step.title}
										</div>
									)}
								</button>
							</div>
						))}

						{/* Подвижный индикатор */}
						<div
							className="active-indicator"
							style={{
								left: `${(activeStep / (timelineSteps.length - 1)) * 100}%`,
								background: timelineSteps[activeStep].color,
								boxShadow: `0 0 20px ${timelineSteps[activeStep].accentColor}40`
							}}
						/>
					</div>
				</div>
			</div>

			{/* Контент активного шага */}
			<div className="step-content-compact">
				{/* Заголовок шага с акцентным фоном */}
				<div 					className="step-header" 					style={{
						background: timelineSteps[activeStep].color + '10',
						borderLeft: `4px solid ${timelineSteps[activeStep].accentColor}`
					}} 	>
					<div className="step-title-section">
						<div							className="step-icon-wrapper"
							style={{ background: timelineSteps[activeStep].color }}						>
							{timelineSteps[activeStep].icon}
						</div>
						<div>
							<h4 className="step-title">{timelineSteps[activeStep].title}</h4>
							<p className="step-subtitle">{timelineSteps[activeStep].day}</p>
						</div>
					</div>
				</div>

				<div className="step-details">
					<div className="tasks-section">
						<div className="section-header">
							<FiZap className="section-icon" style={{ color: timelineSteps[activeStep].accentColor }} />
							<span className="section-label">Что будет сделано:</span>
						</div>
						<ul className="tasks-list">
							{timelineSteps[activeStep].tasks.map((task, index) => (
								<li
									key={index}
									className="task-item"
									style={{
										animationDelay: `${index * 100}ms`,
										borderLeftColor: timelineSteps[activeStep].accentColor + '40'
									}}
								>
									<FiCheckCircle
										className="task-icon"
										style={{ color: timelineSteps[activeStep].accentColor }}
									/>
									<span className="task-text">{task}</span>
									<div className="task-decoration" 							style={{ background: timelineSteps[activeStep].color + '20' }}></div>
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Навигация */}
				<div className="step-navigation">
					<div className="navigation-dots">
						{timelineSteps.map((step, index) => (
							<button
								key={index}
								className={`nav-dot ${activeStep === index ? 'active' : ''}`}
								onClick={() => handleStepClick(index)}
								style={{
									background: activeStep === index ? step.accentColor : 'rgba(255, 255, 255, 0.1)',
									borderColor: step.accentColor
								}}
							/>
						))}
					</div>

				</div>
			</div>
		</div>
	);
};

export default TimelineResults;