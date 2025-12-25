import React from 'react';
import ContactItem from './ContactItem';
import { FaRobot } from 'react-icons/fa';
import ContactForm from '../forms/ContactForm';

const Contact = ({ CONFIG, trackEvent, trackFormInteraction }) => {
  return (
    <section id="contact" className="contact py-20 bg-black/20 animate-fade-in">
      <div className="container">
        <h2 className="section-title">Свяжитесь со мной</h2>
        <p className="section-subtitle">Готова обсудить ваш проект и предложить решение</p>

        <div className="security-note flex items-center justify-center gap-3 px-6 py-4 bg-primary/10 border border-primary/25 rounded-xl max-w-xs mx-auto my-8 text-primary font-semibold text-sm md:text-base backdrop-blur-sm">
          <FaRobot className="text-lg" />
          <span>Форма защищена от спама и ботов</span>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-12">
          <div className="contact-info">
            <div className="contact-block mb-10">
              <h3 className="text-xl font-semibold text-light mb-6 pb-3 border-b-2 border-primary/30">
                Прямые контакты
              </h3>
              
              <ContactItem
                type="email"
                label="Email для заказов"
                value={CONFIG.CONTACT_EMAIL}
                onClick={() => trackEvent('contact_click', 'engagement', 'Email Contact')}
              />
              
              <ContactItem
                type="phone"
                label="Телефон / WhatsApp"
                value={CONFIG.CONTACT_PHONE}
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
            </div>
            
            <div className="contact-block">
              <h3 className="text-xl font-semibold text-light mb-4">Время работы</h3>
              <div className="working-hours bg-gray-900/40 p-6 rounded-xl border border-primary/10 mt-8">
                <p className="text-gray-300 mb-2 text-sm md:text-base">Пн-Пт: 10:00 - 19:00</p>
                <p className="text-gray-300 mb-2 text-sm md:text-base">Сб-Вс: по договоренности</p>
                <p className="note text-xs text-gray-400 italic mt-4 pt-4 border-t border-primary/10">
                  В Telegram отвечаю быстрее
                </p>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <ContactForm 
              CONFIG={CONFIG}
              trackEvent={trackEvent}
              trackFormInteraction={trackFormInteraction}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;