import { FaCheckCircle, FaComments, FaSprayCan, FaTint, FaStar, FaFemale, FaTicketAlt, FaCut, FaSpa, FaHandSparkles, FaHands, FaGem, FaPalette, FaNewspaper, FaPaintBrush, FaMapMarkedAlt, FaBullseye, FaChartLine, FaGlobeAmericas } from "react-icons/fa"
import { codeFiles } from "./dataMovieTickets"

export const portfolioItems = [
	{
		id: 1,
		title: "Сайт-визитка",
		description: "Мои услуги детально",
		icon: <FaStar />,
		tech: ["ReactJS", "Vite", "Tailwindcss"],
		// link: "#",
		demo: "https://visit-card-vorobeva.vercel.app/"
	},
	{
		id: 2,
		title: "Сайт-визитка в официальном стиле",
		description: "Официальный сайт-визитка дипломата с мультиязычной поддержкой (русский/английский/французский), адаптивным дизайном, формой обратной связи и строгим корпоративным стилем",
		icon: <FaGem />,
		tech: ["ReactJS", "Vite"],
		// link: "#",
		demo: "https://officialstyle.vercel.app/"
	},
	{
		id: 3,
		title: "Сайт-визитка мастера парикмахера",
		description: "Услуги парикмахера с онлайн-записью, выбором услуги и времени",
		icon: <FaCut />,
		tech: ["ReactJS", "Vite"],
		// link: "#",
		demo: "https://hairdresser-portfolio.vercel.app/"
	},
	{
		id: 4,
		title: "Сайт-визитка мастера шугаринга",
		description: "Услуги мастера шугаринга с онлайн-записью, выбором услуги и времени.",
		icon: <FaHandSparkles />,
		tech: ["ReactJS", "Vite"],
		// link: "#",
		demo: "https://sugar-lux-site.vercel.app/"
	},
	{
		id: 5,
		title: "Сайт-визитка мастера маникюра",
		description: "Студия шугаринга с онлайн-записью, выбором услуги и времени.",
		icon: <FaPaintBrush />,
		tech: ["ReactJS", "Vite"],
		// link: "#",
		demo: "https://natalia-vorobeva.github.io/business_card_manicure/"
	},
	{
		id: 6,
		title: "Варианты слайдеров для сайта",
		description: "Варианты слайдеров для сайта",
		icon: <FaHands />,
		tech: ["Swiper", "Embla", "Ligthbox", "Splide"],
		demo: "https://natalia-vorobeva.github.io/carousels/"
	},
	{
		
		id: 7,
		title: "Мировой дашборд новостей",
		description: "Дашборд для агрегации и визуализации мировых новостей с фильтрацией по регионам, темам и источникам в реальном времени",
		icon: <FaGlobeAmericas />,
		tech: ["d3.js"],
		demo: "https://d3-news.vercel.app/"
	},
	{
		id: 8,
		title: "Сайт-визитка мастера шугаринга-2",
		description: "Услуги мастера шугаринга с фото-галереей, выбором услуги, онлайн-записью .",
		icon: <FaCut />,
		tech: ["ReactJS", "Vite"],
		// link: "#",
		demo: "https://natalia-vorobeva.github.io/business_card_sugaring/"
	},
	// {
	// 	id: 2,
	// 	title: "Билетная касса",
	// 	description: "Система бронирования билетов с выбором мест, онлайн-оплатой и админ-панелью",
	// 	icon: <FaTicketAlt />,
	// 	tech: ["ReactJS", "TailwindCSS", "vite", "LocalStorage"],
	// 	link: "#",
	// 	demo: "https://natalia-vorobeva.github.io/movie-ticket-system/",
	// 	code: codeFiles

	// },
	// {
	// 	id: 3,
	// 	title: "ToDo List",
	// 	description: "Продуктивное приложение с категориями, тегами, дедлайнами и аналитикой",
	// 	icon: <FaCheckCircle />,
	// 	tech: ["ReactJS", "JWT", "Express", "Tailwindcss", "SQLite3"],
	// 	link: "#",
	// 	demo: "#"
	// },
	// {
	// 	id: 4,
	// 	title: "Мессенджер",
	// 	description: "Чат-приложение в реальном времени с комнатами, файлами и видеозвонками",
	// 	icon: <FaComments />,
	// 	tech: ["ReactJS", "Node.js", "Vite", "PostgreSQL"],
	// 	link: "#",
	// 	demo: "#"
	// }
]
