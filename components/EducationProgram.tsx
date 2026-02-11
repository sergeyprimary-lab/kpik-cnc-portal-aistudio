
import React from 'react';

const modules = [
  {
    title: "Модуль 1: Основи ISO-програмування",
    details: "Вивчення G-кодів та M-кодів, структура керуючої програми, лінійна та кругова інтерполяція.",
    icon: "📜"
  },
  {
    title: "Модуль 2: Налагодження Fanuc",
    details: "Робота з пультом верстата, прив'язка інструменту (Offsets), виставлення нулів деталі (Work Shifts).",
    icon: "🖥️"
  },
  {
    title: "Модуль 3: Різальний інструмент",
    details: "Геометрія фрез та різців, режими різання (S, F), підбір інструменту під різні матеріали.",
    icon: "⚙️"
  },
  {
    title: "Модуль 4: CAD/CAM Системи",
    details: "Проектування в Mastercam або Fusion 360, генерація траєкторій та постпроцесування.",
    icon: "💻"
  }
];

const EducationProgram: React.FC = () => {
  return (
    <section id="program" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 tech-grid opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Навчальна програма</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Курс розроблений спільно з інженерами провідних підприємств регіону.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((m, idx) => (
            <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:bg-blue-600/20 hover:border-blue-500/50 transition-all duration-500 group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{m.icon}</div>
              <h3 className="text-xl font-bold mb-4">{m.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{m.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationProgram;
