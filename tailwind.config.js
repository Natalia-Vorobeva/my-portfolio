/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#667eea',
				secondary: '#764ba2',
				accent: '#f5576c',
				accentLight: '#4facfe',
				accentGreen: '#43e97b',
				dark: '#121826',
				light: '#f8f9fa',
				success: '#43e97b',
				error: '#f94144',
				gray: {
					50: '#f9fafb',
					100: '#f3f4f6',
					200: '#e5e7eb',
					300: '#d1d5db',
					400: '#9ca3af',
					500: '#6b7280',
					600: '#4b5563',
					700: '#374151',
					800: '#1f2937',
					900: '#111827',
				},
			},
			transitionDuration: {
				'400': '400ms',
				'800': '800ms',
			},
			backgroundImage: {
				'primary-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
				'secondary-gradient': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
				'accent-gradient': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
				'success-gradient': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
			},
			animation: {
				'wave-move-3': 'wave-move-3 35s ease-in-out infinite',
				'element-float': 'element-float 20s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'neuron-expand': 'neuron-expand 3s ease-in-out infinite',
				'data-point': 'data-point 8s linear infinite',
				'fade-in': 'fadeIn 0.8s ease-out',
				'spin': 'spin 1s linear infinite',
				'pulse': 'pulse 2s ease-in-out infinite',
				'slide-up': 'slideUp 0.4s ease',
				'slide-in': 'slideIn 0.5s ease',
			},
			backdropBlur: {
				'xs': '2px',
			},
			boxShadow: {
				'neon': '0 0 15px rgba(0, 255, 136, 0.3), inset 0 0 10px rgba(0, 255, 136, 0.1)',
				'neon-hover': '0 0 25px rgba(0, 255, 136, 0.5), inset 0 0 15px rgba(0, 255, 136, 0.2)',
				'primary-glow': '0 0 10px rgba(102, 126, 234, 0.4)',
				'primary-glow-lg': '0 0 20px rgba(102, 126, 234, 0.3)',
				'filter-chip': '0 2px 8px rgba(0, 0, 0, 0.15)',
				'filter-chip-active': '0 0 8px rgba(102, 126, 234, 0.4), inset 0 0 8px rgba(102, 126, 234, 0.1)',
			},
		},
	},
	plugins: [],
}