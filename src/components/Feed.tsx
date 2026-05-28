import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import teapotImg from '../assets/images/3d_teapot_monitor_1779611146496.png';
import feed1 from '../assets/images/feed_1.png';
import feed2 from '../assets/images/feed_2.png';
import feed3 from '../assets/images/feed_3.png';
import feed4 from '../assets/images/feed_4.png';
import feed5 from '../assets/images/feed_5.png';
import { 
  Heart, MessageSquare, Terminal as TermIcon, ShieldAlert, WifiOff, 
  FileText, ChevronLeft, ChevronRight, Send, Flame, Coffee, Sparkles, 
  Folder, Play, Square, SkipForward, Info, Trash2, Globe,
  Printer, Smile, Scissors, Layers, CheckCircle2, Copy, X, Instagram
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
    '1': 418,
    '2': 255,
    '3': 189,
    '4': 304,
    '5': 276
  });

  const [imageSrcs, setImageSrcs] = useState<Record<string, string>>({
    '1': feed1,
    '2': feed2,
    '3': feed3,
    '4': feed4,
    '5': feed5
  });

  const handleImageError = (id: string) => {
    setImageSrcs(prev => {
      return { ...prev, [id]: 'fallback' };
    });
  };
  
  const [activeTab, setActiveTab] = useState<'uploaded' | 'upcoming'>('uploaded');
  
  const [activeSlide, setActiveSlide] = useState<Record<string, number>>({
    'post-teapot': 0,
    'post-retro-desktop': 0
  });
  const [popupManager, setPopupManager] = useState<{ id: string; text: string; x: number; y: number }[]>([]);

  // Sound triggering on interaction
  const triggerBeep = (freq: number, type: OscillatorType = 'sine', duration = 0.1) => {
    playSound(freq, type, duration, 0.08);
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

  // Helper definition for Instagram posts (supporting Wide landscape and Square 1x1 layouts)
  const renderInstagramPost = (post: { id: string; title: string; category: string; caption: string; date: string; link: string; }, isWide: boolean) => {
    return (
      <div 
        key={post.id}
        className={`border-2 border-[#10B981] bg-[#020516] relative flex flex-col ${isWide ? 'md:flex-row w-full md:col-span-3' : 'col-span-1'} justify-between box-solid-shadow group transition-all duration-300 hover:border-[#10B981] hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] overflow-hidden`}
      >
        {/* Header metadata tag (Only for square layout on top, wide layout on top of right panel) */}
        {!isWide && (
          <div className="p-3 bg-[#101b7a]/40 border-b border-[#10B981]/30 flex justify-between items-center select-none font-mono text-[9px] min-h-[38px]">
            <span className="text-[#10B981] font-bold uppercase tracking-wider">// POST::00{post.id} // {post.category}</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-400 text-[8px] font-black tracking-tight">CONNECTED</span>
            </div>
          </div>
        )}

        {/* Post Image with error fallback */}
        <div className={`relative ${isWide ? 'w-full md:w-[60%] aspect-video md:aspect-auto md:min-h-[380px]' : 'aspect-square w-full'} bg-black/60 flex items-center justify-center p-4 border-[#10B981]/10 overflow-hidden ${isWide ? 'border-b md:border-b-0 md:border-r' : 'border-b'}`}>
          {imageSrcs[post.id] === 'fallback' ? (
            <div className="flex flex-col items-center justify-center text-center p-6 select-none">
              <div className="w-9 h-9 rounded-none border border-amber-500/30 bg-amber-500/10 text-amber-400 flex items-center justify-center mb-2.5 animate-pulse font-mono font-bold text-xs">
                !
              </div>
              <span className="text-[10px] font-mono text-amber-400/90 font-bold uppercase tracking-wider">IMAGE DISCONNECTED</span>
              <span className="text-[8px] font-mono text-faded-gray/50 mt-1 uppercase">Awaiting file: feed_{post.id}.jpg</span>
            </div>
          ) : (
            <img 
              src={imageSrcs[post.id]} 
              alt={post.title}
              onError={() => handleImageError(post.id)}
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_20px_rgba(16,185,129,0.22)] group-hover:scale-103 transition-transform duration-500"
            />
          )}
          {/* Aspect tag */}
          <div className="absolute top-2 right-2 text-[7px] font-mono text-emerald-400/30 select-none bg-black/40 px-1 py-0.5">
            {isWide ? '// INSTA_POST_WIDE_LANDSCAPE' : '// INSTA_POST_1X1'}
          </div>
        </div>

        {/* Content Panel */}
        <div className={`flex flex-col justify-between relative ${isWide ? 'w-full md:w-[40%] bg-black/20' : 'px-4 pb-4 pt-0 bg-[#020516]'}`}>
          
          {isWide && (
            <div className="p-3 bg-[#101b7a]/40 border-b border-[#10B981]/30 flex justify-between items-center select-none font-mono text-[9px] min-h-[38px]">
              <span className="text-[#10B981] font-bold uppercase tracking-wider">// POST::00{post.id} // {post.category}</span>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 text-[8px] font-black tracking-tight">CONNECTED</span>
              </div>
            </div>
          )}

          {/* Overlapping retro Windows 95 style Error Warning Block for caption content */}
          <div className={`relative ${isWide ? 'my-auto px-4 pb-4 pt-8' : 'px-1 pt-1'}`}>
            <div className={`relative bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-[3px_3px_10px_rgba(0,0,0,0.5)] p-2 text-black transition-transform duration-300 group-hover:-translate-y-1 z-10 ${!isWide ? '-mt-7 mx-0 mb-4' : ''}`}>
              {/* Retro Windows Title Bar */}
              <div className="bg-[#000080] text-white px-2 py-0.5 text-[8.5px] font-mono flex justify-between items-center select-none font-bold">
                <span className="flex items-center gap-1.5 tracking-tight">
                  <TermIcon className="w-2.5 h-2.5 text-yellow-300 animate-pulse" /> 
                  {post.title}
                </span>
                <span className="text-[8.5px] bg-[#c0c0c0] text-black w-3.5 h-3.5 border border-t-white border-l-white border-[#606060] flex items-center justify-center font-bold font-sans">✕</span>
              </div>
              {/* Window Content */}
              <div className="bg-white p-2 mt-1 border border-[#808080] text-[11px] text-zinc-900 leading-normal font-sans font-semibold text-justify select-text whitespace-pre-line">
                {post.caption}
              </div>
            </div>
            
            {/* Metadata Indicators & Likes Row */}
            <div className="flex items-center justify-between border-t border-[#10B981]/20 pt-3 select-none font-mono text-[9px] text-emerald-400/60 font-bold">
              <span>{post.date}</span>
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-all font-mono text-xs cursor-pointer select-none border border-rose-500/20 bg-rose-500/5 px-2.5 py-1 box-solid-shadow active:scale-95"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 stroke-rose-500" />
                <span>{likesCount[post.id] || 0}</span>
              </button>
            </div>
          </div>

          {/* Direct Big Link Button (가장 눈에 띄게 큰 버튼) */}
          <div className="p-3 bg-black/40 border-t border-[#10B981]/20 mt-2">
            <a 
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerBeep(520, 'sine', 0.12)}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-[#4261FF] text-white hover:brightness-110 font-mono text-center flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.25)] hover:shadow-[0_0_25px_rgba(66,97,255,0.55)] border-2 border-white rounded-none cursor-pointer uppercase font-black tracking-widest text-[11px] hover:scale-[1.02] active:scale-[0.98]"
            >
              <Instagram className="w-4 h-4 animate-pulse shrink-0" />
              <span>INSTAGRAM 바로가기 ↗</span>
            </a>
          </div>

        </div>
      </div>
    );
  };

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



      {/* SECTION TOP HEADER */}
      <div className="border-b border-[#10B981]/30 pb-6 mb-12">
        <span className="font-mono text-[9px] text-[#10B981] tracking-widest block mb-1 uppercase select-none">
          // EXHIBITION_LOG_BOARD // VER_3.02 // LOGS
        </span>
        <h2 className="font-sans font-bold text-3xl md:text-6xl text-soft-white tracking-tighter uppercase flex flex-col md:flex-row md:items-baseline">
          <span>③ FEED</span>
          <span className="text-lg md:text-3xl text-faded-gray/70 font-medium tracking-normal md:ml-4 mt-1 md:mt-0">_INSTAGRAM</span>
        </h2>
        <p className="font-sans text-xs md:text-sm text-faded-gray/70 leading-relaxed max-w-3xl mt-3">
          차가운 디지털 공간 위에 커넥트가 더한 인간적인 <strong>&apos;터치&apos;</strong>, 그리고 관객 여러분의 참여로 완성되어 가는 생동감 넘치는 기록 보관소입니다.
        </p>
      </div>

      {/* EXHIBITION MAIN META BRAND PANEL */}
      <div className="w-full mb-12 flex justify-start">
        <a 
          href="https://www.instagram.com/iam.ateapot/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerBeep(520, 'sine', 0.15)}
          className="relative group px-6 py-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-[#4261FF] text-white font-mono text-xs md:text-sm font-bold tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-3.5 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(66,97,255,0.6)] border-2 border-white rounded-none cursor-pointer uppercase font-black"
        >
          <Instagram className="w-5 h-5 animate-pulse" />
          <span>INSTAGRAM 바로가기 @iam.ateapot ↗</span>
        </a>
      </div>

      {/* TABS FOR FEED SECTIONS */}
      <div className="flex gap-2 border-b border-[#10B981]/30 mb-8 w-full font-mono select-none uppercase overflow-x-auto whitespace-nowrap scrollbar-hidden">
        <button 
          onClick={() => { setActiveTab('uploaded'); triggerBeep(520, 'sine', 0.08); }}
          className={`px-5 py-3 border-t-2 border-x border-[#10B981]/30 text-xs font-bold tracking-wider cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'uploaded' 
              ? 'border-t-[#10B981] border-x-[#10B981]/60 bg-[#0c1236]/90 text-emerald-400' 
              : 'border-t-transparent border-x-transparent text-faded-gray/50 hover:text-faded-gray'
          }`}
        >
          📁 현재 업로드된 게시물
        </button>
        <button 
          onClick={() => { setActiveTab('upcoming'); triggerBeep(520, 'sine', 0.08); }}
          className={`px-5 py-3 border-t-2 border-x border-[#10B981]/30 text-xs font-bold tracking-wider cursor-pointer transition-all flex items-center gap-2 ${
            activeTab === 'upcoming' 
              ? 'border-t-[#10B981] border-x-[#10B981]/60 bg-[#0c1236]/90 text-[#10B981]' 
              : 'border-t-transparent border-x-transparent text-faded-gray/50 hover:text-faded-gray'
          }`}
        >
          🔒 Coming soon
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'uploaded' ? (
          <motion.div
            key="uploaded"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-12 w-full"
          >
            {/* ROW 1: One Wide Post (가로로 긴 이미지 구성) */}
            <div className="w-full">
              {renderInstagramPost({
                id: '1',
                title: '전시 접수 일정',
                category: 'SCHEDULE',
                caption: '전시 신청 마감: 2026. 05. 15. (금)\n작품 제출 시작: 2026. 05. 18. (월)\n오프라인 제출 마감: 2026. 05. 25. (월)\n온라인 제출 마감: 2026. 05. 27. (수)\n\n📍 2026.6.2.(화) - 4.(목)\n📍 캠퍼스라이프센터(CLC) 1층',
                date: '2026.05.15',
                link: 'https://www.instagram.com/p/DYOJ4ESyVB4/'
              }, true)}
            </div>

            {/* ROW 2: Three Square Posts Side-by-Side (이미지 3개 구성) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-stretch animate-fade-in">
              {renderInstagramPost({
                id: '2',
                title: '기획 의도',
                category: 'ABOUT',
                caption: '클릭 한 번이면 완벽한 결괏값이 나오는 매끄러운 시대.\n\n혹시 정답만을 요구하는 시스템 속에서 알 수 없는 피로감을 느낀 적은 없으신가요?\n\n이번 전시는 그 매끄러운 화면 뒤에 숨겨진, 창작자들의 엉뚱한 사유와 \'의도된 빈틈\'에 말을 건네며 시작되었습니다.\n\n모든 것이 자동화된 세상 속에서 완벽하지 않아도 괜찮은, 가장 인간적인 틈새로 여러분을 초대합니다.',
                date: '2026.05.18',
                link: 'https://www.instagram.com/p/DYMGbqQADFQ/?img_index=1'
              }, false)}
              {renderInstagramPost({
                id: '3',
                title: '콘셉트',
                category: 'CONCEPT',
                caption: '"커피를 내리라"는 명령에\n"나는 찻주전자라서 안 되는데?"\n라고 답하는 시스템\n\n1998년, 만우절 농담에서 유래한 이 엉뚱한 에러 코드는 단순한 고장이 아닙니다. 모두가 정해진 매뉴얼대로 똑같은 정답을 낼 때, 나만의 고유성을 지켜내는 아주 유쾌하고 능동적인 반항이죠.\n\n무조건적인 효율과 \'YES\'를 요구하는 세상 속에서, 여러분이 가진 가장 유쾌한 \'에러\'는 무엇인가요?',
                date: '2026.05.24',
                link: 'https://www.instagram.com/p/DYMGImLgG2Y/?img_index=1'
              }, false)}
              {renderInstagramPost({
                id: '4',
                title: '전시 주제',
                category: 'THEME',
                caption: '오차 없는 정교한 알고리즘보다 우리의 마음을 더 짙게 움직이는 건, 결국 사람의 감수성이 묻어나는 불완전한 순간들입니다.\n\n차가운 디지털 매체 안에 담긴 창작자들의 따뜻한 온기, \'휴먼 터치(Human Touch)\'.\n\n거대한 시스템 속에서도 결코 지워지지 않는 우리들의 고유한 인간다움을 이번 전시에서 직접 마주해 보세요.\n\n커피를 요구하는 세상, 따뜻한 차 한 잔 어떠세요? 🍵',
                date: '2026.05.26',
                link: 'https://www.instagram.com/p/DYMFR9IAFJw/?img_index=1'
              }, false)}
            </div>

            {/* ROW 3: One Wide Post (첫 번째 줄과 동일한 가로 구조 구성) */}
            <div className="w-full">
              {renderInstagramPost({
                id: '5',
                title: '🫖 ERROR 418 I\'M A TEAPOT',
                category: 'MAIN',
                caption: '완벽하게 통제된 디지털 시스템, 오차 없이 굴러가는 일상\n매끄러운 알고리즘이 정해진 정답만을 요구하는 세상에서,\n가끔은 엉뚱한 ‘오류’가 위로가 될 때가 있습니다.\n\n커피를 내리라는 명령에 "나는 찻주전자이기에 커피를 내릴 수 없다"고\n응답한 유쾌한 서버의 농담처럼 우리는 정해진 시스템의 틈새에서,\n기술이 흉내 낼 수 없는 투박하고 따뜻한 인간의 흔적을 찾으려 합니다.\n\n커피를 요구하는 세상, 따뜻한 차 한 잔 어떠신가요? 🍵\n차가운 화면 너머, 우리의 고유한 서사가 담긴 빈틈투성이 공간으로 여러분을 초대합니다.',
                date: '2026.05.27',
                link: 'https://www.instagram.com/p/DX-ypXDSUZ7/'
              }, true)}
            </div>


          </motion.div>
        ) : (
          <motion.div
            key="upcoming"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start w-full"
          >
            {/* ========================================== */}
            {/* 1. COMING SOON: 기획진 인터뷰                 */}
            {/* ========================================== */}
            <ComingSoonCard 
              title="기획진 인터뷰"
              subtitle="기획단의 열정과 밤샘 기록"
              estimatedRelease="D-3 RELEASE"
              leakText="'내일까지 안 끝나면 주전자에 직접 들어가겠습니다!' 기획진의 끓어오르는 열정 인터뷰."
            />

            {/* ========================================== */}
            {/* 2. COMING SOON: 참여 과목 소개 및 교수님 인터뷰 */}
            {/* ========================================== */}
            <ComingSoonCard 
              title="참여 과목 소개 및 교수님 인터뷰"
              subtitle="기술과 예술의 학문적 조화"
              estimatedRelease="D-2 RELEASE"
              leakText="교수님: '마감 기한만 정직하게 지켜준다면 학생들을 무기한 사랑하겠습니다.'"
            />

            {/* ========================================== */}
            {/* 3. COMING SOON: 포스터 공모전 대상 인터뷰     */}
            {/* ========================================== */}
            <ComingSoonCard 
              title="포스터 공모전 대상 인터뷰"
              subtitle="대상을 사로잡은 단 하나의 에러 비주얼"
              estimatedRelease="D-1 RELEASE"
              leakText="대망의 대상 단독 인터뷰! 과연 영예의 대상 주인공은 누구일까요?"
            />

            {/* ========================================== */}
            {/* 4. COMING SOON: 전시 출품작 인터뷰            */}
            {/* ========================================== */}
            <ComingSoonCard 
              title="전시 출품작 인터뷰"
              subtitle="작품 픽셀 너머에 심은 고유한 숨소리"
              estimatedRelease="EXHIBITION_DAY"
              leakText="작가: '작품명: [종강은 오는가]. 침대와 한몸이 된 처절한 데이터 시그널.'"
            />

            {/* ========================================== */}
            {/* 5. COMING SOON: 전시 관람 안내(오시는 길/배치도 등) */}
            {/* ========================================== */}
            <ComingSoonCard 
              title="전시 관람 안내(오시는 길/배치도 등)"
              subtitle="전시장 오시는 길 및 공간 배치도 안내"
              estimatedRelease="LOCATION_ACTIVE"
              leakText="CLC 건물 구석에서 다급하게 찻잔을 들고 서성이는 사람들을 발견했다면 도착!"
            />

            {/* ========================================== */}
            {/* 6. COMING SOON: 전시 관람 플레이리스트      */}
            {/* ========================================== */}
            <ComingSoonCard 
              title="전시 관람 플레이리스트"
              subtitle="감성을 자극하는 완벽한 음악 트랙"
              estimatedRelease="STREAMING_DELAYED"
              leakText="트랙 1: 기획단 밤샘 비명소리 (Remix ver.), 트랙 2: 키보드 폭풍 타건 ASMR"
            />

            {/* ========================================== */}
            {/* 7. COMING SOON: D-3/D-2/D-1 카운트다운   */}
            {/* ========================================== */}
            <ComingSoonCard 
              title="D-3/D-2/D-1 카운트다운"
              subtitle="하루마다 뜨겁게 달아오르는 디데이 기록"
              estimatedRelease="T-MINUS COUNT"
              leakText="전시 오픈에 다가올수록 에라 모르겠다 과열 모드가 418%까지 도달 중!"
            />

            {/* ========================================== */}
            {/* 8. COMING SOON: 현장 스케치 및 전시 비하인드 */}
            {/* ========================================== */}
            <ComingSoonCard 
              title="현장 스케치 및 전시 비하인드"
              subtitle="지저분하지만 눈부신 설치 현장 스냅"
              estimatedRelease="LIVE_BUFFERING"
              leakText="작품 뒤에 쓸쓸하게 뒹구는 빈 커피 캔과 눅눅한 야식 봉지가 진짜 비하인드."
            />
          </motion.div>
        )}
      </AnimatePresence>



    </div>
  );
}

// Subordinate Component to display coming soon sections neatly
interface ComingSoonCardProps {
  title: string;
  subtitle: string;
  estimatedRelease: string;
  leakText: string;
}

function ComingSoonCard({ title, subtitle, estimatedRelease, leakText }: ComingSoonCardProps) {
  return (
    <div 
      className="border-2 border-dashed border-[#10B981]/25 bg-royal/5 p-5 relative overflow-hidden box-solid-shadow flex flex-col justify-between transition-all duration-300 select-none hover:border-[#10B981]/50 hover:bg-royal/10 group min-h-[170px]"
    >
      {/* Top Header Metadata */}
      <div className="flex justify-between items-center text-[9px] font-mono select-none mb-3">
        <span className="text-[#10B981]/70 font-bold uppercase tracking-wider">// COMING_SOON</span>
        <span className="text-amber-400 font-bold bg-[#10B981]/10 px-2 py-0.5 border border-[#10B981]/20">{estimatedRelease}</span>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        {/* Title and Subtitle */}
        <div className="text-left select-text">
          <h4 className="font-sans text-sm md:text-base font-extrabold text-soft-white mb-1.5 leading-snug tracking-tight group-hover:text-[#10B981] transition-colors duration-200">
            {title}
          </h4>
          {subtitle && (
            <p className="font-sans text-[11px] text-faded-gray/90 leading-normal font-medium">
              {subtitle}
            </p>
          )}
        </div>

        {/* Flat readable teaser quote */}
        {leakText && (
          <div className="border-l-2 border-[#10B981]/40 pl-3 py-1 bg-black/20 text-left select-text">
            <p className="font-sans text-[11px] text-emerald-300 italic leading-relaxed">
              &ldquo;{leakText}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* Bottom info section */}
      <div className="border-t border-[#10B981]/10 mt-4 pt-3 flex justify-between items-center text-[9px] font-mono text-faded-gray/30 select-none">
        <span>SECURITY_KEY: 0x418_AES_256</span>
        <span className="text-faded-gray/40">READY_FOR_COMMUNITY</span>
      </div>
    </div>
  );
}
