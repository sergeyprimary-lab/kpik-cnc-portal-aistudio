
import React, { useState } from 'react';

interface LoginScreenProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const ADMIN_PASSWORD = 'kpik_admin_2026'; // Пароль за замовчуванням

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onSuccess();
    } else {
      setError(true);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
      <div className={`max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-transform ${isShaking ? 'animate-bounce' : ''}`}>
        <div className="bg-slate-900 p-8 text-white text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Вхід в систему</h2>
          <p className="text-slate-400 text-sm mt-2 uppercase tracking-widest font-semibold">Адмін-панель KPIK</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">Пароль адміністратора</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              autoFocus
              className={`w-full px-5 py-4 bg-slate-100 border-2 rounded-2xl outline-none transition-all ${error ? 'border-red-500 bg-red-50' : 'border-transparent focus:border-blue-500 focus:bg-white'}`}
              placeholder="••••••••"
            />
            {error && <p className="text-red-500 text-xs font-bold mt-2 ml-1">Невірний пароль. Доступ заборонено.</p>}
          </div>

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition transform active:scale-95"
            >
              Увійти в панель
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full text-slate-400 hover:text-slate-600 font-bold py-2 text-sm transition"
            >
              Скасувати
            </button>
          </div>
        </form>
        
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Тільки для авторизованого персоналу</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
