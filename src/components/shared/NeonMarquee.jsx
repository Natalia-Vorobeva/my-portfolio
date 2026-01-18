import React, { useMemo } from 'react';

const NeonMarquee = () => {
  const text = "Собственный сайт - не расходы, а инвестиция в репутацию и рост • ";

  const marqueeItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 4; i++) { 
      items.push(
        <span key={`text-${i}`} className="flex items-center mx-4 sm:mx-6">
          <span className="text-sm md:text-base font-medium tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
            {text}
          </span>
          <span className="w-1 h-1 mx-2 rounded-full bg-cyan-400"></span>
        </span>
      );
    }
    return items;
  }, [text]);

  return (
   <div className="marquee-container relative overflow-hidden bg-dark/50 py-2 border-y border-primary/10">
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

      <div className="relative overflow-hidden">
        <div 
          className="flex whitespace-nowrap"
          style={{
            animation: 'marquee 30s linear infinite',
            willChange: 'transform'
          }}
        >
					
          <div className="flex items-center min-w-max">
            {marqueeItems}
          </div>
          <div className="flex items-center min-w-max">
            {marqueeItems}
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-12 h-full bg-gradient-to-r from-gray-900 via-gray-900/95 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-gray-900 via-gray-900/95 to-transparent z-10"></div>

    </div>
  );
};

export default React.memo(NeonMarquee);