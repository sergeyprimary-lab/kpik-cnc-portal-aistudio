
export interface Vacancy {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  description: string;
  sourceUrl?: string;
  isExternal?: boolean;
}

export interface SuccessStory {
  id: string;
  name: string;
  role: string;
  text: string;
  imageUrl: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: 'event' | 'news';
}

export interface EnterpriseVideo {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}
