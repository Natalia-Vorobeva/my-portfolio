import React from 'react';
import { trackEvent } from '../../utils/tracking';

const Navbar = ({ items, activeSection }) => {
  return (
    <nav className="nav hidden md:flex gap-4 lg:gap-6 items-center">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={`nav-link text-light font-medium transition-all duration-300 hover:text-primary relative py-2 text-sm lg:text-base group ${activeSection === item.href.substring(1) ? 'text-primary' : ''}`}
          onClick={() => trackEvent('navigation', 'engagement', `${item.label} Section`)}
        >
          {activeSection === item.href.substring(1) && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
          )}
          <span className="relative z-10">{item.label}</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
          <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </a>
      ))}
    </nav>
  );
};

export default Navbar;