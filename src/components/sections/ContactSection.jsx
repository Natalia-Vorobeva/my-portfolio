import { FaRobot } from 'react-icons/fa';
import ContactInfo from './ContactInfo';
import ContactForm from '../ui/ContactForm';

const ContactSection = () => {
  return (
    <section id="contact" className="contact py-20 bg-black/20 animate-fade-in">
      <div className="container">
        <h2 className="section-title">Контакты</h2>
        <p className="section-subtitle">Выберите удобный способ связи</p>

        <div className="security-note flex items-center justify-center gap-3 px-6 py-4 bg-primary/10 border border-primary/25 rounded-xl max-w-xs mx-auto my-8 text-primary font-semibold text-sm md:text-base backdrop-blur-sm">
          <FaRobot className="text-lg" />
          <span>Форма защищена от спама и ботов</span>
        </div>

        <div className="contact-grid grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;