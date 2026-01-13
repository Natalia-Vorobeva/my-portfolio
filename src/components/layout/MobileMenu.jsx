import React from 'react';
import { trackEvent } from '../../utils/tracking';

const MobileMenu = ({ isOpen, items, onClose }) => {
  return (
    <div className={`md:hidden absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-xl border-b border-primary/10 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
      <div className="container px-4 py-4">
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => {
                onClose();
                trackEvent('navigation', 'engagement', `${item.label} Section`);
              }}
              className="text-light hover:text-primary transition-colors py-2 text-center md:text-left"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;