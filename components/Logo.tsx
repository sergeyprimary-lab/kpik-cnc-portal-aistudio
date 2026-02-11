
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12 w-auto" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Outer blue circle with silver border */}
      <circle cx="50" cy="50" r="48" fill="#0056A3" stroke="#C0C0C0" strokeWidth="2"/>
      <circle cx="50" cy="50" r="42" stroke="white" strokeWidth="1" strokeDasharray="2 2"/>
      
      {/* Globe lines */}
      <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="0.5" opacity="0.5"/>
      <path d="M20 50H80" stroke="white" strokeWidth="0.5" opacity="0.5"/>
      <path d="M50 20V80" stroke="white" strokeWidth="0.5" opacity="0.5"/>
      <ellipse cx="50" cy="50" rx="15" ry="30" stroke="white" strokeWidth="0.5" opacity="0.5"/>
      
      {/* Stylized "I" / Industrial symbol */}
      <path 
        d="M40 25C40 25 35 35 35 50C35 65 40 75 40 75H60C60 75 65 65 65 50C65 35 60 25 60 25H40Z" 
        fill="white"
      />
      <rect x="42" y="45" width="16" height="2" fill="#0056A3"/>
      <text x="50" y="43" fontFamily="Arial" fontSize="4" fontWeight="bold" fill="#0056A3" textAnchor="middle">ІНДУСТРІЯ</text>
      
      {/* Text on path (Simplified for SVG component) */}
      <text x="50" y="15" fontFamily="Arial" fontSize="6" fontWeight="bold" fill="white" textAnchor="middle">СВІТ ТВОЇХ МОЖЛИВОСТЕЙ</text>
      <text x="50" y="90" fontFamily="Arial" fontSize="10" fontWeight="extrabold" fill="white" textAnchor="middle">К-ПІК</text>
    </svg>
  );
};

export default Logo;
