
import React, { useMemo } from 'react';
import { Vacancy } from '../types';
import { safeParseJson } from '../geminiService';

interface Props {
  rawResponse: any;
  onAdviceRequest: (v: Vacancy) => void;
  adviceMap: Record<string, string>;
}

const ExternalVacanciesList: React.FC<Props> = ({ rawResponse, onAdviceRequest, adviceMap }) => {
  
  // Валідація та обробка даних
  const validatedVacancies = useMemo(() => {
    if (!rawResponse) return [];
    
    console.log("--- ПОЧАТОК ПЕРЕВІРКИ ДАНИХ ---");
    console.log("Сирий Response:", rawResponse);
    
    const parsedData = safeParseJson(rawResponse);
    console.log("Результат після safeParseJson:", parsedData);

    const validItems: Vacancy[] = [];

    parsedData.forEach((item: any, index: number) => {
      // Сувора перевірка наявності полів
      const hasTitle = !!item.title;
      const hasCompany = !!item.company;
      const hasUrl = !!item.sourceUrl;

      if (hasTitle && hasCompany && hasUrl) {
        validItems.push({
          id: `work-ua-${index}-${Date.now()}`,
          title: String(item.title),
          company: String(item.company),
          salary: item.salary || "За домовленістю",
          location: item.location || "Україна",
          description: item.description || "Деталі вакансії на сайті",
          sourceUrl: String(item.sourceUrl),
          isExternal: true
        });
        console.log(`✅ Вакансія #${index + 1} валідна: ${item.title}`);
      } else {
        console.warn(`❌ Вакансія #${index + 1} НЕВАЛІДНА (відсутні обов'язкові поля):`, item);
      }
    });

    console.log(`--- ЗАВЕРШЕНО: Валідовано ${validItems.length} з ${parsedData.length} ---`);
    return validItems;
  }, [rawResponse]);

  if (validatedVacancies.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 gap-8 mt-12 animate-fade-in">
      {validatedVacancies.map((v) => (
        <div key={v.id} className="group relative flex flex-col pt-16 pb-8 px-6 sm:px-8 border border-blue-100 rounded-3xl bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
          {/* Badge position adjusted for zero overlap */}
          <div className="absolute top-6 right-6 flex items-center bg-red-50 border border-red-100 px-3 py-1 rounded-full z-10">
            <span className="text-[10px] font-black text-red-600 uppercase tracking-tight">Знайдено на Work.ua</span>
          </div>
          
          <div className="mb-6 mt-2">
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition leading-tight">{v.title}</h3>
            <p className="text-blue-500 font-semibold mt-1">{v.company}</p>
          </div>

          <div className="flex items-center space-x-2 mb-4">
             <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-lg">
                {v.salary}
             </span>
             <span className="text-slate-400 text-xs">• {v.location}</span>
          </div>
          
          <p className="text-slate-600 text-sm mb-6 line-clamp-2 italic">
            {v.description}
          </p>
          
          <div className="mt-auto pt-6 border-t border-slate-50">
             {adviceMap[v.id] ? (
                <div className="bg-blue-50 p-4 rounded-xl text-xs text-blue-700 border-l-4 border-blue-400 mb-4 animate-scale-in">
                  <span className="font-bold block uppercase text-[10px] mb-1">AI Порада:</span>
                  {adviceMap[v.id]}
                </div>
             ) : (
                <button 
                  onClick={() => onAdviceRequest(v)}
                  className="w-full py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition uppercase tracking-wider mb-4"
                >
                  Отримати AI пораду
                </button>
             )}
             
             <a 
                href={v.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center bg-slate-900 text-white py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition shadow-lg"
              >
                Перейти до вакансії
              </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExternalVacanciesList;
