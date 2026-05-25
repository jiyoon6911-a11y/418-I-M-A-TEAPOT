import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavSection } from './types';
import Home from './components/Home';
import SourceCode from './components/SourceCode';
import Component from './components/Component';
import Feed from './components/Feed';
import Run from './components/Run';
import SystemAdmin from './components/SystemAdmin';
import CustomCursor from './components/CustomCursor';
import { 
  Compass, 
  Terminal, 
  Layers, 
  HelpCircle, 
  Cpu, 
  Heart, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

const SFX_ENABLED_KEY = "418_sfx_on";

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [humanTouchMode, setHumanTouchMode] = useState<boolean>(false);
  const [crtFilterOn, setCrtFilterOn] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [showBootScreen, setShowBootScreen] = useState<boolean>(true);
  const [bootTextIndex, setBootTextIndex] = useState(0);

  const bootPhrases = [
    "BOOTING SYSTEM HUMAN TOUCH...",
    "COFFEE POT CONTROL PROTOCOL (HTCPCP/1.0) DETECTED...",
    "COMPILING CORE EXCEPTION 0x418 // I'M A TEAPOT",
    "CHECKING VESSEL HEAT INDEX STATE // 101.4°C",
    "DECOY EFFICIENCY SCHEDULERS: DEACTIVATED",
    "EMOTIONAL GLITCHES INTENTIONALLY LOADED.",
    "STATUS: BOILING // ENTER GALLERY ARCHIVE NOW."
  ];

  // Boot sequence simulation
  useEffect(() => {
    if (bootTextIndex < bootPhrases.length - 1) {
      const timer = setTimeout(() => {
        setBootTextIndex(prev => prev + 1);
        playSynthBeep(440 + bootTextIndex * 110, 'sine', 0.05);
      }, 450);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowBootScreen(false);
        playSynthBeep(880, 'sine', 0.15);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [bootTextIndex]);

  // Audio Context synthesizer for digital beeps & pops
  const playSynthBeep = (freq: number, type: 'sine' | 'square' | 'triangle' = 'sine', duration = 0.06) => {
    if (isAudioMuted || showBootScreen && freq < 440) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime); // Ultra safe soft volume levels
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {
      // Audio block or focus error safety trap
    }
  };

  const handleRouteNavigation = (section: NavSection) => {
    setCurrentSection(section);
    playSynthBeep(650, 'sine', 0.05);
    setTimeout(() => {
      playSynthBeep(980, 'sine', 0.03);
    }, 50);
    
    // Scroll to top of window frame
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleHumanTouch = () => {
    const nextState = !humanTouchMode;
    setHumanTouchMode(nextState);
    if (nextState) {
      // Sweeter thermal-like slide beep tone
      playSynthBeep(330, 'triangle', 0.1);
      setTimeout(() => playSynthBeep(520, 'triangle', 0.15), 70);
    } else {
      // Cold mechanical drop tone
      playSynthBeep(520, 'square', 0.08);
      setTimeout(() => playSynthBeep(330, 'square', 0.12), 60);
    }
  };

  const renderActiveSection = () => {
    switch (currentSection) {
      case 'home':
        return <Home humanTouchMode={humanTouchMode} onNavigate={handleRouteNavigation} onToggleHumanTouch={setHumanTouchMode} />;
      case 'source-code':
        return <SourceCode humanTouchMode={humanTouchMode} />;
      case 'component':
        return <Component humanTouchMode={humanTouchMode} />;
      case 'feed':
        return <Feed humanTouchMode={humanTouchMode} />;
      case 'run':
        return <Run humanTouchMode={humanTouchMode} />;
      case 'admin':
        return <SystemAdmin humanTouchMode={humanTouchMode} />;
      default:
        return <Home humanTouchMode={humanTouchMode} onNavigate={handleRouteNavigation} onToggleHumanTouch={setHumanTouchMode} />;
    }
  };

  return (
    <div className={`relative min-h-screen text-soft-white selection:bg-electric selection:text-soft-white transition-all duration-700 ease-in-out font-sans bg-[#0B0F33] ${crtFilterOn ? 'scanline' : ''}`}>

      {/* BOOT LOADING PAGE SCREEN */}
      <AnimatePresence>
        {showBootScreen && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0B0F33] z-50 flex flex-col items-center justify-center p-6 text-emerald-400 font-mono text-xs text-left select-none scanline"
          >
            <div className="max-w-md w-full space-y-3 p-6 border border-emerald-500/30 bg-royal/40 rounded-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-2 right-3 font-mono text-[9px] text-[#1D32FF] animate-pulse">
                [SYS_REFLUX_LOADING]
              </div>
              
              {/* Spinning status pixel */}
              <div className="flex gap-2 items-center mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-white font-bold tracking-widest text-[14px]">EXH_418: BOOTING_</span>
              </div>

              {/* Incremental Boot Log Output */}
              <div className="space-y-1.5 h-40 font-mono text-[10px]">
                {bootPhrases.slice(0, bootTextIndex + 1).map((phrase, idx) => (
                  <div key={idx} className="flex gap-2">
                    <span className="text-emerald-500/50 select-none">[{idx + 1}]</span>
                    <p className="tracking-tight">{phrase}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-emerald-500/20 text-[9px] text-emerald-500/60 flex justify-between select-none">
                <span>PORT CORE SYSTEM: 3000</span>
                <span>DEVICE TIME: 12:47:04Z</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CRT SCANLINES & GLASS TINT BLANKET FLICKER */}
      {crtFilterOn && <div className="fixed inset-0 crt-flicker pointer-events-none z-40 select-none opacity-40 mix-blend-overlay" />}

      {/* GLOBAL BACKGROUND OVERLAYS FOR COLD MACHINE MODE */}
      {!humanTouchMode && (
        <>
          <div className="absolute inset-0 grid-overlay opacity-[0.05] pointer-events-none z-0" />
          <div className="fixed inset-0 screen-glow pointer-events-none z-30" />
        </>
      )}

      {/* HUMAN OVERRIDE DECAL STICKERS (Only rendered when humanTouchMode = TRUE) */}
      <AnimatePresence>
        {humanTouchMode && (
          <>
            {/* Tape 1: Top-Left Header annotation */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: -3 }}
              exit={{ opacity: 0 }}
              className="absolute top-28 left-4 md:left-24 z-30 select-none bg-[#201511] text-amber-100 border border-amber-800/80 shadow-lg font-hand text-lg px-4 py-1.5 text-center cursor-default hover:scale-105 transition-transform"
            >
              📝 그래도 사람이 만들었어요
            </motion.div>

            {/* Tape 2 (Humorous): Top-Right Side notes */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: 1 }}
              animate={{ scale: 1, opacity: 0.9, rotate: 2 }}
              exit={{ opacity: 0 }}
              className="hidden lg:block absolute top-[160px] right-[4%] z-30 select-none bg-[#1C1410] text-amber-200 border border-amber-900/40 p-3 font-hand text-base shadow-xl max-w-[200px]"
            >
              ⚠️ 마감 직전에 급하게 우려낸 온기성 데이터...
            </motion.div>

            {/* Tape 3 (Humorous): Left Lower Middle column */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 0.85, rotate: -5 }}
              exit={{ opacity: 0 }}
              className="hidden md:block absolute bottom-40 left-4 md:left-12 z-30 select-none bg-[#1A120E] text-amber-200/90 border-r-4 border-amber-800/80 p-3 font-hand text-base shadow-xl max-w-[180px]"
            >
              🐛 버그 아님. 아무튼 의도된 연출임.
            </motion.div>

            {/* Tape 4: Accidental margin note (Bottom Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.85, x: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-12 right-6 z-30 pointer-events-none select-none bg-[#1B110D] text-amber-100/90 border-l-4 border-[#FF3366] font-hand text-lg px-4 py-2 rotate-2 shadow-xl max-w-[220px]"
            >
              “완벽한 효율보다는 아주 조금씩 우려낸 온기를.”
              <span className="block text-[9px] font-mono text-faded-gray/50 mt-1 text-right">// RFC 418 OVERRIDE</span>
            </motion.div>

            {/* Tape 5: Tea Ring stains overlay decoration */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="fixed top-48 right-12 w-32 h-32 rounded-full border-4 border-amber-900 pointer-events-none select-none z-0 rotate-12"
            />
          </>
        )}
      </AnimatePresence>

      {/* MASTER CENTRALIZED APP WRAPPER */}
      <div className="relative min-h-screen flex flex-col justify-between z-10">

        {/* STICKY TOP HEADER & NAVIGATION SYSTEM */}
        <div className="sticky top-0 z-30 w-full">
          {/* TOP CONTROL SYSTEM BAR HEADER */}
          <header className="border-b border-electric/25 transition-all duration-500 select-none p-3 md:px-8 flex justify-between items-center bg-[#0B0F33]/90 text-soft-white backdrop-blur-md">
            {/* Logo Brand Brand Area */}
            <div 
              onClick={() => handleRouteNavigation('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full border border-electric bg-[#1D32FF]/10 flex items-center justify-center transition-transform group-hover:rotate-12">
                <Heart className="w-4 h-4 text-electric animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans font-bold text-sm tracking-tighter uppercase">#418 I&apos;M A TEAPOT</span>
                <span className="font-mono text-[8px] text-faded-gray tracking-widest uppercase">
                  {humanTouchMode ? "✿ HUMAN_REACTION_ACTIVE" : "◈ SYSTEM_REFLUX_ONLINE"}
                </span>
              </div>
            </div>

            {/* RIGHT SIDE MASTER SYSTEM TOOLBAR */}
            <div className="flex items-center gap-3 md:gap-6">
              
              {/* SCANLINE CONTROL BUTTON */}
              <button 
                onClick={() => {
                  setCrtFilterOn(!crtFilterOn);
                  playSynthBeep(450, 'sine', 0.04);
                }}
                title="Toggle Tube Scanline Glitch Filter"
                className={`font-mono text-[9px] px-2 py-1 rounded border cursor-pointer select-none transition-all ${
                  crtFilterOn 
                    ? 'border-electric bg-electric/20 text-soft-white' 
                    : 'border-[#cfcfcf]/30 text-faded-gray hover:border-[#cfcfcf]/60'
                }`}
              >
                CRT: {crtFilterOn ? "ON" : "OFF"}
              </button>

              {/* AUDIO SOUND FX TOGGLE SWITCH */}
              <button 
                onClick={() => {
                  const nextAudio = !isAudioMuted;
                  setIsAudioMuted(nextAudio);
                  if (!nextAudio) {
                    // Gentle audio test pop
                    setTimeout(() => playSynthBeep(600, 'sine', 0.05), 50);
                  }
                }}
                className="text-faded-gray hover:text-white p-1 rounded transition-colors select-none cursor-pointer"
                title={isAudioMuted ? "Enable Synthetic Audio Beeps" : "Disable UI Sound Hum"}
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              </button>

            </div>
          </header>

          {/* NAVIGATION SELECTION SUBSTRATE */}
          <nav className="w-full py-2 border-b border-electric/10 select-none transition-colors duration-500 bg-[#0B0F33]/90 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 flex gap-x-3 md:gap-x-8 overflow-x-auto whitespace-nowrap justify-start md:justify-center font-mono text-[10px] md:text-xs">
              {([
                { id: 'home', label: '00 // HOME' },
                { id: 'source-code', label: '01 // SOURCE CODE' },
                { id: 'component', label: '02 // COMPONENT' },
                { id: 'feed', label: '03 // FEED' },
                { id: 'run', label: '04 // RUN' },
                { id: 'admin', label: '05 // SYSTEM ADMIN' }
              ] as const).map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button 
                    key={item.id}
                    onClick={() => handleRouteNavigation(item.id)}
                    className={`py-1 px-3 cursor-pointer select-none transition-all duration-200 uppercase ${
                      isActive 
                        ? 'text-white border border-electric bg-electric rounded' 
                        : 'text-faded-gray/70 hover:text-white hover:underline'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* VIEWPORT GRAPHIC CONTENT ENVELOPE */}
        <main className="flex-grow w-full relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSection + (humanTouchMode ? '_human' : '_cpu')}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="w-full relative"
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* BOTTOM GLOBAL CORNER DECAL FEEDBACK */}
        <footer className="p-4 border-t border-electric/15 transition-colors duration-500 font-mono text-[9px] tracking-wider select-none flex flex-col md:flex-row justify-between items-center gap-4 bg-royal/30 text-faded-gray/40">
          <div>
            STATUS: <span className="text-emerald-400 font-bold">102.42°C // BOILING</span> // REFLUX CODE: 418 // HARDWARE COMPACTS: PRE-LOADED OK
          </div>
          <div>
            MADE BY PEOPLE HANDS // TOKYO - SEOUL SEC. GRID III // REVOLUTION CORE ACTIVED
          </div>
        </footer>
        
        <CustomCursor />

      </div>

    </div>
  );
}
