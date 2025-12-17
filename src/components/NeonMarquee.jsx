const NeonMarquee = () => {
  const text = "Собственный сайт - не расходы, а инвестиция в репутацию и рост • ";

  return (
    <div className="relative overflow-hidden bg-gray-900 py-3 border-y border-transparent">
      {/* Неоновый фон с анимацией */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent animate-neon-pulse"></div>

      {/* Двойное неоновое свечение */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]"></div>

      {/* Контейнер для бегущей строки */}
      <div className="relative overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* Первый набор текста */}
          <div className="flex items-center min-w-max">
            {Array(8).fill(0).map((_, i) => (
              <span key={`text1-${i}`} className="flex items-center mx-6">
                <span className="text-sm md:text-base font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]">
                  {text}
                </span>
                {/* Неоновая точка */}
                <span className="w-1 h-1 mx-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
              </span>
            ))}
          </div>

          {/* Второй набор текста для бесшовной анимации */}
          <div className="flex items-center min-w-max">
            {Array(8).fill(0).map((_, i) => (
              <span key={`text2-${i}`} className="flex items-center mx-6">
                <span className="text-sm md:text-base font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]">
                  {text}
                </span>
                {/* Неоновая точка */}
                <span className="w-1 h-1 mx-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Затемнение краев для плавности */}
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
    </div>
  );
};

export default NeonMarquee;