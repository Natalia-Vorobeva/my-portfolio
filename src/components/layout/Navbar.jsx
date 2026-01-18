import React from 'react';
import { FiHome } from 'react-icons/fi';

const Navbar = ({ items, activeSection }) => {
  const handleClick = (e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      
      const header = document.querySelector('header');
      const marquee = document.querySelector('.marquee-container');
      const headerHeight = header ? header.offsetHeight : 80;
      const marqueeHeight = marquee ? marquee.offsetHeight : 0;
      const totalOffset = headerHeight + marqueeHeight;
      
      const elementPosition = element.offsetTop - totalOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.href.substring(1);
        
        return (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`nav-link flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
              isActive 
                ? 'text-primary bg-primary/10 border-b-2 border-primary' 
                : 'text-gray-400 hover:text-light hover:bg-dark/50'
            }`}
          >
            {Icon && <Icon className="w-5 h-5" />}
            <span className="font-medium">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
};

export default Navbar;