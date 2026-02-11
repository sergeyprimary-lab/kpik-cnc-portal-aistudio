
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EducationProgram from './components/EducationProgram';
import VacanciesSection from './components/VacanciesSection';
import SuccessStories from './components/SuccessStories';
import AdminDashboard from './pages/AdminDashboard';
import EnrollmentAssistant from './components/EnrollmentAssistant';
import LoginScreen from './components/LoginScreen';
import Logo from './components/Logo';
import { 
  INITIAL_VACANCIES, 
  INITIAL_STORIES, 
  INITIAL_NEWS, 
  INITIAL_VIDEOS 
} from './constants';
import { Vacancy, SuccessStory, NewsItem, EnterpriseVideo } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [vacancies, setVacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const [stories, setStories] = useState<SuccessStory[]>(INITIAL_STORIES);
  const [news, setNews] = useState<NewsItem[]>(INITIAL_NEWS);
  const [videos] = useState<EnterpriseVideo[]>(INITIAL_VIDEOS);

  useEffect(() => {
    window.dispatchEvent(new Event('scroll_reveal_init'));
  }, [currentPage, vacancies, stories, news]);

  const handleNav = (page: 'home' | 'admin') => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setCurrentPage('home');
  };

  const handleVideoClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  };

  const renderHome = () => (
    <main className="page-transition-enter">
      <Hero onStartEnrollment={() => setIsAssistantOpen(true)} />
      
      <EducationProgram />

      {/* Multimedia / Videos Section */}
      <section className="py-24 bg-slate-50 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Виробництво зсередини</h2>
              <p className="text-slate-600">Подивіться, як працюють сучасні заводи України та світу.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, idx) => (
              <div 
                key={video.id} 
                className={`group cursor-pointer reveal stagger-${(idx % 3) + 1}`}
                onClick={() => handleVideoClick(video.videoUrl)}
              >
                <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 shadow-xl transition-all duration-500 hover:shadow-blue-500/20">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 backdrop-blur-[2px]">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl transform scale-75 group-hover:scale-100 transition duration-300">
                      <svg className="w-10 h-10 fill-current ml-1" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.841z"></path></svg>
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors duration-300 px-2">{video.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="reveal">
        <VacanciesSection vacancies={vacancies} />
      </div>
      
      {/* Features/Benefits Section */}
      <section className="py-24 bg-white border-y border-slate-100 reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="p-10 rounded-[2.5rem] bg-blue-50/50 hover:bg-blue-100 transition-all duration-500 reveal stagger-1 border border-blue-100/50">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Інтенсив</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Стисла та максимально насичена програма підготовки для швидкого виходу на роботу.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-slate-50 hover:bg-slate-100 transition-all duration-500 reveal stagger-2 border border-slate-200">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Стабільність</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Ми супроводжуємо кожного студента до моменту підписання трудового договору.</p>
            </div>
            <div className="p-10 rounded-[2.5rem] bg-blue-50/50 hover:bg-blue-100 transition-all duration-500 reveal stagger-3 border border-blue-100/50">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-blue-500/20 transform -rotate-3 group-hover:rotate-0 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">Сучасність</h3>
              <p className="text-slate-600 leading-relaxed font-medium">Вивчайте лише ті системи та ПЗ, які реально використовуються на заводах сьогодні.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="reveal">
        <SuccessStories stories={stories} />
      </div>

      {/* News & Events Section */}
      <section id="news" className="py-24 bg-white reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Стрічка новин Центру ЧПК</h2>
            <button className="text-blue-600 font-black uppercase text-sm border-b-2 border-blue-600 pb-1 hover:text-blue-700 transition-all">Усі події</button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item, idx) => (
              <div key={item.id} className={`p-8 bg-slate-50 rounded-[2rem] border-l-8 border-blue-600 flex items-start space-x-8 hover:shadow-2xl hover:bg-white transition-all duration-500 reveal stagger-${(idx % 2) + 1}`}>
                <div className="text-center min-w-[90px] pt-2">
                  <p className="text-blue-600 font-black text-4xl leading-none">{item.date.split('.')[0]}</p>
                  <p className="text-slate-400 text-xs font-black uppercase mt-2 tracking-widest">Лют</p>
                </div>
                <div>
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block ${item.category === 'event' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                    {item.category === 'event' ? 'Подія' : 'Новина'}
                  </span>
                  <h4 className="text-2xl font-bold text-slate-800 mb-4 leading-tight">{item.title}</h4>
                  <p className="text-slate-500 leading-relaxed line-clamp-2">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-20 relative z-10">
          <div className="col-span-2">
            <div className="flex items-center space-x-5 mb-10">
              <Logo className="h-16 w-auto" />
              <div className="h-12 w-[2px] bg-white/20"></div>
              <span className="font-black text-2xl tracking-tighter uppercase leading-none">KPIK<br/><span className="text-blue-500 text-xl">CNC ACADEMY</span></span>
            </div>
            <p className="text-slate-400 max-w-sm mb-10 text-lg leading-relaxed font-medium">
              Ми готуємо спеціалістів, які створюють майбутнє української промисловості.
            </p>
            <div className="flex space-x-6">
              {['FB', 'IG', 'YT'].map(social => (
                <div key={social} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all duration-300 cursor-pointer font-black text-xs border border-white/10">{social}</div>
              ))}
            </div>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-slate-200 mb-8 pb-4 border-b border-white/10">Навігація</h5>
            <ul className="space-y-4 text-slate-400 font-bold uppercase text-xs tracking-widest">
              <li><a href="#program" className="hover:text-blue-400 transition-colors">Програма</a></li>
              <li><a href="#vacancies" className="hover:text-blue-400 transition-colors">Вакансії</a></li>
              <li><a href="#news" className="hover:text-blue-400 transition-colors">Новини</a></li>
              <li><a href="#stories" className="hover:text-blue-400 transition-colors">Кейси</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-black uppercase tracking-widest text-slate-200 mb-8 pb-4 border-b border-white/10">Контакти</h5>
            <ul className="space-y-6 text-slate-400 font-medium">
              <li className="flex items-start">
                <span className="text-blue-500 mr-3 mt-1">📍</span>
                <span>м. Кам’янець-Подільський,<br/>вул. П. Скоропадського, 17</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">📞</span>
                <span>+380(67)336-50-33</span>
              </li>
              <li className="flex items-center">
                <span className="text-blue-500 mr-3">✉️</span>
                <span>industrial_k_p@ukr.net</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 pt-8 border-t border-white/5 text-center text-slate-500 text-[12px] font-black tracking-[0.1em]">
          © 2026 Кам’янець-Подільський фаховий коледж індустрії, бізнесу та інформаційних технологій. Webdesign - Serhii Kovalenko
        </div>
      </footer>
    </main>
  );

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar onNav={handleNav} currentPage={currentPage} onLogout={handleLogout} isAuth={isAdminAuthenticated} />
      
      {currentPage === 'home' ? (
        renderHome()
      ) : (
        <div className="page-transition-enter">
          {isAdminAuthenticated ? (
            <AdminDashboard 
              vacancies={vacancies} 
              stories={stories}
              news={news}
              onUpdateVacancies={setVacancies}
              onUpdateStories={setStories}
              onUpdateNews={setNews}
            />
          ) : (
            <LoginScreen 
              onSuccess={() => setIsAdminAuthenticated(true)} 
              onCancel={() => setCurrentPage('home')} 
            />
          )}
        </div>
      )}

      <EnrollmentAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />
    </div>
  );
};

export default App;
