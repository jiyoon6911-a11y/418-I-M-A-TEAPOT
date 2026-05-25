import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GuestbookEntry } from '../types';
import { Terminal, Send, Eye, ShieldAlert, Cpu, Nfc, Camera, Receipt, Sparkles, MapPin, Gift, GiftIcon, HelpCircle, Smile, X } from 'lucide-react';

const stickerTemplates = [
  { type: 'teapot', label: '🫖 찻주전자', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-400/40 text-emerald-400' },
  { type: 'error', label: '⚠️ SYSTEM ERROR', color: 'bg-yellow-500/10 text-yellow-300 border-yellow-400/40 text-yellow-400' },
  { type: 'heart', label: '❤️ WARMTH_LIMIT', color: 'bg-rose-550/10 text-rose-300 border-rose-500/40 text-rose-405' },
  { type: 'unfinished', label: '🛠️ 미완성 (418)', color: 'bg-lime-500/10 text-lime-300 border-lime-400/40 text-lime-400' },
  { type: 'steam', label: '♨️ HOT_STEAM', color: 'bg-cyan-550/10 text-cyan-300 border-cyan-400/40 text-cyan-400' },
  { type: 'connect', label: '🎫 CON:NECT', color: 'bg-[#1D32FF]/10 text-[#4261FF] border-[#1D32FF]/40' }
];

const STATIC_RESPONSES = [
  "전송완료: 시스템 가열 임계 온도 초과. 인간의 따스한 오차가 감지되었습니다.",
  "오류 418: 바쁜 일상의 흐름 속에 수작업으로 가공된 흔적이 추가되었습니다.",
  "알림: 주전자가 차를 준비하느라 커피 요청을 거부했습니다. 차분히 우려내는 중입니다.",
  "보안 우회: 효율성 최적화 알고리즘이 임시 중단되었습니다. 인간 구역 확보 완료.",
  "시스템 안정: 비규격 메시지가 메인보드에 녹아들었습니다. 아날로그 증기가 방출됩니다."
];

const TEAPOT_FRAMES = [
  {
    state: "IDLE // READY",
    sub: "WATER_TEMP: 101.4°C // SECURE_FLOW",
    art: `       (  )   (  )
        ||     ||
     .-"""""""""""-.
    /   CON:NECT     \\   ____
   |   EXHIB_418      |='    \\\\     ________
    \\  TEAPOT.EXE    /        ||   |  ☕    |
     '-___________-'         //    |________|
         | || |             \``
  },
  {
    state: "BREWING // PREPARE",
    sub: "TILT_INDEX: 18° // GAUGE_COMPILED",
    art: `      ~     ~
     (  )   (  )
   .-"""""""""""-.
  /   CON:NECT     \\====.
 |   EXHIB_418      |    \\    _   ________
  \\  TEAPOT.EXE    /      \\  / \\ |  ☕    |
   '-___________-'         \\/   \\|________|
       | || |`
  },
  {
    state: "POURING // INITIAL_DRIP",
    sub: "STREAM PRESSURE: 1.15 BAR // OUTFLOW",
    art: `        ~     ~  ~
     .-----------.
    /             \\\\  _
   |   CON:NECT     |=' )
    \\  TEAPOT.EXE  / /     ~
     '-_________-'  /     .-. ________
      ||       ||  \` \`   (   |        |
                    \` .   \`·'|________|`
  },
  {
    state: "FLOW_STEEP // ACTIVE_POUR",
    sub: "DROP_FREQ: 24Hz // WARM_FLOW_METRIC",
    art: `            ~    ~   ~
         _.-.-.-._
       .'         '. _
      /   CON:NECT  |=' )
     |   EXHIB_418  //     ~~ ~
      \\  TEAPOT    //     .-''-._
       '-______---'  * . | ~~~~  |
                      \`. \`._ _ _ |`
  },
  {
    state: "BOILING // EMOTIONAL_PEAK",
    sub: "VAPOR EXCEPTION CODES: 418 ACTIVE",
    art: `              ~   ~   ~
           _.-.-.-._
         .'         '. _
        /   CON:NECT  |=' )   ~
       |   EXHIB_418  //    ~~~~~~
        \\  TEAPOT    //     .-''-._
         '-______---' * . .|♨♨♨♨♨  |
                       \`·.·|_______|`
  },
  {
    state: "COMPLETED // STANDBY_STEEP",
    sub: "SYS_STANDBY // CORE_LOCK_SECURE",
    art: `       (  )   (  )          ~~~~~~~~
        ||     ||          ~~~~~~~~~~
     .-"""""""""""-.        .-''-._
    /   CON:NECT     \\     |☕☕☕   |
   |   EXHIB_418      |    |_______|
    \\  TEAPOT.EXE    /
     '-___________-'
         | || |`
  }
];

const INVITATION_QUOTES = [
  {
    sender: "박근영",
    role: "Exhibition Curator // Planning Leader",
    avatar: "👑",
    getMessage: (n: string) => `"${n}님! 밤낮없이 지새운 저희의 눈물젖은(?) 전시 공간에 드디어 오셨군요! 어서 1층 전시작들부터 천천히 느껴주세요!"`
  },
  {
    sender: "박근영",
    role: "Exhibition Curator // Planning Leader",
    avatar: "👑",
    getMessage: (n: string) => `"${n}씨 어서와요! 혹시... 전시 보시다가 부족한 점이 있다면 제 멱살 대신 주전자의 멱살(?)을 잡아주시겠어요? 아주 뜨뜻합니다."`
  },
  {
    sender: "박근영",
    role: "Exhibition Curator // Planning Leader",
    avatar: "👑",
    getMessage: (n: string) => `"${n}님을 위한 완벽한 자리가 1층, 2층 모두 준비되어 있습니다. 커피와 홍차 티백도 가득! 어서 즐기러 오세요!"`
  },
  {
    sender: "김미소",
    role: "PR Coordinator",
    avatar: "📢",
    getMessage: (n: string) => `"${n}님! 📱 인스타 스토리에 인증샷 올리실 준비는 되셨죠? 스토리 업로드하면 소정의 tea 선물이 눈앞에 아른거립니다!"`
  },
  {
    sender: "김미소",
    role: "PR Coordinator",
    avatar: "📢",
    getMessage: (n: string) => `"${n}님, 오신 김에 공식 계정 태그하고 스토리 한 장 업로드 어떠세요? 주전자가 너무 차갑게 식지 않도록 소문을 마구마구 퍼뜨려줘요!"`
  },
  {
    sender: "김미소",
    role: "PR Coordinator",
    avatar: "📢",
    getMessage: (n: string) => `"시스템 경보! ${n}님이 전시장에 접속했습니다. 당장 인스타 스토리 검열 모드를 발동하고, 선물 지급용 tea 패키지 박스를 예열하세요!"`
  },
  {
    sender: "홍지윤",
    role: "Technical Designer // Developer",
    avatar: "💻",
    getMessage: (n: string) => `"${n}님 저희 작품 보러오세요! 앗, 뒤에 418 에러 코드가 뜬 걸 보니 ${n}님의 기가막힌 아우라 때문인가 봅니다. ㅎㅎ"`
  },
  {
    sender: "홍지윤",
    role: "Technical Designer // Developer",
    avatar: "💻",
    getMessage: (n: string) => `"${n}님, 저 밤샘 코딩 하다가 진심 주전자랑 동기화될 뻔했거든요... 그래도 웹이랑 NFC에 이스터에그 많이 숨겨놨으니 전부 찾아내보세요!"`
  },
  {
    sender: "홍지윤",
    role: "Technical Designer // Developer",
    avatar: "💻",
    getMessage: (n: string) => `"지윤: ${n}님, 드디어 커넥트 게이트에 무사히 통과하셨군요! 에러 418의 귀여운 균열을 자유롭게 드래그해서 여기저기 스티킹해 보세요!"`
  },
  {
    sender: "김주연",
    role: "Visual Media Artist // Graphic Designer",
    avatar: "🎨",
    getMessage: (n: string) => `"${n}님! CRT 마이크로 브라운관의 번쩍이는 418 레트로 디스플레이 효과 보셨나요? 포토존에 서서 비정규 규격 인생샷 꼭 성공하세요!"`
  },
  {
    sender: "김주연",
    role: "Visual Media Artist // Graphic Designer",
    avatar: "🎨",
    getMessage: (n: string) => `"${n}님! 우리 418 전시의 에러 감성 충만한 부채 리플렛이랑 굿즈 스티커 팩, 꼭 나가실 때 하나씩 양손 무겁게 테이크아웃 해가셔야 합니다!"`
  },
  {
    sender: "손예빈",
    role: "Archivist // Assistant Curator",
    avatar: "🗄️",
    getMessage: (n: string) => `"${n}님! 윈도우 에러창 모양 방명록에 본인만의 '인간다운 버그/에러' 한 문장 남겨두셨나요? 안 쓰면 방명록 캐시 강제 청소 들어갑니다!"`
  },
  {
    sender: "손예빈",
    role: "Archivist // Assistant Curator",
    avatar: "🗄️",
    getMessage: (n: string) => `"기획단의 영혼과 눈물이 아카이브된 공간에 당도한 ${n}님을 환영합니다! 천천히 구석구석 남겨진 비하인드 흔적들을 뒤적여 보세요!"`
  }
];

export default function Run({ humanTouchMode }: { humanTouchMode: boolean }) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [stickers, setStickers] = useState<{ id: string; type: string; x: number; y: number; rotate: number }[]>([]);
  const [showStickerTray, setShowStickerTray] = useState(true);

  // Guestbook states
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [errorCodeInput, setErrorCodeInput] = useState("418 WORK_OVERFLOW");
  const [messageInput, setMessageInput] = useState("");
  const [humanOverrideToggle, setHumanOverrideToggle] = useState(true);
  const [typingFeedback, setTypingFeedback] = useState("");

  // NFC simulator states
  const [nfcState, setNfcState] = useState<'IDLE' | 'READING' | 'SUCCESS'>('IDLE');
  const [nfcReceipt, setNfcReceipt] = useState<string | null>(null);

  // Invitation simulation states
  const [boothName, setBoothName] = useState("");
  const [selectedQuote, setSelectedQuote] = useState<{ sender: string; role: string; avatar: string; text: string } | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  // Teapot ASCII live video states
  const [activeFrame, setActiveFrame] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoSpeed, setVideoSpeed] = useState(350); // ms
  const [steamLevel, setSteamLevel] = useState(101.4); // °C

  const playLocalBeep = (freq: number, type: OscillatorType = 'sine', duration = 0.05) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.008, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  };

  const handleDragEnd = (id: string, event: any) => {
    playLocalBeep(400, 'sine', 0.05);
    const container = constraintsRef.current;
    if (!container) return;
    
    const el = document.getElementById(`sticker-${id}`);
    if (!el) return;
    
    const rect = el.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();
    
    const leftPercent = ((rect.left - parentRect.left) / parentRect.width) * 100;
    const topPercent = ((rect.top - parentRect.top) / parentRect.height) * 100;
    
    // Bounds checking inside container
    setStickers(prev => prev.map(s => s.id === id ? { 
      ...s, 
      x: Math.min(Math.max(leftPercent, 0), 92), 
      y: Math.min(Math.max(topPercent, 0), 98) 
    } : s));
  };

  // Video cycle interval hook
  useEffect(() => {
    if (!isVideoPlaying) return;
    const interval = setInterval(() => {
      setActiveFrame(prev => {
        const next = (prev + 1) % TEAPOT_FRAMES.length;
        // Soft digital drip sound effects for frames 2, 3, 4
        if (next === 2 || next === 3 || next === 4) {
          playLocalBeep(920 + Math.random() * 150, 'sine', 0.03);
        } else {
          playLocalBeep(440, 'triangle', 0.015);
        }
        return next;
      });
      // Slightly fluctuate temp as it boils
      setSteamLevel(curr => {
        const next = curr + (Math.random() - 0.45) * 0.4;
        return parseFloat(Math.min(Math.max(next, 99.1), 104.9).toFixed(1));
      });
    }, videoSpeed);
    return () => clearInterval(interval);
  }, [isVideoPlaying, videoSpeed]);

  // Load guestbook keys
  useEffect(() => {
    const local = localStorage.getItem('418_guestbook');
    const hasFullTeam = local && local.includes('김재홍');
    if (local && hasFullTeam) {
      setEntries(JSON.parse(local));
    } else {
      const presets: GuestbookEntry[] = [
        {
          id: "pre-1",
          name: "손예빈 (기획/디자인/연출)",
          errorCode: "418 HUMAN_OVERLOAD",
          message: "전시 공간이 드디어 다 채워졌네요! 차가운 픽셀 너머로 우리들의 서투르지만 눈부신 흔적들이 전해지기를. ✿",
          timestamp: "2026.05.24 14:20 KST",
          humanOverride: true,
          systemResponse: "수신 완료: 손끝 가공 기포 안전 범위 확인."
        },
        {
          id: "pre-2",
          name: "홍지윤 (기획/개발/연출)",
          errorCode: "418 WEB_MASTER",
          message: "웹 화면이랑 실제 전시장 구조 맞지 않아서 418만 번 뇌정지 정지 정지... 그래도 결과물이 너무 짜릿하네요! ⚡",
          timestamp: "2026.05.24 14:18 KST",
          humanOverride: true,
          systemResponse: "알림: 주전자가 차를 준비하느라 완벽한 효율을 정지합니다."
        },
        {
          id: "pre-3",
          name: "박근영 (인스타/디자인/굿즈)",
          errorCode: "418 INSTA_BOILING",
          message: "우리 인스타 피드랑 포스터, 전시장 굿즈 하나하나에 뜨거운 애정을 담아 우려냈습니다! 다들 보러 오세요! ☕🐾",
          timestamp: "2026.05.24 14:15 KST",
          humanOverride: true,
          systemResponse: "수신 완료: 감정 피드 시그널 최적화."
        },
        {
          id: "pre-4",
          name: "김미소 (인스타/디자인/굿즈)",
          errorCode: "418 DESIGN_ACTIVE",
          message: "굿즈 패키지랑 카드 뉴스 밤새서 만들었습니다... 우리 주전자 3D 비주얼 영롱한 것 좀 보세요 💖",
          timestamp: "2026.05.24 14:10 KST",
          humanOverride: true,
          systemResponse: "알림: 시각 예술 소스 전송율 100% 임계점 도달."
        },
        {
          id: "pre-5",
          name: "김주연 (인스타/기획/웹)",
          errorCode: "418 CONNECT_LINK",
          message: "웹 기획하면서 이 인터랙티브 주전자 페이지 보고 울 뻔했습니다ㅋㅋㅋ 다들 고생 많으셨어요!",
          timestamp: "2026.05.24 14:05 KST",
          humanOverride: true,
          systemResponse: "수신 완료: 연결 고리 활성화 성공."
        },
        {
          id: "pre-6",
          name: "김지혜 (인스타/기획)",
          errorCode: "418 FEED_GLITCH",
          message: "인스타 채널에 따뜻한 감성 한 스푼 가득 담아 유출했습니다! 온기 가득한 티타임 되세요 💫",
          timestamp: "2026.05.24 14:00 KST",
          humanOverride: true,
          systemResponse: "알림: 감정 데이터 방출 정상 작동 중."
        },
        {
          id: "pre-7",
          name: "이정연 (디자인/굿즈/연출)",
          errorCode: "418 REAL_GOODS",
          message: "전시장 바닥에 스티커 드디어 정렬 완료! 굿즈 실물이 정말 오백배 예쁩니다 실물 강풍 주의! ♨️",
          timestamp: "2026.05.24 13:55 KST",
          humanOverride: true,
          systemResponse: "수신 완료: 굿즈 아날로그 마찰 계수 조정."
        },
        {
          id: "pre-8",
          name: "현나경 (디자인/굿즈/연출)",
          errorCode: "418 SPACE_WARM",
          message: "CLC 건물 구석구석 정성이 가득해요. 따뜻하게 우려내는 주전자의 온기를 느껴보세요! ✨",
          timestamp: "2026.05.24 13:50 KST",
          humanOverride: true,
          systemResponse: "알림: 피드백 루프 오류가 기분 좋은 따스함으로 보정되었습니다."
        },
        {
          id: "pre-9",
          name: "김재홍 (현장 연출)",
          errorCode: "418 EXH_DIRECTOR",
          message: "마지막 공간 연출 설치까지 스팀 최고 출력 발사 성공! 주전자가 식기 전에 꼭 놀러오세요!",
          timestamp: "2026.05.24 13:45 KST",
          humanOverride: true,
          systemResponse: "수신 완료: 오프라인 배치 및 물리 신호 동기화."
        }
      ];
      setEntries(presets);
      localStorage.setItem('418_guestbook', JSON.stringify(presets));
    }
  }, []);

  // Handle guestbook form filing
  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !messageInput.trim()) return;

    const newObj: GuestbookEntry = {
      id: `usr-${Date.now()}`,
      name: nameInput.trim(),
      errorCode: errorCodeInput.trim() ? errorCodeInput.trim().toUpperCase() : "418 ERROR",
      message: messageInput.trim(),
      timestamp: new Date().toLocaleDateString('ko-KR') + " " + new Date().toLocaleTimeString('ko-KR'),
      humanOverride: humanOverrideToggle,
      systemResponse: STATIC_RESPONSES[Math.floor(Math.random() * STATIC_RESPONSES.length)]
    };

    const updated = [newObj, ...entries];
    setEntries(updated);
    localStorage.setItem('418_guestbook', JSON.stringify(updated));

    // Reset fields
    setNameInput("");
    setErrorCodeInput("418 WORK_OVERFLOW");
    setMessageInput("");

    setTypingFeedback("⚙️ 방명록 오류 신호가 중앙 프로세서에 등록되었습니다.");
    setTimeout(() => setTypingFeedback(""), 4000);
  };

  // Simulates tapping NFC device
  const simulateNfcTap = () => {
    setNfcState('READING');
    setTimeout(() => {
      setNfcState('SUCCESS');
      const gridId = Math.floor(Math.random() * 9) + 1;
      setNfcReceipt(`
=========================================
          418 I'M A TEAPOT
     NFC CONTACTLESS TAG CERTIFICATE
=========================================
전시장 동선: 캠퍼스라이프센터 (CLC)
접속노드: POSTER-TAG-NODE-#0${gridId}
인증코드: ACTIVE-HUMAN-TOUCH
출품구역: 0${gridId} 디지털디자인예술학과 전시관
상태지표: POETIC LIFEFORM VERIFIED
설명: "효율성 최적화 시스템의 균열을 
내주셔서 감사합니다. 마음을 끓여보세요."
=========================================
      `);
    }, 1500);
  };

  // Summon a random invitation message from team members
  const summonTeammateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!boothName.trim()) return;

    setIsCapturing(true);
    setSelectedQuote(null);
    playLocalBeep(880, 'sawtooth', 0.1);

    setTimeout(() => {
      setIsCapturing(false);
      const name = boothName.trim();
      const randomIndex = Math.floor(Math.random() * INVITATION_QUOTES.length);
      const quoteTemplate = INVITATION_QUOTES[randomIndex];
      setSelectedQuote({
        sender: quoteTemplate.sender,
        role: quoteTemplate.role,
        avatar: quoteTemplate.avatar,
        text: quoteTemplate.getMessage(name)
      });
      playLocalBeep(1200, 'sine', 0.08);
    }, 1200);
  };

  return (
    <div ref={constraintsRef} className="relative w-full min-h-screen py-12 px-4 md:px-8 max-w-6xl mx-auto z-10 text-left overflow-x-hidden">
      
      {/* HEADER SECTION */}
      <div className="border-b border-electric/30 pb-6 mb-12 select-none">
        <span className="font-mono text-[9px] text-electric tracking-widest block mb-1 uppercase">
          // INTERACTIVE_INSTALLATIONS // ON-SITE PROGRAMS
        </span>
        <h2 className="font-sans font-bold text-3xl md:text-6xl text-soft-white tracking-tighter uppercase">
          현장 참여 프로그램 <span className="text-electric vibrant-glitch-shadow h1-shadow">EXPERIENCE</span>
        </h2>
        <p className="font-mono text-xs text-faded-gray/70 mt-2 max-w-xl">
          캠퍼스라이프센터(CLC) 전시장 현장에서 직접 느끼고 조작해 볼 수 있는 체험 아카이브입니다. 디지털 인터랙션을 미리 실행해 보세요.
        </p>
      </div>

      {/* OFFLINE PHYSICAL EVENT INFOGRAPHICS CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12 select-none">
        
        {/* Card 1: 나만의 오류 코드 [방명록] */}
        <div className="border-2 border-electric p-4 bg-royal/20 box-solid-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-electric mb-2.5">
              <Terminal className="w-4 h-4" />
              <h4 className="font-sans font-bold text-xs text-soft-white">나만의 오류 코드 [방명록]</h4>
            </div>
            <p className="font-sans text-[11px] text-faded-gray/90 leading-relaxed text-justify">
              시스템이 정한 매뉴얼을 거부하고 자신만의 고유한 정체성을 드러내는 참여형 방명록입니다. 윈도우 에러 메시지 창 디자인의 메모지에 관람객이 스스로 정의하는 ‘인간적인 오류(나만의 서사나 특성)’를 빈칸에 직접 기록하며 정형화된 시스템에 균열을 내는 경험을 선사합니다.
            </p>
          </div>
          <span className="font-mono text-[9px] text-electric/60 mt-3 block uppercase tracking-wider">// LOCAL_EXCEPTION_LOG</span>
        </div>

        {/* Card 2: 리플렛 & 굿즈 존 [테이크아웃] */}
        <div className="border-2 border-electric p-4 bg-royal/20 box-solid-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-electric mb-2.5">
              <Gift className="w-4 h-4" />
              <h4 className="font-sans font-bold text-xs text-soft-white">리플렛 & 굿즈 존 [테이크아웃]</h4>
            </div>
            <p className="font-sans text-[11px] text-faded-gray/90 leading-relaxed text-justify">
              이번 전시의 핵심 기획 의도가 담긴 부채 형식의 리플렛과, 일상 속에서 유쾌한 에러를 상기시켜 줄 '418 공식 굿즈'를 자유롭게 가져갈 수 있는 공유 공간입니다.
            </p>
          </div>
          <span className="font-mono text-[9px] text-electric/60 mt-3 block uppercase tracking-wider">// TAKE_OUT_CAPSULE</span>
        </div>

        {/* Card 3: 418 포토존 */}
        <div className="border-2 border-electric p-4 bg-royal/20 box-solid-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-electric mb-2.5">
              <Camera className="w-4 h-4" />
              <h4 className="font-sans font-bold text-xs text-soft-white">418 포토존</h4>
            </div>
            <p className="font-sans text-[11px] text-faded-gray/90 leading-relaxed text-justify">
              ‘418 I’m a teapot’ 전시만의 독창적인 비주얼 콘셉트와 위트 있는 에러 그래픽을 배경으로, 전시 방문을 기록하고 감각적인 인증샷을 남길 수 있는 현장 포토 스팟입니다.
            </p>
          </div>
          <span className="font-mono text-[9px] text-electric/60 mt-3 block uppercase tracking-wider">// VISUAL_BOOTH_DAY</span>
        </div>

        {/* Card 4: 인증샷 이벤트 */}
        <div className="border-2 border-electric p-4 bg-royal/20 box-solid-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-electric mb-2.5">
              <Sparkles className="w-4 h-4" />
              <h4 className="font-sans font-bold text-xs text-soft-white">인증샷 이벤트</h4>
            </div>
            <p className="font-sans text-[11px] text-faded-gray/90 leading-relaxed text-justify">
              현장 포토존 또는 전시 관람 인증 사진을 찍어 오피셜 계정 태그와 함께 인스타그램 스토리에 업로드해 주세요. 시스템 속 빈틈을 함께 즐겨주신 분들을 추첨하여, 커피 대신 따뜻한 온기를 전할 tea 선물'을 보내드립니다.
            </p>
          </div>
          <span className="font-mono text-[9px] text-electric/60 mt-3 block uppercase tracking-wider">// INSTAGRAM_EVENT_TEA</span>
        </div>

        {/* Card 5: NFC 태그 시스템 */}
        <div className="border-2 border-electric p-4 bg-royal/20 box-solid-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-electric mb-2.5">
              <Nfc className="w-4 h-4" />
              <h4 className="font-sans font-bold text-xs text-soft-white">NFC 태그 시스템</h4>
            </div>
            <p className="font-sans text-[11px] text-faded-gray/90 leading-relaxed text-justify">
              매번 QR 코드를 스캔해야 했던 번거로운 과정에서, 각 프로젝트 포스터에 부착된 NFC 스티커에 스마트폰을 가볍게 태그하는 것만으로, 별도의 검색 없이 팀별 프로젝트 사이트로 즉시 연결됩니다.
            </p>
          </div>
          <span className="font-mono text-[9px] text-electric/60 mt-3 block uppercase tracking-wider">// NFC_AUTO_DIRECT_LINK</span>
        </div>

      </div>

      {/* CORE EXPERIMENT LAYOUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: GUESTBOOK (LOG EXCEPTION WRITER) - Span 7 */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* RETRO ERROR POPUP WINDOW STYLE GUESTBOOK */}
          <div className="border-2 border-electric bg-[#050720] box-solid-shadow overflow-hidden">
            {/* WINDOW BAR */}
            <div className="bg-electric px-4 py-2 flex justify-between items-center select-none text-soft-white font-mono text-xs">
              <span className="flex items-center gap-1.5 font-bold uppercase">
                <ShieldAlert className="w-4 h-4 text-[#FF3366] animate-pulse" /> ERROR 418: 나만의 오류 코드 [방명록]
              </span>
              <div className="flex gap-1.5">
                <span className="w-3 h-3 border border-soft-white flex items-center justify-center text-[8px] leading-none select-none">_</span>
                <span className="w-3 h-3 border border-soft-white flex items-center justify-center text-[8px] leading-none select-none">□</span>
                <span className="w-3 h-3 hover:bg-[#FF3366] border border-soft-white flex items-center justify-center text-[8px] leading-none select-none cursor-pointer">X</span>
              </div>
            </div>

            <div className="p-6 text-left">
              <p className="font-sans text-xs text-faded-gray mb-6 leading-relaxed text-justify">
                시스템이 정한 매뉴얼을 거부하고 자신만의 고유한 정체성을 드러내는 참여형 방명록입니다. 윈도우 에러 메시지 창 디자인의 메모지에 관람객이 스스로 정의하는 ‘인간적인 오류(나만의 서사나 특성)’를 빈칸에 직접 기록하며 정형화된 시스템에 균열을 내는 경험을 선사합니다.
              </p>

              <form onSubmit={handleGuestbookSubmit} className="space-y-4 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-electric font-semibold uppercase text-[10px]">작성자 닉네임 // ALIAS: *</label>
                    <input 
                      type="text" 
                      value={nameInput} 
                      onChange={(e) => setNameInput(e.target.value)}
                      required
                      placeholder="이름 혹은 별칭을 입력하세요"
                      className="bg-royal/30 text-soft-white border border-electric/30 rounded-none px-3 py-2 outline-none focus:border-electric"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 text-left">
                    <label className="text-electric font-semibold uppercase text-[10px]">사적인 에러 코드 번호: *</label>
                    <input 
                      type="text" 
                      value={errorCodeInput} 
                      onChange={(e) => setErrorCodeInput(e.target.value)}
                      required
                      placeholder="예) 418 COFFEE_DEPLETION"
                      className="bg-royal/30 text-soft-white border border-electric/30 rounded-none px-3 py-2 outline-none focus:border-electric uppercase"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-electric font-semibold uppercase text-[10px]">에러 상세 설명 (따뜻한 인물 흔적 기록): *</label>
                  <textarea 
                    value={messageInput} 
                    onChange={(e) => setMessageInput(e.target.value)}
                    required
                    rows={3}
                    placeholder="지치고 과열된 스스로에게 보내는 위트 어린 오차 코드를 적어주세요..."
                    className="bg-royal/30 text-soft-white border border-electric/30 rounded-none px-3 py-2 outline-none focus:border-electric resize-none"
                  />
                </div>

                <div className="flex justify-between items-center bg-royal/40 p-3 border border-electric/15 rounded-none select-none">
                  <label className="flex items-center gap-2.5 cursor-pointer text-[10.5px] text-soft-white select-none leading-tight">
                    <input 
                      type="checkbox" 
                      checked={humanOverrideToggle}
                      onChange={(e) => setHumanOverrideToggle(e.target.checked)}
                      className="w-4 h-4 accent-electric cursor-pointer"
                    />
                    <span>아날로그 수공업 필기 필터 일체형 활성화 (기울어짐과 따뜻한 서체 적용)</span>
                  </label>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-electric hover:bg-[#FF3366] text-soft-white py-2.5 rounded-none font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> 방명록 오류 예외 수동 기록 전송
                </button>
              </form>

              <AnimatePresence>
                {typingFeedback && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-[10.5px] text-emerald-400 font-mono text-center"
                  >
                    🚀 {typingFeedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* GUESTBOOK STREAM DATA DUMP */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <h4 className="font-mono text-[10px] text-electric tracking-wide select-none uppercase font-bold">
              // RECENT_SYSTEM_EXCEPTIONS // 방명록 라이브 로그 Stream
            </h4>
            {entries.length === 0 ? (
              <div className="text-center py-8 font-mono text-xs text-faded-gray/50 border border-dashed border-electric/20">
                기록된 예외 로그가 없습니다. 첫 대오차를 기록해 보세요.
              </div>
            ) : (
              entries.map((entry) => (
                <div 
                  key={entry.id}
                  className={`border-2 rounded-none p-5 bg-[#03061F] flex flex-col justify-between transition-all duration-300 box-solid-shadow ${
                    entry.humanOverride || humanTouchMode
                      ? 'border-[#1D32FF]/50 font-sans text-xs font-semibold md:text-[13px] text-soft-white space-y-1' 
                      : 'border-electric/30 font-mono text-xs text-faded-gray'
                  }`}
                >
                  <div className="flex justify-between border-b border-electric/10 pb-2 mb-2 select-none">
                    <span className={`font-bold uppercase ${entry.humanOverride || humanTouchMode ? 'text-emerald-400' : 'text-electric'}`}>
                      ERR_{entry.errorCode} // 수작업 피드백: {entry.name}
                    </span>
                    <span className="opacity-40 text-[9px] font-mono">{entry.timestamp}</span>
                  </div>

                  <p className="leading-relaxed mb-3 italic">
                    &quot;{entry.message}&quot;
                  </p>

                  {entry.systemResponse && (
                    <div className={`mt-2 p-3 border rounded-none text-xs leading-relaxed ${
                      entry.humanOverride || humanTouchMode
                        ? 'bg-[#0B0F33]/80 border-[#1D32FF]/20 text-faded-gray font-mono'
                        : 'bg-[#050720] border-electric/15 text-emerald-400'
                    }`}>
                      <span className="font-bold flex items-center gap-1 font-mono uppercase text-[9.5px]">
                        <Cpu className="w-3.5 h-3.5 inline" /> core response code:
                      </span>
                      {entry.systemResponse}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: NFC SIGNIN & PHOTOSTAMP PRINT - Span 5 */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* TEAPOT ASCII CCTV LIVE MONITOR */}
          <div className="border-2 border-[#1D32FF] bg-[#020516] rounded-none p-5 relative text-left box-solid-shadow overflow-hidden">
            {/* SCREEN GLOW EFFECTS */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,50,255,0.08)_0%,transparent_85%)] pointer-events-none" />
            
            <div className="flex justify-between items-center mb-3 border-b border-[#1D32FF]/30 pb-2 select-none">
              <span className="font-mono text-[9px] font-bold tracking-widest text-emerald-400 flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                CCTV::TEAPOT_FEED_LIVE [ON_AIR]
              </span>
              <span className="font-mono text-[8px] text-faded-gray/50 select-all font-semibold">[ID: EXH_418_SIGNAL_STREAM]</span>
            </div>

            {/* CRT MONITOR GLASS SCREEN CONTAINER */}
            <div className="bg-[#050720] border border-[#1D32FF]/50 p-4 font-mono select-none rounded-none relative overflow-hidden flex flex-col items-center">
              {/* Scanlines inside video screen */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />
              
              {/* Floating Signal HUD */}
              <div className="w-full flex justify-between text-[8px] text-[#4261FF] font-bold mb-2 select-text">
                <span>REC_FPS: {(1000 / videoSpeed).toFixed(1)}Hz</span>
                <span className="animate-pulse text-rose-500">BOILING {steamLevel}°C</span>
              </div>

              {/* CORE ANIMATION SCREEN DISPLAY */}
              <pre className="text-[9px] md:text-[10px] leading-tight text-emerald-300 font-mono tracking-wider text-left bg-black/60 p-3 border border-emerald-500/10 min-h-[150px] w-full select-all overflow-x-auto whitespace-pre">
                {TEAPOT_FRAMES[activeFrame].art}
              </pre>

              {/* Dynamic scrolling status metrics */}
              <div className="w-full mt-3 bg-[#101B7A]/30 border border-[#1D32FF]/20 px-3 py-1.5 text-[8.5px] leading-normal space-y-0.5">
                <div className="flex justify-between text-[#4261FF] font-bold">
                  <span>STATE PROCESSOR:</span>
                  <span className="text-white uppercase">{TEAPOT_FRAMES[activeFrame].state}</span>
                </div>
                <div className="flex justify-between text-faded-gray/60">
                  <span>SIGNAL FREQUENCY:</span>
                  <span>{TEAPOT_FRAMES[activeFrame].sub}</span>
                </div>
              </div>
            </div>

            {/* VIDEO STREAM CONTROLS */}
            <div className="mt-4 pt-3 border-t border-[#1D32FF]/20 flex flex-col gap-2 font-mono text-[9.5px]">
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsVideoPlaying(!isVideoPlaying);
                    playLocalBeep(isVideoPlaying ? 400 : 700, 'triangle', 0.1);
                  }}
                  className={`py-1.5 border border-[#1D32FF] hover:bg-[#1D32FF] hover:text-white transition-all cursor-pointer text-center font-bold ${
                    isVideoPlaying ? 'bg-[#1D32FF]/20 text-white' : 'bg-transparent text-faded-gray'
                  }`}
                >
                  {isVideoPlaying ? "❚❚ 일시정지" : "▶ 재생하기"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVideoSpeed(prev => Math.max(150, prev - 100));
                    playLocalBeep(880, 'sine', 0.05);
                  }}
                  className="py-1.5 bg-[#101B7A]/40 border border-[#1D32FF]/30 text-emerald-300 hover:bg-[#1D32FF] hover:text-white transition-all cursor-pointer text-center font-bold"
                  title="Speed up animation loop"
                >
                  💨 배속 증가
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVideoSpeed(prev => Math.min(1000, prev + 100));
                    playLocalBeep(550, 'sine', 0.05);
                  }}
                  className="py-1.5 bg-[#101B7A]/40 border border-[#1D32FF]/30 text-emerald-300 hover:bg-[#1D32FF] hover:text-white transition-all cursor-pointer text-center font-bold"
                  title="Slow down animation loop"
                >
                  🐢 배속 감소
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setSteamLevel(curr => curr + 2.5);
                    playLocalBeep(1200, 'sawtooth', 0.08);
                  }}
                  className="py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500 hover:text-white transition-all cursor-pointer text-center font-extrabold"
                >
                  🔥 임계가열 가열치UP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFrame(0);
                    setVideoSpeed(350);
                    setSteamLevel(101.4);
                    setIsVideoPlaying(true);
                    playLocalBeep(330, 'sine', 0.15);
                  }}
                  className="py-1.5 bg-neutral-800 text-faded-gray border border-neutral-700 hover:bg-black transition-all cursor-pointer text-center font-bold"
                >
                  🔄 기기 리셋
                </button>
              </div>
            </div>
          </div>
          
          {/* NFC SIMULATION */}
          <div className="border-2 border-electric rounded-none p-6 bg-royal/10 relative text-left box-solid-shadow">
            <div className="absolute top-4 right-4 text-electric">
              <Nfc className="w-5 h-5 animate-pulse" />
            </div>

            <h3 className="font-sans text-xl font-bold text-soft-white mb-2 uppercase">
              NFC 태그 시스템
            </h3>
            <p className="font-sans text-xs text-faded-gray leading-relaxed mb-6 text-justify">
              매번 QR 코드를 스캔해야 했던 번거로운 과정에서, 각 프로젝트 포스터에 부착된 NFC 스티커에 스마트폰을 가볍게 태그하는 것만으로, 별도의 검색 없이 팀별 프로젝트 사이트로 즉시 연결됩니다.
            </p>

            <div className="space-y-4">
              <div className="flex justify-center py-2 select-none">
                <button 
                  onClick={simulateNfcTap}
                  disabled={nfcState === 'READING'}
                  className={`px-5 py-3.5 border-2 cursor-pointer select-none transition-all duration-300 flex items-center gap-2 font-mono text-[11px] rounded-none ${
                    nfcState === 'SUCCESS' 
                      ? 'bg-electric border-soft-white text-soft-white shadow-lg' 
                      : 'bg-royal/40 border-electric text-electric hover:bg-royal/60'
                  }`}
                >
                  <Nfc className="w-4 h-4 animate-ping" />
                  {nfcState === 'IDLE' && "스마트폰 태그 시뮬레이션"}
                  {nfcState === 'READING' && "기기 신호 패리티 세그먼트 읽는 중..."}
                  {nfcState === 'SUCCESS' && "접속 노드 인증 통과 전송 성공"}
                </button>
              </div>

              {nfcReceipt && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#05081E] border border-emerald-400/40 text-emerald-300 p-4 rounded-none font-mono text-[10px] space-y-2 select-none relative overflow-hidden"
                >
                  <div className="absolute top-1.5 right-2 text-emerald-400 opacity-60">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <pre className="leading-tight text-center text-[9px]">{nfcReceipt.trim()}</pre>
                  
                  <button 
                    onClick={() => {
                      setNfcState('IDLE');
                      setNfcReceipt(null);
                    }}
                    className="w-full mt-3 text-center border border-emerald-400/20 py-1 hover:bg-emerald-400/10 hover:text-white rounded-none text-[9px] duration-150 cursor-pointer font-bold"
                  >
                    센서 수동 초기화
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* RETRO PHOTOSTAMP */}
          <div className="border-2 border-electric rounded-none p-6 bg-[#020516]/80 relative text-left box-solid-shadow">
            <div className="absolute top-4 right-4 text-electric">
              <Smile className="w-5 h-5 animate-pulse" />
            </div>

            <h3 className="font-sans text-sm md:text-base font-bold text-soft-white mb-2 uppercase">
              418 팀원들의 수줍은 초대장
            </h3>
            <p className="font-sans text-[11px] text-faded-gray leading-relaxed mb-6 text-justify">
              이름을 입력하고 호출 신호를 보내보세요! 전시 기획단(근영, 미소, 지윤, 주연, 예빈) 중 한 명이 랜덤하게 등장하여, {boothName ? `${boothName}님만을` : "관람객님만을"} 위한 위트 있고 따뜻한 초대 메시지를 직접 띄워 줍니다.
            </p>

            <form onSubmit={summonTeammateMessage} className="space-y-4 font-mono text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-electric font-semibold uppercase text-[10px]">초대받을 관람객 성함 (닉네임):</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={boothName}
                    onChange={(e) => setBoothName(e.target.value)}
                    maxLength={10}
                    required
                    placeholder="예) 예빈, 지윤"
                    className="flex-1 bg-royal/30 text-white border border-electric/30 rounded-none px-3 py-2 outline-none focus:border-electric font-sans"
                  />
                  <button 
                    type="submit"
                    disabled={isCapturing}
                    className="bg-electric hover:bg-[#FF3366] text-white px-5 py-2 rounded-none font-bold uppercase transition-colors duration-150 cursor-pointer text-xs shrink-0 font-sans"
                  >
                    {isCapturing ? "호출 신호 발송 중..." : "팀원 호출하기"}
                  </button>
                </div>
              </div>
            </form>

            <AnimatePresence mode="wait">
              {selectedQuote && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 p-4 border border-electric bg-royal/20 rounded-none relative"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-none border border-electric flex items-center justify-center bg-royal/30 text-lg shrink-0 select-none">
                      {selectedQuote.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1.5">
                        <span className="font-sans font-bold text-xs text-white">
                          {selectedQuote.sender}
                        </span>
                        <span className="font-mono text-[9px] text-electric">
                          ({selectedQuote.role})
                        </span>
                      </div>
                      <p className="font-sans text-[11px] text-white/95 leading-relaxed bg-[#05081E] p-3 border border-electric/20 rounded-none italic text-justify">
                        {selectedQuote.text}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1 right-2 font-mono text-[7.5px] text-electric/40 select-none">
                    // CONNECT_INVITATION_TERMINAL
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      {/* Draggable Stickers Overlay Layer */}
      <div className="absolute inset-0 pointer-events-none z-35 overflow-visible select-none">
        {stickers.map((st) => {
          const tmpl = stickerTemplates.find(t => t.type === st.type) || stickerTemplates[0];
          return (
            <motion.div
              key={st.id}
              id={`sticker-${st.id}`}
              drag
              dragConstraints={constraintsRef}
              dragElastic={0.05}
              dragMomentum={false}
              style={{
                top: `${st.y}%`,
                left: `${st.x}%`,
                rotate: `${st.rotate}deg`,
              }}
              whileDrag={{ scale: 1.15, zIndex: 60 }}
              onDragStart={() => playLocalBeep(440, 'triangle', 0.05)}
              onDragEnd={(e) => handleDragEnd(st.id, e)}
              className={`absolute pointer-events-auto p-2 border border-solid box-solid-shadow font-mono text-[8.5px] font-extrabold cursor-grab active:cursor-grabbing text-center flex items-center gap-1 select-none ${tmpl.color} bg-[#020516]/95`}
            >
              <span>{tmpl.label}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playLocalBeep(330, 'sine', 0.1);
                  setStickers(prev => prev.filter(item => item.id !== st.id));
                }}
                className="w-3.5 h-3.5 bg-black/40 hover:bg-rose-500 rounded-none flex items-center justify-center text-[8px] border border-white/10 cursor-pointer ml-1 text-white font-bold"
              >
                x
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Sticker Decor Pack Panel */}
      <div className="fixed right-4 bottom-4 md:bottom-10 z-50 flex flex-col items-end gap-2 shrink-0 select-none">
        <AnimatePresence>
          {showStickerTray && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: 20 }}
              className="bg-[#020516]/95 border-2 border-electric p-4 w-48 box-solid-shadow text-left font-sans select-none"
            >
              <div className="flex justify-between items-center border-b border-electric/30 pb-2 mb-2">
                <span className="font-mono text-[9px] font-bold tracking-widest text-electric">🎨 DECO_STICKER_PACK</span>
                <button 
                  onClick={() => setShowStickerTray(false)}
                  className="text-faded-gray/50 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[8.5px] text-faded-gray/70 leading-normal mb-3 font-sans">
                스티커를 클릭하여 화면에 배치하세요! 원하는 대로 드래그하거나 회전해 꾸밀 수 있습니다. (정상 스티킹 작동 완료)
              </p>
              
              <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {stickerTemplates.map((st) => (
                  <button
                    key={st.type}
                    onClick={() => {
                      playLocalBeep(660, 'sine', 0.1);
                      const id = Date.now().toString() + Math.random().toString(36).substr(2, 5);
                      
                      const container = constraintsRef.current;
                      let scrollYOffset = 0;
                      if (container) {
                        scrollYOffset = Math.min((window.scrollY / container.clientHeight) * 100 + 15, 80);
                      }
                      
                      setStickers(prev => [
                        ...prev, 
                        { 
                          id, 
                          type: st.type, 
                          x: 10 + Math.random() * 50, 
                          y: Math.max(10, scrollYOffset + Math.random() * 15), 
                          rotate: Math.floor(Math.random() * 34) - 17 
                        }
                      ]);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 border border-dashed rounded-none font-mono text-[9px] font-black transition-all hover:bg-white hover:text-black cursor-pointer ${st.color}`}
                  >
                    + {st.label}
                  </button>
                ))}
              </div>

              {stickers.length > 0 && (
                <button
                  onClick={() => {
                    playLocalBeep(220, 'sine', 0.2);
                    setStickers([]);
                  }}
                  className="w-full mt-3 py-1 bg-rose-500/10 hover:bg-[#FF3366] text-rose-300 hover:text-white border border-rose-500/30 text-[9px] font-mono font-bold transition-all cursor-pointer text-center"
                >
                  지우기 (스티커 {stickers.length}개)
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Toggle Button */}
        <button
          onClick={() => {
            playLocalBeep(550, 'sine', 0.1);
            setShowStickerTray(!showStickerTray);
          }}
          className="bg-electric hover:bg-[#FF3366] text-white p-2.5 border-2 border-white box-solid-shadow flex items-center gap-1.5 cursor-pointer font-mono text-[9px] font-bold uppercase transition-all select-none"
        >
          <Smile className="w-4 h-4 animate-bounce" />
          <span>{showStickerTray ? "Hide Sticker Pack" : "데코 스티커 꾸미기"}</span>
        </button>
      </div>

    </div>
  );
}
