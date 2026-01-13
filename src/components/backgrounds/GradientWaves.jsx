function GradientWaves() {
  return (
    <div 
      className="fixed top-0 left-0 right-0 bottom-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        background: 'linear-gradient(-45deg, #0f172a 0%, #1e293b 25%, #2d3748 50%, #4a5568 75%, #718096 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradient-shift 20s ease infinite'
      }}
    >
      <div 
        className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] origin-center"
        style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
          animation: 'wave-move-1 25s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] origin-center"
        style={{
          background: 'radial-gradient(circle at 80% 20%, rgba(245, 87, 108, 0.1) 0%, transparent 50%)',
          animation: 'wave-move-2 30s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute top-[-50%] left-[-50%] right-[-50%] bottom-[-50%] origin-center"
        style={{
          background: 'radial-gradient(circle at 40% 40%, rgba(79, 172, 254, 0.1) 0%, transparent 50%)',
          animation: 'wave-move-3 35s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute rounded-full bg-white/5 backdrop-blur border border-white/10"
        style={{
          width: 'clamp(100px, 20vw, 300px)',
          height: 'clamp(100px, 20vw, 300px)',
          top: '10%',
          left: '5%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent 70%)',
          animation: 'element-float 20s ease-in-out infinite'
        }}
      ></div>
      <div 
        className="absolute rounded-full bg-white/5 backdrop-blur border border-white/10"
        style={{
          width: 'clamp(80px, 15vw, 200px)',
          height: 'clamp(80px, 15vw, 200px)',
          bottom: '20%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(245, 87, 108, 0.1), transparent 70%)',
          animation: 'element-float 20s ease-in-out infinite 5s'
        }}
      ></div>
      <div 
        className="absolute rounded-full bg-white/5 backdrop-blur border border-white/10"
        style={{
          width: 'clamp(60px, 10vw, 150px)',
          height: 'clamp(60px, 10vw, 150px)',
          top: '60%',
          left: '80%',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1), transparent 70%)',
          animation: 'element-float 20s ease-in-out infinite 10s'
        }}
      ></div>
    </div>
  );
}

export default GradientWaves;