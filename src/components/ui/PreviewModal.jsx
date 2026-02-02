// eslint-disable react-hooks/exhaustive-deps
import { useState, useEffect, useCallback, useRef } from 'react';
import { FiX, FiExternalLink, FiCode, FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi';
import { FaGithub, FaReact, FaNodeJs, FaDatabase, FaSass, FaBootstrap, FaPaintBrush } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';

const PreviewModal = ({ isOpen, onClose, item, onOpenCodeModal }) => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const modalRef = useRef(null);

	const projectImages = item?.images || (item?.image ? [item.image] : []);

	// Проверяем, есть ли исходный код (строка ссылки или не пустой массив)
	const hasCode = useCallback(() => {
		if (!item?.link) return false;
		
		// Если это строка (ссылка на GitHub или другой репозиторий)
		if (typeof item.link === 'string') {
			return item.link.trim().length > 0;
		}
		
		// Если это массив - проверяем не пустой ли он
		if (Array.isArray(item.link)) {
			return item.link.length > 0;
		}
		
		// Если это объект (но не массив и не строка)
		if (typeof item.link === 'object' && item.link !== null) {
			// Проверяем, есть ли в объекте хоть что-то
			return Object.keys(item.link).length > 0;
		}
		
		return false;
	}, [item?.link]);

	// Определяем тип ссылки на код
	const getCodeLinkType = useCallback(() => {
		if (!item?.link) return null;
		
		if (typeof item.link === 'string') {
			// Проверяем, это GitHub ссылка или другая
			if (item.link.includes('github.com')) {
				return 'github';
			}
			return 'external';
		}
		
		// Если это массив или объект с файлами кода
		if (Array.isArray(item.link) || (typeof item.link === 'object' && item.link !== null)) {
			return 'files';
		}
		
		return null;
	}, [item?.link]);

	const handlePrevImage = useCallback((e) => {
		e.stopPropagation();
		setCurrentImageIndex(prev =>
			prev === 0 ? projectImages.length - 1 : prev - 1
		);
	}, [projectImages.length]);

	const handleNextImage = useCallback((e) => {
		e.stopPropagation();
		setCurrentImageIndex(prev =>
			prev === projectImages.length - 1 ? 0 : prev + 1
		);
	}, [projectImages.length]);

	const handleCodeClick = useCallback(() => {
		const codeType = getCodeLinkType();
		
		if (codeType === 'github' || codeType === 'external') {
			// Если это внешняя ссылка - открываем в новой вкладке
			window.open(item.link, '_blank', 'noopener,noreferrer');
		} else if (codeType === 'files') {
			// Если это файлы кода - открываем модальное окно с кодом
			onClose();
			if (onOpenCodeModal && item?.id) {
				setTimeout(() => {
					const index = parseInt(item.id) - 1;
					onOpenCodeModal(index >= 0 ? index : 0);
				}, 300);
			}
		}
	}, [onClose, onOpenCodeModal, item?.id, item?.link, getCodeLinkType]);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) {
			setIsLoaded(false);
			setCurrentImageIndex(0);
			document.body.style.overflow = 'hidden';
			document.body.classList.add('modal-open');

			if (modalRef.current) {
				modalRef.current.focus();
			}
		} else {
			document.body.style.overflow = 'auto';
			document.body.classList.remove('modal-open');
		}

		return () => {
			document.body.style.overflow = 'auto';
			document.body.classList.remove('modal-open');
		};
	}, [isOpen]);

	const getProjectType = () => {
		if (!item?.tech) return 'Веб-приложение';

		const techLower = item.tech.map(t => t.toLowerCase());
		if (techLower.some(t => t.includes('fullstack') || t.includes('node') || t.includes('express'))) {
			return 'Fullstack';
		}
		if (techLower.some(t => t.includes('react'))) {
			return 'React App';
		}
		if (item.title?.toLowerCase().includes('визитка')) {
			return 'Сайт-визитка';
		}
		if (techLower.some(t => t.includes('landing'))) {
			return 'Лендинг';
		}
		if (techLower.some(t => t.includes('d3') || t.includes('визуализация'))) {
			return 'Визуализация данных';
		}
		return 'Веб-приложение';
	};

	const getTechIcon = (tech) => {
		const t = tech.toLowerCase();
		if (t.includes('react')) return <FaReact className="inline mr-1.5 text-cyan-400" />;
		if (t.includes('node')) return <FaNodeJs className="inline mr-1.5 text-green-500" />;
		if (t.includes('express')) return <FaNodeJs className="inline mr-1.5 text-emerald-500" />;
		if (t.includes('sql') || t.includes('база') || t.includes('database')) return <FaDatabase className="inline mr-1.5 text-amber-500" />;
		if (t.includes('tailwind')) return <SiTailwindcss className="inline mr-1.5 text-cyan-500" />;
		if (t.includes('bootstrap')) return <FaBootstrap className="inline mr-1.5 text-purple-500" />;
		if (t.includes('sass') || t.includes('scss')) return <FaSass className="inline mr-1.5 text-pink-500" />;
		if (t.includes('jwt')) return <span className="inline mr-1.5 text-red-400">🔐</span>;
		if (t.includes('websocket')) return <span className="inline mr-1.5 text-blue-400">🔌</span>;
		if (t.includes('css') || t.includes('стили')) return <FaPaintBrush className="inline mr-1.5 text-blue-400" />;
		return null;
	};

	if (!isOpen || !item) return null;

	const codeAvailable = hasCode();
	const codeType = getCodeLinkType();

	return (
		<div
			className="fixed inset-0 z-[1001] flex items-start justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-300 pt-20 pb-8"
			onClick={onClose}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			<div
				ref={modalRef}
				className="bg-gradient-to-br from-gray-900/95 to-dark/95 rounded-2xl border border-primary/20 w-full max-w-6xl overflow-hidden animate-modal-appear shadow-2xl shadow-black/50 mt-8 mb-8 max-h-[calc(100vh-10rem)]"
				onClick={(e) => e.stopPropagation()}
				tabIndex="-1"
			>
				<div className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-gradient-to-r from-gray-900/50 to-dark/50 backdrop-blur-sm">
					<div className="flex-1 pr-4">
						<div className="flex items-center gap-3 mb-2">
							<h2 id="modal-title" className="text-2xl font-bold text-light truncate">
								{item.title}
							</h2>
							<span className="flex-shrink-0 text-xs px-3 py-1 bg-primary/20 text-primary rounded-full border border-primary/30">
								{getProjectType()}
							</span>
						</div>
						<p className="text-gray-300 text-sm line-clamp-2" title={item.description}>
							{item.description}
						</p>
					</div>
					<button
						onClick={onClose}
						className="ml-4 p-2.5 hover:bg-gray-800/50 rounded-xl transition-all duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-primary/50"
						title="Закрыть (Esc)"
						aria-label="Закрыть модальное окно"
					>
						<FiX className="text-2xl text-gray-400 hover:text-white" />
					</button>
				</div>

				<div className="flex flex-col md:flex-row h-[calc(92vh-80px)]">
					{/* ЛЕВАЯ КОЛОНКА - КАРТИНКИ */}
					<div className="md:w-3/5 p-6 border-r border-gray-800/50 overflow-y-auto custom-scrollbar">
						<div className="relative bg-gradient-to-br from-gray-900/50 to-dark/50 rounded-xl border border-gray-800/50 overflow-hidden shadow-lg">
							<div className="bg-gradient-to-br from-gray-900 to-black flex items-center justify-center h-[500px] md:h-[calc(92vh-200px)]">
								{projectImages[currentImageIndex] ? (
									<>
										<img
											src={projectImages[currentImageIndex]}
											alt={`Скриншот проекта ${item.title} - изображение ${currentImageIndex + 1}`}
											className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
											onLoad={() => setIsLoaded(true)}
											onError={() => setIsLoaded(true)}
										/>
										{projectImages.length > 1 && (
											<>
												<button
													onClick={handlePrevImage}
													className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
													title="Предыдущее изображение"
													aria-label="Предыдущее изображение"
												>
													<FiChevronLeft className="text-xl" />
												</button>
												<button
													onClick={handleNextImage}
													className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/70 hover:bg-black/90 rounded-full text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50"
													title="Следующее изображение"
													aria-label="Следующее изображение"
												>
													<FiChevronRight className="text-xl" />
												</button>
											</>
										)}
									</>
								) : (
									<div className="flex flex-col items-center justify-center p-12">
										<div className="text-8xl text-primary/20 mb-6">
											{item.icon || '💻'}
										</div>
										<p className="text-gray-500 text-center max-w-md">
											Скриншот проекта отсутствует
										</p>
									</div>
								)}

								{!isLoaded && (
									<div className="absolute inset-0 flex items-center justify-center">
										<div className="w-12 h-12 border-3 border-primary/20 border-t-primary rounded-full animate-spin"></div>
									</div>
								)}
							</div>

							<div className="p-4 bg-gradient-to-t from-gray-900/80 to-transparent flex items-center justify-between">
								<p className="text-sm text-gray-400">
									{projectImages.length > 1
										? `Изображение ${currentImageIndex + 1} из ${projectImages.length}`
										: 'Скриншот проекта'
									}
								</p>
								{projectImages.length > 1 && (
									<div className="flex gap-1.5">
										{projectImages.map((_, idx) => (
											<button
												key={idx}
												onClick={(e) => {
													e.stopPropagation();
													setCurrentImageIndex(idx);
												}}
												className={`w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/30 ${idx === currentImageIndex ? 'bg-primary scale-125' : 'bg-gray-600 hover:bg-gray-400'}`}
												title={`Изображение ${idx + 1}`}
												aria-label={`Перейти к изображению ${idx + 1}`}
											/>
										))}
									</div>
								)}
							</div>
						</div>

						{/* Миниатюры изображений */}
						{projectImages.length > 1 && (
							<div className="mt-4">
								<p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
									<FiInfo className="text-gray-500" />
									Выберите миниатюру для просмотра
								</p>
								<div className="flex gap-2 overflow-x-auto pb-3 custom-scrollbar-horizontal px-1">
									{projectImages.map((img, idx) => (
										<button
											key={idx}
											onClick={() => setCurrentImageIndex(idx)}
											className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 ${idx === currentImageIndex ? 'border-primary scale-[1.02] shadow-lg shadow-primary/20' : 'border-gray-700 hover:border-gray-500'}`}
											title={`Показать изображение ${idx + 1}`}
											aria-label={`Показать изображение ${idx + 1}`}
										>
											<div className="w-full h-full relative">
												<img
													src={img}
													alt={`Миниатюра ${idx + 1}`}
													className="w-full h-full object-cover"
												/>
												<div className={`absolute inset-0 ${idx === currentImageIndex ? 'bg-primary/10' : 'bg-transparent'}`}></div>
											</div>
										</button>
									))}
								</div>
							</div>
						)}
					</div>

					{/* ПРАВАЯ КОЛОНКА - ИНФОРМАЦИЯ */}
					<div className="md:w-2/5 p-6 overflow-y-auto custom-scrollbar">
						<div className="mb-8">
							<h3 className="text-lg font-semibold text-light mb-4 flex items-center gap-2">
								<FiCode className="text-primary" />
								<span>Технологии</span>
								<span className="text-xs text-gray-500 ml-auto">
									{item.tech?.length || 0} технологий
								</span>
							</h3>
							<div className="flex flex-wrap gap-2">
								{item.tech?.map((tech, idx) => (
									<span
										key={idx}
										className="px-3 py-2 bg-gray-800/40 text-gray-300 rounded-lg text-sm border border-gray-700/50 hover:border-primary/50 transition-all duration-300 flex items-center"
										title={tech}
									>
										{getTechIcon(tech)}
										<span className="truncate max-w-[120px]">{tech}</span>
									</span>
								))}
							</div>
						</div>

						<div className="space-y-4">
							<a
								href={item.demo}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 font-medium w-full group focus:outline-none focus:ring-2 focus:ring-primary/50"
							>
								<FiExternalLink className="text-xl group-hover:rotate-12 transition-transform duration-300" />
								<span className="text-lg font-semibold">Открыть демо-версию</span>
							</a>

							<div className={`grid ${(codeAvailable || item.github) ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
								{/* Кнопка "Исходный код" показывается только если есть доступный код */}
								{codeAvailable && (
									<button
										onClick={handleCodeClick}
										className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium border border-gray-700/50 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
										title={
											codeType === 'github' ? 'Открыть репозиторий на GitHub' :
											codeType === 'external' ? 'Открыть исходный код' :
											'Просмотреть исходный код'
										}
									>
										<FiCode />
										<span>
											{codeType === 'github' ? 'GitHub' : 'Исходный код'}
										</span>
									</button>
								)}

								{/* Кнопка GitHub (отдельная от основной ссылки на код) */}
								{item.github && !(codeType === 'github' && codeAvailable) && (
									<a
										href={item.github}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 text-gray-300 rounded-xl hover:bg-gray-800 hover:text-white transition-all duration-300 font-medium border border-gray-700/50 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
									>
										<FaGithub />
										<span>GitHub</span>
									</a>
								)}
							</div>
						</div>

						<div className="mt-8 pt-6 border-t border-gray-800/50">
							<h4 className="text-sm font-medium text-gray-400 mb-3">Технические детали</h4>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div className="truncate">
									<span className="text-gray-500">Тип проекта:</span>
									<span className="text-gray-300 ml-2 truncate">{getProjectType()}</span>
								</div>
								<div className="truncate">
									<span className="text-gray-500">Код:</span>
									<span className={`ml-2 ${codeAvailable ? 'text-green-400' : 'text-gray-400'}`}>
										{codeAvailable 
											? (codeType === 'github' ? 'GitHub' : 'Доступен') 
											: 'По запросу'
										}
									</span>
								</div>
								<div className="truncate">
									<span className="text-gray-500">Верстка:</span>
									<span className="text-gray-300 ml-2 truncate">
										{item.tech?.some(t => t.toLowerCase().includes('tailwind')) ? 'TailwindCSS' :
											item.tech?.some(t => t.toLowerCase().includes('bootstrap')) ? 'Bootstrap' :
												item.tech?.some(t => t.toLowerCase().includes('sass') || t.toLowerCase().includes('scss')) ? 'SCSS/SASS' : 'Custom CSS'}
									</span>
								</div>
								<div className="truncate">
									<span className="text-gray-500">ID проекта:</span>
									<span className="text-gray-300 ml-2">#{item.id}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreviewModal;