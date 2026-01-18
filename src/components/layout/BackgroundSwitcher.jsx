function BackgroundSwitcher({ onSwitch, currentBackground }) {
  const backgroundNames = ['Neon', 'Aurora', 'Gradient', 'Space'];
  const emojis = ['🌈', '🌊', '💫', '🌌'];
  
  return (
    <div className="
      fixed 
      bottom-4 right-4
      sm:bottom-6 sm:right-6
      md:bottom-8 md:right-8
      flex items-end gap-2
      z-50
      group
    ">
      <div className="
        mb-1.5
        px-3 py-1.5
        bg-slate-800/90
        rounded-lg
        text-xs text-emerald-300
        whitespace-nowrap
        backdrop-blur-sm
        hidden sm:block
        shadow-lg
        transition-all duration-300
        group-hover:bg-slate-700/90
      ">
        <span className="text-emerald-400/80 text-[10px]">Выберите фон</span>
      </div>
			
      <div className="
        sm:hidden
        mb-2
        px-2 py-1
        bg-slate-800/90
        rounded-md
        text-[10px] text-emerald-300
        whitespace-nowrap
        backdrop-blur-sm
        shadow-lg
      ">
        фон
      </div>

      <button
        onClick={onSwitch}
        className="
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
        "
        title={`Текущий фон: ${backgroundNames[currentBackground]}. Нажмите для смены`}
      >
        <div className="hidden sm:block absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(0, 255, 136, 0.1) 50%, transparent 70%)',
            animation: 'scan 3s linear infinite'
          }}
        ></div>      
        <div className="absolute inset-0 rounded-full bg-black/30 -z-10"></div>      
        <span className="relative z-10">
          {emojis[currentBackground]}
        </span>
      </button>
    </div>
  );
}

export default BackgroundSwitcher;