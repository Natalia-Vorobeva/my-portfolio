import {
	FaCheckCircle,
	FaComments,
	FaCut,
	FaHandSparkles,
	FaHands,
	FaGem,
	FaPaintBrush,
	FaGlobeAmericas
} from "react-icons/fa"
import { getImageUrl } from '../utils/paths';

// Имена иконок для отложенной загрузки
export const iconNames = {
	check: FaCheckCircle,
	comments: FaComments,
	cut: FaCut,
	sparkles: FaHandSparkles,
	hands: FaHands,
	gem: FaGem,
	paint: FaPaintBrush,
	globe: FaGlobeAmericas
};

export const portfolioItems = [
  {
    id: 11,
    title: "Мессенджер с WebSocket и TypeScript",
    description: "Трёхколоночный чат с real-time синхронизацией, перемещением сообщений, лайками, комментариями и сохранением данных в SQLite.",
    icon: iconNames.comments,
    tech: ["React 19", "TypeScript", "Redux Toolkit", "Socket.IO", "Node.js", "Express", "SQLite", "Vite", "Vitest"],
    featured: true,
    demo: "https://messenger-ts-websocket-unit.vercel.app",
    link: ["https://github.com/Natalia-Vorobeva/messenger_ts_websocket_unit"],
    images: [
      getImageUrl("messenger-websocket-desktop-1.png"),
      getImageUrl("messenger-websocket-desktop-2.png"),
      getImageUrl("messenger-websocket-mobile.png")
    ]
  },
	{
		id: 1,
		title: "Email-письмо",
		description: "Адаптивный email-шаблон с кросс-клиентской совместимостью",
		icon: iconNames.check,
		tech: ["HTML", "CSS", "Email-верстка", "Outlook VML", "Адаптивный дизайн"],
		featured: true,
		demo: "https://natalia-vorobeva.github.io/email-final-discount/",
		link: [],
		images: [
			getImageUrl("email-discount-desktop-preview.png"),
			getImageUrl("email-discount-mobile-preview.png"),
			getImageUrl("email-discount-desktop-footer.png")
		],
	},

	{
		id: 2,
		title: "Карусели и слайдеры",
		description: "Коллекция различных слайдеров для сайтов: Swiper, Embla, Splide, Lightbox",
		icon: iconNames.hands,
		tech: ["Swiper", "Embla", "Splide", "Lightbox", "JavaScript"],
		demo: "https://natalia-vorobeva.github.io/carousels/",
		link: [],
		images: [
			getImageUrl("sliders.jpg"),
			getImageUrl("slider1.jpg"),
			getImageUrl("slider5.jpg"),
			getImageUrl("slider2.png"),
			getImageUrl("slider4.png"),
			getImageUrl("slider3.png")
		]
	},
	{
		id: 3,
		title: "ToDo List Fullstack",
		description: "Приложение для управления задачами с регистрацией, аутентификацией через JWT и SQLite базой данных",
		icon: iconNames.check,
		tech: ["ReactJS", "JWT", "Express", "SQLite3", "Tailwindcss", "Render.com"],
		featured: true,
		demo: "https://todo-react-node-sqlite-jwt.onrender.com/register",
		link: [],
		images: [
			getImageUrl("todolist.jpg"),
			getImageUrl("todolist-mobile.png")
		]
	},
	{
		id: 4,
		title: "Мессенджер Real-time",
		description: "Чат-приложение с комментами, загрузкой файлов",
		icon: iconNames.comments,
		tech: ["ReactJS", "Node.js", "PostgreSQL", "Vercel"],
		featured: true,
		demo: "https://messenger-full.vercel.app/",
		link: [],
		images: [
			getImageUrl("messenger.jpg"),
			getImageUrl("messenger-mobile.png"),
			getImageUrl("messenger-comment.png"),
			getImageUrl("messenger-comment-mobile.png")
		]
	},
	{
		id: 5,
		title: "Дашборд мировых новостей",
		description: "Визуализация и фильтрация мировых новостей в реальном времени с помощью d3.js",
		icon: iconNames.globe,
		tech: ["d3.js", "Data Visualization", "API Integration", "News Aggregation"],
		featured: true,
		demo: "https://d3-news.vercel.app/",
		link: [],
		images: [
			getImageUrl("news-dashboard.jpg"),
			getImageUrl("news-dashboard-2.png"),
			getImageUrl("news-dashboard-3.png")
		]
	},
	{
		id: 6,
		title: "Верстка Bootstrap",
		description: "Верстка и доработка существующего сайта с адаптивным дизайном",
		icon: iconNames.comments,
		tech: ["ReactJS", "jQuery", "Bootstrap4", "Vite"],
		demo: "https://petersburg-time-course.vercel.app/#about-course",
		link: [],
		images: [
			getImageUrl("peterburg-course.jpg"),
			getImageUrl("peterburg-course-2.png"),
			getImageUrl("peterburg-course-footer-mobile.png"),
			getImageUrl("peterburg-course-menu-mobile.png")
		]
	},
	{
		id: 7,
		title: "Сайт-визитка дипломата",
		description: "Официальный сайт с поддержкой 3 языков (русский/английский/французский) и строгим дизайном",
		icon: iconNames.gem,
		tech: ["ReactJS", "Vite", "i18n", "Мультиязычность"],
		featured: true,
		demo: "https://officialstyle.vercel.app/",
		link: [],
		images: [
			getImageUrl("official.png"),
			getImageUrl("rus_officialstyle.png"),
			getImageUrl("ang_officialstyle.png"),
			getImageUrl("form_officialstyle.png"),
			getImageUrl("form_officialstyle-mobile.png"),
			getImageUrl("menu_officialstyle-mobile.png")
		]
	},
	{
		id: 8,
		title: "Сайт парикмахера",
		description: "Портфолио мастера с онлайн-записью, выбором услуги и расписанием",
		icon: iconNames.cut,
		tech: ["ReactJS", "Vite", "Online Booking"],
		demo: "https://hairdresser-portfolio.vercel.app/",
		link: [],
		images: [
			getImageUrl("hairdresser.png"),
			getImageUrl("hairdresser.jpg"),
			getImageUrl("hairdresser-menu-mobile.png"),
			getImageUrl("carousel_hairdresser-mobile.png"),
			getImageUrl("form_hairdresser-mobile.png")
		]
	},
	{
		id: 9,
		title: "Студия маникюра",
		description: "Сайт-визитка мастера маникюра с портфолио работ и онлайн-записью",
		icon: iconNames.paint,
		tech: ["ReactJS", "Vite", "Tailwindcss"],
		demo: "https://natalia-vorobeva.github.io/business_card_manicure/",
		link: [],
		images: [
			getImageUrl("manicure.jpg"),
			getImageUrl("gallery-manicure.png"),
			getImageUrl("form-manicure.png")
		]
	},
	{
		id: 10,
		title: "Студия шугаринга",
		description: "Еще один вариант сайта для мастера шугаринга с галереей и онлайн-записью",
		icon: iconNames.sparkles,
		tech: ["ReactJS", "Vite", "Photo Gallery"],
		demo: "https://natalia-vorobeva.github.io/business_card_sugaring/",
		link: [],
		images: [
			getImageUrl("shugaring.jpg"),
			getImageUrl("shugaring-2.png"),
			getImageUrl("shugaring-3.jpg")			
		]
	},
];