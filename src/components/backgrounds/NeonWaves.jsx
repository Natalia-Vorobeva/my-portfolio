function NeonWaves() {
  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 50% 0%, #0a0a1a 0%, #000 100%),
          linear-gradient(90deg, 
            rgba(255, 0, 255, 0.1) 0%,
            rgba(0, 255, 255, 0.1) 25%,
            rgba(255, 255, 0, 0.1) 50%,
            rgba(0, 255, 0, 0.1) 75%,
            rgba(255, 0, 255, 0.1) 100%
          )`,
        backgroundSize: '100% 100%, 200% 100%',
        animation: 'neon-shift 15s ease infinite'
      }}
    >
      <div 
        className="absolute w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(0deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          animation: 'grid-pulse 3s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute w-[150%] left-[-25%] h-px blur-px"
        style={{
          top: '30%',
          background: 'linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent)',
          animation: 'neon-scan 4s linear infinite'
        }}
      ></div>
      <div 
        className="absolute w-[150%] left-[-25%] h-px blur-px"
        style={{
          top: '50%',
          background: 'linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent)',
          animation: 'neon-scan 4s linear infinite 1s'
        }}
      ></div>
      <div 
        className="absolute w-[150%] left-[-25%] h-px blur-px"
        style={{
          top: '70%',
          background: 'linear-gradient(90deg, transparent, #ff00ff, #00ffff, transparent)',
          animation: 'neon-scan 4s linear infinite 2s'
        }}
      ></div>
      <div 
        className="absolute rounded-full blur-xl"
        style={{
          width: '100px',
          height: '100px',
          top: '20%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(255, 0, 255, 0.3) 0%, rgba(0, 255, 255, 0.2) 30%, transparent 70%)',
          animation: 'neon-float 8s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute rounded-full blur-xl"
        style={{
          width: '100px',
          height: '100px',
          top: '60%',
          right: '15%',
          background: 'radial-gradient(circle, rgba(255, 0, 255, 0.3) 0%, rgba(0, 255, 255, 0.2) 30%, transparent 70%)',
          animation: 'neon-float 8s ease-in-out infinite 2s'
        }}
      ></div>
      <div 
        className="absolute rounded-full blur-xl"
        style={{
          width: '100px',
          height: '100px',
          bottom: '20%',
          left: '70%',
          background: 'radial-gradient(circle, rgba(255, 0, 255, 0.3) 0%, rgba(0, 255, 255, 0.2) 30%, transparent 70%)',
          animation: 'neon-float 8s ease-in-out infinite 4s'
        }}
      ></div>
    </div>
  );
}

export default NeonWaves;