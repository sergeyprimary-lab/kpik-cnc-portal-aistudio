
import React from 'react';
import { SuccessStory } from '../types';

interface Props {
  stories: SuccessStory[];
}

const SuccessStories: React.FC<Props> = ({ stories }) => {
  return (
    <section id="stories" className="py-24 industrial-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Історії успіху</h2>
            <p className="text-slate-400 text-lg">
              Наші випускники працюють на найкращих підприємствах країни. Надихнись їхнім шляхом у професію.
            </p>
          </div>
          <button className="text-blue-400 font-bold border-b-2 border-blue-400 hover:text-blue-300 hover:border-blue-300 transition pb-1">
            Більше історій
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {stories.map(story => (
            <div key={story.id} className="flex flex-col sm:flex-row bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:bg-white/10 transition group">
              <div className="sm:w-1/3 h-64 sm:h-auto overflow-hidden">
                <img src={story.imageUrl} alt={story.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="sm:w-2/3 p-8 flex flex-col justify-center">
                <p className="text-xl italic text-slate-300 mb-6 leading-relaxed">"{story.text}"</p>
                <div>
                  <h4 className="text-lg font-bold">{story.name}</h4>
                  <p className="text-blue-400 text-sm font-medium">{story.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
