import{j as r}from"./index-ecg7YOia.js";function o({onSwitch:t,currentBackground:e}){const n=["Neon","Aurora","Gradient","Space"],s=["🌈","🌊","💫","🌌"];return r.jsxs("button",{onClick:t,className:`\r
        fixed \r
        bottom-4 right-4\r
        sm:bottom-6 sm:right-6\r
        md:bottom-8 md:right-8\r
        w-10 h-10\r
        sm:w-12 sm:h-12\r
        md:w-14 md:h-14\r
        border border-emerald-400/30\r
        sm:border-2 sm:border-emerald-400/50\r
        bg-slate-900/90\r
        text-emerald-300\r
        text-base\r
        sm:text-lg\r
        md:text-xl\r
        cursor-pointer\r
        flex items-center justify-center\r
        shadow-[0_0_10px_rgba(0,255,136,0.2),inset_0_0_5px_rgba(0,255,136,0.1)]\r
        sm:shadow-[0_0_15px_rgba(0,255,136,0.3),inset_0_0_10px_rgba(0,255,136,0.1)]\r
        transition-all duration-300\r
        z-50\r
        overflow-hidden\r
        rounded-full\r
        hover:bg-slate-800/95\r
        hover:shadow-[0_0_20px_rgba(0,255,136,0.4),inset_0_0_10px_rgba(0,255,136,0.2)]\r
        sm:hover:shadow-[0_0_25px_rgba(0,255,136,0.5),inset_0_0_15px_rgba(0,255,136,0.2)]\r
        hover:scale-105\r
        sm:hover:scale-110\r
        active:scale-95\r
        backdrop-blur-sm\r
        will-change-transform\r
        min-[450px]:max-sm:bottom-5 min-[450px]:max-sm:right-5\r
      `,title:`Текущий фон: ${n[e]}. Нажмите для смены`,children:[r.jsx("div",{className:"hidden sm:block absolute inset-0 w-full h-full",style:{background:"linear-gradient(45deg, transparent 30%, rgba(0, 255, 136, 0.1) 50%, transparent 70%)",animation:"scan 3s linear infinite"}}),r.jsx("div",{className:"absolute inset-0 rounded-full bg-black/30 -z-10"}),r.jsx("span",{className:"relative z-10",children:s[e]}),r.jsxs("div",{className:`\r
        absolute -top-10 left-1/2 -translate-x-1/2\r
        px-2 py-1.5\r
        sm:px-3 sm:py-2\r
        bg-slate-800/90\r
        border border-emerald-400/30\r
        rounded-lg\r
        text-xs text-emerald-300\r
        whitespace-nowrap\r
        opacity-0\r
        group-hover:opacity-100\r
        transition-opacity duration-200\r
        pointer-events-none\r
        backdrop-blur-sm\r
        hidden sm:block\r
        shadow-lg\r
        sm:text-xs\r
      `,children:["Фон: ",n[e],r.jsx("div",{className:"absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 border-b border-r border-emerald-400/30 rotate-45"})]})]})}export{o as default};
