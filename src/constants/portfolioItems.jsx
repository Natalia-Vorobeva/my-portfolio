import { FaCheckCircle, FaComments, FaSprayCan, FaTint, FaStar, FaFemale, FaTicketAlt, FaCut, FaSpa, FaHandSparkles, FaHands, FaGem, FaPalette, FaPaintBrush } from "react-icons/fa"
import { codeFiles } from "./dataMovieTickets"

export const portfolioItems = [
	{
		id: 1,
		title: "Сайт-визитка мастера парикмахера",
		description: "Услуги парикмахера с онлайн-записью, выбором услуги и времени.",
		icon: <FaCut />,
		tech: ["ReactJS", "Vite"],
		// link: "#",
		demo: "https://natalia-vorobeva.github.io/business_card_hairdresser/"
	},
	{
		id: 2,
		title: "Сайт-визитка мастера шугаринга",
		description: "Услуги мастера шугаринга с онлайн-записью, выбором услуги и времени.",
		icon: <FaHandSparkles />,
		tech: ["ReactJS", "Vite"],
		// link: "#",
		demo: "https://sugar-lux-site.vercel.app/"
	},	
	{
		id: 3,
		title: "Сайт-визитка мастера маникюра",
		description: "Студия шугаринга с онлайн-записью, выбором услуги и времени.",
		icon: <FaPaintBrush />,
		tech: ["ReactJS", "Vite"],
		// link: "#",
		demo: "https://natalia-vorobeva.github.io/business_card_manicure/"
	},
	{
		id: 4,
		title: "Варианты слайдеров для сайта",
		description: "Варианты слайдеров для сайта",
		icon: <FaHands />,
		tech: ["Swiper", "Embla", "Ligthbox", "Splide", "В доработке..."],
		demo: "https://natalia-vorobeva.github.io/carousels/"
	},
	{
		id: 2,
		title: "Сайт-визитка мастера шугаринга-2",
		description: "Услуги мастера шугаринга с фото-галереей, выбором услуги, онлайн-записью .",
		icon: <FaHands />,
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
