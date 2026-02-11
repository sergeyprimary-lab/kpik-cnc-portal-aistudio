
import React from 'react';

interface Props {
  onStartEnrollment: () => void;
}

const Hero: React.FC<Props> = ({ onStartEnrollment }) => {
  const openVideo = () => {
    window.open('https://www.youtube.com/watch?v=pS68x0S_99s', '_blank');
  };

  return (
    <section className="relative h-[85vh] flex items-center pt-12 sm:pt-0 overflow-hidden bg-[#0a0f1a]">
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        {/* New high-quality background image requested by user */}
        <img 
          src="https://t3.ftcdn.net/jpg/09/24/34/00/360_F_924340066_EBJcbZiIlEfg7rREbW1XvUU0S2fCMBMX.jpg" 
          alt="Високоточне фрезерування ЧПК" 
          className="w-full h-full object-cover animate-ken-burns will-change-transform brightness-[0.95]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop";
          }}
        />
        
        {/* Improved Multi-layer Technical Grid (CAD-Style) */}
        <div className="absolute inset-0 tech-grid opacity-30 z-10"></div>
        
        {/* Grain Layer (Industrial Texture) */}
        <div className="grain-overlay opacity-5"></div>
        
        {/* Lighter Industrial HUD elements / Vignetting */}
        <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]"></div>
        
        {/* More transparent Industrial Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a]/70 via-[#0a0f1a]/30 to-transparent z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/60 via-transparent to-transparent z-20"></div>

        {/* Digital Scanlines & CRT feel */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] z-25 bg-[length:100%_4px]"></div>
        
        {/* Coordinate Markers (Top Right Corner Decor) */}
        <div className="absolute top-10 right-10 z-30 opacity-40 hidden lg:block">
          <div className="text-blue-400 font-mono text-xs space-y-1 text-right">
            <p>X: 124.502</p>
            <p>Y: -84.210</p>
            <p>Z: 15.000</p>
            <p>S: 12500 RPM</p>
            <p>F: 800 MM/MIN</p>
          </div>
        </div>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 mb-4 sm:mb-6 rounded-full bg-blue-500/20 border border-blue-500/30 backdrop-blur-md animate-fade-in-up stagger-1">
            <span className="text-blue-400 text-[10px] sm:text-sm font-bold tracking-wider uppercase">Професійна підготовка Операторів ЧПК</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight animate-fade-in-up stagger-2 drop-shadow-2xl">
            Стань майстром <span className="text-blue-400">майбутнього</span>
          </h1>
          <p className="text-base sm:text-xl text-slate-100 mb-8 sm:10 leading-relaxed animate-fade-in-up stagger-3 drop-shadow-lg font-medium">
            Опануй мистецтво програмування та керування сучасними фрезерними центрами. Від складної моделі до ідеального виробу разом з KPIK.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={onStartEnrollment}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg shadow-blue-500/20 transform hover:-translate-y-1"
            >
              Розпочати навчання
            </button>
            <button 
              onClick={openVideo}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-1"
            >
              Дивитись відео
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
