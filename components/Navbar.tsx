
import React from 'react';
import Logo from './Logo';

interface NavbarProps {
  onNav: (page: 'home' | 'admin') => void;
  currentPage: string;
  onLogout?: () => void;
  isAuth?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNav, currentPage, onLogout, isAuth }) => {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={() => onNav('home')}>
            <Logo className="h-10 sm:h-12 w-auto" />
            <span className="font-bold text-slate-800 text-sm sm:text-lg hidden sm:block uppercase tracking-tight">Підготовка операторів ЧПК</span>
          </div>
          <div className="flex space-x-3 sm:space-x-6 items-center">
            <button 
              onClick={() => onNav('home')} 
              className={`text-[12px] sm:text-sm font-bold transition uppercase tracking-tight ${currentPage === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-500'}`}
            >
              Головна
            </button>
            <a href="#news" className="text-[12px] sm:text-sm font-bold text-slate-600 hover:text-blue-500 transition uppercase tracking-tight">Новини</a>
            <a href="#vacancies" className="text-[12px] sm:text-sm font-bold text-slate-600 hover:text-blue-500 transition uppercase tracking-tight">Вакансії</a>
            <a href="#stories" className="hidden md:block text-[12px] sm:text-sm font-bold text-slate-600 hover:text-blue-500 transition uppercase tracking-tight">Історії</a>
            
            {/* Кнопка адмін-панелі тепер видима ТІЛЬКИ на екранах від sm (640px) і вище */}
            <div className="hidden sm:block">
              {currentPage === 'admin' && isAuth ? (
                <button 
                  onClick={onLogout}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition whitespace-nowrap"
                >
                  Вихід
                </button>
              ) : (
                <button 
                  onClick={() => onNav('admin')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition whitespace-nowrap ${currentPage === 'admin' ? 'bg-slate-800 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                >
                  Адмін-панель
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
