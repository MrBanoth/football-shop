'use client';

import { useEffect, useState } from 'react';

export default function FootballLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Remove the loader after the page is fully loaded
    const handleLoad = () => {
      setTimeout(() => {
        setIsVisible(false);
      }, 500); // Slight delay for a smoother transition
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white/95 dark:bg-gray-900/95 z-50 flex items-center justify-center">
      <div className="relative w-32 h-32">
        {/* Outer circle with dashed border */}
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-300 dark:border-gray-600 animate-spin-slow"></div>
        
        {/* Inner circle with pulse effect */}
        <div className="absolute inset-4 rounded-full border-4 border-transparent">
          <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
        </div>
        
        {/* Football */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="text-5xl transform transition-all duration-300"
            style={{
              animation: 'bounce 1s infinite',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            }}
          >
            ⚽
          </div>
        </div>
        
        {/* Small circles around the football */}
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-3 h-3 bg-primary rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(
                ${Math.cos((i * Math.PI) / 4) * 40}px, 
                ${Math.sin((i * Math.PI) / 4) * 40}px
              )`,
              opacity: 0.6,
              animation: `pulse 1.5s ${i * 0.2}s infinite`
            }}
          />
        ))}
        
        {/* Keyframes for animations */}
        <style jsx global>{`
          @keyframes bounce {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-10px) scale(1.05); }
          }
          @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
            50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
          }
          .animate-spin-slow {
            animation: spin 4s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
