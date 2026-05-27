import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FloatingLog } from '../types';
import { Sparkles, Terminal, Cpu, Coffee, Cloud, Heart } from 'lucide-react';
import TeapotInteractivePopup from './TeapotInteractivePopup';
import LedSystemBar from './LedSystemBar';

const POETIC_PHRASES = [
  "the system asked for coffee",
  "we answered with fingerprints",
  "too human to function",
  "manual override enabled",
  "emotion detected at core 0x418",
  "the teapot refused perfection",
  "그래도 사람이 만들었어요",
  "someone stayed here longer than expected",
  "too warm for the cold processor",
  "intentional error deployed",
  "boiling point of absolute resistance",
  "do devices dream of warm tea?",
  "hyper-efficiency is a gentle death"
];

interface HomeProps {
  humanTouchMode: boolean;
  onNavigate: (section: any) => void;
  onToggleHumanTouch?: (enabled: boolean) => void;
}

export default function Home({ humanTouchMode, onNavigate, onToggleHumanTouch = () => {} }: HomeProps) {
  const [logs, setLogs] = useState<FloatingLog[]>([]);
  const [activeTeapotPart, setActiveTeapotPart] = useState<string | null>(null);
  const [glitchTitle, setGlitchTitle] = useState("I'M A TEAPOT");
  const [steamItems, setSteamItems] = useState<{ id: number; text: string; delay: number; x: number }[]>([]);
  const [activePillar, setActivePillar] = useState<'intent' | 'theme' | 'concept'>('intent');

  // Generate unique steam particles
  useEffect(() => {
    const steamInterval = setInterval(() => {
      setSteamItems(prev => [
        ...prev.slice(-10),
        {
          id: Math.random(),
          text: POETIC_PHRASES[Math.floor(Math.random() * POETIC_PHRASES.length)],
          delay: Math.random() * 2,
          x: 20 + Math.random() * 60
        }
      ]);
    }, 4500);

    return () => clearInterval(steamInterval);
  }, []);

  // Set initial floating emotional logs
  useEffect(() => {
    const initialLogs: FloatingLog[] = Array.from({ length: 6 }).map((_, i) => ({
      id: `log-${i}`,
      text: POETIC_PHRASES[i % POETIC_PHRASES.length],
      timestamp: `12:47:${10 + i * 8} UTC`,
      coordinates: {
        x: 10 + (i * 15) + (Math.random() * 5),
        y: 20 + (i * 10) + (Math.random() * 12)
      }
    }));
    setLogs(initialLogs);
  }, []);

  // Title glitch simulation
  useEffect(() => {
    const titleInterval = setInterval(() => {
      const normal = "I'M A TEAPOT";
      const glitchChars = "I'M ░ ░E░P░T";
      const glitchChars2 = "1'M A T34P0T";
      const random = Math.random();
      if (random < 0.15) {
        setGlitchTitle(glitchChars);
        setTimeout(() => setGlitchTitle(normal), 200);
      } else if (random < 0.3) {
        setGlitchTitle(glitchChars2);
        setTimeout(() => setGlitchTitle(normal), 350);
      }
    }, 3000);

    return () => clearInterval(titleInterval);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-hidden px-4 py-8 md:py-16">
      
      {/* BACKGROUND GRAPHIC LINES / SYSTEM GRID */}
      <div className="absolute inset-0 border-r border-t border-b border-electric/10 pointer-events-none select-none z-0">
        <div className="absolute top-24 left-0 w-full h-[1px] bg-electric/15" />
        <div className="absolute bottom-24 left-0 w-full h-[1px] bg-electric/15" />
        <div className="absolute top-0 left-12 md:left-24 w-[1px] h-full bg-electric/15" />
        <div className="absolute top-0 right-12 md:right-24 w-[1px] h-full bg-electric/15" />
        
        {/* Dynamic Matrix-like Coordinates in Faded Gray */}
        <div className="absolute top-4 left-6 text-[9px] font-mono text-electric/40 select-none">
          SYS.LOC: GRID_2026 // TIME: 12:47:04 // STATUS: BOILING
        </div>
        <div className="absolute bottom-4 right-6 text-[9px] font-mono text-electric/40 select-none text-right">
          INTELLIGENT HARDWARE ARCHIVE // CORE_0X418_LOADED_OK
        </div>
      </div>

      {/* Floating System Messages */}
      <AnimatePresence>
        {logs.map((log) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 0.85, y: 0 }}
            exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05, opacity: 1 }}
            className={`absolute z-10 cursor-pointer select-none p-2 border border-electric/20 rounded shadow-md backdrop-blur-xs max-w-xs transition-colors duration-300 ${
              humanTouchMode 
                ? 'bg-[#1C1410] text-amber-200 border-amber-800/60 font-hand text-lg rotate-1 shadow-lg shadow-black/40' 
                : 'bg-royal/85 text-faded-gray hover:text-soft-white hover:border-electric/50 font-mono text-[10px]'
            }`}
            style={{
              left: `${log.coordinates.x}%`,
              top: `${log.coordinates.y}%`,
            }}
            drag
            dragConstraints={{ left: 10, right: 300, top: 10, bottom: 400 }}
          >
            <div className="flex items-center gap-1.5 opacity-80 mb-0.5 pointer-events-none">
              <span className={`w-1 h-1 rounded-full animate-ping ${humanTouchMode ? 'bg-[#FF3366]' : 'bg-electric'}`} />
              <span>{log.timestamp}</span>
            </div>
            <p className="tracking-tight">{log.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* COMPACT CLOCK & COUNTER FOR HUMAN TRACE */}
      <div className="w-full max-w-6xl flex justify-between items-start z-10 mt-4 md:mt-0 px-2 md:px-8">
        <div className="flex flex-col text-[10px] font-mono text-electric text-left tracking-wider">
          <span className="text-electric/50 uppercase">[SYS INTENT]</span>
          <span className="font-semibold text-soft-white select-none">HUMAN TOUCH DETECTED = {humanTouchMode ? "TRUE" : "FALSE"}</span>
          <span className="text-electric/70">RFC 418 I&apos;M A TEAPOT EXH</span>
        </div>
        <div className="flex flex-col text-[10px] font-mono text-right tracking-wider text-electric">
          <span className="text-electric/50 uppercase">[EXHIBITION TIMELINE]</span>
          <span className="text-soft-white font-bold">26.06.02. - 04. (3일간)</span>
          <span className="text-electric/70">장소: 캠퍼스라이프센터(CLC) 1 - 2층</span>
        </div>
      </div>

      {/* MAIN BANNER BLOCK */}
      <div className="w-full max-w-6xl flex flex-col items-center justify-center text-center mt-8 md:mt-16 z-10 select-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block px-4 py-2"
        >
          {/* Poetic subtitling */}
          <span className="block font-mono text-xs md:text-sm tracking-[0.2em] text-faded-gray uppercase mb-1 md:mb-2 text-center">
            {humanTouchMode ? "✿ DIGITAL ARTS AND HUMANITIES ARCHIVE • 그래도 사람이 만들었어요" : "◈ DIGITAL ARTS AND HUMANITIES ARCHIVE"}
          </span>

          <h1 className="font-sans font-bold text-5xl md:text-9xl tracking-tighter text-soft-white leading-none inline-flex flex-col items-center select-none">
            <span className="text-electric crt-flicker brightness-125 select-none vibrant-glitch-shadow">
              418
            </span>
            <span className="text-3xl md:text-7xl tracking-widest font-mono text-transparent bg-clip-text bg-gradient-to-r from-soft-white to-faded-gray font-semibold">
              {glitchTitle}
            </span>
          </h1>

          {/* Underline phrase */}
          <p className="mt-4 text-xs md:text-base font-serif italic text-faded-gray/90 max-w-md mx-auto leading-relaxed">
            “An emotional teapot is resistance against systems of hyper-efficiency. It asks for patience, pours with a trembling machine-arm, and boils with humanity.”
          </p>
        </motion.div>
      </div>

      {/* EXHIBITION CORE PILLARS OVERVIEW */}
      <div className="w-full max-w-4xl z-20 mt-8 mb-12">
        <div className="border-2 rounded-none p-6 md:p-8 transition-all duration-500 box-solid-shadow text-left border-electric bg-royal/30 text-soft-white font-sans">
          
          <div className="border-b border-electric/25 pb-4 mb-6 flex justify-between items-center">
            <div>
              <h3 className="font-sans font-bold text-xl md:text-2xl tracking-tight uppercase text-white">
                Connect to Touch
              </h3>
            </div>
          </div>

          {/* Clean Content Panel with exact text provided by user */}
          <div className="relative">
            <p className="text-sm leading-relaxed text-justify whitespace-pre-line text-faded-gray/90">
              {`학기 말, 늘 그래왔듯 돌아오는 과제와 결과물들의 나열. 익숙함이라는 이름 아래 무색무취하게 흘러가던 디지털인문예술의 기말 전시가 올해, 조금 특별한 ‘터치’를 시작합니다.

디지털인문예술과 디지털미디어콘텐츠의 교차점에서 사람과 문화를 잇는 문화콘텐츠 기획 동아리, 커넥트가 이번 기말 전시의 메가폰을 잡게 된 것은 어쩌면 아주 자연스러운 이끌림이었습니다.

우리가 배우는 '디지털인문예술'은 단순히 스크린 속에 갇힌 차가운 데이터나 코딩 플로우가 아닙니다. 기술을 매개로 인간의 삶과 온기를 표현하고, 모니터 너머의 사람에게 가닿는 가장 현대적인 감각입니다. 하지만 그동안의 기말 전시는 각자의 결과물을 일방적으로 보여주는 스크린의 나열에 머물러 있었을지도 모릅니다.

커넥트는 그 무색무취했던 공간에 ‘(Human Touch)’가 필요하다고 느꼈습니다.

마우스 클릭 한 번, 스크린 위의 손짓 하나가 단순한 조작을 넘어 작품과 관객이 교감하는 ‘터치’가 되기를 바랐습니다.
일방적인 감상을 넘어, 관객이 직접 참여하고 채워나가는 과정을 통해 서로에게 깊은 ‘터치’로 남기를 원했습니다.

그래서 이번 전시는 단순히 작품을 진열하는 공간이 아닌, 관객의 참여로 비로소 완성되는 하나의 거대한 참여형 플랫폼으로 기획되었습니다. 전시 전체를 관통하는 명확한 스토리텔링 위에 관객 여러분의 손길과 발길이 닿을 때, 비로소 우리의 디지털인문예술은 생동감 있게 살아 움직이기 시작할 것입니다.

차가운 디지털 기술 위에 커넥트만의 따뜻한 감각을 얹고, 여러분의 참여라는 마지막 퍼즐을 더해 가장 인간적인 축제를 만들고자 합니다.

손끝으로 느끼고, 온기로 연결되는 곳. 커넥트가 제안하는 새로운 디지털인문예술의 장에 오신 것을 환영합니다.

자, 이제 커넥트가 연결한 세계를 마음껏 ‘터치’해 주세요.`}
            </p>
          </div>
        </div>
      </div>

      {/* QUICK LAUNCH ACCESS TILES */}
      <div className="w-full max-w-4xl z-20 mt-6 md:mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {([
            { id: 'source-code', label: '01 // SOURCE CODE' },
            { id: 'component', label: '02 // COMPONENTS' },
            { id: 'feed', label: '03 // FEED' },
            { id: 'run', label: '04 // RUN' },
            { id: 'admin', label: '05 // SYSTEM ADMIN' }
          ] as const).map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="py-3 px-2 text-center cursor-pointer select-none bg-royal/40 hover:bg-electric text-[#CFCFCF] hover:text-[#0c1236]/90 hover:font-bold border border-electric/30 hover:border-electric transition-all duration-200 uppercase font-mono text-[10px] md:text-[11px] flex items-center justify-center tracking-wider h-14 rounded-sm hover:-translate-y-0.5 active:translate-y-0 shadow-md"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* POETIC RETRO POPUP SYSTEM: THE EMOTIONAL CORE "418 I'M A TEAPOT" CHIP */}
      <div className="w-full max-w-xl my-8 md:my-12 z-20 flex flex-col items-center justify-center">
        <TeapotInteractivePopup 
          humanTouchMode={humanTouchMode} 
          onToggleHumanTouch={onToggleHumanTouch} 
        />
      </div>

      {/* FOOTER POETRY STRIP */}
      <div className="w-full max-w-6xl border-t border-electric/15 mt-16 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left z-10">
        <p className="font-mono text-[9px] text-faded-gray/60">
          © 2026 HUMANITIES MEDIA LAB. NO EFFICIENCY CLAIMS ARE MADE. ALL ERRORS INCURRED ARE GENUINELY HUMAN.
        </p>
        <div className="flex gap-4 font-mono text-[9px]">
          <span className="text-electric animate-pulse">● STEAMING SYSTEM BOILING AT 102°C</span>
          <span className="text-faded-gray/40">|</span>
          <span className="text-soft-white cursor-pointer hover:text-electric" onClick={() => onNavigate('admin')}>ADMIN ENTRY</span>
        </div>
      </div>

    </div>
  );
}
