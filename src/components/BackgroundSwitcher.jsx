function BackgroundSwitcher({ onSwitch, currentBackground }) {
  const backgroundNames = ['Neon', 'Aurora', 'Gradient', 'Space'];
  const emojis = ['🌈', '🌊', '💫', '🌌'];
  
  return (
    <button
      onClick={onSwitch}
      className="
        fixed 
        bottom-4 right-4
        sm:bottom-6 sm:right-6
        md:bottom-8 md:right-8
        w-10 h-10
        sm:w-12 sm:h-12
        md:w-14 md:h-14
        border border-emerald-400/30
        sm:border-2 sm:border-emerald-400/50
        bg-slate-900/90
        text-emerald-300
        text-base
        sm:text-lg
        md:text-xl
        cursor-pointer
        flex items-center justify-center
        shadow-[0_0_10px_rgba(0,255,136,0.2),inset_0_0_5px_rgba(0,255,136,0.1)]
        sm:shadow-[0_0_15px_rgba(0,255,136,0.3),inset_0_0_10px_rgba(0,255,136,0.1)]
        transition-all duration-300
        z-50
        overflow-hidden
        rounded-full
        hover:bg-slate-800/95
        hover:shadow-[0_0_20px_rgba(0,255,136,0.4),inset_0_0_10px_rgba(0,255,136,0.2)]
        sm:hover:shadow-[0_0_25px_rgba(0,255,136,0.5),inset_0_0_15px_rgba(0,255,136,0.2)]
        hover:scale-105
        sm:hover:scale-110
        active:scale-95
        backdrop-blur-sm
        will-change-transform
        min-[450px]:max-sm:bottom-5 min-[450px]:max-sm:right-5
      "
      title={`Текущий фон: ${backgroundNames[currentBackground]}. Нажмите для смены`}
    >
      {/* Scan animation effect - скрыта на очень маленьких экранах для производительности */}
      <div className="hidden sm:block absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 136, 0.1) 50%, transparent 70%)',
          animation: 'scan 3s linear infinite'
        }}
      ></div>
      
      {/* Background for contrast */}
      <div className="absolute inset-0 rounded-full bg-black/30 -z-10"></div>
      
      {/* Emoji/Icon */}
      <span className="relative z-10">
        {emojis[currentBackground]}
      </span>
      
      {/* Tooltip on hover (desktop only) */}
      <div className="
        absolute -top-10 left-1/2 -translate-x-1/2
        px-2 py-1.5
        sm:px-3 sm:py-2
        bg-slate-800/90
        border border-emerald-400/30
        rounded-lg
        text-xs text-emerald-300
        whitespace-nowrap
        opacity-0
        group-hover:opacity-100
        transition-opacity duration-200
        pointer-events-none
        backdrop-blur-sm
        hidden sm:block
        shadow-lg
        sm:text-xs
      ">
        Фон: {backgroundNames[currentBackground]}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-b border-r border-emerald-400/30 rotate-45"></div>
      </div>
    </button>
  );
}

export default BackgroundSwitcher;