import React from 'react';
import { FiMail, FiPhone, FiSend } from 'react-icons/fi';
import { CONFIG } from '../shared/config';
import { trackEvent } from '../../utils/tracking';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <div className="contact-block mb-10">
        <h3 className="text-xl font-semibold text-light mb-6 pb-3 border-b-2 border-primary/30">Прямые контакты</h3>
        <a href={`mailto:${CONFIG.CONTACT_EMAIL}`} className="contact-item flex items-start gap-4 p-4 bg-gray-900/40 rounded-xl mb-4 text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:translate-x-2"
          onClick={() => trackEvent('contact_click', 'engagement', 'Email Contact')}>
          <FiMail className="text-primary text-xl mt-1 shrink-0" />
          <div>
            <span className="contact-label block text-sm text-gray-400 mb-1">Email для заказов</span>
            <span className="contact-value block text-base font-semibold text-light">{CONFIG.CONTACT_EMAIL}</span>
          </div>
        </a>
        <a href={`tel:${CONFIG.CONTACT_PHONE.replace(/\s/g, '')}`} className="contact-item flex items-start gap-4 p-4 bg-gray-900/40 rounded-xl mb-4 text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:translate-x-2"
          onClick={() => trackEvent('contact_click', 'engagement', 'Phone Contact')}>
          <FiPhone className="text-primary text-xl mt-1 shrink-0" />
          <div>
            <span className="contact-label block text-sm text-gray-400 mb-1">Телефон / WhatsApp</span>
            <span className="contact-value block text-base font-semibold text-light">{CONFIG.CONTACT_PHONE}</span>
          </div>
        </a>
        <a href="https://t.me/vorobjevaa" target="_blank" rel="noopener noreferrer" className="contact-item flex items-start gap-4 p-4 bg-gray-900/40 rounded-xl mb-4 text-light no-underline transition-all duration-300 border border-transparent hover:bg-primary/15 hover:border-primary/30 hover:translate-x-2"
          onClick={() => trackEvent('social_click', 'engagement', 'Telegram Profile')}>
          <FiSend className="text-primary text-xl mt-1 shrink-0" />
          <div>
            <span className="contact-label block text-sm text-gray-400 mb-1">Telegram</span>
            <span className="contact-value block text-base font-semibold text-light">@vorobjevaa</span>
            <span className="contact-note text-xs text-gray-400 mt-1">Быстрый ответ</span>
          </div>
        </a>
      </div>
      <div className="contact-block">
        <h3 className="text-xl font-semibold text-light mb-4">Время работы</h3>
        <div className="working-hours bg-gray-900/40 p-6 rounded-xl border border-primary/10 mt-8">
          <p className="text-gray-300 mb-2 text-sm md:text-base">Пн-Пт: 10:00 - 19:00</p>
          <p className="text-gray-300 mb-2 text-sm md:text-base">Сб-Вс: по договоренности</p>
          <p className="note text-xs text-gray-400 italic mt-4 pt-4 border-t border-primary/10">В Telegram отвечаю быстрее</p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;