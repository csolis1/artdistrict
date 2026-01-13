"use client"

import { useState, useEffect } from 'react';

const COLORS = {
  orange: '#FCB10F',
  blue: '#0F5AFC',
  pink: '#FC0F5A'
};

const LANGUAGES = [
  "Art", "艺术", "कला", "Arte", "Kunst", "τέχνη", "فَنّ", "umění", 
  "nghệ thuật", "ubugcisa", "toi", "artem", "アート", "예술", "Искусство", 
  "אמנות", "Seni", "Sztuka", "Sanat", "ศิลปะ", "Taide", "Konst", 
  "Kunst", "Ars", "Umění"
];

export default function ArtDistrictLogo() {
  const [stage, setStage] = useState('loading');
  const [currentWord, setCurrentWord] = useState('Art');

  useEffect(() => {
    if (stage !== 'loading' && stage !== 'fadeOut') return;
    
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % LANGUAGES.length;
      setCurrentWord(LANGUAGES[i]);
    }, 200);
    return () => clearInterval(interval);
  }, [stage]);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setStage('fadeOut'), 5000);
    const rectangleTimer = setTimeout(() => setStage('rectangle'), 6000);
    const rotatedTimer = setTimeout(() => setStage('rotated'), 7000);
    const spreadTimer = setTimeout(() => setStage('spread'), 8000);
    const textTimer = setTimeout(() => setStage('text'), 8300);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(rectangleTimer);
      clearTimeout(rotatedTimer);
      clearTimeout(spreadTimer);
      clearTimeout(textTimer);
    };
  }, []);

  const showLoading = stage === 'loading' || stage === 'fadeOut';
  const isRotated = stage === 'rotated' || stage === 'spread' || stage === 'text';
  const isSpread = stage === 'spread' || stage === 'text';
  const showCorners = stage === 'spread' || stage === 'text';
  const showRectangle = stage === 'rectangle' || stage === 'rotated';
  const showText = stage === 'text';

  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      
      <div className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-1000 ${
        showLoading && stage === 'loading' ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <h1 className="text-8xl md:text-9xl font-light text-center text-black p-16">
          {currentWord}
        </h1>
      </div>

      <div 
        className={`fixed transition-all duration-[2500ms] ease-in-out ${showCorners ? '' : 'hidden'}`}
        style={{ 
          top: isSpread ? '50px' : '50%',
          left: isSpread ? '50px' : '50%',
          transform: isSpread ? 'translate(0, 0)' : 'translate(-50%, -50%)'
        }}
      >
        <div className="flex">
          <div className="w-20 h-20" style={{ backgroundColor: COLORS.orange }}></div>
          <div className="w-20 h-20" style={{ backgroundColor: COLORS.blue }}></div>
        </div>
        <div className="flex">
          <div className="w-20 h-20" style={{ backgroundColor: COLORS.pink }}></div>
        </div>
      </div>

      <div 
        className={`fixed transition-all duration-[2500ms] ease-in-out ${showCorners ? '' : 'hidden'}`}
        style={{ 
          bottom: isSpread ? '50px' : 'auto',
          top: isSpread ? 'auto' : '50%',
          right: isSpread ? '50px' : 'auto',
          left: isSpread ? 'auto' : '50%',
          transform: isSpread ? 'translate(0, 0)' : 'translate(-50%, -50%)'
        }}
      >
        <div className="flex justify-end">
          <div className="w-20 h-20" style={{ backgroundColor: COLORS.pink }}></div>
        </div>
        <div className="flex">
          <div className="w-20 h-20" style={{ backgroundColor: COLORS.blue }}></div>
          <div className="w-20 h-20" style={{ backgroundColor: COLORS.orange }}></div>
        </div>
      </div>

      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
        showRectangle ? '' : 'hidden'
      }`}>
        <div 
          className="flex flex-col will-change-transform"
          style={{ 
            transform: isRotated ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div className="flex">
            <div className="w-20 h-20" style={{ backgroundColor: COLORS.blue }}></div>
            <div className="w-20 h-20" style={{ backgroundColor: COLORS.pink }}></div>
            <div className="w-20 h-20" style={{ backgroundColor: COLORS.orange }}></div>
          </div>
          <div className="flex">
            <div className="w-20 h-20" style={{ backgroundColor: COLORS.orange }}></div>
            <div className="w-20 h-20" style={{ backgroundColor: COLORS.pink }}></div>
            <div className="w-20 h-20" style={{ backgroundColor: COLORS.blue }}></div>
          </div>
        </div>
      </div>

      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center transition-opacity duration-1000 ${
        showText ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h1 className="font-light text-slate-900 leading-tight" 
              style={{ fontSize: 'clamp(3.6rem, 10.8vw, 10.8rem)', letterSpacing: '-0.02em' }}>
              ART DISTRICT
            </h1>
            <p className="font-semibold italic text-slate-600" 
              style={{ fontSize: 'clamp(1.62rem, 4.5vw, 4.5rem)' }}>
              Everyone Speaks Art
            </p>
            <div className="pt-8">
              <button className="px-8 py-3 border-2 border-slate-900 text-slate-900 bg-transparent rounded-lg font-medium hover:bg-slate-900 hover:text-white transition-colors duration-300 hover:scale-105 active:scale-95">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}