import { useState, useEffect } from 'react';
import { FiCheckCircle, FiTrendingUp, FiZap, FiTarget, FiAward, FiPause, FiPlay } from 'react-icons/fi';

const TimelineResult = () => {
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
		<div className="relative bg-white/5 rounded-2xl py-6 px-4 sm:px-6 md:px-32 md:pt-8 my-8 border border-white/10 backdrop-blur-md overflow-hidden max-w-screen-lg mx-auto">
			<div className="hidden md:block absolute inset-0 pointer-events-none">
				<div
					className="absolute w-[200px] h-[200px] top-[-100px] right-[-100px] rounded-full opacity-10"
					style={{
						background: 'radial-gradient(circle, #667eea 0%, transparent 70%)'
					}}
				></div>
				<div
					className="absolute w-[150px] h-[150px] bottom-[-75px] left-[-75px] rounded-full opacity-10"
					style={{
						background: 'radial-gradient(circle, #f5576c 0%, transparent 70%)'
					}}
				></div>
				<div className="absolute w-[6px] h-[6px] top-[30px] left-[30px] rounded-full bg-[#667eea] shadow-[0_0_10px_#667eea]"></div>
				<div className="absolute w-[6px] h-[6px] bottom-[30px] right-[30px] rounded-full bg-[#43e97b] shadow-[0_0_10px_#43e97b]"></div>
			</div>

			<div className="relative mb-10 md:mb-16 z-10">
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
					<div className="flex flex-col gap-2 pb-4">
						<div className="flex items-center gap-2">
							<h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 m-0">
								Путь к вашему сайту
								<span className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full flex items-center justify-center">
									<FiAward className="text-white text-xs sm:text-sm" />
								</span>
							</h3>
						</div>
						<div className="text-sm text-white/70">
							От идеи до результата за <span className="bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white px-2 py-1 rounded-full text-xs font-semibold">3-5 дней</span>
						</div>
					</div>
					<button
						onClick={() => setAutoPlay(!autoPlay)}
						title={autoPlay ? 'Остановить автопереключение' : 'Включить автопереключение'}
						className="
              relative
              flex items-center gap-2 
              px-4 py-3
              rounded-xl
              cursor-pointer
              transition-all duration-300
              overflow-hidden
              group
              border
              backdrop-blur-sm
              will-change-transform
              hover:scale-[1.02] hover:shadow-xl
              active:scale-95
            "
						style={{
							background: autoPlay
								? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
								: 'rgba(255, 255, 255, 0.05)',
							borderColor: autoPlay
								? 'rgba(102, 126, 234, 0.4)'
								: 'rgba(255, 255, 255, 0.1)',
							boxShadow: autoPlay
								? '0 10px 30px rgba(102, 126, 234, 0.2), inset 0 0 20px rgba(102, 126, 234, 0.1)'
								: '0 5px 15px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.05)'
						}}
					>
						<div
							className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							style={{
								background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
							}}
						/>

						{autoPlay && (
							<>
								<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] opacity-20 animate-pulse" />
								<div className="absolute -inset-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
							</>
						)}

						{autoPlay && (
							<div
								className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#667eea]"
								style={{
									animation: 'progress 4s linear infinite',
								}}
							/>
						)}

						<div className="relative z-10">
							{autoPlay ? (
								<FiPause className="
                  text-[#667eea] 
                  text-lg
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:rotate-90
                " />
							) : (
								<FiPlay className="
                  text-white/70 
                  text-lg
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:text-[#667eea]
                  group-hover:-rotate-12
                " />
							)}
						</div>

						<span className="
              relative z-10 
              text-sm font-medium
              transition-all duration-300
              whitespace-nowrap
            "
							style={{
								color: autoPlay ? '#667eea' : 'rgba(255, 255, 255, 0.7)',
							}}>
							{autoPlay ? 'Пауза' : 'Автоплей'}
						</span>

						<div className="absolute inset-0 overflow-hidden pointer-events-none">
							{Array.from({ length: 8 }).map((_, i) => (
								<div
									key={i}
									className="absolute w-1 h-1 bg-white/30 rounded-full"
									style={{
										// eslint-disable-next-line react-hooks/purity
										left: `${Math.random() * 100}%`,
										// eslint-disable-next-line react-hooks/purity
										top: `${Math.random() * 100}%`,
										transform: 'scale(0)',
										transition: 'transform 0.3s ease',
									}}
								/>
							))}
						</div>
					</button>
				</div>
			</div>

			<div className="relative my-6 md:my-8">
				<div className="relative h-[50px] md:h-[60px] px-4 sm:px-6">
					<div className="absolute top-1/2 left-4 sm:left-6 right-4 sm:right-6 h-[3px] bg-gradient-to-r from-transparent via-white/20 to-transparent rounded translate-y-[-50%]"></div>
					<div className="relative h-full">
						<div
							className="absolute top-1/2 left-4 sm:left-6 h-[3px] rounded transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] translate-y-[-50%]"
							style={{
								width: `calc(${(activeStep / (timelineSteps.length - 1)) * 100}% - ${(activeStep / (timelineSteps.length - 1)) * (8 + 12)}px)`,
								background: timelineSteps[activeStep].color
							}}
						/>

						{timelineSteps.map((step, index) => (
							<div
								key={index}
								className="absolute top-1/2 translate-x-[-50%] translate-y-[-50%] z-10"
								style={{
									left: `${(index / (timelineSteps.length - 1)) * 100}%`,
									marginLeft: index === 0 ? '2px' : index === timelineSteps.length - 1 ? '-2px' : '0'
								}}
							>
								<button
									className={`relative border-2 rounded-full cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px]
                    ${activeStep === index ? 'scale-110 sm:scale-115' : ''} 
                    ${index < activeStep ? 'completed' : ''}
                    hover:scale-105 sm:hover:scale-110 active:scale-95`}
									onClick={() => handleStepClick(index)}
									onMouseEnter={() => setHoveredStep(index)}
									onMouseLeave={() => setHoveredStep(null)}
									style={{
										borderColor: step.accentColor,
										background: activeStep === index ? step.color : '#0f172a',
										boxShadow: activeStep === index
											? `0 0 0 3px ${step.accentColor}20, 0 5px 15px ${step.accentColor}30`
											: hoveredStep === index
												? `0 0 0 2px ${step.accentColor}10`
												: 'none'
									}}
								>
									<div className="relative w-full h-full flex items-center justify-center">
										<div className="w-[70%] h-[70%] bg-white/10 rounded-full flex items-center justify-center text-white text-lg sm:text-xl transition-all duration-300">
											{step.icon}
											{index < activeStep && (
												<div className="absolute inset-0 bg-[#43e97b]/20 rounded-full flex items-center justify-center text-[#43e97b] opacity-0 transition-opacity duration-300">
													<FiCheckCircle className="text-sm sm:text-base" />
												</div>
											)}
										</div>
									</div>

									<div
										className="absolute top-[-30px] sm:top-[-35px] left-1/2 translate-x-[-50%] translate-y-[-100%] px-2 py-1 rounded-lg text-white text-xs font-semibold whitespace-nowrap transition-all duration-300 opacity-90 min-[375px]:block hidden"
										style={{
											background: step.color,
											opacity: hoveredStep === index ? 1 : 0.9
										}}
									>
										<span className="text-xs">{step.day}</span>
										<div className="absolute bottom-[-4px] sm:bottom-[-5px] left-1/2 translate-x-[-50%] w-0 h-0 border-l-[4px] sm:border-l-[5px] border-l-transparent border-r-[4px] sm:border-r-[5px] border-r-transparent border-t-[4px] sm:border-t-[5px] border-t-current"></div>
									</div>

									{hoveredStep === index && activeStep !== index && (
										<div className="hidden md:block absolute top-[-70px] left-1/2 translate-x-[-50%] bg-white/95 text-gray-800 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg z-50"
											style={{ borderTopColor: step.accentColor }}>
											{step.title}
											<div className="absolute bottom-[-8px] left-1/2 translate-x-[-50%] border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-current"></div>
										</div>
									)}
								</button>
							</div>
						))}

						<div
							className="absolute top-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full translate-x-[-50%] translate-y-[-50%] transition-all duration-800 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20"
							style={{
								left: `${(activeStep / (timelineSteps.length - 1)) * 100}%`,
								background: timelineSteps[activeStep].color,
								boxShadow: `0 0 15px ${timelineSteps[activeStep].accentColor}40`
							}}
						/>
					</div>
				</div>
			</div>

			<div className="mt-6 md:mt-8">
				<div
					className="p-4 rounded-xl mb-6 animate-[slideIn_0.5s_ease]"
					style={{
						background: `${timelineSteps[activeStep].color}10`,
						borderLeft: `4px solid ${timelineSteps[activeStep].accentColor}`
					}}
				>
					<div className="flex items-center gap-3 sm:gap-4">
						<div
							className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white text-lg sm:text-xl"
							style={{ background: timelineSteps[activeStep].color }}
						>
							{timelineSteps[activeStep].icon}
						</div>
						<div>
							<h4 className="text-base sm:text-lg font-semibold m-0 text-white/95">{timelineSteps[activeStep].title}</h4>
							<p className="text-sm text-white/70 mt-0.5 m-0">{timelineSteps[activeStep].day}</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<div className="tasks-section">
						<div className="flex items-center gap-2 mb-4">
							<FiZap className="text-xl" style={{ color: timelineSteps[activeStep].accentColor }} />
							<span className="text-base font-semibold text-white/90">Что будет сделано:</span>
						</div>
						<ul className="list-none p-0 m-0">
							{timelineSteps[activeStep].tasks.map((task, index) => (
								<li
									key={index}
									className="flex items-center gap-3 p-3 mb-2 bg-white/3 rounded-lg animate-[slideInRight_0.5s_ease_forwards] opacity-0 translate-x-[-10px] relative border-l-3"
									style={{
										animationDelay: `${index * 100}ms`,
										borderLeftColor: `${timelineSteps[activeStep].accentColor}40`
									}}
								>
									<FiCheckCircle
										className="text-base min-w-[20px]"
										style={{ color: timelineSteps[activeStep].accentColor }}
									/>
									<span className="text-sm text-white/90 flex-1">{task}</span>
									<div className="absolute bottom-0 left-0 w-0 h-[2px] transition-width duration-300"
										style={{ background: `${timelineSteps[activeStep].color}20` }}></div>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-white/10">
					<div className="flex gap-2">
						{timelineSteps.map((step, index) => (
							<button
								key={index}
								className={`w-2 h-2 sm:w-[10px] sm:h-[10px] rounded-full border cursor-pointer transition-all duration-300
                  ${activeStep === index ? 'scale-125 sm:scale-130' : 'bg-transparent'}
                  hover:scale-110 sm:hover:scale-120`}
								onClick={() => handleStepClick(index)}
								style={{
									background: activeStep === index ? step.accentColor : 'rgba(255, 255, 255, 0.1)',
									borderColor: step.accentColor,
									boxShadow: activeStep === index ? `0 0 8px ${step.accentColor}` : 'none'
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimelineResult;