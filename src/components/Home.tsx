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
            {humanTouchMode ? "✿ DIGITAL HUMANITIES EXPERIENCE ARCHIVE • 그래도 사람이 만들었어요" : "◈ DIGITAL HUMANITIES EXPERIMENTAL ARCHIVE"}
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

      {/* HORIZONTAL LED MARQUEE STATUS BANNER */}
      <LedSystemBar />

      {/* POETIC RETRO POPUP SYSTEM: THE EMOTIONAL CORE "418 I'M A TEAPOT" CHIP */}
      <div className="w-full max-w-xl my-8 md:my-12 z-20 flex flex-col items-center justify-center">
        <TeapotInteractivePopup 
          humanTouchMode={humanTouchMode} 
          onToggleHumanTouch={onToggleHumanTouch} 
        />
      </div>

      {/* EXHIBITION CORE PILLARS OVERVIEW */}
      <div className="w-full max-w-4xl z-20 mt-8 mb-12">
        <div className="border-2 rounded-none p-6 md:p-8 transition-all duration-500 box-solid-shadow text-left border-electric bg-royal/30 text-soft-white font-sans">
          
          <div className="border-b border-electric/25 pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest block mb-1 text-electric">
                // EXHIBITION CORE PILLARS // 전시 설계 핵심 자료
              </span>
              <h3 className="font-sans font-bold text-xl md:text-2xl tracking-tight uppercase text-white">
                전시 기획, 주제 및 콘셉트 상세 규격
              </h3>
            </div>
            
            {/* Pill Control Tabs */}
            <div className="flex flex-wrap gap-2 font-mono text-[10px]">
              {(['intent', 'theme', 'concept'] as const).map((pillarId) => {
                const labels = {
                  intent: '01 // 기획 의도',
                  theme: '02 // 전시 주제 (Human touch)',
                  concept: "03 // 콘셉트 (418 I'm a teapot)"
                };
                const isActive = activePillar === pillarId;
                return (
                  <button
                    key={pillarId}
                    onClick={() => setActivePillar(pillarId)}
                    className={`px-3 py-1.5 rounded-none border cursor-pointer select-none transition-all ${
                      isActive 
                        ? 'bg-electric border-soft-white text-soft-white font-bold'
                        : 'border-electric/30 text-faded-gray/70 hover:border-electric'
                    }`}
                  >
                    {labels[pillarId]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Panel with exact text provided by user */}
          <div className="relative min-h-[220px]">
            <AnimatePresence mode="wait">
              {activePillar === 'intent' && (
                <motion.div
                  key="intent"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <span className="font-mono text-[9px] px-2 py-0.5 border rounded-full inline-block uppercase tracking-wider select-none border-electric text-electric bg-electric/5">
                    PRIMARY INTENT // 기획 의도
                  </span>
                  <p className="text-sm leading-relaxed text-justify whitespace-pre-line text-faded-gray/90">
                    기술이 일상의 많은 부분을 대신하면서 우리는 그 어느 때보다 효율을 중시하는 사회에서 살고 있다. AI가 정교한 결과물을 내놓고 많은 과정이 자동화되는 흐름은 효율적이지만 한편으로는 정해진 정답만 가득한 딱딱한 인상을 주기도 한다. 인간의 능력을 추월하고 완벽한 정답을 제시하는 시대가 도래함에 따라, 역설적으로 사회는 기술이 흉내 낼 수 없는 ‘인간의 흔적’에 주목하기 시작했다.
                    {"\n\n"}
                    모든 과정이 자동화되고 매끄럽게 흘러가는 디지털 환경 속에서 사람들은 정교한 알고리즘보다 투박하더라도 진정성이 느껴지는 정서적 연결에 더 큰 가치를 부여한다. 기술이 고도화될수록 그 이면에 숨겨진 창작자의 사유와 의도적인 빈틈이 인간다움을 증명하는 핵심 요소가 된 것이다.
                    {"\n\n"}
                    이번 전시는 이러한 사회적 흐름을 바탕으로, 디지털 시스템의 틈새에서 발견되는 인간다움을 탐구하고자 한다. 이는 곧 디지털 기술을 단순한 효율의 도구를 넘어, 인간 본성을 이해하는 새로운 렌즈로 삼고자 하는 &apos;디지털인문예술전공&apos;의 방향성과 맞닿아 있다. 우리는 기술과 시스템 속에 의도적인 빈틈을 부여하는 방식을 통해, 최신 기술 시대에 인문학이 어떻게 새로운 통찰을 발굴하고 그 깊이를 확장할 수 있는지 그 구체적인 가능성을 제시하고자 한다.
                  </p>
                </motion.div>
              )}

              {activePillar === 'theme' && (
                <motion.div
                  key="theme"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <span className="font-mono text-[9px] px-2 py-0.5 border rounded-full inline-block uppercase tracking-wider select-none border-electric text-electric bg-electric/5">
                    EXHIBITION THEME // 전시 주제: 휴먼 터치 (Human touch)
                  </span>
                  <p className="text-sm leading-relaxed text-justify whitespace-pre-line text-faded-gray/90">
                    이번 전시의 중심 주제는 ‘휴먼 터치(Human touch)’이다. 이는 차가운 디지털 매체 안에 어떻게 인간의 온기를 담아낼 수 있을지에 대한 깊은 고민에서 시작되었다.
                    {"\n\n"}
                    고도화된 기술로 기계적인 완벽함 및 매끄러운 결과값이 당연해진 시대지만, 사람들은 역설적으로 완벽하게 통제된 시스템 속에서 투박하더라도 진정성이 느껴지는 &apos;인간의 흔적&apos;을 갈망한다. 오차 없는 알고리즘이 정답을 제시할지라도, 우리의 마음을 진정으로 움직이는 것은 결국 사람의 감수성과 시선이 묻어나는 불완전한 순간들이다.
                    {"\n\n"}
                    본 전시는 기술이 인간을 소외시키는 차가운 도구로 전락하는 것을 경계하며, 오히려 인간의 내면을 연결하는 따뜻하고 유연한 매개체로 기능할 수 있는 가능성을 탐구한다. 거대한 시스템의 표면 아래에 존재하는 작가의 고민과 의도적인 빈틈을 보여줌함으로써, 매끄러운 자동화의 물결 속에서도 결코 지워지지 않는 고유한 인간다움을 증명하고자 한다.
                  </p>
                </motion.div>
              )}

              {activePillar === 'concept' && (
                <motion.div
                  key="concept"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <span className="font-mono text-[9px] px-2 py-0.5 border rounded-full inline-block uppercase tracking-wider select-none border-electric text-electric bg-electric/5">
                    CORE CONCEPT // 전시 핵심 콘셉트 (418 I&apos;m a teapot)
                  </span>
                  <p className="text-sm leading-relaxed text-justify whitespace-pre-line text-faded-gray/90">
                    전시의 핵심 콘셉트인 ‘418 I’m a teapot’은 1998년 만우절 농담에서 유래한 기술 표준으로, 커피를 내리라는 명령에 대해 서버가 &quot;나는 찻주전자이기에 커피를 내릴 수 없다&quot;고 응답하며 거절하는 상황을 뜻한다. 이는 시스템의 단순한 기능 정지가 아니라, 자신의 정체성과 맞지 않는 요청에 대해 명확하게 ‘나다움’을 밝히며 유쾌하게 응답을 거부하는 인간적인 위트를 상징한다.
                    {"\n\n"}
                    이번 전시에서는 이 개념을 효율 중심의 시스템 속에서 창작자의 자아를 드러내는 방식으로 풀어내고자 한다. 모두가 자동화된 툴을 이용해 정답을 내놓으려 할 때, 우리는 오히려 의도적인 오류와 엉뚱한 응답을 통해 기술 너머에 사람이 살고 있음을 보여준다. 이는 단순히 시스템의 오류를 재현하는 것을 넘어, 정해진 매뉴얼에서 벗어나 자신의 고유한 서사를 지켜내려는 능동적인 태도를 의미한다.
                    {"\n\n"}
                    결과적으로 이러한 의도적 오류는 기술을 단순한 효율성의 도구가 아닌, 개인의 정체성을 투영하는 ‘휴먼 터치(Human touch)’의 매개체로 작용할 것이다.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* QUICK LAUNCH ACCESS TILES */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 z-20 mt-6 md:mt-10">
        
        {/* Tile 1: Philosophy Manifest */}
        <div 
          onClick={() => onNavigate('source-code')}
          className="border-2 border-electric bg-royal/40 p-4 rounded-none cursor-pointer hover:border-electric hover:bg-royal/60 box-solid-shadow transform hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-[9px] text-electric">[MANIFESTO]</span>
            <Terminal className="w-4 h-4 text-electric" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-soft-white mb-1">01 // MANIFESTO</h3>
            <p className="font-mono text-[10px] text-faded-gray/80 leading-relaxed">
              Why a teapot? Exploring RFC 2324 as a digital resistance gesture.
            </p>
          </div>
          <span className="font-mono text-[9px] text-electric/60 hover:text-soft-white transition-colors mt-4">
            SYS.LOAD --PHILOSOPHY →
          </span>
        </div>

        {/* Tile 2: Goods & Artifacts */}
        <div 
          onClick={() => onNavigate('component')}
          className="border-2 border-electric bg-royal/40 p-4 rounded-none cursor-pointer hover:border-electric hover:bg-royal/60 box-solid-shadow transform hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-[9px] text-electric">[COMPONENTS]</span>
            <Cpu className="w-4 h-4 text-electric" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-soft-white mb-1">02 // CATALOGUE</h3>
            <p className="font-mono text-[10px] text-faded-gray/80 leading-relaxed">
              Explore physical artifacts containing error-codes, leaflets, memos.
            </p>
          </div>
          <span className="font-mono text-[9px] text-electric/60 hover:text-soft-white transition-colors mt-4">
            SYS.QUERY --ART_INVENTORY →
          </span>
        </div>

        {/* Tile 3: Interactive run */}
        <div 
          onClick={() => onNavigate('run')}
          className="border-2 border-electric bg-royal/40 p-4 rounded-none cursor-pointer hover:border-electric hover:bg-royal/60 box-solid-shadow transform hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-[9px] text-electric">[INTERACTIVE]</span>
            <Coffee className="w-4 h-4 text-electric" />
          </div>
          <div>
            <h3 className="font-sans text-lg font-bold text-soft-white mb-1">03 // PLAY ROOM</h3>
            <p className="font-mono text-[10px] text-faded-gray/80 leading-relaxed">
              Submit your error codes, simulate photobooth prints, engage system.
            </p>
          </div>
          <span className="font-mono text-[9px] text-electric/60 hover:text-soft-white transition-colors mt-4">
            SYS.RUN --PLAYGROUND →
          </span>
        </div>
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
