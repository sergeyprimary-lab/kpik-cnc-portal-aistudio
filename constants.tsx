
import React from 'react';
import { Vacancy, SuccessStory, NewsItem, EnterpriseVideo } from './types';

export const INITIAL_VACANCIES: Vacancy[] = [
  {
    id: '1',
    title: 'Оператор ЧПК (Fanuc)',
    company: 'НТЦ ТОВ Завод точної механіки',
    salary: '35,000 - 45,000 грн',
    location: 'Камянець-Подільський',
    description: 'Робота на токарних та фрезерних верстатах з ЧПК. Система керування Fanuc.'
  },
  {
    id: '2',
    title: 'Налагоджувальник верстатів ЧПК',
    company: 'ТОВ Іннатекс',
    salary: '50,000+ грн',
    location: 'Хмельницька обл',
    description: 'Написання програм, підбір інструменту, контроль якості.'
  }
];

export const INITIAL_STORIES: SuccessStory[] = [
  {
    id: '1',
    name: 'Олександр Петренко',
    role: 'Старший оператор',
    text: 'Прийшов на курси без досвіду. Через рік вже керую дільницею з 5 верстатів Fanuc. Це професія майбутнього!',
    imageUrl: 'https://picsum.photos/seed/alex/400/400'
  },
  {
    id: '2',
    name: 'Марина Соколова',
    role: 'Оператор ЧПК',
    text: 'ЧПК - це не брудна робота, це високі технології. Дякую KPIK за старт у професії.',
    imageUrl: 'https://picsum.photos/seed/marina/400/400'
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Практикум «Верстати ЧПК» на базі коледжу',
    date: '20.02.2026',
    summary: 'Практикум на базі коледжу, як логічне практичне продовження курсу «Будова і налагодження верстатів із програмним управлінням та робототехнічних комплексів». Мета – практичне закріплення знань та навичок, отриманих під час вивчення курсу, з використанням симулятора Fanuc, та симуляторів Style',
    category: 'event'
  },
  {
    id: '2',
    title: 'Цикл тренінгів з фінансової грамотності',
    date: '22.02.2026',
    summary: 'Запрошуємо студентів всіх спеціальностей навчитись не тільки заробляти кошти, а і правильно ними розпоряджатись.',
    category: 'news'
  }
];

export const INITIAL_VIDEOS: EnterpriseVideo[] = [
  {
    id: '1',
    title: 'Amazing 5-Axis CNC Machining',
    thumbnail: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=pS68x0S_99s'
  },
  {
    id: '2',
    title: 'High Speed CNC Milling Process',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=8mG_6v8XpMo'
  },
  {
    id: '3',
    title: 'Precision Metal Engineering',
    thumbnail: 'https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=H0v87_S_R8c'
  }
];
