
import React, { useState } from 'react';
import { Vacancy, SuccessStory, NewsItem } from '../types';

interface AdminProps {
  vacancies: Vacancy[];
  stories: SuccessStory[];
  news: NewsItem[];
  onUpdateVacancies: React.Dispatch<React.SetStateAction<Vacancy[]>>;
  onUpdateStories: React.Dispatch<React.SetStateAction<SuccessStory[]>>;
  onUpdateNews: React.Dispatch<React.SetStateAction<NewsItem[]>>;
}

const AdminDashboard: React.FC<AdminProps> = ({ 
  vacancies, stories, news, 
  onUpdateVacancies, onUpdateStories, onUpdateNews 
}) => {
  const [activeTab, setActiveTab] = useState<'vacancies' | 'stories' | 'news'>('vacancies');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const startEditing = (item: any) => {
    setEditForm({ ...item });
    setEditingId(item.id);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveEditing = () => {
    if (!editingId || !editForm) return;

    // Створюємо копію для безпечного використання в асинхронному колбеку
    const currentEditingId = editingId;
    const currentEditForm = { ...editForm };

    if (activeTab === 'vacancies') {
      onUpdateVacancies((prevVacancies) => 
        prevVacancies.map(v => v.id === currentEditingId ? currentEditForm as Vacancy : v)
      );
    } else if (activeTab === 'stories') {
      onUpdateStories((prevStories) => 
        prevStories.map(s => s.id === currentEditingId ? currentEditForm as SuccessStory : s)
      );
    } else if (activeTab === 'news') {
      onUpdateNews((prevNews) => 
        prevNews.map(n => n.id === currentEditingId ? currentEditForm as NewsItem : n)
      );
    }
    cancelEditing();
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev: any) => ({ ...prev, [field]: value }));
  };

  // --- Vacancies Handlers ---
  const handleDeleteVacancy = (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю вакансію?')) {
      onUpdateVacancies((prev) => prev.filter(v => v.id !== id));
    }
  };

  const handleAddVacancy = () => {
    const newV: Vacancy = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Нова вакансія',
      company: 'Вкажіть компанію',
      salary: '20,000 грн',
      location: 'Місто',
      description: 'Опис вакансії...'
    };
    onUpdateVacancies((prev) => [newV, ...prev]);
    startEditing(newV);
  };

  // --- Stories Handlers ---
  const handleDeleteStory = (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю історію успіху?')) {
      onUpdateStories((prev) => prev.filter(s => s.id !== id));
    }
  };

  const handleAddStory = () => {
    const newS: SuccessStory = {
      id: Math.random().toString(36).substr(2, 9),
      name: 'Новий випускник',
      role: 'Посада',
      text: 'Напишіть відгук тут...',
      imageUrl: 'https://picsum.photos/seed/new/400/400'
    };
    onUpdateStories((prev) => [newS, ...prev]);
    startEditing(newS);
  };

  // --- News Handlers ---
  const handleDeleteNews = (id: string) => {
    if (window.confirm('Ви впевнені, що хочете видалити цю новину?')) {
      onUpdateNews((prev) => prev.filter(n => n.id !== id));
    }
  };

  const handleAddNews = () => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}.${(today.getMonth() + 1).toString().padStart(2, '0')}.${today.getFullYear()}`;
    const newN: NewsItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Нова новина коледжу',
      date: formattedDate,
      summary: 'Короткий опис події...',
      category: 'news'
    };
    onUpdateNews((prev) => [newN, ...prev]);
    startEditing(newN);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Адмін-панель</h1>
            <p className="text-slate-500 uppercase text-xs tracking-widest font-bold mt-1">Керування контентом сайту</p>
          </div>
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 w-full md:w-auto">
            <button 
              onClick={() => { setActiveTab('vacancies'); cancelEditing(); }}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'vacancies' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-blue-600'}`}
            >
              Вакансії
            </button>
            <button 
              onClick={() => { setActiveTab('stories'); cancelEditing(); }}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'stories' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-blue-600'}`}
            >
              Історії
            </button>
            <button 
              onClick={() => { setActiveTab('news'); cancelEditing(); }}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition ${activeTab === 'news' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-blue-600'}`}
            >
              Новини
            </button>
          </div>
        </header>

        <main className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* TAB: Vacancies */}
          {activeTab === 'vacancies' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center">
                  <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                  Керування вакансіями ({vacancies.length})
                </h2>
                <button onClick={handleAddVacancy} className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition shadow-lg shadow-green-600/20 active:scale-95">
                  + Додати нову
                </button>
              </div>
              <div className="space-y-4">
                {vacancies.map(v => (
                  <div key={v.id} className={`p-5 rounded-2xl border transition-all ${editingId === v.id ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md'}`}>
                    {editingId === v.id && editForm ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input value={editForm.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="Назва" className="p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500" />
                        <input value={editForm.company} onChange={(e) => handleInputChange('company', e.target.value)} placeholder="Компанія" className="p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500" />
                        <input value={editForm.salary} onChange={(e) => handleInputChange('salary', e.target.value)} placeholder="Зарплата" className="p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500" />
                        <input value={editForm.location} onChange={(e) => handleInputChange('location', e.target.value)} placeholder="Місто" className="p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500" />
                        <textarea value={editForm.description} onChange={(e) => handleInputChange('description', e.target.value)} placeholder="Опис" className="md:col-span-2 p-3 rounded-xl border border-blue-200 outline-none focus:ring-2 focus:ring-blue-500 h-24" />
                        <div className="md:col-span-2 flex justify-end space-x-3 mt-2">
                          <button onClick={cancelEditing} className="px-4 py-2 text-slate-500 font-bold hover:text-slate-700">Скасувати</button>
                          <button onClick={saveEditing} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold shadow-md hover:bg-blue-700">Зберегти</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-800">{v.title}</h4>
                          <p className="text-sm text-slate-500">{v.company} • <span className="text-green-600 font-medium">{v.salary}</span></p>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => startEditing(v)} className="p-2.5 bg-white text-slate-400 hover:text-blue-600 rounded-lg border border-slate-100 shadow-sm transition">
                            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                          </button>
                          <button onClick={() => handleDeleteVacancy(v.id)} className="p-2.5 bg-white text-slate-400 hover:text-red-600 rounded-lg border border-slate-100 shadow-sm transition">
                            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Stories */}
          {activeTab === 'stories' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center">
                  <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                  Історії випускників ({stories.length})
                </h2>
                <button onClick={handleAddStory} className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition shadow-lg shadow-green-600/20 active:scale-95">
                  + Додати історію
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stories.map(s => (
                  <div key={s.id} className={`p-5 rounded-2xl border transition-all ${editingId === s.id ? 'bg-blue-50 border-blue-300 md:col-span-2' : 'bg-slate-50 border-slate-100 hover:border-blue-200'}`}>
                    {editingId === s.id && editForm ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input value={editForm.name} onChange={(e) => handleInputChange('name', e.target.value)} placeholder="Ім'я" className="p-3 rounded-xl border border-blue-200" />
                          <input value={editForm.role} onChange={(e) => handleInputChange('role', e.target.value)} placeholder="Роль" className="p-3 rounded-xl border border-blue-200" />
                        </div>
                        <input value={editForm.imageUrl} onChange={(e) => handleInputChange('imageUrl', e.target.value)} placeholder="URL зображення" className="w-full p-3 rounded-xl border border-blue-200" />
                        <textarea value={editForm.text} onChange={(e) => handleInputChange('text', e.target.value)} placeholder="Історія" className="w-full p-3 rounded-xl border border-blue-200 h-24" />
                        <div className="flex justify-end space-x-3">
                          <button onClick={cancelEditing} className="px-4 py-2 text-slate-500 font-bold">Скасувати</button>
                          <button onClick={saveEditing} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">Зберегти</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm">
                             <img src={s.imageUrl} alt={s.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-800 leading-none">{s.name}</h4>
                            <p className="text-xs text-blue-500 font-bold mt-1 uppercase tracking-wider">{s.role}</p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <button onClick={() => startEditing(s)} className="p-2 text-slate-400 hover:text-blue-600 transition">
                            <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                          </button>
                          <button onClick={() => handleDeleteStory(s.id)} className="p-2 text-slate-400 hover:text-red-600 transition">
                            <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: News */}
          {activeTab === 'news' && (
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold flex items-center">
                  <span className="w-2 h-6 bg-blue-600 rounded-full mr-3"></span>
                  Новини та події ({news.length})
                </h2>
                <button onClick={handleAddNews} className="bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 transition shadow-lg shadow-green-600/20 active:scale-95">
                  + Додати новину
                </button>
              </div>
              <div className="space-y-4">
                {news.map(n => (
                  <div key={n.id} className={`p-5 rounded-2xl border transition-all ${editingId === n.id ? 'bg-blue-50 border-blue-300' : 'bg-slate-50 border-slate-100 hover:border-blue-200'}`}>
                    {editingId === n.id && editForm ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input value={editForm.title} onChange={(e) => handleInputChange('title', e.target.value)} placeholder="Заголовок" className="p-3 rounded-xl border border-blue-200" />
                          <input value={editForm.date} onChange={(e) => handleInputChange('date', e.target.value)} placeholder="Дата" className="p-3 rounded-xl border border-blue-200" />
                        </div>
                        <select value={editForm.category} onChange={(e) => handleInputChange('category', e.target.value)} className="w-full p-3 rounded-xl border border-blue-200">
                          <option value="news">Новина</option>
                          <option value="event">Подія</option>
                        </select>
                        <textarea value={editForm.summary} onChange={(e) => handleInputChange('summary', e.target.value)} placeholder="Короткий опис" className="w-full p-3 rounded-xl border border-blue-200 h-24" />
                        <div className="flex justify-end space-x-3">
                          <button onClick={cancelEditing} className="px-4 py-2 text-slate-500 font-bold">Скасувати</button>
                          <button onClick={saveEditing} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">Зберегти</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-sm text-center min-w-[70px]">
                             <p className="text-blue-600 font-black text-lg leading-none">{n.date.split('.')[0]}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase">{n.date.split('.').slice(1).join('.')}</p>
                          </div>
                          <div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md mb-1 inline-block ${n.category === 'event' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                              {n.category === 'event' ? 'Подія' : 'Новина'}
                            </span>
                            <h4 className="font-bold text-slate-800">{n.title}</h4>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => startEditing(n)} className="p-2.5 bg-white text-slate-400 hover:text-blue-600 rounded-lg border border-slate-100 shadow-sm transition">
                            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                          </button>
                          <button onClick={() => handleDeleteNews(n.id)} className="p-2.5 bg-white text-slate-400 hover:text-red-600 rounded-lg border border-slate-100 shadow-sm transition">
                            <svg className="w-5 h-5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
