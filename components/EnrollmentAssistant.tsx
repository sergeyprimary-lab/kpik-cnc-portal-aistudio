
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const EnrollmentAssistant: React.FC<Props> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Вітаю! Я ваш персональний АІ асистент. Я допоможу вам записатися на курс оператора ЧПК в коледжі індустрії, бізнесу та ІТ. Як я можу до вас звертатися?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ name: '', phone: '', interest: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // --- ПОКРАЩЕНА БЕК-ЕНД ЛОГІКА ВИЛУЧЕННЯ ДАНИХ ---
    setUserData(prev => {
      const updated = { ...prev };
      
      // 1. Пошук телефону через очищення від не-цифр
      const digits = userMessage.replace(/\D/g, '');
      // Шукаємо 10 цифр (0...) або 12 цифр (380...)
      const phoneMatch = digits.match(/(?:38)?0\d{9}/);
      
      if (phoneMatch && !updated.phone) {
        updated.phone = phoneMatch[0];
      }

      // 2. Вилучення імені
      if (!updated.name) {
        // Якщо в повідомленні є телефон, спробуємо прибрати його, щоб знайти ім'я
        const namePart = userMessage.replace(/(?:\+?38)?[\s\-]?\(?0\d{2}\)?[\s\-]?\d{1,3}[\s\-]?\d{1,3}[\s\-]?\d{1,3}[\s\-]?\d{1,3}/g, '').trim();
        if (namePart.length > 1 && namePart.length < 40) {
          // Прибираємо зайві слова "мене звати", "я" і т.д. для форми
          const cleanName = namePart.replace(/(мене звати|я|це|ім'я|мене кличуть)\s+/gi, '');
          updated.name = cleanName;
        }
      } 
      // 3. Вилучення інтересу
      else if (updated.name && updated.phone && !updated.interest && !phoneMatch) {
        updated.interest = userMessage;
      }

      return updated;
    });

    try {
      const ai = new GoogleGenAI({ 
        apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY || '',
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });
      const chat = ai.chats.create({
        model: 'gemini-3.1-flash-lite',
        config: {
          systemInstruction: `Ти — привітний асистент коледжу KPIK. Твоя мета — зібрати дані для запису на курс Операторів ЧПК: 1) Ім'я 2) Номер телефону 3) Чому цікавить ця професія. Спілкуйся українською мовою, коротко і професійно. Коли отримаєш всі дані, скажи користувачу, що він може натиснути кнопку "Підтвердити реєстрацію" нижче.`,
        },
      });

      const history = messages.map(m => `${m.role === 'user' ? 'Користувач' : 'Асистент'}: ${m.text}`).join('\n');
      
      const response = await chat.sendMessage({ 
        message: `${history}\nКористувач каже: ${userMessage}\nПродовжуй діалог або підсумуй, якщо дані зібрано.`  
      });

      const aiText = response.text || "Вибачте, я не зміг обробити ваше повідомлення. Спробуйте ще раз.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Вибачте, сталася помилка. Спробуйте ще раз або зателефонуйте нам прямо зараз.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Формування URL
  const formId = "1FAIpQLSe9ArZjIMnQ8yeOl0uLaYUbRVVD3sK6nSh-HpWFuhNd4JdLQA";
  const googleFormUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?usp=pp_url` + 
    `&entry.2011983711=${encodeURIComponent(userData.name)}` + 
    `&entry.1621985097=${encodeURIComponent(userData.phone)}` + 
    `&entry.1304381872=${encodeURIComponent(userData.interest)}`;

  // Кнопка активна, якщо є хоча б Ім'я та Телефон
  const isFormReady = !!(userData.name && userData.phone);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[600px] animate-scale-in">
        <div className="bg-blue-600 p-6 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30 animate-pulse">
              🤖
            </div>
            <div>
              <h3 className="font-bold">Асистент KPIK</h3>
              <p className="text-xs text-blue-100">Зараз онлайн</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-2 rounded-full transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 animate-pulse flex space-x-1">
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex flex-col space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Напишіть відповідь..."
                className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
              >
                <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
              </button>
            </div>
            
            <div className="flex space-x-2">
              <a 
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 text-center py-2 rounded-lg text-sm font-bold transition shadow-md ${isFormReady ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-slate-200 text-slate-400 pointer-events-none'}`}
              >
                Підтвердити і надіслати інформацію
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentAssistant;
