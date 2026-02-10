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

// Имена иконок для отложенной загрузки
export const iconNames = {
	check: "FaCheckCircle",
	comments: "FaComments",
	cut: "FaCut",
	sparkles: "FaHandSparkles",
	hands: "FaHands",
	gem: "FaGem",
	paint: "FaPaintBrush",
	globe: "FaGlobeAmericas"
};

export const portfolioItems = [
	{
		id: 1,
		title: "Email-письмо",
		description: "Адаптивный email-шаблон с кросс-клиентской совместимостью",
		icon: iconNames.check,
		tech: ["HTML", "CSS", "Email-верстка", "Outlook VML", "Адаптивный дизайн"],
		featured: true,
		demo: "https://natalia-vorobeva.github.io/email-final-discount/",
		link: [], // Добавьте реальные ссылки на код
		images: [
			"/images/email-discount-desktop-preview.png",
			"/images/email-discount-mobile-preview.png",
			"/images/email-discount-desktop-preview.png",
		],
	},

	{
		id: 8,
		title: "Карусели и слайдеры",
		description: "Коллекция различных слайдеров для сайтов: Swiper, Embla, Splide, Lightbox",
		icon: iconNames.hands,
		tech: ["Swiper", "Embla", "Splide", "Lightbox", "JavaScript"],
		demo: "https://natalia-vorobeva.github.io/carousels/",
		link: [],
		images: [
			"/images/sliders.jpg",
			"/images/slider1.jpg",
			"/images/slider5.jpg",
			"/images/slider2.png",
			"/images/slider4.png",
			"/images/slider3.png",
		]
	},
	{
		id: 2,
		title: "ToDo List Fullstack",
		description: "Приложение для управления задачами с регистрацией, аутентификацией через JWT и SQLite базой данных",
		icon: iconNames.check,
		tech: ["ReactJS", "JWT", "Express", "SQLite3", "Tailwindcss", "Render.com"],
		featured: true,
		demo: "https://todo-react-node-sqlite-jwt.onrender.com/register",
		link: [],
		images: [
			"/images/todolist.jpg",
			"/images/todolist-mobile.png"
		]
	},
	{
		id: 3,
		title: "Мессенджер Real-time",
		description: "Чат-приложение с комментами, загрузкой файлов",
		icon: iconNames.comments,
		tech: ["ReactJS", "Node.js", "PostgreSQL", "Vercel"],
		featured: true,
		demo: "https://messenger-full.vercel.app/",
		link: [],
		images: [
			"/images/messenger.jpg",
			"/images/messenger-mobile.png",
			"/images/messenger-comment.png",
			"/images/messenger-comment-mobile.png"

		]
	},
	{
		id: 9,
		title: "Дашборд мировых новостей",
		description: "Визуализация и фильтрация мировых новостей в реальном времени с помощью d3.js",
		icon: iconNames.globe,
		tech: ["d3.js", "Data Visualization", "API Integration", "News Aggregation"],
		featured: true,
		demo: "https://d3-news.vercel.app/",
		link: [],
		images: [
			"/images/news-dashboard.jpg",
			"/images/news-dashboard-2.png",
			"/images/news-dashboard-3.png",
		]
	},
	{
		id: 4,
		title: "Верстка Bootstrap",
		description: "Верстка и доработка существующего сайта с адаптивным дизайном",
		icon: iconNames.comments,
		tech: ["ReactJS", "jQuery", "Bootstrap4", "Vite"],
		demo: "https://petersburg-time-course.vercel.app/#about-course",
		link: [],
		images: [
			"/images/peterburg-course.jpg",
			"/images/peterburg-course-2.png",
			"/images/peterburg-course-footer-mobile.png",
			"/images/peterburg-course-menu-mobile.png",
		]
	},
	{
		id: 5,
		title: "Сайт-визитка дипломата",
		description: "Официальный сайт с поддержкой 3 языков (русский/английский/французский) и строгим дизайном",
		icon: iconNames.gem,
		tech: ["ReactJS", "Vite", "i18n", "Мультиязычность"],
		featured: true,
		demo: "https://officialstyle.vercel.app/",
		link: [],
		images: [
			"/images/official.png",
			"/images/rus_officialstyle.png",
			"/images/ang_officialstyle.png",
			"/images/form_officialstyle.png",
			"/images/form_officialstyle-mobile.png",
			"/images/menu_officialstyle-mobile.png",
		]
	},
	{
		id: 6,
		title: "Сайт парикмахера",
		description: "Портфолио мастера с онлайн-записью, выбором услуги и расписанием",
		icon: iconNames.cut,
		tech: ["ReactJS", "Vite", "Online Booking"],
		demo: "https://hairdresser-portfolio.vercel.app/",
		link: [],
		images: [
			"/images/hairdresser.png",
			"/images/hairdresser.jpg",
			"/images/hairdresser-menu-mobile.png",
			"/images/carousel_hairdresser-mobile.png",
			"/images/form_hairdresser-mobile.png",
		]
	},
	{
		id: 7,
		title: "Студия маникюра",
		description: "Сайт-визитка мастера маникюра с портфолио работ и онлайн-записью",
		icon: iconNames.paint,
		tech: ["ReactJS", "Vite", "Tailwindcss"],
		demo: "https://natalia-vorobeva.github.io/business_card_manicure/",
		link: [],
		images: [
			"/images/manicure.jpg",
			"/images/gallery-manicure.png",
			"/images/form-manicure.png",
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
			"/images/shugaring.jpg",
			"/images/shugaring-2.png",
			"/images/shugaring-3.jpg",
		]
	},
];