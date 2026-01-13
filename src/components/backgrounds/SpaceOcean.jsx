function SpaceOcean() {
  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at top, #0a1222 0%, transparent 50%),
          radial-gradient(ellipse at bottom, #152238 0%, transparent 50%),
          linear-gradient(to bottom, #0a1222 0%, #152238 50%, #1e2a44 100%)`
      }}
    >
      <div 
        className="absolute w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 10% 20%, rgba(255, 255, 255, 0.8) 1px, transparent 1px),
            radial-gradient(1px 1px at 20% 30%, rgba(255, 255, 255, 0.6) 1px, transparent 1px),
            radial-gradient(2px 2px at 30% 40%, rgba(255, 255, 255, 1) 2px, transparent 2px)`,
          backgroundSize: '300px 300px',
          animation: 'stars-twinkle 5s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] blur-3xl"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(64, 156, 255, 0.2) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 200, 255, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 40% 60%, rgba(138, 43, 226, 0.1) 0%, transparent 40%)`,
          animation: 'nebula-drift 30s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 rounded-[50%_50%_0_0]"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(0, 119, 255, 0.2) 20%, rgba(0, 195, 255, 0.3) 40%, transparent)',
          animation: 'wave-motion 8s ease-in-out infinite'
        }}
      >
        <div 
          className="absolute top-[-50px] left-0 right-0 h-36 rounded-[50%_50%_0_0]"
          style={{
            background: 'linear-gradient(to bottom, transparent, rgba(64, 224, 208, 0.2) 30%, rgba(0, 119, 255, 0.1) 70%, transparent)',
            animation: 'wave-motion 6s ease-in-out infinite reverse'
          }}
        ></div>
      </div>
      <div 
        className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
        style={{
          top: '20%',
          left: '-100px',
          animation: 'shooting-star 5s linear infinite'
        }}
      ></div>
      <div 
        className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
        style={{
          top: '40%',
          left: '-100px',
          animation: 'shooting-star 5s linear infinite 2s'
        }}
      ></div>
      <div 
        className="absolute w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_10px_2px_rgba(255,255,255,0.8)]"
        style={{
          top: '60%',
          left: '-100px',
          animation: 'shooting-star 5s linear infinite 4s'
        }}
      ></div>
    </div>
  );
}

export default SpaceOcean;