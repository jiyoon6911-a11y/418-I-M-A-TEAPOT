import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import teapotImg from '../assets/images/3d_teapot_monitor_1779611146496.png';
import { 
  Heart, MessageSquare, Terminal as TermIcon, ShieldAlert, WifiOff, 
  FileText, ChevronLeft, ChevronRight, Send, Flame, Coffee, Sparkles, 
  Folder, Play, Square, SkipForward, Info, Trash2, Globe,
  Printer, Smile, Scissors, Layers, CheckCircle2, Copy, X
} from 'lucide-react';

// Types for the Feed
interface FeedPost {
  id: string;
  title: string;
  typeLabel: string;
  date: string;
  likes: number;
  comments: number;
  slides: {
    type: 'teapot-display' | 'windows95-desktop' | 'error-cascade' | 'terminal-log' | 'ascii-schematic' | 'web-browser' | 'audio-player' | 'image' | 'text';
    title: string;
    content: any;
  }[];
}

// Low level audio generator for retro sounds safely
const playSound = (freq: number, type: OscillatorType = 'sine', duration: number = 0.1, volumeValue: number = 0.1) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(volumeValue, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore context blocked errors
  }
};

export default function Feed({ humanTouchMode }: { humanTouchMode: boolean }) {
  const [likesCount, setLikesCount] = useState<Record<string, number>>({
    'post-teapot': 418,
    'post-retro-desktop': 255
  });
  
  // Sticker & Receipt States
  const [activeReceipt, setActiveReceipt] = useState<{ text: string; date: string; density: string; id: string } | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);

  const [commentInput, setCommentInput] = useState('');
  const [activeSlide, setActiveSlide] = useState<Record<string, number>>({
    'post-teapot': 0,
    'post-retro-desktop': 0
  });
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "INIT::EMOTIONAL_ARCHIVE_PIPELINE v0.12...",
    "DETECT::Raw human activity at sensor [0x992]",
    "STATUS::Memories are being serialized to JSON variables",
    "WARNING::Hyper-efficiency is bypassed on Port 3000"
  ]);
  const [userMemories, setUserMemories] = useState<{ text: string; timestamp: string }[]>([
    { text: "우리는 여전히 서툰 손가락으로 사랑을 씁니다.", timestamp: "03:42:15 AM" }
  ]);
  const [popupManager, setPopupManager] = useState<{ id: string; text: string; x: number; y: number }[]>([]);

  // Sound triggering on interaction
  const triggerBeep = (freq: number, type: OscillatorType = 'sine', duration = 0.1) => {
    playSound(freq, type, duration, 0.08);
  };

  const handlePrintReceipt = (text: string) => {
    if (isPrinting) return;
    
    setIsPrinting(true);
    setPrintProgress(0);
    triggerBeep(1000, 'sawtooth', 0.1);
    
    // Play sequential mechanical print raw synth sounds
    const soundTimes = [100, 200, 350, 500, 650, 800, 950, 1100, 1250, 1400, 1550];
    soundTimes.forEach((t, i) => {
      setTimeout(() => {
        playSound(i % 2 === 0 ? 1200 : 1650, 'sawtooth', 0.07, 0.015);
        setPrintProgress(Math.floor(((i + 1) / soundTimes.length) * 100));
      }, t);
    });

    const newReceipt = {
      id: `V-0x${Math.floor(100000 + Math.random() * 900000).toString(16).toUpperCase()}`,
      text,
      date: new Date().toLocaleDateString('ko-KR') + ' ' + new Date().toLocaleTimeString('ko-KR'),
      density: `${(96.0 + Math.random() * 2.8).toFixed(1)}%`
    };

    setTimeout(() => {
      setActiveReceipt(newReceipt);
      setIsPrinting(false);
      setPrintProgress(0);
      addTerminalLog(`PRINTER::Emitted thermal voucher receipt ${newReceipt.id}`);
      triggerBeep(880, 'sine', 0.1);
      setTimeout(() => triggerBeep(1320, 'sine', 0.15), 80);
    }, 1750);
  };

  const handleLike = (postId: string) => {
    setLikesCount(prev => ({
      ...prev,
      [postId]: prev[postId] + 1
    }));
    triggerBeep(880, 'sine', 0.12);
    // Create floating heart popup particles inside target layout
    const textOptions = ["♥", "CARE", "LOVE_SIGNAL", "WARMTH+1", "HUMAN"];
    const textVal = textOptions[Math.floor(Math.random() * textOptions.length)];
    const id = Math.random().toString();
    setPopupManager(prev => [...prev, {
      id,
      text: textVal,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 30
    }]);

    setTimeout(() => {
      setPopupManager(prev => prev.filter(p => p.id !== id));
    }, 1500);
  };

  const addTerminalLog = (log: string) => {
    const time = new Date().toLocaleTimeString();
    setTerminalLogs(prev => [...prev.slice(-8), `[${time}] ${log}`]);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    
    const newMem = {
      text: commentInput,
      timestamp: new Date().toLocaleTimeString()
    };
    setUserMemories(prev => [newMem, ...prev]);
    setCommentInput('');
    addTerminalLog(`USER_MEMORY::Injected raw coordinate: "${newMem.text.substring(0, 15)}..."`);
    triggerBeep(523.25, 'triangle', 0.2);
    setTimeout(() => triggerBeep(659.25, 'sine', 0.15), 100);
    setTimeout(() => triggerBeep(783.99, 'sine', 0.3), 200);
  };

  // Slides structure for Post 1 (The Teapot Scanner)
  const teapotSlides = [
    {
      type: 'teapot-display' as const,
      title: 'TEAPOT_CRT_MONITOR',
      content: {}
    },
    {
      type: 'ascii-schematic' as const,
      title: 'TEAPOT_ASCII_SCHEMATIC',
      content: {
        ascii: `      (  )   (  )
       ||     ||
    .-"""""""""""-.
   /               \\
  |  [+] MONITOR    | ======> OUT
   \\  -418 TEAPOT- /
    '-___________-'
        | || |
     _.-'      '-._  
    [______________]`
      }
    },
    {
      type: 'terminal-log' as const,
      title: 'SYS::TRACEBACK_DUMP',
      content: [
        "FATAL: HTTP 418 I'm a teapot",
        "TRACELOG::[SUCCESS] Extraction completed",
        "EXTRACTED_VARS::",
        "> user_gaze = focus_duration: 1.2s",
        "> machine_efficiency = 0.0%",
        "> human_touch_factor = 98.6%",
        "> core_status = 'loving_and_imperfect'"
      ]
    }
  ];

  // Slides structure for Post 2 (Retro Desktop Schedulers)
  const desktopSlides = [
    {
      type: 'windows95-desktop' as const,
      title: 'WIN95_SCHED_DESKTOP',
      content: {}
    },
    {
      type: 'error-cascade' as const,
      title: '418_SYS_CASCADING_ERRORS',
      content: {}
    },
    {
      type: 'audio-player' as const,
      title: 'NEO_LYRIC_AUDIO_SYS',
      content: {}
    }
  ];

  return (
    <div className="relative w-full min-h-screen py-10 px-4 md:px-6 max-w-7xl mx-auto z-10 selection:bg-[#10B981] selection:text-white overflow-x-hidden">
      {/* SCANLINE / CRT FILTER OVERLAY */}
      <div className="pointer-events-none absolute inset-0 z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-40" />

      {/* BACKGROUND FLOATING MATRIX CHIPS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04] z-0 select-none font-mono text-[9px] text-electric">
        <div className="absolute top-20 left-10 animate-pulse">01001111 01010101 01010100</div>
        <div className="absolute top-80 right-20">[SYSTEM_REFLUX_ACTIVE]</div>
        <div className="absolute bottom-40 left-1/3">ERROR 418: IM_A_TEAPOT</div>
        <div className="absolute top-1/2 right-1/4 animate-bounce">HUMAN_COORDINATE_CONNECTED</div>
      </div>

      {/* HEADER PIPELINE MONITOR BAR */}
      <div className="w-full bg-[#101b7a]/40 border-2 border-[#10B981] p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 box-solid-shadow select-none">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 bg-rose-500 rounded-none animate-ping" />
          <div className="font-mono text-xs text-soft-white tracking-widest text-[#4261FF]">
            STATUS:: <span className="text-emerald-400 font-bold">EMOTIONAL_ARCHIVE_SYS_ONLINE</span> (v2.0)
          </div>
        </div>
        <div className="flex gap-4 font-mono text-[10px] text-faded-gray/60">
          <span>COREDump_SIZE: 98.6KB</span>
          <span>STABLE_REFLUX = 12%</span>
          <span>HUMAN_DETECTION = TRUE</span>
        </div>
      </div>

      {/* EXHIBITION MAIN META BRAND PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        <div className="lg:col-span-8 border-2 border-[#10B981] bg-[#0c1236]/90 p-6 md:p-8 relative overflow-hidden box-solid-shadow">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />
          
          <span className="font-mono text-[10px] bg-[#10B981] text-white px-2.5 py-1 uppercase tracking-widest font-bold inline-block mb-3 select-none">
            EXHIBITION LOG BOARD
          </span>
          
          <h1 className="font-sans font-black text-3xl md:text-6xl text-soft-white tracking-tighter leading-none mb-4 uppercase flex flex-col md:flex-row md:items-baseline">
            <span>③ FEED</span>
            <span className="text-lg md:text-3xl text-faded-gray/70 font-medium tracking-normal md:ml-4 mt-1 md:mt-0">_Instagram</span>
          </h1>
          
          <p className="font-sans text-sm md:text-md text-faded-gray leading-relaxed max-w-2xl text-justify mb-6 font-semibold">
            이 피드는 단순한 전시 정보 채널이 아닙니다. 이 공간은 시스템의 완벽함에 균열을 내는 인간의 서투른 흔적, 
            디지털 공간에 끈적하게 달라붙은 따뜻한 외로움과 사유를 박제해 둔 <strong>&apos;감정적 파편 저장소&apos;</strong>입니다. 
            완성된 아카이브부터, 가열을 임계점까지 유보 중인 조각들을 자유롭게 탐색해 보세요.
          </p>

          <div className="flex flex-wrap gap-3 font-mono text-[10px]">
            <a 
              href="https://www.instagram.com/iam.ateapot/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerBeep(440, 'sine', 0.12)}
              className="px-3.5 py-2 border-2 border-[#10B981] text-white hover:bg-[#10B981] transition-all duration-300 flex items-center gap-2 font-bold box-solid-shadow"
            >
              <Globe className="w-3.5 h-3.5" /> INSTAGRAM::@iam.ateapot ↗
            </a>
            <div className="px-3.5 py-2 border-2 border-[#10B981]/40 bg-[#090e29]/70 text-[#4261FF] font-semibold flex items-center gap-2 select-none">
              <span>ACTIVE_RELEASES = 02</span>
              <span>•</span>
              <span>REACTIONS = {likesCount['post-teapot'] + likesCount['post-retro-desktop']}</span>
            </div>
          </div>
        </div>

        {/* COMPACT INTERACTIVE MONITOR MODULE */}
        <div className="lg:col-span-4 border-2 border-[#10B981] bg-[#020516] p-5 flex flex-col justify-between box-solid-shadow relative">
          <div className="absolute top-2 right-3 font-mono text-[8px] text-[#10B981]/60 select-none">
             DEBUG_MONITOR_SYS
          </div>
          <div className="mb-4">
            <span className="font-mono text-[9px] text-[#10B981] block mb-2 font-bold">// REAL_TIME_STREAMING_LOGS</span>
            <div className="font-mono text-[10px] text-emerald-400 bg-black/60 p-3 h-32 overflow-y-auto border border-[#10B981]/20 space-y-1.5 custom-scrollbar">
              {terminalLogs.map((log, i) => (
                <div key={i} className="leading-normal flex tracking-tight">
                  <span className="text-[#10B981] mr-1.5 select-none">&gt;</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-[#10B981]/20 pt-3 flex items-center justify-between text-[10px] font-mono">
            <span className="text-faded-gray/50">SYSTEM TEMPERATURE:</span>
            <span className="text-amber-400 font-bold animate-pulse">98.6°C (HUMAN_LIMIT)</span>
          </div>
        </div>
      </div>

      {/* IRREGULAR POETIC INTEGRATED GRID FEED AREA */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        
        {/* ========================================== */}
        {/* 1. REAL POST: TEAPOT SCANNER (Post 1)       */}
        {/* ========================================== */}
        <div className="lg:col-span-2 border-2 border-[#10B981] bg-[#04071f] relative box-solid-shadow group transition-all duration-300">
          
          {/* Header metadata tag */}
          <div className="p-3 bg-[#101b7a]/40 border-b border-[#10B981]/30 flex justify-between items-center select-none font-mono text-[10px]">
            <span className="text-[#10B981] font-bold uppercase tracking-widest">// POST::001 // TEAPOT_SCANNER</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[9px] font-bold">ARCHIVED_SUCCESSFULLY</span>
            </div>
          </div>

          {/* MAIN POST BODY - STATIC SCANNER DISPLAY */}
          <div className="relative aspect-video md:aspect-[21/10] bg-black border-b border-[#10B981]/30 overflow-hidden flex items-center justify-center select-none p-3">
            <div className="absolute inset-0 bg-black pointer-events-none" />

            {/* Left "418" Text on Screen - clean sans styling */}
            <div className="absolute left-[8%] md:left-[12%] text-[#bef23e] font-sans text-5xl md:text-8xl font-black tracking-tighter select-none pointer-events-none drop-shadow-[0_0_8px_rgba(190,242,62,0.15)]">
              418
            </div>

            {/* Right "I'M A TEAPOT" Text on Screen - clean sans styling */}
            <div className="absolute right-[8%] md:right-[12%] text-[#bef23e] font-sans text-3xl md:text-6xl font-black tracking-tighter text-left select-none pointer-events-none leading-[1.05] drop-shadow-[0_0_8px_rgba(190,242,62,0.15)]">
              I&apos;M A<br />TEAPOT
            </div>

            {/* White focus brackets surrounding the central teapot */}
            <div className="relative p-6 md:p-10 flex flex-col items-center justify-center">
              {/* The 4 retro focus brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-[3.5px] border-l-[3.5px] border-white rounded-tl-[12px]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-[3.5px] border-r-[3.5px] border-white rounded-tr-[12px]" />
              <div className="absolute bottom-8 left-0 w-8 h-8 border-b-[3.5px] border-l-[3.5px] border-white rounded-bl-[12px]" />
              <div className="absolute bottom-8 right-0 w-8 h-8 border-b-[3.5px] border-r-[3.5px] border-white rounded-br-[12px]" />

              {/* Real 3D-feeling teapot photo requested by user */}
              <div className="relative w-44 h-32 md:w-64 md:h-48 flex items-center justify-center mb-1">
                <img 
                  src={teapotImg} 
                  alt="3D Teapot Monitor" 
                  className="w-full h-full object-contain filter drop-shadow-[0_6px_20px_rgba(163,231,190,0.15)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Scanning status label */}
              <div className="text-white font-sans text-[11px] md:text-[13px] font-medium tracking-[0.2em] text-center select-none uppercase z-10 ml-[0.2em] animate-pulse">
                Scanning
              </div>
            </div>
          </div>

          {/* REAL TIME SOCIAL CAPTION MODULE */}
          <div className="p-5 md:p-6 select-text">
            <h4 className="font-sans font-bold text-lg text-white mb-2 tracking-tight uppercase">
              🫖 𝗘𝗥𝗥𝗢𝗥 𝟰𝟭𝟴 𝗜&apos;𝗠 𝗔 𝗧𝗘𝗔𝗣𝗢𝗧 (Official Poster)
            </h4>
            <p className="font-sans text-xs text-faded-gray leading-relaxed text-justify mb-4">
              공식 아카이빙 비주얼 및 기획 포스터의 메인 콘셉트를 연동합니다. 
              커피를 내리라는 시스템의 압박에 가로막혔을 때, 기계는 스스로 찻주전자임을 수락함으로써 인간을 위로합니다. 
              수정되지 않은 날것의 감정을 담아 CLC에서 피어납니다.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#10B981]/10 select-none">
              <div className="flex gap-4 font-mono text-[10px] text-faded-gray/50">
                <span>DATE: 2026.05.22</span>
                <span>CATEGORY: EXHIBITION_MAIN</span>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleLike('post-teapot')}
                  className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-mono text-xs cursor-pointer select-none border border-rose-500/20 bg-rose-500/5 px-2.5 py-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 stroke-rose-500" />
                  <span>{likesCount['post-teapot']}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================== */}
        {/* 2. EMOTIONAL TEXT LOG (Vertical block)      */}
        {/* ========================================== */}
        <div className="border-2 border-[#10B981] bg-[#1a1c3e]/30 p-5 md:p-6 font-mono text-xs relative overflow-hidden box-solid-shadow select-text">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex justify-between items-center border-b border-[#10B981]/20 pb-2.5 mb-4 font-bold select-none text-[9.5px]">
            <span className="text-purple-400">[EMOTIONAL_TRACEBACK_011]</span>
            <span className="text-[#10B981]">SYSTEM_CLOCK_UTC</span>
          </div>

          <div className="text-justify leading-relaxed text-soft-white space-y-3 font-semibold font-sans mb-6">
            <p>
              &ldquo;시스템은 오류(Error)를 실패라고 정의합니다. 
              일정 내로 제출하지 못한 서류, 요구받은 정답을 내지 못한 결과, 
              온도를 지키지 못해 식어버린 커피.&rdquo;
            </p>
            <p className="text-emerald-300">
              &ldquo;하지만 우리는 이곳에서 에러 상태를 수락하기로 했습니다. 
              시간이 더 오래 걸리고, 조금 삐걱거리더라도, 
              그 안에 묻은 사람의 지문과 서툰 체온을 끄집어내는 것이 
              예술의 유일한 의무이기 때문입니다.&rdquo;
            </p>
          </div>

          <div className="font-mono text-[8px] text-faded-gray/40 text-right select-none uppercase">
            Captured on thermal logger at 05:14 AM
          </div>
        </div>

        {/* ========================================== */}
        {/* 3. REAL POST: WINDOWS 95 RETRO SCHEDULER   */}
        {/* ========================================== */}
        <div className="lg:col-span-2 border-2 border-[#10B981] bg-[#04071f] relative box-solid-shadow group transition-all duration-300">
          
          {/* Header metadata tag */}
          <div className="p-3 bg-[#101b7a]/40 border-b border-[#10B981]/30 flex justify-between items-center select-none font-mono text-[10px]">
            <span className="text-[#10B981] font-bold uppercase tracking-widest">// POST::002 // RETRO_WIN95_SCHEDULE</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[9px] font-bold">SYSTEM_STRESSED_ONLINE</span>
            </div>
          </div>

          {/* MAIN POST BODY CAROUSEL SLIDES */}
          <div className="relative aspect-video md:aspect-[21/10] bg-[#008080] border-b border-[#10B981]/30 overflow-hidden flex items-center justify-center select-none">
            
            {/* Visual scanline/CRT effect strictly for this vintage slide */}
            <div className="absolute inset-0 z-20 pointer-events-none bg-radial-gradient from-transparent to-black/30 pointer-events-none" />

            {/* Slide Navigation Trigger */}
            <div className="absolute bottom-3 right-3 z-30 flex gap-2 select-none">
              <button 
                onClick={() => {
                  triggerBeep(330, 'triangle', 0.08);
                  setActiveSlide(prev => ({
                    ...prev,
                    'post-retro-desktop': (prev['post-retro-desktop'] - 1 + desktopSlides.length) % desktopSlides.length
                  }));
                }}
                className="w-7 h-7 bg-[#020516]/80 hover:bg-[#10B981] text-white border border-[#10B981]/40 rounded-none flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  triggerBeep(330, 'triangle', 0.08);
                  setActiveSlide(prev => ({
                    ...prev,
                    'post-retro-desktop': (prev['post-retro-desktop'] + 1) % desktopSlides.length
                  }));
                }}
                className="w-7 h-7 bg-[#020516]/80 hover:bg-[#10B981] text-white border border-[#10B981]/40 rounded-none flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slide Content Rendering */}
            <AnimatePresence mode="wait">
              {activeSlide['post-retro-desktop'] === 0 && (
                <motion.div 
                  key="win95-slide-main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full relative p-2 overflow-y-auto overflow-x-hidden scrollbar-hidden flex justify-center items-center"
                >
                  {/* Visual reconstruction of user prompt's screenshot 2 */}
                  <div className="absolute inset-0 bg-[#008080] z-0" />
                  
                  {/* Left Desktop Icons (Pure Aesthetic Windows 98 Vibe) */}
                  <div className="absolute left-2 top-2 z-10 flex flex-col gap-3 font-mono text-[8px] text-white text-center w-12 select-none">
                    <div className="flex flex-col items-center gap-0.5 cursor-pointer">
                      <Folder className="w-5 h-5 text-yellow-300" />
                      <span className="truncate leading-none">MyComp_</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 cursor-pointer">
                      <Folder className="w-5 h-5 text-yellow-300" />
                      <span className="truncate leading-none">Files_</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 cursor-pointer">
                      <TermIcon className="w-5 h-5 text-emerald-400" />
                      <span className="truncate leading-none">Dumping_</span>
                    </div>
                  </div>

                  {/* Windows 95 Container Layout - Desktop Simulation */}
                  <div className="relative w-full h-full flex flex-wrap gap-2 items-center justify-center scale-95 md:scale-100 z-10">
                    
                    {/* popup 1: Welcome: 2026-1 전시 일정 */}
                    <div className="bg-[#c0c0c0] border-2 border-r-[#808080] border-b-[#808080] border-t-white border-l-white p-1.5 w-44 shadow-lg text-black font-sans leading-tight" data-welcome-popup="true">
                      <div className="bg-[#000080] text-white px-2 py-0.5 text-[9px] font-mono flex justify-between items-center font-bold">
                        <span>Welcome.txt</span>
                        <span className="text-[8px] px-1 bg-[#c0c0c0] text-black">X</span>
                      </div>
                      <div className="p-1 text-[8.5px] space-y-1 bg-white border border-[#808080] mt-1 text-left select-all">
                        <div className="font-bold text-[#FF3366]">2026-1 전시 일정</div>
                        <div className="border-t border-[#c0c0c0] my-1" />
                        <div>신청 마감 <span className="text-blue-700">2026.05.15(Fri.)</span></div>
                        <div>Password: <span className="font-mono text-faded-gray">**********</span></div>
                      </div>
                      <div className="flex justify-end gap-1 mt-1.5 select-none">
                        <button className="px-2 py-0.5 border border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] text-[8px] active:border-l-[#808080] active:border-t-[#808080]" onClick={() => triggerBeep(400, 'sine', 0.05)}>OK</button>
                        <button className="px-2 py-0.5 border border-t-white border-l-white border-r-[#808080] border-b-[#808080] bg-[#c0c0c0] text-[8px]" onClick={() => triggerBeep(400, 'sine', 0.05)}>Cancel</button>
                      </div>
                    </div>

                    {/* popup 2: Cmd Line Admin: 작품 제출 */}
                    <div className="bg-[#c0c0c0] border-2 border-r-[#808080] border-b-[#808080] border-t-white border-l-white p-1.5 w-48 shadow-lg text-black font-mono leading-tight">
                      <div className="bg-[#000080] text-white px-2 py-0.5 text-[9px] flex justify-between items-center font-bold">
                        <span>Administrator::CMD</span>
                        <span className="text-[8px] px-1 bg-[#c0c0c0] text-black">X</span>
                      </div>
                      <div className="p-1.5 text-[9px] bg-black text-[#51f542] h-16 text-left border border-[#808080] mt-1 overflow-hidden select-text">
                        <div>C:\&gt; RUN EXHI_LOAD</div>
                        <div className="text-yellow-400 font-bold">작품 제출완료</div>
                        <div className="text-cyan-400">2026.05.18. -</div>
                        <div className="animate-pulse">_</div>
                      </div>
                    </div>

                    {/* popup 3: Saving Progress Modal (55%) */}
                    <div className="bg-[#c0c0c0] border-2 border-r-[#808080] border-b-[#808080] border-t-white border-l-white p-1 w-32 shadow-lg text-black font-sans select-none">
                      <div className="bg-[#000080] text-white px-2 py-0.5 text-[8.5px] font-bold">Saving (55%)</div>
                      <div className="p-1.5 text-center">
                        <span className="text-[8.5px] block mb-1">Boiling emotions...</span>
                        <div className="w-full bg-white border border-[#808080] h-3.5 flex overflow-hidden">
                          <div className="bg-[#000080]" style={{ width: '55%' }} />
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeSlide['post-retro-desktop'] === 1 && (
                <motion.div 
                  key="win95-slide-cascade"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full relative"
                >
                  <div className="absolute inset-0 bg-[#008080]" />
                  <div className="relative w-full h-full overflow-hidden p-4 flex flex-col items-center justify-center">
                    
                    {/* Stack of overlapping retro alert boxes */}
                    <div className="absolute z-10 scale-90 top-[10%] left-[10%] bg-[#c0c0c0] border-2 border-r-[#808080] border-b-[#808080] border-t-white border-l-white p-1.5 shadow-xl text-black w-52 font-mono">
                      <div className="bg-[#000080] text-white px-1.5 py-0.5 text-[9px] font-bold flex justify-between items-center select-none">
                        <span>ERROR: RFC 2324</span>
                        <span className="text-[8px] px-1 bg-[#c0c0c0] text-black">X</span>
                      </div>
                      <div className="p-1 text-[9px] mt-1 text-left">
                        <span className="text-red-600 font-bold block mb-1">● CORE FAILURE 418</span>
                        I&apos;m a teapot. I lack coffee functionality. Please rehydrate.
                      </div>
                    </div>

                    <div className="absolute z-20 scale-95 top-[25%] left-[20%] bg-[#c0c0c0] border-2 border-r-[#808080] border-b-[#808080] border-t-white border-l-white p-1.5 shadow-xl text-black w-52 font-mono">
                      <div className="bg-[#FF3366] text-white px-1.5 py-0.5 text-[9px] font-bold flex justify-between items-center select-none">
                        <span>HUMAN INTERRUPT Detected</span>
                        <span className="text-[8px] px-1 bg-[#c0c0c0] text-black">X</span>
                      </div>
                      <div className="p-1 text-[9px] mt-1 text-left">
                        <span className="text-red-600 font-bold block mb-1">♥ WARMTH DETECTED</span>
                        Reason: Too many nights spent designing. Overloading!
                      </div>
                    </div>

                    <div className="absolute z-30 scale-100 top-[40%] left-[30%] bg-[#c0c0c0] border-2 border-r-[#808080] border-b-[#808080] border-t-white border-l-white p-1.5 shadow-2xl text-black w-56 font-mono">
                      <div className="bg-[#000080] text-white px-1.5 py-0.5 text-[9px] font-bold flex justify-between items-center select-none">
                        <span>SYSTEM SHUTDOWN Aborted</span>
                        <span className="text-[8px] px-1 bg-[#c0c0c0] text-black">X</span>
                      </div>
                      <div className="p-1 text-[9px] mt-1 text-left">
                        The teapot was tired today but refused to deactivate.
                        <button 
                          onClick={() => triggerBeep(600, 'square', 0.2)}
                          className="mt-2 w-full text-center bg-[#c0c0c0] border border-t-white border-l-white border-r-black border-b-black py-0.5 font-bold cursor-pointer"
                        >
                          CORES_ONLINE
                        </button>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeSlide['post-retro-desktop'] === 2 && (
                <motion.div 
                  key="win95-slide-web"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full relative p-4 flex flex-col justify-between"
                >
                  <div className="absolute inset-0 bg-[#008080]" />
                  
                  {/* Web deadline window detail */}
                  <div className="relative z-10 w-full bg-[#c0c0c0] border-2 border-r-[#808080] border-b-[#808080] border-t-white border-l-white p-2 text-black text-left flex flex-col justify-between h">
                    <div className="bg-[#000080] text-white px-2 py-0.5 text-[9px] font-mono flex justify-between items-center font-bold">
                      <span>WEB BROWSER // INTERNET_EXPLORER</span>
                      <span className="text-[8px] px-1 bg-[#c0c0c0] text-black">X</span>
                    </div>
                    {/* Content */}
                    <div className="p-2 border border-[#808080] bg-white text-black mt-1 text-center font-sans tracking-tight min-h-[50px] flex flex-col justify-center select-all">
                      <div className="text-sm font-black text-rose-600 font-bold">오프라인 제출 마감</div>
                      <div className="text-xs font-mono font-bold text-slate-700">5/25 *~* (CLC 전시준비처)</div>
                    </div>
                  </div>

                  {/* Audio player window detail */}
                  <div className="relative z-10 w-full bg-[#c0c0c0] border-2 border-r-[#808080] border-b-[#808080] border-t-white border-l-white p-2 text-black text-left mt-2">
                    <div className="bg-rose-900/90 text-white px-1.5 py-0.5 text-[8.5px] font-mono flex justify-between items-center font-bold">
                      <span>AUDIO CONFIG // PLAYER</span>
                      <span className="text-[8px] px-1 bg-[#c0c0c0] text-black">X</span>
                    </div>
                    
                    {/* Status lyric marquee */}
                    <div className="bg-black text-orange-400 p-1 font-sans text-xs font-bold my-1 text-center truncate overflow-hidden border border-[#808080]">
                      🔊 (5/27) 온라인 제출 마감 ★진짜최종★
                    </div>

                    <div className="flex justify-between items-center text-[9px] mt-1 select-none">
                      <div className="flex gap-1">
                        <button className="p-0.5 border border-r-[#808080] border-b-[#808080] border-t-white border-l-white bg-[#c0c0c0] active:border-l-black hover:bg-[#a0a0a0] cursor-pointer" onClick={() => triggerBeep(440, 'triangle', 0.2)}><Play className="w-2.5 h-2.5 inline" /></button>
                        <button className="p-0.5 border border-r-[#808080] border-b-[#808080] border-t-white border-l-white bg-[#c0c0c0] active:border-l-black hover:bg-[#a0a0a0] cursor-pointer" onClick={() => triggerBeep(100, 'sine', 0.05)}><Square className="w-2.5 h-2.5 inline" /></button>
                        <button className="p-0.5 border border-r-[#808080] border-b-[#808080] border-t-white border-l-white bg-[#c0c0c0] active:border-l-black hover:bg-[#a0a0a0] cursor-pointer" onClick={() => triggerBeep(554, 'triangle', 0.1)}><SkipForward className="w-2.5 h-2.5 inline" /></button>
                      </div>
                      <span className="font-mono text-[8px] text-zinc-600">00:00 / 04:18_</span>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* Indicator dots */}
            <div className="absolute bottom-4 left-4 z-30 flex gap-1.5 select-none md:left-6">
              {desktopSlides.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-2 h-2 rounded-none transition-colors duration-300 ${
                    activeSlide['post-retro-desktop'] === i ? 'bg-orange-400' : 'bg-faded-gray/20'
                  }`}
                />
              ))}
            </div>

            {/* Slide name ribbon */}
            <div className="absolute top-3 left-3 bg-[#020516]/90 border border-amber-800/60 px-2.5 py-0.5 font-mono text-[9px] text-amber-200 font-bold uppercase select-none">
              SLIDE_ {activeSlide['post-retro-desktop'] + 1} // {desktopSlides[activeSlide['post-retro-desktop']].title}
            </div>
          </div>

          {/* REAL TIME SOCIAL CAPTION MODULE */}
          <div className="p-5 md:p-6 select-text">
            <h4 className="font-sans font-bold text-lg text-white mb-2 tracking-tight uppercase">
              📂 Retro Scheduler Desktop (마감 및 제출안내)
            </h4>
            <p className="font-sans text-xs text-faded-gray leading-relaxed text-justify mb-4">
              90년대 retro 운영체제 데스크톱 형식을 빌린 제출 타임라인 정보 카드 인포그래픽 리포트입니다. 
              작품 수락 CMD, 온라인/오프라인 제출 마감 마일스톤에 겹겹이 쌓이는 418 에라 창들이 기말을 맞이하는 
              기획단 동아리 인문예술전공생들의 뜨거운 현진 스토리를 그대로 반영합니다.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-[#10B981]/10 select-none">
              <div className="flex gap-4 font-mono text-[10px] text-faded-gray/50">
                <span>DATE: 2026.05.18</span>
                <span>CATEGORY: TIMELINE_INFO</span>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => handleLike('post-retro-desktop')}
                  className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-mono text-xs cursor-pointer select-none border border-rose-500/20 bg-rose-500/5 px-2.5 py-1"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-500 stroke-rose-500" />
                  <span>{likesCount['post-retro-desktop']}</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================== */}
        {/* 4. COMING SOON: 기획진 인터뷰                 */}
        {/* ========================================== */}
        <ComingSoonCard 
          title="기획진 인터뷰"
          subtitle="커넥트 다이얼로그 (Connect Dialogues) : 우리가 지새운 밤의 열정"
          statusText="SIGNAL UNSTABLE"
          estimatedRelease="D-3 RELEASE"
          leakText="기획팀장: '내일까지 안 끝나면 주전자에 들어가서 직접 끓겠습니다.' 진짜 끓고 있는 건 기획진의 정수리였습니다."
          onBeep={triggerBeep}
        />

        {/* ========================================== */}
        {/* 5. BROKEN ELEMENT: BLUE SCREEN (BSOD) CARD  */}
        {/* ========================================== */}
        <div className="border-2 border-red-500 bg-[#0000aa] text-white p-5 md:p-6 font-mono text-xs box-solid-shadow select-all">
          <div className="bg-white text-[#0000aa] px-2 py-0.5 text-[9px] font-bold select-none uppercase tracking-widest text-center font-bold mb-4">
            *** SYSTEM CRASH REPORT ***
          </div>
          
          <h4 className="font-bold text-[#FF3366] mb-3 text-sm select-none">A PROBLEM HAS BEEN DETECTED AND CORES HAVE OVERHEATED.</h4>
          
          <p className="text-justify leading-relaxed mb-4 text-[#80ff80]/90 font-bold select-text">
            RFC 2324: There are insufficient automatic algorithms to compile &apos;emotions&apos; inside our production bundle.
          </p>
 
          <p className="text-[10px] text-faded-gray/70 leading-normal mb-5 select-text">
            * Check your mental boundaries.<br />
            * Contact connect curators for support.<br />
            * Error Location: 0x418_EMOTION_STACK_OVERFLOW
          </p>
 
          <button 
            onClick={() => {
              triggerBeep(300, 'square', 0.25);
              addTerminalLog("BSOD::Manual discharge triggered. core status reset.");
            }}
            className="w-full bg-[#c0c0c0] hover:bg-white text-black font-sans font-bold py-2.5 border-t-white border-l-white border-2 border-r-[#404040] border-b-[#404040] text-xs cursor-pointer select-none text-center"
          >
            DISCHARGE MEMORY OVERLOAD (RELOAD)
          </button>
        </div>
 
        {/* ========================================== */}
        {/* 6. COMING SOON: 참여 과목 소개 및 교수님 인터뷰 */}
        {/* ========================================== */}
        <ComingSoonCard 
          title="참여 과목 소개 및 교수님 인터뷰"
          subtitle="기술과 인간의 만남 : 학문적 고뇌와 예술의 의미를 품다"
          statusText="PROCESSING_MEMORY"
          estimatedRelease="D-2 RELEASE"
          leakText="교수님: '저는 우리 학생들을 모두 진심으로 사랑합니다^^... 과제 마감기한만 정직하게 지켜준다면 그 사랑이 더 깊어질 뿐입니다.'"
          onBeep={triggerBeep}
        />
 
        {/* ========================================== */}
        {/* 7. COMING SOON: 포스터 공모전 대상 인터뷰     */}
        {/* ========================================== */}
        <ComingSoonCard 
          title="포스터 공모전 대상 인터뷰"
          subtitle="우승자 스포트라이트 (Winner Spotlight) : 단 하나의 시각적 에러"
          statusText="UPLOADING_IMPERFECTION"
          estimatedRelease="D-1 RELEASE"
          leakText="대망의 대상 인터뷰! 과연 대상의 주인공은 누가 될까요? (스포일러를 방지하려 했으나 주전자가 너무 빨리 뜨거워졌습니다!)"
          onBeep={triggerBeep}
        />
 
        {/* ========================================== */}
        {/* 8. COMING SOON: 전시 출품작 인터뷰            */}
        {/* ========================================== */}
        <ComingSoonCard 
          title="전시 출품작 인터뷰"
          subtitle="창작자의 자아 (Artist Voices) : 픽셀 너머에 심은 고유한 숨소리"
          statusText="SIGNAL_CORRUPTED"
          estimatedRelease="EXHIBITION_DAY"
          leakText="작가: '작품명: [종강은 오는가]. 기획하다가 침대랑 한몸이 되어버린 저의 처절한 데이터 시그널을 형상화했습니다.'"
          onBeep={triggerBeep}
        />
 
        {/* ========================================== */}
        {/* 9. COMING SOON: 전시 관람 안내             */}
        {/* ========================================== */}
        <ComingSoonCard 
          title="전시 관람 안내"
          subtitle=""
          statusText="MAPPING_COORDINATES"
          estimatedRelease="LOCATION_ACTIVE"
          leakText="CLC 건물 구석에서 다급하게 찻잔을 문지르며 한숨을 연속 418번 쉬고 있는 사람들을 발견하셨다면 완벽하게 오신 겁니다."
          onBeep={triggerBeep}
        />
 
        {/* ========================================== */}
        {/* 10. COMING SOON: 전시 관람 플레이리스트      */}
        {/* ========================================== */}
        <ComingSoonCard 
          title="전시 관람 플레이리스트"
          subtitle="공감각적 이머시브 (Immersive Audio) : 서툰 자아를 감싸는 선율"
          statusText="AUDIO_ENCRYPTED"
          estimatedRelease="STREAMING_DELAYED"
          leakText="트랙 1: 밤샘 기획단 집단 비명소리 (Remix ver.), 트랙 2: 키보드 폭풍 갈겨대는 기계식 타건 소리 (ASMR 10시간 연속)"
          onBeep={triggerBeep}
        />
 
        {/* ========================================== */}
        {/* 11. COMING SOON: D-3/D-2/D-1 카운트다운   */}
        {/* ========================================== */}
        <ComingSoonCard 
          title="D-3 / D-2 / D-1 카운트다운"
          subtitle="시간의 축적 (Time Capsule Logs) : 하루마다 달아오르는 보일러"
          statusText="CLOCK_LOCK_ENGAGED"
          estimatedRelease="T-MINUS COUNT"
          leakText="전시 오픈이 다가올 수록 에라 모르겠다 과열 모드가 418%까지 달성되어 기획진들이 은밀하게 퇴사를 갈구하고 있습니다."
          onBeep={triggerBeep}
        />
 
        {/* ========================================== */}
        {/* 12. COMING SOON: 현장 스케치 및 전시 비하인드 */}
        {/* ========================================== */}
        <ComingSoonCard 
          title="현장 스케치 및 전시 비하인드"
          subtitle="기록단 스냅샷 (Live Snapshots) : 지저분하지만 눈부신 설치 일지"
          statusText="CLIPPING_TRACES"
          estimatedRelease="LIVE_BUFFERING"
          leakText="작품 뒤에 쓸쓸하게 뒹구는 418개의 빈 커피 캔과 눅눅해진 야식 단팥빵 비닐봉지가 전시장의 진짜 비하인드 스토리입니다."
          onBeep={triggerBeep}
        />

        {/* ========================================== */}
        {/* 10. ENDING DETAIL: YOUR MEMORY COLD BE HERE */}
        {/* ========================================== */}
        <div className="border-2 border-dashed border-[#10B981]/80 hover:border-[#10B981] bg-[#05081E]/95 p-5 md:p-6 text-center box-solid-shadow relative flex flex-col justify-between min-h-[350px]">
          <div className="absolute top-2 left-2 text-[8px] font-mono text-[#10B981]/50 uppercase select-none">
            // SLOT_0X418_EMPTY_REDUNDANCY
          </div>
          
          <div className="flex flex-col items-center justify-center my-auto py-4">
            <div className="w-10 h-10 border border-[#10B981]/30 bg-[#10B981]/10 text-[#4261FF] rounded-none flex items-center justify-center mb-4 select-none animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>

            <h4 className="font-mono text-soft-white font-black text-sm tracking-widest uppercase mb-2">
              your memory could be<br />uploaded here too
            </h4>
            
            <p className="font-sans text-xs text-faded-gray/70 leading-relaxed max-w-xs mx-auto mb-6">
              기계들 속에 당신의 파편을 남기지 않으시겠어요? 
              한 줄의 기억을 아래 타자기에 기록하면, 시스템의 코어 단에 즉시 업로드되어 보일링 로그에 등록됩니다.
            </p>

            <form onSubmit={handleAddMemory} className="w-full space-y-3">
              <input 
                type="text" 
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="지저분한 사적인 파편 적기 (Write memory...)"
                maxLength={45}
                className="w-full bg-black border border-[#10B981]/40 text-xs px-3 py-2 text-white font-sans focus:outline-none focus:border-[#10B981] rounded-none text-center"
              />
              <div className="grid grid-cols-2 gap-2">
                <button 
                  type="submit" 
                  className="py-2.5 bg-[#10B981] hover:bg-[#FF3366] text-white font-mono text-[9px] font-bold tracking-widest transition-all cursor-pointer box-solid-shadow uppercase flex justify-center items-center gap-1.5"
                >
                  <Send className="w-2.5 h-2.5" /> 기억 업로드
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (commentInput.trim()) {
                      handlePrintReceipt(commentInput);
                    } else {
                      handlePrintReceipt("서툰 우리의 아름다운 오늘, CON:NECT 전시에서.");
                    }
                  }}
                  className="py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-mono text-[9px] font-bold tracking-widest transition-all cursor-pointer box-solid-shadow uppercase flex justify-center items-center gap-1.5"
                >
                  <Printer className="w-2.5 h-2.5" /> 영수증 출력
                </button>
              </div>
            </form>
          </div>

          <div className="border-t border-[#10B981]/10 pt-3 flex flex-col gap-1 text-[9px] font-mono text-faded-gray/40 select-none">
            <span>READY_FOR_HUMAN::SLOTS_OPEN_SANS</span>
            <span>Awaiting manual override...</span>
          </div>
        </div>

      </div>

      {/* RECENTLY UPLOADED USER MEMORIES LOGS TRACKBOARD */}
      {userMemories.length > 0 && (
        <div className="mt-12 border-2 border-[#10B981] bg-[#020516]/80 p-5 md:p-6 box-solid-shadow text-left">
          <span className="font-mono text-[9px] text-emerald-400 font-bold block mb-3 uppercase tracking-wider">// LATEST USER MEMORIES SUBMISSIONS</span>
          <div className="divide-y divide-[#10B981]/10 max-h-48 overflow-y-auto custom-scrollbar pr-2 space-y-3">
            {userMemories.map((mem, idx) => (
              <div key={idx} className="pt-31 first:pt-0 font-sans text-xs leading-relaxed flex items-center justify-between gap-2 select-text">
                <div className="flex flex-col">
                  <span className="text-soft-white font-semibold">{mem.text}</span>
                  <span className="font-mono text-[8.5px] text-[#4261FF]/70 uppercase">[TIMEVAL: {mem.timestamp}]</span>
                </div>
                <button
                  onClick={() => handlePrintReceipt(mem.text)}
                  className="px-2.5 py-1 bg-[#101b7a]/40 border border-[#10B981]/50 text-[#4261FF] hover:bg-[#10B981] hover:text-white font-mono text-[8.5px] font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <Printer className="w-3 h-3" /> 영수증 즉시 인쇄
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FLOAT POPUPS RENDER CONTAINER */}

      {/* IMMERSIVE THERMAL VOUCHER PRINT OVERLAY */}
      <AnimatePresence>
        {(isPrinting || activeReceipt) && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-xs z-50 flex flex-col items-center justify-start pt-[8vh] overflow-y-auto select-none px-4 pb-12 font-mono">
            {/* The Physical printer header slot */}
            <div className="w-80 max-w-full bg-[#2a2a2d] border-2 border-[#121214] p-1.5 shadow-2xl z-10 box-solid-shadow relative">
              <div className="bg-[#0f0f11] h-6 rounded-sm border border-black flex items-center justify-between px-3 text-[8px] text-faded-gray/50">
                <span>CON:NECT EMOTIONAL_PRINTER v2.4r</span>
                <div className="flex gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${isPrinting ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
              </div>
              {/* Paper slit mouth */}
              <div className="bg-black h-2 w-11/12 mx-auto mt-1 border border-neutral-700 relative overflow-hidden" />
            </div>

            {/* Printing Progress state or Printed Receipt Ticket */}
            {isPrinting ? (
              <motion.div
                initial={{ height: 10, opacity: 0.9 }}
                animate={{ height: 120 }}
                className="w-72 bg-neutral-250 text-neutral-800 p-4 border-x border-dashed border-neutral-400 shadow-md overflow-hidden font-mono flex flex-col justify-center items-center"
              >
                <div className="text-zinc-650 text-[10px] uppercase font-bold animate-pulse mb-3 select-none">
                  📠 EMITTING PRINT SIGNAL / 영수증 출력 중...
                </div>
                {/* Sound raw wave indicator bars */}
                <div className="flex items-end justify-center gap-1 h-6 w-32 mb-3 select-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 24, 4] }}
                      transition={{ duration: 0.2 + i * 0.04, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1.5 bg-neutral-600"
                    />
                  ))}
                </div>
                <div className="w-full bg-neutral-300 border border-neutral-400 h-3 flex overflow-hidden">
                  <div className="bg-[#10B981] h-full" style={{ width: `${printProgress}%` }} />
                </div>
                <span className="text-[8px] text-zinc-500 mt-1 select-none font-bold uppercase">{printProgress}% COMPLETED / THERMAL PRINT SYNC</span>
              </motion.div>
            ) : (
              activeReceipt && (
                <motion.div
                  initial={{ y: -50, opacity: 0, height: 0 }}
                  animate={{ y: 0, opacity: 1, height: 'auto' }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 85, damping: 14 }}
                  className="w-72 bg-[#f9f9fb] text-[#121212] p-5 border-x-4 border-dashed border-neutral-300 relative shadow-2xl flex flex-col justify-between shrink-0 select-text font-mono"
                  style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.01) 50%, rgba(255,255,255,0.02) 50%)', backgroundSize: '100%_4px' }}
                >
                  <div className="absolute top-0 inset-x-0 h-1 border-t-4 border-dashed border-neutral-400" />
                  <div className="absolute inset-y-0 right-0 w-2.5 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />

                  {/* HEADER BRANDING */}
                  <div className="text-center font-sans">
                    <span className="text-[9px] border-2 border-black px-2 py-0.5 tracking-widest font-extrabold uppercase">
                      EXHIBITION VOUCHER
                    </span>
                    <h2 className="font-sans font-black text-xl tracking-tighter mt-3">// CON:NECT //</h2>
                    <p className="text-[7px] font-mono tracking-widest leading-none text-zinc-500 my-1 font-bold">
                      INHA UNIV / ART & HUMANITIES 418
                    </p>
                    <div className="border-b border-dashed border-neutral-400 my-3.5" />
                  </div>

                  {/* COGNITIVE DATA TABLE */}
                  <div className="space-y-1.5 text-[9px] leading-tight mb-4 select-text">
                    <div className="flex justify-between font-bold">
                      <span>DOCUMENT_ID:</span>
                      <span>{activeReceipt.id}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>DATETIME:</span>
                      <span className="text-right">{activeReceipt.date}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>GATE_PORT:</span>
                      <span>3000 (INBOUND_HTTPS)</span>
                    </div>
                    <div className="flex justify-between text-rose-600 font-bold border-y border-dashed border-neutral-300 py-1.5 my-1.5 bg-rose-500/5 select-none">
                      <span>EMOTIONAL DENSITY:</span>
                      <span>{activeReceipt.density} (♨ BOILING)</span>
                    </div>
                  </div>

                  {/* THE CORE TEXT CONTAINER */}
                  <div className="my-2.5 py-3.5 border-y-2 border-black bg-stone-50 p-3 text-[11.5px] font-sans font-semibold leading-relaxed text-zinc-900 border-dashed text-justify select-text">
                    <p className="italic text-center text-zinc-400 font-mono text-[8px] pb-2 tracking-widest leading-none">// RAW MESSAGE TRACE //</p>
                    &ldquo;{activeReceipt.text}&rdquo;
                  </div>

                  {/* METADATA CODES */}
                  <div className="text-center space-y-1 mt-2.5 select-none">
                    <pre className="text-[7.5px] text-zinc-800 leading-tight font-bold antialiased select-all inline-block bg-white p-1 border border-neutral-200">
{`      (  )   (  )
       ||     ||
    .-"""""""""""-.
   /   C O N :     \\
  |   N E C T       | =====> LIVE
   \\   4 1 8       /
    '-___________-'
        | || |`}
                    </pre>

                    <div className="text-[9.5px] font-black text-zinc-800 uppercase leading-snug mt-2 select-text">
                      당신의 서툰 오늘을 보증함.
                    </div>
                    <p className="text-[7.5px] text-zinc-500 max-w-[200px] mx-auto leading-normal select-text">
                      We guarantee the warmth of your imperfections in this cold, hyper-efficient digital matrix network flow.
                    </p>
                  </div>

                  {/* BARCODE SIMULATION */}
                  <div className="mt-4 pt-3 border-t border-dashed border-neutral-400 text-center select-none font-mono">
                    <div className="text-xs tracking-[4px] font-black h-5 flex overflow-hidden justify-center items-center select-all">
                      ||||||| | | |||| ||| || | |||| || ||
                    </div>
                    <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest block mt-1">
                      CODE_418_AES_EMOTION_VOUCHER
                    </span>
                  </div>

                  {/* CONTROLS */}
                  <div className="mt-5 pt-3 border-t border-stone-300 flex flex-col gap-2 font-mono text-[9px] select-none">
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `[CON:NECT EMOTIONAL RECEIPT]\nID: ${activeReceipt.id}\nDATE: ${activeReceipt.date}\nCAPSULE: "${activeReceipt.text}"\nWe guarantee the warmth of your imperfections.`
                          );
                          triggerBeep(1000, 'sine', 0.1);
                          setTimeout(() => triggerBeep(1500, 'sine', 0.1), 70);
                        }}
                        className="py-2 bg-neutral-800 text-white hover:bg-black transition-all cursor-pointer text-center font-bold flex items-center justify-center gap-1 hover:scale-101"
                      >
                        <Copy className="w-3.5 h-3.5" /> 텍스트 복사
                      </button>
                      <button
                        onClick={() => {
                          triggerBeep(1100, 'sawtooth', 0.08);
                          handlePrintReceipt(activeReceipt.text);
                        }}
                        className="py-2 bg-amber-500 text-black font-extrabold hover:bg-amber-400 transition-all cursor-pointer text-center flex items-center justify-center gap-1 hover:scale-101"
                      >
                        <Printer className="w-3.5 h-3.5" /> 다시 인쇄
                      </button>
                    </div>
                    
                    <button
                      onClick={() => {
                        triggerBeep(440, 'sine', 0.06);
                        setTimeout(() => triggerBeep(220, 'sine', 0.1), 60);
                        setActiveReceipt(null);
                      }}
                      className="w-full py-2 bg-stone-300 text-neutral-800 hover:bg-rose-500 hover:text-white transition-all cursor-pointer font-bold text-center border border-neutral-400"
                    >
                      영수증 회수 (창 닫기)
                    </button>
                  </div>

                  {/* Jagged bottom rip */}
                  <div className="absolute -bottom-1.5 inset-x-0 h-1.5 flex overflow-hidden select-none">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-neutral-300 rotate-45 transform origin-top-left flex-shrink-0" />
                    ))}
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// Subordinate Component to prevent re-renders on hover glitches and manage localized state for coming soon leaks
interface ComingSoonCardProps {
  title: string;
  subtitle: string;
  statusText: string;
  estimatedRelease: string;
  leakText: string;
  onBeep: (freq: number) => void;
}

function ComingSoonCard({ title, subtitle, statusText, estimatedRelease, leakText, onBeep }: ComingSoonCardProps) {
  const [isLeaking, setIsLeaking] = useState(false);
  const [leakTriggeredOnce, setLeakTriggeredOnce] = useState(false);
  const timerRef = useRef<NodeJS.Timeout|null>(null);

  const handleMouseEnter = () => {
    onBeep(493.88); // B4 alert beep

    setIsLeaking(true);
    setLeakTriggeredOnce(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsLeaking(false);
    }, 2200); // 2.2s reveal duration for emotional leak
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsLeaking(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`border-2 border-dashed border-[#10B981]/30 bg-royal/5 p-5 md:p-6 relative overflow-hidden box-solid-shadow min-h-[310px] flex flex-col justify-between transition-colors duration-300 select-none ${
        isLeaking ? 'bg-[#FF3366]/5 border-[#FF3366]/60' : 'hover:border-[#10B981]/60 hover:bg-royal/10'
      }`}
    >
      {/* Top Header Metadata */}
      <div className="flex justify-between items-center text-[9px] font-mono select-none">
        <span className="text-[#10B981] font-bold uppercase tracking-wider">// COMING_SOON_LOCK</span>
        <span className="text-amber-400 font-bold bg-[#10B981]/10 px-1.5 py-0.5 border border-[#10B981]/20">{estimatedRelease}</span>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-3 relative min-h-[140px] flex flex-col justify-center">
        {/* Title and Subtitle - CRISP AND FULLY READABLE TO BUILD ANTICIPATION */}
        <div className="text-left mb-4 select-text">
          <h4 className="font-sans text-sm md:text-base font-extrabold text-soft-white mb-1.5 leading-snug tracking-tight">
            {title}
          </h4>
          {subtitle && (
            <p className="font-sans text-[10px] text-faded-gray/90 leading-normal font-semibold">
              {subtitle}
            </p>
          )}
        </div>

        {/* Encrypted / Leaked stream block */}
        <div className="relative border border-[#10B981]/20 bg-black/40 p-3 h-20 overflow-hidden flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isLeaking ? (
              <motion.div 
                key="leak-visual"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="w-full text-center flex flex-col items-center justify-center select-text"
              >
                <div className="text-[7.5px] text-[#FF3366] font-mono uppercase tracking-wider font-bold animate-pulse mb-1">
                   ⚡ EMOTIONAL SIGNAL LEAKED! / 감정 시그널 누출됨
                </div>
                <p className="font-sans text-[11px] md:text-xs text-yellow-300 tracking-tight leading-snug font-bold select-text px-1 text-center">
                  &ldquo;{leakText}&rdquo;
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="normal-visual"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center text-center relative"
              >
                {/* Blurry decorative background symbolizing lock state */}
                <div className="filter blur-[4.5px] opacity-15 select-none text-[8px] font-mono leading-none w-full break-all whitespace-nowrap absolute">
                  0x418_AES_ENCRYPTED_SIGNAL_STREAM_75032035544_PRO_EMOTIONAL_LEAK_WARNING_REFLUX_NOT_READY_UPLOADING_COMING_SOON_INTERVIEW_SKETCH
                </div>

                {/* Highly aesthetic interactive status tag */}
                <div className="z-10 flex flex-col items-center bg-[#020516]/90 border border-amber-500/20 px-3 py-1 font-mono tracking-widest text-center select-none uppercase box-solid-shadow">
                  <span className="text-[8.5px] font-black text-amber-400">{statusText}</span>
                  <span className="text-[7px] text-[#4261FF] font-semibold mt-0.5 underline">
                    마우스를 올려 보일링 로그 탐색 (Hover)
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom info section */}
      <div className="border-t border-[#10B981]/10 pt-3.5 flex justify-between items-center text-[9px] font-mono text-faded-gray/40 select-none">
        <span>SECURITY_KEY: 0x418_AES_256</span>
        <span>LEAK_DETECTED: {leakTriggeredOnce ? "TRUE" : "FALSE"}</span>
      </div>
    </div>
  );
}
