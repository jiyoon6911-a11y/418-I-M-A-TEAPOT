import React, { useState, useEffect } from 'react';

export default function LedSystemBar() {
  const [glitchFactor, setGlitchFactor] = useState(0);

  // Trigger brief micro-glitch flickers in the LED text stream
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        setGlitchFactor(Math.random());
        setTimeout(() => setGlitchFactor(0), 120 + Math.random() * 150);
      }
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const baseText = "█ 26.06.02 — 06.04 █ CLC 1F — 2F █ ERROR 418 : I'M A TEAPOT █ HUMAN TOUCH DETECTED █ BREWING... █ SYSTEM STATUS : WARM █ CAMPUS LIFE CENTER 1F — 2F █ ";

  // Slightly distort text based on glitch state
  const getGlitchedText = (text: string) => {
    if (glitchFactor === 0) return text;
    const chars = text.split('');
    const glitchCount = Math.floor(glitchFactor * 3) + 1;
    for (let i = 0; i < glitchCount; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      if (chars[idx] !== '█' && chars[idx] !== ' ' && chars[idx] !== '—') {
        const glitchPool = ['▒', '▓', '░', '4', '1', '8', '♨', '?', '#', '*'];
        chars[idx] = glitchPool[Math.floor(Math.random() * glitchPool.length)];
      }
    }
    return chars.join('');
  };

  const processedText = getGlitchedText(baseText);

  // Render a seamless group of text repetitions so it stretches across any viewport size beautifully
  const renderTextContent = () => (
    <div className="flex gap-16 shrink-0">
      {[...Array(4)].map((_, i) => (
        <span 
          key={i} 
          className="inline-block font-mono text-[10px] md:text-xs tracking-[0.25em] text-[#FF9F29] uppercase led-flicker-anim"
          style={{
            textShadow: '0 0 5px rgba(255, 159, 41, 0.45), 0 0 12px rgba(255, 159, 41, 0.75)',
          }}
        >
          {processedText}
        </span>
      ))}
    </div>
  );

  return (
    <div className="w-full relative z-25 overflow-hidden sticky top-[56px] md:top-[64px] border-y border-[#FF9F29]/30 bg-[#040616]/95 backdrop-blur-md select-none">
      
      {/* LED SCANLINE TEXTURE OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[size:100%_4px] pointer-events-none z-10 opacity-60" />
      
      {/* VINTAGE CRT ORANGE GLOW EFFECT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,159,41,0.05)_0%,transparent_90%)] pointer-events-none" />

      {/* STYLES FOR SEAMLESS 100% MARQUEE TRANSITION */}
      <style>{`
        @keyframes led-marquee-slide {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes led-glow-pulse {
          0%, 100% {
            opacity: 0.85;
            text-shadow: 0 0 4px rgba(255, 159, 41, 0.4), 0 0 10px rgba(255, 159, 41, 0.65);
          }
          50% {
            opacity: 1;
            text-shadow: 0 0 6px rgba(255, 159, 41, 0.65), 0 0 15px rgba(255, 159, 41, 0.95);
          }
        }
        .led-flicker-anim {
          animation: led-glow-pulse 4.5s infinite ease-in-out;
        }
        .animate-led-marquee-seamless {
          display: flex;
          width: max-content;
          animation: led-marquee-slide 110s linear infinite;
        }
      `}</style>

      {/* HORIZONTAL CONTINUOUS DISPLAY CHANNEL */}
      <div className="py-2.5 md:py-3.5 flex items-center overflow-hidden">
        {/* Seamless pairing: Group A + Identical Group B scrolling to exactly -50% */}
        <div className={`animate-led-marquee-seamless whitespace-nowrap flex gap-16 ${
          glitchFactor > 0.65 ? 'opacity-80 blur-[0.2px]' : ''
        }`}>
          {renderTextContent()}
          {renderTextContent()}
        </div>
      </div>

      {/* COMPACT HUD CAPTIONS ON BAR EDGES */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-20 font-mono text-[7px] text-[#FF9F29]/40 uppercase hidden sm:block font-bold">
        [LED_SYS_LIVE]
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none z-20 font-mono text-[7px] text-[#FF9F29]/40 uppercase hidden sm:block font-bold">
        [RFC_418_STATION]
      </div>
    </div>
  );
}

