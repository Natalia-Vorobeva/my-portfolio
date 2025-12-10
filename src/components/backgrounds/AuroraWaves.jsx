function AuroraWaves() {
  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        background: `
          linear-gradient(to bottom, #0b0b1f 0%, #1a1b3a 30%, #2a2b55 70%, #3a3b70 100%),
          radial-gradient(circle at 50% 30%, rgba(30, 30, 60, 0.8) 0%, transparent 50%)
        `
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-3/5 overflow-hidden">
        <div 
          className="absolute w-[150%] left-[-25%] h-24 bg-gradient-to-r from-transparent via-emerald-400 via-sky-400 via-violet-700 via-fuchsia-500 via-emerald-400 to-transparent opacity-50 blur-3xl"
          style={{
            top: '10%',
            animation: 'aurora-flow 25s linear infinite'
          }}
        ></div>
        <div 
          className="absolute w-[150%] left-[-25%] h-24 bg-gradient-to-r from-transparent via-emerald-400 via-sky-400 via-violet-700 via-fuchsia-500 via-emerald-400 to-transparent opacity-50 blur-3xl"
          style={{
            top: '30%',
            animation: 'aurora-flow 30s linear infinite 5s'
          }}
        ></div>
        <div 
          className="absolute w-[150%] left-[-25%] h-24 bg-gradient-to-r from-transparent via-emerald-400 via-sky-400 via-violet-700 via-fuchsia-500 via-emerald-400 to-transparent opacity-50 blur-3xl"
          style={{
            top: '50%',
            animation: 'aurora-flow 35s linear infinite 10s'
          }}
        ></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-48"
        style={{
          background: `
            linear-gradient(to top, #0a0a1a 0%, transparent 100%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath d='M0,0v120h1200V0C1200,0,900,80,600,80S0,0,0,0z' fill='%230a0a1a'/%3E%3C/svg%3E")
          `,
          backgroundSize: '100% 100%, 300px 100px',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom, bottom'
        }}
      ></div>
      <div className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-sm shadow-[0_0_10px_#00ff95,0_0_20px_#00ff95]"
        style={{
          top: '20%',
          left: '15%',
          animation: 'particle-float 10s ease-in-out infinite'
        }}
      ></div>
      <div className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-sm shadow-[0_0_10px_#00ff95,0_0_20px_#00ff95]"
        style={{
          top: '40%',
          right: '20%',
          animation: 'particle-float 10s ease-in-out infinite 3s'
        }}
      ></div>
      <div className="absolute w-1 h-1 bg-emerald-400 rounded-full blur-sm shadow-[0_0_10px_#00ff95,0_0_20px_#00ff95]"
        style={{
          top: '60%',
          left: '70%',
          animation: 'particle-float 10s ease-in-out infinite 6s'
        }}
      ></div>
    </div>
  );
}

export default AuroraWaves;