import React from 'react';

const About = () => {
  return (
    <section id="about" className="about py-20 animate-fade-in">
      <div className="container">
        <div className="about-content max-w-4xl mx-auto">
          <div className="about-text">
            <h2 className="section-title">Обо мне</h2>
            <p className="text-lg text-gray-300 text-center mb-12 leading-relaxed max-w-3xl mx-auto">
              Фронтенд-разработчик с фокусом на создании интуитивных и производительных интерфейсов.
              Имею опыт работы с современными технологиями и фреймворками.
              Верю, что качественный код — это код, который решает проблемы пользователей и бизнеса.
            </p>

            <div className="about-details grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <DetailItem 
                title="Подход к работе"
                description="Анализирую задачу, предлагаю оптимальное решение, тестирую и оптимизирую результат."
              />
              <DetailItem 
                title="Коммуникация"
                description="Прозрачная работа, регулярные отчеты о прогрессе, открытость к правкам."
              />
              <DetailItem 
                title="Технологии"
                description="Постоянно изучаю новые инструменты и лучшие практики разработки."
              />
            </div>

            <div className="stats grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <StatItem number="10+" label="Проектов" />
              <StatItem number="100%" small label="Соблюдение сроков" />
              <StatItem number="24/7" label="Поддержка" />
              <StatItem number="2+" label="Года опыта" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DetailItem = ({ title, description }) => (
  <div className="detail-item bg-gray-900/50 p-8 rounded-xl border border-primary/10 transition-transform duration-300 hover:-translate-y-2 hover:border-primary/30">
    <h4 className="text-xl font-semibold text-light mb-4">{title}</h4>
    <p className="text-gray-300">{description}</p>
  </div>
);

const StatItem = ({ number, label, small = false }) => (
  <div className="stat bg-gradient-to-br from-gray-900/70 to-dark/90 p-8 rounded-xl text-center border border-primary/15 relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)]">
    <div className={`stat-number block ${small ? 'text-3xl' : 'text-4xl'} font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2`}>
      {number}
    </div>
    <div className="stat-label text-gray-300 font-medium">{label}</div>
  </div>
);

export default About;