import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: string;
  x: number;
  y: number;
  char: string;
  vx: number;
  vy: number;
  life: number;
  scale: number;
  rotation: number;
}

const STEAM_WORDS = ['~', '~~', '418', 'human', 'touch', '온기', 'tea', 'steep', 'breath', '숨소리'];

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isGlitched, setIsGlitched] = useState(false);
  const [warmthLevel, setWarmthLevel] = useState(0); // 0 (cold blue) to 1 (warm cream)
  
  const lastPosRef = useRef({ x: 0, y: 0 });
  const particleIdCounter = useRef(0);
  const startTimeRef = useRef(Date.now());

  // Handle cursor positioning
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPosition({ x, y });

      // Generate vapor steam particles when cursor moves significantly
      const dx = x - lastPosRef.current.x;
      const dy = y - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8 && Math.random() < 0.45) {
        const id = `pt-${particleIdCounter.current++}`;
        const randomWord = STEAM_WORDS[Math.floor(Math.random() * STEAM_WORDS.length)];
        
        const newParticle: Particle = {
          id,
          x,
          y: y - 5, // Slightly above cursor
          char: randomWord,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -Math.random() * 0.9 - 0.3, // Naturally floats upward
          life: 1.0,
          scale: 0.8 + Math.random() * 0.4,
          rotation: (Math.random() - 0.5) * 30,
        };

        setParticles(prev => [...prev.slice(-18), newParticle]); // Limit particles for high performance
        lastPosRef.current = { x, y };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animate steam trail frames
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.05,
            scale: p.scale - 0.015,
          }))
          .filter(p => p.life > 0)
      );
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // Over-time core warmth indicator progression
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsedMinutes = (Date.now() - startTimeRef.current) / 60000;
      // Reaches max warmth in 3 minutes
      setWarmthLevel(Math.min(elapsedMinutes / 3, 1.0));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Mouse over delegates to capture specific interactions dynamically
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Class/Tag classification
      const tag = target.tagName.toLowerCase();
      const rawClassName = target.className;
      const classes = typeof rawClassName === 'string' 
        ? rawClassName 
        : (rawClassName && typeof rawClassName === 'object' && 'baseVal' in rawClassName)
          ? (rawClassName as any).baseVal || ''
          : '';
      
      // Check for emotional logs or specific indicators
      if (classes.includes('ComingSoonCard') || target.closest('[onMouseEnter]')) {
        setHoverText('emotion detected');
        setIsGlitched(false);
      } else if (
        tag === 'button' || 
        tag === 'input' || 
        tag === 'textarea' || 
        classes.includes('cursor-pointer') || 
        target.closest('button')
      ) {
        setHoverText('brewing...');
        setIsGlitched(false);
      } else if (classes.includes('ShieldAlert') || classes.includes('border-dashed') || classes.includes('error-') || classes.includes('vibrant-glitch-shadow')) {
        setHoverText('▒_GLITCH');
        setIsGlitched(true);
      } else if (classes.includes('guestbook') || target.closest('.font-hand')) {
        setHoverText('human trace found');
        setIsGlitched(false);
      } else {
        setHoverText(null);
        setIsGlitched(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Compute cursor color interpolating from vivid green to rich blue
  const getCursorColor = () => {
    if (isGlitched) return '#FF3366'; // Glitched pinkish-red
    
    // Lerp color components:
    // Green (#10B981) -> RGB(16, 185, 129)
    // Blue/Royal (#0052FF) -> RGB(0, 82, 255)
    const r = Math.round(16 + (0 - 16) * warmthLevel);
    const g = Math.round(185 + (82 - 185) * warmthLevel);
    const b = Math.round(129 + (255 - 129) * warmthLevel);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const cursorColor = getCursorColor();

  return (
    <div className="fixed inset-0 pointer-events-none z-100 select-none">
      
      {/* Steam particles trail */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute font-mono text-[9.5px] font-semibold antialiased pointer-events-none overflow-visible filter blur-[0.4px]"
          style={{
            left: p.x,
            top: p.y,
            opacity: p.life * 0.45,
            transform: `translate(-50%, -50%) scale(${p.scale}) rotate(${p.rotation}deg)`,
            color: cursorColor,
            textShadow: `0 0 3px ${cursorColor}50`,
            transition: 'opacity 0.1s ease-out',
          }}
        >
          {p.char}
        </div>
      ))}

      {/* Main retro core pixel caret */}
      <div
        className={`absolute pointer-events-none mix-blend-screen flex items-center justify-start`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Retro Caret Box */}
        <div 
          className="w-3.5 h-3.5 flex items-center justify-center font-bold text-xs"
          style={{ 
            color: cursorColor,
            textShadow: `0 0 4px ${cursorColor}`,
          }}
        >
          {isGlitched ? '▒' : '▣'}
        </div>

        {/* Small, delayed floating text next to the cursor (whisper log) */}
        <AnimatePresence>
          {hoverText && (
            <motion.div
              initial={{ opacity: 0, x: 8, y: 5 }}
              animate={{ opacity: 0.85, x: 12, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15 }}
              className="absolute left-4 bg-black/90 border border-current text-[8px] font-mono tracking-widest px-1.5 py-0.5 whitespace-nowrap box-solid-shadow"
              style={{ 
                color: cursorColor,
                borderColor: cursorColor,
              }}
            >
              {hoverText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
