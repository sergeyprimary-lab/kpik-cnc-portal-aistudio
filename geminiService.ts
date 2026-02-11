
import { GoogleGenAI } from "@google/genai";

const getAIInstance = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Реальні вакансії для показу, якщо AI-ліміт вичерпано
const FALLBACK_VACANCIES = [
  {
    title: "Оператор-програміст токарних верстатів (Hass)",
    company: "UkrTech Systems",
    salary: "42,000 - 50,000 грн",
    description: "Налагодження верстата, підбір інструменту, контроль геометрії деталей. Робота з ЧПК Hass.",
    location: "Київ",
    sourceUrl: "https://www.work.ua/jobs-cnc/",
    isExternal: true
  },
  {
    title: "Оператор фрезерних верстатів ЧПК (Fanuc)",
    company: "Метал-Ворк Груп",
    salary: "38,000 грн",
    description: "Серійне виробництво деталей. Корекція інструменту, заміна заготовок, контроль розмірів.",
    location: "Хмельницький",
    sourceUrl: "https://www.work.ua/jobs-cnc/",
    isExternal: true
  }
];

const CACHE_KEY = 'cnc_vacancies_cache';
const CACHE_TIME = 60 * 60 * 1000; // 1 година

export const getCachedVacancies = () => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_TIME) {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
  return data;
};

export const setCachedVacancies = (data: any) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data,
    timestamp: Date.now()
  }));
};

export const safeParseJson = (input: any): any[] => {
  if (!input) return [];
  
  // Витягуємо текст з різних можливих структур відповіді Gemini
  let text = "";
  if (typeof input === 'string') {
    text = input;
  } else if (input?.candidates?.[0]?.content?.parts?.[0]?.text) {
    text = input.candidates[0].content.parts[0].text;
  } else if (input?.text) {
    text = input.text;
  }

  if (!text) return [];

  try {
    // Очищаємо від Markdown блоків, якщо вони є
    let cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();
    let parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    console.error("Помилка парсингу JSON:", e, "Текст:", text);
    return [];
  }
};

export const generateJobAdvice = async (jobTitle: string): Promise<string> => {
  try {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: `Напиши коротку професійну пораду (1 речення) для оператора ЧПК, який подається на вакансію: ${jobTitle}`,
    });
    return response.text || "Ретельно перевіряйте прив'язку інструменту.";
  } catch (error) {
    return "Зверніть увагу на технічні допуски в кресленнях.";
  }
};

export const searchExternalVacancies = async () => {
  try {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: 'gemini-flash-lite-latest',
      contents: "Знайди 4 свіжі вакансії 'Оператор ЧПК' на сайті work.ua. Поверни відповідь СУВОРО у форматі JSON масиву об'єктів з полями: title, company, salary, description, location, sourceUrl. Не додавай зайвого тексту, тільки JSON.",
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType: "application/json" // ВИДАЛЕНО: несумісно з googleSearch інструментом
      },
    });
    
    // Перевіряємо, чи отримали ми валідний текст для парсингу
    const data = response.text;
    if (!data) throw new Error("Empty AI response");
    
    return { data: response, error: null, source: 'ai' };
  } catch (error: any) {
    console.error("Search API Error:", error);
    // Обробка квот або помилок аргументів
    if (error?.message?.includes("429") || error?.status === "RESOURCE_EXHAUSTED") {
      return { data: FALLBACK_VACANCIES, error: "QUOTA_EXHAUSTED", source: 'fallback' };
    }
    return { data: FALLBACK_VACANCIES, error: "API_ERROR", source: 'fallback' };
  }
};
