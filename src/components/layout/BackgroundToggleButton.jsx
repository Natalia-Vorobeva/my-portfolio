import { useState } from 'react';

const BackgroundToggleButton = ({ backgroundType, setBackgroundType }) => {
	const [isChanging, setIsChanging] = useState(false);

	const allBackgrounds = [
		{ id: 'gradient-waves', name: 'Градиентные волны', emoji: '🌊' },
		{ id: 'neon-waves', name: 'Неоновые волны', emoji: '🔮' },
		{ id: 'space-ocean', name: 'Космический океан', emoji: '🚀' },
		{ id: 'aurora-waves', name: 'Северное сияние', emoji: '🌌' }
	];

	const handleBackgroundChange = () => {
		setIsChanging(true);
		const currentIndex = allBackgrounds.findIndex(bg => bg.id === backgroundType);
		const nextIndex = (currentIndex + 1) % allBackgrounds.length;
		const nextBackground = allBackgrounds[nextIndex];
		setBackgroundType(nextBackground.id);
		setTimeout(() => setIsChanging(false), 300);
	};

	return (
		<button
			className={`background-switcher ${isChanging ? 'changing' : ''}`}
			onClick={handleBackgroundChange}
			title="Сменить фон"
			aria-label="Сменить фон"
		>
		</button>

	);
};

export default BackgroundToggleButton;