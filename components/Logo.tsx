
import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  // Пряме посилання на Raw-файл з GitHub
  imageUrl?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className = "h-12 w-auto", 
  imageUrl = "https://raw.githubusercontent.com/sergeyprimary-lab/kpik-cnc-portal-aistudio/refs/heads/main/components/logo-transp.png?token=GHSAT0AAAAAADVJUJZL2WH5JGYXCHMGWJKW2MOGS7Q" 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Функція для відображення текстового логотипу, якщо картинка не завантажилась
  const renderFallback = () => (
    <div className={`${className} flex items-center`}>
      <span className="font-black text-blue-600 tracking-tighter text-2xl">KPIK</span>
    </div>
  );

  if (hasError || !imageUrl) {
    return renderFallback();
  }

  return (
    <div className={`relative ${className} flex items-center overflow-hidden`}>
      {/* Скелетон/заповнювач під час завантаження */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse rounded-md"></div>
      )}
      
      <img 
        src={imageUrl} 
        alt="К-ПІК Логотип" 
        className={`${className} object-contain transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          console.error("Помилка завантаження логотипу за адресою:", imageUrl);
          setHasError(true);
        }}
      />
    </div>
  );
};

export default Logo;
