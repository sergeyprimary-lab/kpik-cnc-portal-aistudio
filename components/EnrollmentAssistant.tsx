
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
    { role: 'model', text: 'Вітаю! Я ваш персональний асистент KPIK. Я допоможу вам записатися на курс оператора ЧПК. Як я можу до вас звертатися?' }
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

    try {
      const ai = new GoogleGenAI({ apiKey: (process.env.API_KEY || '') });
      const chat = ai.chats.create({
        model: 'gemini-flash-lite-latest',
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
      
      if (userMessage.match(/\+?\d{10,12}/)) setUserData(prev => ({ ...prev, phone: userMessage }));
      if (messages.length < 3) setUserData(prev => ({ ...prev, name: userMessage }));

    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Вибачте, сталася помилка. Спробуйте ще раз або зателефонуйте нам прямо зараз.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const googleFormUrl = `https://docs.google.com/forms/d/e/1FAIpQLSfYourFormID/viewform?usp=pp_url&entry.1=NAME&entry.2=PHONE`;

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
                className="flex-1 text-center bg-green-600 text-white py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition shadow-md"
              >
                Підтвердити в Google Form
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentAssistant;
