
import React, { useState, useEffect } from 'react';
import { Vacancy } from '../types';
import { 
  generateJobAdvice, 
  searchExternalVacancies, 
  getCachedVacancies, 
  setCachedVacancies,
  safeParseJson 
} from '../geminiService';
import ExternalVacanciesList from './ExternalVacanciesList';

interface Props {
  vacancies: Vacancy[];
}

const VacanciesSection: React.FC<Props> = ({ vacancies: initialVacancies }) => {
  const [adviceMap, setAdviceMap] = useState<Record<string, string>>({});
  const [isSearching, setIsSearching] = useState(false);
  const [rawExternalResponse, setRawExternalResponse] = useState<any>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'ai' | 'cache' | 'fallback' | null>(null);

  useEffect(() => {
    // При завантаженні перевіряємо кеш
    const cached = getCachedVacancies();
    if (cached) {
      setRawExternalResponse(cached);
      setDataSource('cache');
    }
  }, []);

  const loadAdvice = async (vacancy: Vacancy) => {
    if (adviceMap[vacancy.id]) return;
    const advice = await generateJobAdvice(vacancy.title);
    setAdviceMap(prev => ({ ...prev, [vacancy.id]: advice }));
  };

  const syncWithWorkUa = async () => {
    setIsSearching(true);
    setSearchError(null);
    setDataSource(null);
    
    try {
      const result = await searchExternalVacancies();
      
      if (result.error === "QUOTA_EXHAUSTED") {
        setSearchError("Ліміт AI-запитів вичерпано. Показуємо збережені пропозиції.");
        setRawExternalResponse(result.data); // result.data містить FALLBACK_VACANCIES
        setDataSource('fallback');
      } else if (result.error) {
        setSearchError("Сервіс тимчасово недоступний. Спробуйте пізніше.");
      } else {
        setRawExternalResponse(result.data);
        setCachedVacancies(result.data);
        setDataSource('ai');
      }
    } catch (error) {
      setSearchError("Сталася технічна помилка.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section id="vacancies" className="py-24 bg-white reveal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4 border border-blue-100">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-blue-700 text-sm font-bold uppercase tracking-wider">Моніторинг вакансій</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Вакансії для операторів ЧПК</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-6">
            Перегляньте найкращі актуальні вакансії з ринку праці України.
          </p>
          
          <div className="flex flex-col items-center space-y-6">
            <button 
              onClick={syncWithWorkUa}
              disabled={isSearching}
              className="inline-flex items-center px-12 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-2xl disabled:opacity-50 group transform active:scale-95 border-b-4 border-slate-700"
            >
              {isSearching ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ПОШУК...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6 mr-3 text-blue-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Завантажити вакансії з Work.ua (AI)
                </>
              )}
            </button>

            <a 
              href="https://www.work.ua/jobs-%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80+%D1%87%D0%BF%D0%BA/?sort=salary" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative inline-flex items-center px-6 py-3 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md mt-2"
            >
              <span className="text-blue-600 font-black text-sm uppercase tracking-tight">Всі вакансії ЧПК на Work.ua</span>
              <div className="ml-3 flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full text-white transform transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-[-45deg] group-hover:shadow-lg group-hover:shadow-blue-500/50">
                <svg 
                  className="w-3.5 h-3.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </div>
            </a>

            {searchError && (
              <div className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-xs font-bold animate-pulse">
                ℹ️ {searchError}
              </div>
            )}

            {dataSource === 'cache' && (
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Дані завантажено з локального кешу
              </p>
            )}
          </div>
        </div>

        {/* Список зовнішніх вакансій */}
        <ExternalVacanciesList 
          rawResponse={rawExternalResponse} 
          onAdviceRequest={loadAdvice} 
          adviceMap={adviceMap} 
        />

        {/* Локальні вакансії */}
        <div className="mt-20 pt-16 border-t border-slate-100">
          <h3 className="text-2xl font-bold text-slate-400 mb-8 uppercase tracking-widest text-center">Перевірені партнери коледжу</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {initialVacancies.map((v) => (
              <div key={v.id} className="p-8 border border-slate-200 rounded-3xl bg-slate-50/30 hover:bg-white hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-800">{v.title}</h4>
                    <p className="text-blue-600 font-bold">{v.company}</p>
                  </div>
                  <span className="text-sm font-black text-slate-500">{v.salary}</span>
                </div>
                <p className="text-slate-500 text-sm mb-4">{v.description}</p>
                <div className="text-[10px] font-black text-slate-400 uppercase">📍 {v.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VacanciesSection;
