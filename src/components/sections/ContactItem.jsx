import React from 'react';
import { FiMail, FiPhone, FiSend } from 'react-icons/fi';

const ContactItem = ({ 
  type = 'link', // 'email', 'phone', 'external', 'internal'
  icon = <FiMail />,
  label,
  value,
  href,
  onClick,
  note,
  className = ''
}) => {
  // Определяем тип иконки по умолчанию в зависимости от типа
  const getDefaultIcon = () => {
    switch(type) {
      case 'email': return <FiMail className="text-primary text-xl mt-1 shrink-0" />;
      case 'phone': return <FiPhone className="text-primary text-xl mt-1 shrink-0" />;
      case 'external': return <FiSend className="text-primary text-xl mt-1 shrink-0" />;
      default: return icon;
    }
  };

  // Определяем href по умолчанию в зависимости от типа
  const getDefaultHref = () => {
    if (href) return href;
    
    switch(type) {
      case 'email': return `mailto:${value}`;
      case 'phone': return `tel:${value.replace(/\s/g, '')}`;
      default: return '#';
    }
  };

  // Компонент-обертка, который решает, какой тег использовать
  const Wrapper = ({ children }) => {
    const finalHref = getDefaultHref();
    
    // Если это внутренний переход (якорь) или нет href
    if (type === 'internal' || !finalHref || finalHref === '#') {
      return (
        <button 
          className={`contact-item ${className}`}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }
    
    // Если это внешняя ссылка
    if (type === 'external') {
      return (
        <a
          href={finalHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`contact-item ${className}`}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    
    // Если это обычная ссылка (email, phone)
    return (
      <a 
        href={finalHref} 
        className={`contact-item ${className}`}
        onClick={onClick}
      >
        {children}
      </a>
    );
  };

  // Обработчик клика по умолчанию
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    
    // Трекинг по умолчанию в зависимости от типа
    if (typeof window !== 'undefined' && window.gtag) {
      let eventLabel = '';
      switch(type) {
        case 'email': eventLabel = 'Email Contact'; break;
        case 'phone': eventLabel = 'Phone Contact'; break;
        case 'external': eventLabel = `${label} Link`; break;
        default: eventLabel = 'Contact Item';
      }
      window.gtag('event', 'contact_click', {
        event_category: 'engagement',
        event_label: eventLabel,
        value: type
      });
    }
  };

  return (
    <Wrapper>
      <div className="flex items-start gap-4 p-4 bg-gray-900/40 rounded-xl mb-4 text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:translate-x-2">
        {getDefaultIcon()}
        <div>
          <span className="contact-label block text-sm text-gray-400 mb-1">{label}</span>
          <span className="contact-value block text-base font-semibold text-light">{value}</span>
          {note && (
            <span className="contact-note text-xs text-gray-400 mt-1 block">
              {note}
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

// Отдельный компонент ContactLink для простого использования
const ContactLink = ({ 
  children, 
  href, 
  external = false, 
  onClick,
  className = '',
  ...props 
}) => {
  const Wrapper = external ? 
    ({ children }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    ) : 
    ({ children }) => (
      <a 
        href={href} 
        onClick={onClick}
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  
  return <Wrapper>{children}</Wrapper>;
};

// HOC (Higher Order Component) обертка для контактов
const withContactWrapper = (Component) => {
  return function ContactWrapper({ external = false, ...props }) {
    const Wrapper = external ? 
      ({ children }) => (
        <a 
          target="_blank" 
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      ) : 
      ({ children }) => (
        <a {...props}>
          {children}
        </a>
      );
    
    return (
      <Wrapper>
        <Component {...props} />
      </Wrapper>
    );
  };
};

// Пример использования улучшенного компонента ContactItem в Contact секции
const EnhancedContactSection = ({ trackEvent }) => {
  return (
    <div className="contact-block mb-10">
      <h3 className="text-xl font-semibold text-light mb-6 pb-3 border-b-2 border-primary/30">
        Прямые контакты
      </h3>
      
      <ContactItem
        type="email"
        label="Email для заказов"
        value="vorobjeva.natalia76@yandex.ru"
        onClick={() => trackEvent('contact_click', 'engagement', 'Email Contact')}
      />
      
      <ContactItem
        type="phone"
        label="Телефон / WhatsApp"
        value="+7 (911) 208-04-79"
        onClick={() => trackEvent('contact_click', 'engagement', 'Phone Contact')}
      />
      
      <ContactItem
        type="external"
        label="Telegram"
        value="@vorobjevaa"
        href="https://t.me/vorobjevaa"
        note="Быстрый ответ"
        onClick={() => trackEvent('social_click', 'engagement', 'Telegram Profile')}
      />
      
      {/* Альтернативный вариант с ContactLink */}
      <ContactLink
        href="https://github.com/yourprofile"
        external={true}
        className="contact-item"
        onClick={() => trackEvent('social_click', 'engagement', 'GitHub Profile')}
      >
        <div className="flex items-start gap-4 p-4 bg-gray-900/40 rounded-xl mb-4">
          <FiSend className="text-primary text-xl mt-1 shrink-0" />
          <div>
            <span className="contact-label block text-sm text-gray-400 mb-1">GitHub</span>
            <span className="contact-value block text-base font-semibold text-light">
              github.com/yourprofile
            </span>
          </div>
        </div>
      </ContactLink>
    </div>
  );
};

// Экспорт всех компонентов
export { ContactItem, ContactLink, withContactWrapper, EnhancedContactSection };

// Экспорт по умолчанию основного компонента
export default ContactItem;