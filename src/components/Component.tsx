import React, { useState } from 'react';
import { ExhibitionArtifact } from '../types';
import { 
  AlertTriangle, 
  Gift, 
  Terminal, 
  ShoppingBag,
  RotateCw
} from 'lucide-react';

import goodsFanLeafletFront from '../assets/images/goods_fan_leaflet_front.png';
import goodsFanLeafletBack from '../assets/images/goods_fan_leaflet_back.png';
import goodsEmotionPin from '../assets/images/goods_emotion_pin.png';
import goodsTimelinePin from '../assets/images/goods_timeline_pin.png';
import goodsFloorGraphic from '../assets/images/goods_floor_graphic.png';
import goodsAsciiGuestbook from '../assets/images/goods_ascii_guestbook.png';
import goodsHumanNfc from '../assets/images/goods_human_nfc.png';

const playLocalBeep = (freq: number, type: OscillatorType = 'sine', duration = 0.05) => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (_) {}
};

const GOODS_DATA: ExhibitionArtifact[] = [
  {
    id: "leaflet-01",
    name: "418 시그니처 부채 리플렛",
    category: "OFFICIAL STATIONERY",
    productionId: "SYS-418-FAN-0x1",
    timestamp: "26.06.02",
    description: "전시의 핵심 메시지를 담은 웰컴 굿즈이자 전시 공식 리플렛입니다.\n\n전면: 전시의 메인 슬로건과 함께 QR 코드가 기하학적으로 배열된 티백(Tea bag) 그래픽을 배치하여 아날로그와 디지털의 융합을 상징적으로 표현했습니다.\n\n후면: AI 객체 인식(Object Detection)의 바운딩 박스 UI를 차용하여, 차가운 디지털 시스템의 렌즈로 따뜻한 아날로그 오브제(찻주전자)를 포착해 내는 순간을 시각화했습니다.",
    dimensions: "아코디언 지그재그 리플렛",
    asciiArt: `
      /\\/\\/\\/\\/\\/\\/\\
     / / / / / / / /
    / / / / / / / /
   / / / / / / / /
   \\_\\_\\_\\_\\_\\_\\_/
    `,
    imageUrl: goodsFanLeafletFront,
    imageUrlBack: goodsFanLeafletBack,
    details: [
      "전면: QR 코드 기하학적 배열 티백 디자인",
      "후면: Object Detection 찻주전자 바운딩 박스 UI",
      "르네상스 러프 백색 240g 고급지 적용",
      "아코디언 콘체르티나 수동 정밀 접지 가공"
    ]
  },
  {
    id: "sticker-01",
    name: "시스템 에러 플로어 그래픽",
    category: "TACTILE SPACE HARDWARE",
    productionId: "SYS-418-STK-F04",
    timestamp: "26.06.02",
    description: "관람객을 전시 공간으로 안내하는 설치형 인터랙티브 스티커입니다. 1998년 당시의 레트로 운영체제(OS) 경고창 디자인을 차용하여, 현실 세계의 바닥 면에 불쑥 나타난 시스템 오류 팝업을 연출했습니다. 관람객이 물리적으로 팝업창의 [관람] 버튼을 밟으며 전시 공간으로 진입하도록 유도함으로써, 전시의 시작부터 몰입감 있는 사용자 경험(UX)을 제공합니다.",
    dimensions: "대형 플로어 그래픽 데칼",
    asciiArt: `
     +-------------------------+
     | [X] SYSTEM ERROR_418    |
     +-------------------------+
     | Physical Space Breached!|
     | [ 관람하기 ] [ CANCEL ] |
     +-------------------------+
    `,
    imageUrl: goodsFloorGraphic,
    details: [
      "1998 클래식 레트로 OS 스타일 경고창 레이아웃",
      "관람객이 직접 밟는 [관람] 버튼 인터랙션 유도",
      "고강도 미끄럼 방지 PVC 코팅 바닥 설치 설계",
      "체험형 UX 진입 도장 설계 및 특수 무광 코팅"
    ]
  },
  {
    id: "pin-02",
    name: "휴먼 타임라인 핀버튼",
    category: "WEARABLE ACCSPEC",
    productionId: "SYS-418-PIN-H02",
    timestamp: "26.06.02",
    description: "토마토와 시계를 결합한 시각적 형태에 아날로그 스크랩북 텍스처를 더한 원형 핀버튼입니다. 기계적으로 정확하게 흘러가는 디지털 시간을 거부하듯, 불규칙하게 오려 붙인 타이포그래피가 특징입니다. 화면 밖으로 튀어나온 다양한 마우스 커서들이 시곗바늘을 대신하며, 획일화된 시스템을 벗어나 자유롭고 유쾌한 '휴먼 터치'만의 시공간을 은유합니다.",
    dimensions: "원형 핀버튼",
    asciiArt: `
        .---.
       /     \\
      |  O O  |  [TOMATO CLOCK]
      |   X   |  TIME_ERR::STILL_ACTIVE
       \\     /
        '---'
    `,
    imageUrl: goodsTimelinePin,
    details: [
      "토마토 & 기계식 시계 비정형 콜라주",
      "아날로그 신문지 스크랩북 스타일 텍스처",
      "시곗바늘을 대신하는 파편적 마우스 포인터",
      "알루미늄 38mm 원형 핀 가공"
    ]
  },
  {
    id: "pin-01",
    name: "이모션 데이터 핀버튼",
    category: "WEARABLE INTERFACE",
    productionId: "SYS-418-PIN-E01",
    timestamp: "26.06.02",
    description: "감정 인식(Emotion Recognition) 시스템의 데이터 결괏값 화면을 모티브로 제작된 사각 핀버튼입니다. 모든 감정 수치가 '0.000'으로 통제된 시스템 속에서, 유일하게 '행복(Happiness)' 수치만 에러 코드인 '0.418'을 가리키고 있습니다. 완벽하게 통제된 환경 속에서 발생하는 작은 오류가 역설적으로 우리에게 가장 인간적인 행복을 가져다준다는 기획 의도를 담고 있습니다.",
    dimensions: "사각 핀버튼",
    asciiArt: `
     +-------------------+
     | EMOTION ANALYZER  |
     | [ANGRY]     0.000 |
     | [SAD]       0.000 |
     | [HAPPY]     0.418 |
     +-------------------+
    `,
    imageUrl: goodsEmotionPin,
    details: [
      "결과 화면 모션 데이터 스킨 모티브",
      "완벽 제어 시스템 하의 예외적 에러 적용",
      "사각 알루미늄 코어 하드 마감 수동 제작",
      "HAPPINESS: 0.418 (ERROR CODE) 고대비 메트릭 인쇄"
    ]
  },
  {
    id: "memo-01",
    name: "아스키아트 에러 방명록",
    category: "STATIONERY ARCHIVE",
    productionId: "SYS-418-GBK-M05",
    timestamp: "26.06.02",
    description: "관람객 참여형 프로그램인 '나만의 오류 코드' 기록을 위해 특별 제작된 메모지입니다. 고전적인 웹 브라우저 창을 뼈대로 삼고, 초기 인터넷의 향수를 불러일으키는 아스키아트(ASCII Art)로 서사를 표현했습니다. 하단의 넓은 여백은 관람객이 자신만의 '인간적인 빈틈'을 직접 펜으로 기록하는 공간으로, 아날로그적인 교감을 완성하는 전시의 중요한 아카이빙 매개체로 활용됩니다.",
    dimensions: "아카이빙 수동 메모지",
    asciiArt: `
     +-------------------------+
     | http://teapot.exhibition|
     +-------------------------+
     |    _      ____   _   _  |
     |   | |    |  _ \\ | | | | |
     |   | |    | |_) || | | | |
     |   |_|____|  _ < | |_| | |
     |  (_)_____|_| \\_\\ \\___/  |
     +-------------------------+
    `,
    imageUrl: goodsAsciiGuestbook,
    details: [
      "고전 웹 브라우저 가상 뷰포트 레이아웃",
      "초기 인터넷 오마주 ASCII ART 감성 그래픽",
      "수기 아날로그 펜 필기를 고려한 러프 모조지",
      "나만의 오류(인간적인 영감) 기록 최적화 스킨"
    ]
  },
  {
    id: "nfc-01",
    name: "휴먼 인증 NFC 태그",
    category: "DIGITAL TRIGGER INTERFACE",
    productionId: "SYS-418-NFC-T06",
    timestamp: "26.06.02",
    description: "각 전시 출품작과 관람객의 스마트 기기를 매끄럽게 연결하는 디지털 트리거 스티커입니다. 웹사이트 보안 인증 시스템인 '로봇이 아닙니다(CAPTCHA)' 테스트를 낡은 아날로그 잉크 도장 형태로 비틀어 디자인했습니다. 관람객이 스마트폰을 직접 태그(Tap)하여 자신이 '사람(HUMAN)'임을 증명하는 일련의 물리적 행위는, 본 전시가 지향하는 가장 이상적인 '휴먼 터치'의 순간을 직관적으로 경험하게 합니다.",
    dimensions: "NFC 디지털 스티커",
    asciiArt: `
     +-----------------------+
     | [V] I AM NOT A ROBOT  |
     |   [HUMAN_TOUCH_ONLY]  |
     | <<<<<< NFC TAG >>>>>> |
     +-----------------------+
    `,
    imageUrl: goodsHumanNfc,
    details: [
      "고정밀 Ntag213 무선 전송 모듈 내장",
      "'로봇이 아닙니다(CAPTCHA)' 클래식 오마주 디자인",
      "잉크 도장 질감의 물리적 텍스처 그래픽",
      "스마트폰 가벼운 Tag로 모바일 웹 연동 수행"
    ]
  }
];

export default function Component({ humanTouchMode }: { humanTouchMode: boolean }) {
  const [activeImageSide, setActiveImageSide] = useState<Record<string, 'front' | 'back'>>({});

  // Interactive error simulator states
  const [bagLeaflets, setBagLeaflets] = useState(0);
  const [bagTimelinePins, setBagTimelinePins] = useState(0);
  const [bagEmotionPins, setBagEmotionPins] = useState(0);
  const [combo, setCombo] = useState(0);
  const [gameMessage, setGameMessage] = useState("전시장 바구니 앞에 서서 서성거리는 중...");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "시스템 준비: 굿즈 할당 대기 중...",
    "관람객의 가상 터치 대기 중..."
  ]);
  const [hasShownGuide, setHasShownGuide] = useState(false);

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [msg, ...prev.slice(0, 4)]);
  };

  const handleGrab = (type: 'leaflet' | 'timeline' | 'emotion') => {
    let soundFreq = 523.25;
    let label = "";
    let soundType: OscillatorType = "sine";
    const nextCombo = combo + 1;
    setCombo(nextCombo);

    if (type === 'leaflet') {
      setBagLeaflets(prev => prev + 1);
      soundFreq = 783.99; // G5
      soundType = 'sine';
      const comments = [
        "🎟️ 부채 리플렛 획득! 펄럭이는 부채질로 발열 차단 완료.",
        "🎟️ 리플렛 챙김 완료! 손끝에 살가운 종이 질감이 느껴집니다.",
        "🎟️ 무한 획득 스포팅! 실물 테이블에서 꼭 테이크아웃 하세요."
      ];
      setGameMessage(comments[Math.floor(Math.random() * comments.length)]);
      label = "부채 리플렛";
    } else if (type === 'timeline') {
      setBagTimelinePins(prev => prev + 1);
      soundFreq = 587.33; // D5
      soundType = 'triangle';
      const comments = [
        "🔴 원형 핀버튼 탑승! 백팩 부착 시 귀여움이 200% 증가합니다.",
        "🔴 토마토 아이콘 획득! 시스템 타임라인 속에 빨간 열매 한 방울.",
        "🔴 동글동글 핀버튼 안착! 오프라인 가사 장식 치수가 상승했습니다."
      ];
      setGameMessage(comments[Math.floor(Math.random() * comments.length)]);
      label = "원형 핀버튼";
    } else {
      setBagEmotionPins(prev => prev + 1);
      soundFreq = 440; // A4
      soundType = 'sawtooth';
      const comments = [
        "⬛ 사각 핀버튼의 차가운 픽셀 메탈 감촉을 움켜쥐었습니다.",
        "⬛ 에모션 사각 핀 가방 장착 성공! 418 에러 지수가 5% 완화됩니다.",
        "⬛ 픽셀 에러 사각핀 획득! 주전자의 온기를 듬뿍 적재합니다."
      ];
      setGameMessage(comments[Math.floor(Math.random() * comments.length)]);
      label = "사각 핀버튼";
    }

    // Play retro arcade beep sound progression based on combo
    const finalFreq = soundFreq * (1 + ((nextCombo - 1) % 6) * 0.12);
    playLocalBeep(finalFreq, soundType, 0.08);

    addLog(`[확인] ${label} +1 (연속 x${nextCombo})`);
  };

  const handleResetBag = () => {
    playLocalBeep(293.66, 'sawtooth', 0.15); // D4
    setBagLeaflets(0);
    setBagTimelinePins(0);
    setBagEmotionPins(0);
    setCombo(0);
    setGameMessage("배낭 용량이 비워졌습니다. 다시 굿즈를 수집해보세요.");
    setTerminalLogs([
      "배낭 리셋: 가방이 비워짐",
      "실물 굿즈는 오프라인 전시 구역에 그대로 남아있습니다."
    ]);
  };

  return (
    <div className="relative w-full min-h-screen py-12 px-4 md:px-8 max-w-6xl mx-auto z-10">
      
      {/* SECTION TOP HEADER */}
      <div className="border-b border-electric/30 pb-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="font-mono text-[9px] text-electric tracking-widest block mb-1 uppercase">
            // ARTIFACT_CATALOGUE // VER_3.02 // GOODS
          </span>
          <h2 className="font-sans font-bold text-3xl md:text-6xl text-soft-white tracking-tighter uppercase flex flex-col md:flex-row md:items-baseline">
            <span>② COMPONENTS</span>
            <span className="text-lg md:text-3xl text-faded-gray/70 font-medium tracking-normal lowercase md:ml-4 mt-1 md:mt-0">_전시 굿즈</span>
          </h2>
          <p className="font-mono text-xs text-faded-gray/70 mt-2 max-w-xl">
            전시 현장에서 실제로 만나볼 수 있는 418 공식 굿즈 라인업입니다. 차가운 기계적 외형 속에 스며든 유쾌한 오류 코드를 감상해 보세요.
          </p>
        </div>
      </div>

      {/* COMPONENT ARCHIVE LISTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {GOODS_DATA.map((artifact) => {
          const side = activeImageSide[artifact.id] || 'front';
          const currentImgUrl = (side === 'back' && artifact.imageUrlBack) ? artifact.imageUrlBack : artifact.imageUrl;
          
          return (
            <div 
              key={artifact.id}
              className={`border rounded-none group overflow-hidden bg-royal/10 transition-all duration-300 flex flex-col justify-between box-solid-shadow ${
                humanTouchMode 
                  ? 'border-amber-400/40 hover:border-amber-400 hover:shadow-lg' 
                  : 'border-electric hover:border-electric/70'
              }`}
            >
              {/* Artifact Top metadata row */}
              <div className="px-4 py-2 border-b border-electric/10 bg-royal/30 font-mono text-[9px] text-faded-gray/50 flex justify-between items-center select-none">
                <span className="text-electric font-semibold">{artifact.productionId}</span>
                <span>{artifact.timestamp}</span>
              </div>

              {/* Content main */}
              <div className="p-6 flex-grow">
                
                {/* IMAGE WRAPPER WITH PRECISE MOCKUPS */}
                {currentImgUrl && (
                  <div className="relative z-50 w-full aspect-16/10 mb-5 overflow-hidden border border-electric/25 bg-[#030514] flex items-center justify-center p-3">
                    <img 
                      src={currentImgUrl} 
                      alt={artifact.name} 
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain group-hover:scale-102 duration-350 transition-all filter brightness-[0.95] contrast-[1.05]"
                    />
                    <div className="absolute top-2 right-2 bg-royal/80 border border-electric/30 px-2 py-0.5 font-sans text-[8.5px] text-electric backdrop-blur-xs select-none">
                      {artifact.imageUrlBack ? `전시 굿즈 (${side === 'front' ? '전면' : '후면'})` : '공식 목업'}
                    </div>

                    {/* FRONT/BACK IMAGE TOGGLE BAR */}
                    {artifact.imageUrlBack && (
                      <div className="absolute bottom-2 right-2 z-10 flex gap-1 select-none">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageSide(prev => ({ ...prev, [artifact.id]: 'front' }));
                          }}
                          className={`px-2.5 py-1 font-sans text-[8.5px] font-bold border transition-all cursor-pointer ${
                            side === 'front'
                              ? 'bg-electric text-soft-white border-white'
                              : 'bg-royal/85 text-faded-gray/80 border-electric/30 hover:bg-royal hover:text-soft-white'
                          }`}
                        >
                          전면
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageSide(prev => ({ ...prev, [artifact.id]: 'back' }));
                          }}
                          className={`px-2.5 py-1 font-sans text-[8.5px] font-bold border transition-all cursor-pointer ${
                            side === 'back'
                              ? 'bg-electric text-soft-white border-white'
                              : 'bg-royal/85 text-faded-gray/80 border-electric/30 hover:bg-royal hover:text-soft-white'
                          }`}
                        >
                          후면
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <span className="font-mono text-[9px] px-2 py-0.5 border border-electric/30 rounded-full inline-block text-electric uppercase select-none mb-3">
                  {artifact.category}
                </span>
                <h3 className="font-sans text-xl font-bold text-soft-white tracking-tight">{artifact.name}</h3>

                <p className="font-sans text-xs text-faded-gray leading-relaxed mb-4 mt-3 whitespace-pre-wrap">
                  {artifact.description}
                </p>
                
                {humanTouchMode && artifact.id === "leaflet-01" && (
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-400 font-hand text-lg text-amber-300 rotate-[-1deg] select-none">
                    ✍️ 웰컴 기록: &quot;전시 공간에서 부담 없이 집어가세요. 세상을 환기하는 아주 작은 균열이 될 것입니다.&quot;
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* RETRO 1998 SYSTEM ERROR DIALOG BOX (SOUVENIR INFORMATION STICKER) */}
      <div className="mt-16 mb-8 flex justify-center w-full relative z-50 animate-fade-in group/dialog select-none">
        <div className="w-full max-w-lg bg-[#c0c0c0] text-black p-[3px] shadow-[6px_6px_0px_rgba(0,0,0,0.45)] border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] font-sans relative">
          
          {/* Combo indicator badge */}
          {combo > 0 && (
            <div className="absolute -top-4 -right-4 rotate-12 bg-amber-400 text-black border-2 border-black font-extrabold text-[10px] px-2 py-0.5 animate-bounce shadow-md z-25 font-sans">
              ⚡ 연속 {combo}회 줍기!
            </div>
          )}

          {/* Windows 98 Title Bar */}
          <div className="bg-gradient-to-r from-[#000080] to-[#1084d0] text-white px-2 py-1 flex justify-between items-center select-none">
            <div className="flex items-center gap-1.5 font-bold text-xs font-sans tracking-tight select-none">
              <span className="text-[14px]">⚠️</span>
              <span className="tracking-wide">굿즈_미니게임_안내</span>
            </div>
            <button 
              type="button"
              onClick={() => {
                playLocalBeep(600, 'square', 0.1);
                alert("실물 전시장에 방문하시면 모든 굿즈를 선물로 집어가실 수 있습니다! CLC 4층 포토존 웰컴 테이블을 꼭 방문해 주세요. 🫖");
              }}
              className="w-[14px] h-[14px] bg-[#c0c0c0] border border-t-white border-l-white border-r-[#404040] border-b-[#404040] text-black font-extrabold text-[8px] flex items-center justify-center cursor-pointer active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white select-none"
            >
              X
            </button>
          </div>

          {/* Dialog Contents */}
          <div className="p-4 flex gap-4 items-start bg-[#c0c0c0]">
            {/* Classic Red Alert Indicator Icon */}
            <div className="w-10 h-10 rounded-full bg-red-650 flex items-center justify-center shrink-0 bg-rose-600 text-white font-bold text-lg border-2 border-t-[#404040] border-l-[#404040] border-r-white border-b-white select-none">
              👾
            </div>
            
            <div className="space-y-3 flex-grow min-w-0">
              <div>
                <h4 className="font-bold text-[14px] text-zinc-900 font-sans tracking-tight leading-snug">
                  안내: 418 굿즈 배포 중!
                </h4>
                <p className="text-[9px] text-zinc-650 font-sans mt-0.5 tracking-wider uppercase">
                  배포 코드: 0x418 // 가상_굿즈_수집_활성화
                </p>
              </div>

              <div className="text-xs text-zinc-900 leading-relaxed font-sans space-y-2 bg-[#dcdcdc] p-3 border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white">
                <p className="leading-relaxed">
                  <strong>오프라인 전시 현장을 방문하시는</strong> 분들을 위해 <strong className="text-royal">부채 리플렛</strong>과 <strong className="text-royal">두 가지 형태의 핀버튼</strong>들이 넉넉히 주인을 기다리고 있습니다. 
                </p>
                <p className="leading-relaxed">
                  관람객분들의 기억과 주머니를 감성으로 장식할 소중한 <strong>웰컴 선물</strong>이오니 고민 없이 편안하고 두둑하게 마음껏 가져가세요!
                </p>
              </div>

              {/* Game Status Commentary Box */}
              <div className="bg-black text-[#00ff22] p-2 font-mono text-[9.5px] border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white h-[44px] overflow-hidden flex items-center shadow-inner leading-tight">
                <span className="font-bold shrink-0 mr-1 select-none animate-pulse">&gt;</span>
                <span className="text-green-400 font-mono">{gameMessage}</span>
              </div>

              {/* Game Score Rank UI */}
              <div className="grid grid-cols-2 gap-2 font-sans text-[10px] text-zinc-800 bg-[#b8b8b8] p-2 border border-t-[#808080] border-l-[#808080] border-r-white border-b-white">
                <div>
                  🏆 획득 등급: <span className="font-bold text-blue-900">{(() => {
                    const total = bagLeaflets + bagTimelinePins + bagEmotionPins;
                    if (total === 0) return "🔒 일반 관점인";
                    if (total < 5) return "🌱 새싹 파머";
                    if (total < 12) return "🎒 프로 파커";
                    if (total < 25) return "🔥 굿즈 사냥꾼";
                    return "👑 전설의 주전자 신";
                  })()}</span>
                </div>
                <div>
                  📦 무게 게이지: <span className="font-bold font-mono">
                    {(() => {
                      const total = bagLeaflets + bagTimelinePins + bagEmotionPins;
                      const count = Math.min(10, Math.floor(total / 3));
                      return "[" + "■".repeat(count) + "□".repeat(10 - count) + "]";
                    })()}
                  </span>
                </div>
              </div>

              {/* Classic Sticker Interactive Bag Pocket */}
              <div className="border border-t-zinc-700 border-l-zinc-700 border-r-white border-b-white p-2.5 bg-[#b8b8b8] flex flex-col gap-2.5">
                <div className="font-sans text-[11px] text-zinc-900 font-bold tracking-tight text-center md:text-left">
                  🎒 가상 배낭: 🎟️ {bagLeaflets}장 | 🔴 {bagTimelinePins}개 | ⬛ {bagEmotionPins}개
                </div>
                
                <div className="grid grid-cols-3 gap-1 w-full">
                  <button 
                    type="button"
                    onClick={() => handleGrab('leaflet')}
                    className="bg-[#c0c0c0] hover:bg-[#d0d0d0] text-black border border-t-white border-l-white border-r-[#404040] border-b-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[9.5px] md:text-[10px] font-bold py-1.5 cursor-pointer selection:bg-transparent flex flex-col items-center justify-center gap-0.5"
                  >
                    <span className="text-[13px]">🎟️</span>
                    <span>리플렛 줍</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleGrab('timeline')}
                    className="bg-[#c0c0c0] hover:bg-[#d0d0d0] text-black border border-t-white border-l-white border-r-[#404040] border-b-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[9.5px] md:text-[10px] font-bold py-1.5 cursor-pointer selection:bg-transparent flex flex-col items-center justify-center gap-0.5"
                  >
                    <span className="text-[13px]">🔴</span>
                    <span>원형핀 줍</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleGrab('emotion')}
                    className="bg-[#c0c0c0] hover:bg-[#d0d0d0] text-black border border-t-white border-l-white border-r-[#404040] border-b-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white text-[9.5px] md:text-[10px] font-bold py-1.5 cursor-pointer selection:bg-transparent flex flex-col items-center justify-center gap-0.5"
                  >
                    <span className="text-[13px]">⬛</span>
                    <span>사각핀 줍</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dialog Action Footer button block */}
          <div className="pb-3 px-4 flex justify-end gap-2 bg-[#c0c0c0] select-none">
            <button 
              type="button"
              onClick={() => {
                playLocalBeep(293.66, 'sawtooth', 0.15);
                handleResetBag();
              }}
              className="bg-[#c0c0c0] text-zinc-800 border border-t-white border-l-white border-r-[#404040] border-b-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white px-3 py-1 text-xs font-bold font-sans cursor-pointer"
            >
              초기화
            </button>
            <button 
              type="button"
              onClick={() => {
                playLocalBeep(659.25, 'sine', 0.08);
                alert(`배낭 가상 할당 성공! 실물 전시 굿즈(부채 ${bagLeaflets}장, 원형 핀버튼 ${bagTimelinePins}개, 사각 핀버튼 ${bagEmotionPins}개)의 영혼이 전시회 웹뷰포에 온기 데이터로 누적 기록되었습니다.`);
              }}
              className="bg-[#c0c0c0] text-zinc-900 border-2 border-t-white border-l-white border-r-[#404040] border-b-[#404040] active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white px-5 py-1 text-xs font-bold font-sans cursor-pointer"
            >
              확인
            </button>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
