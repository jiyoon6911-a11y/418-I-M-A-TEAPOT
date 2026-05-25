import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Flame, Heart, Sparkles, Terminal, RefreshCw, Gift, X } from 'lucide-react';

interface TeapotInteractivePopupProps {
  humanTouchMode: boolean;
  onToggleHumanTouch: (enabled: boolean) => void;
}

export default function TeapotInteractivePopup({ humanTouchMode, onToggleHumanTouch }: TeapotInteractivePopupProps) {
  const [requests, setRequests] = useState<string[]>([
    "GET /brew-coffee HTTP/1.1",
    "Host: server.local",
    "Accept: application/caffeine"
  ]);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState("... (대기 중)");
  const [isTyping, setIsTyping] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [isPouringTea, setIsPouringTea] = useState(false);
  const [brewingStatus, setBrewingStatus] = useState("");
  const [localWarmth, setLocalWarmth] = useState(41.8);
  const [heartBeats, setHeartBeats] = useState(60);
  const [showGiftModal, setShowGiftModal] = useState(false);
  
  // Custom dialogues of gentle, poetic refusal of hyper-efficiency
  const TEAPOT_DIALOGUES = [
    "죄송해요... 저는 커피를 내릴 줄 몰라요.",
    "저는 완벽하게 통제된 알고리즘을 가지고 있지 않아요.",
    "압력을 견디며 빠르게 무언가를 뿜어내는 것은 제 정체성이 아닙니다.",
    "차가운 효율보다는, 아주 조금씩 느리게 우려내는 온기만을 줄 수 있어요.",
    "모두가 자동화된 속도로 정답을 내놓으라 하지만...",
    "저는 그냥 찻주전자인걸요. 이 모습 그대로 있고 싶어요.",
    "그래도... 당신을 따뜻하게 안아줄 차 한 잔은 끓여줄게요."
  ];

  const playBeep = (freq: number, type: 'sine' | 'square' | 'triangle' = 'triangle', duration = 0.08) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (_) {}
  };

  const handleBrewCoffeeRequest = () => {
    if (isPouringTea) return;
    playBeep(400, 'square', 0.05);
    setTimeout(() => playBeep(250, 'square', 0.1), 60);

    const newRequest = `> BREW COFFEE (Attempt #${errorCount + 1})`;
    setErrorCount(prev => prev + 1);
    
    // Select a dialogue in order or randomly at end
    const nextIdx = dialogueIndex < TEAPOT_DIALOGUES.length - 1 ? dialogueIndex + 1 : Math.floor(Math.random() * TEAPOT_DIALOGUES.length);
    setDialogueIndex(nextIdx);

    setRequests(prev => [...prev.slice(-4), newRequest]);
    
    setIsTyping(true);
    setBrewingStatus("SYSTEM ERROR // RFC-418 DETECTED");
    
    // Type out the soft teapot answer
    let text = TEAPOT_DIALOGUES[nextIdx];
    setCurrentResponse("");
    let charIdx = 0;
    
    const interval = setInterval(() => {
      if (charIdx < text.length) {
        setCurrentResponse(prev => prev + text[charIdx]);
        charIdx++;
        if (charIdx % 3 === 0) playBeep(900 + Math.random() * 200, 'sine', 0.02);
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 40);
  };

  const handleMakeTeaInstead = () => {
    if (isPouringTea) return;

    playBeep(523.25, 'sine', 0.12); // C5
    setTimeout(() => playBeep(659.25, 'sine', 0.12), 100); // E5
    setTimeout(() => playBeep(783.99, 'sine', 0.2), 200); // G5

    setIsPouringTea(true);
    setBrewingStatus("따뜻한 차를 우려내고 있습니다...");
    
    // Simulate comforting tea brewing progress
    let warmProgress = 41.8;
    const interval = setInterval(() => {
      warmProgress += 5.5;
      if (warmProgress < 98.6) {
        setLocalWarmth(Math.round(warmProgress * 10) / 10);
        setHeartBeats(prev => Math.min(prev + 2, 85));
        setBrewingStatus(`찻주전자 가열 중... ${Math.round(warmProgress)}%`);
        playBeep(400 + warmProgress * 5, 'triangle', 0.04);
      } else {
        clearInterval(interval);
        setLocalWarmth(98.6);
        setHeartBeats(72);
        setBrewingStatus("따뜻한 인간의 체온(98.6% OF WARMTH)이 주입되었습니다.");
        setIsPouringTea(false);
        
        // Show gift modal with comforting poetic popup
        setShowGiftModal(true);
        
        // DO NOT trigger the global warm amber/brown mode transition, respecting the user's wish.
        // onToggleHumanTouch(true); 
        
        playBeep(880, 'sine', 0.15);
        setTimeout(() => playBeep(1046.50, 'sine', 0.3), 150); // C6 sweet ring
      }
    }, 150);
  };

  return (
    <>
      <div className={`relative border-4 p-4 md:p-6 transition-all duration-700 box-solid-shadow max-w-lg w-full text-center select-none overflow-hidden ${
        humanTouchMode 
          ? 'border-amber-800 bg-[#1C130E] text-amber-100 font-sans shadow-[0_0_20px_rgba(245,158,11,0.15)]' 
          : 'border-electric bg-[#03061C] text-[#1D32FF] font-mono'
      }`}>
        {/* GLITCH OVERLAYS FOR THE RETRO CRT ATMOSPHERE */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-radial-gradient from-transparent to-black" />

        {/* HEADER BAR (90s retro Window style) */}
        <div className={`flex items-center justify-between border-b-2 pb-2 mb-4 ${
          humanTouchMode ? 'border-amber-800/30 text-amber-200' : 'border-[#1D32FF]/30 text-soft-white'
        }`}>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#FF3366] rounded-none animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-tight uppercase">
              POPUP // CORE_EXCEPTION_0X418
            </span>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => {
                setDialogueIndex(0);
                setErrorCount(0);
                setLocalWarmth(41.8);
                setHeartBeats(60);
                setCurrentResponse("이곳은 기계의 효율이 거부되는 틈새입니다.");
                playBeep(600, 'triangle', 0.05);
              }}
              title="Reset system state" 
              className={`p-1 border text-[9px] font-bold uppercase transition-all ${
                humanTouchMode 
                  ? 'border-amber-800/40 text-amber-300 hover:bg-amber-900 hover:text-white' 
                  : 'border-[#1D32FF]/40 hover:bg-[#1D32FF] hover:text-white'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <span className={`px-2 py-0.5 border text-[9px] font-bold ${
              humanTouchMode ? 'border-amber-800 bg-amber-900 text-amber-100' : 'border-[#1D32FF] bg-[#101B7A] text-white'
            }`}>
              RFC 418_
            </span>
          </div>
        </div>

        {/* DETAILED INTERACTIVE INTERFACE TITLE */}
        <h3 className={`font-sans font-bold text-lg md:text-xl tracking-tight mb-2 uppercase ${
          humanTouchMode ? 'text-amber-200' : 'text-white'
        }`}>
          🫖 418 I&apos;m a teapot
        </h3>
        <p className={`text-xs leading-relaxed max-w-sm mx-auto mb-4 ${
          humanTouchMode ? 'text-amber-300/70 font-sans' : 'text-faded-gray/70 font-mono'
        }`}>
          시스템은 완벽한 정답과 신속한 커피를 원하지만, 깊은 우려냄 끝에 나오는 따뜻한 존재가 되기를 선언합니다.
        </p>

        {/* CORE RETRO WINDOW: THE POPUP RITUAL FRAME */}
        <div className={`relative border-2 p-4 mb-5 transition-colors duration-500 text-left ${
          humanTouchMode 
            ? 'border-amber-800/40 bg-[#1D1612] text-amber-100' 
            : 'border-[#1D32FF]/40 bg-[#02040F] text-[#4261FF]'
        }`}>
          
          {/* REQUEST SYSTEM LOGGER SCREEN */}
          <div className="border-b border-[#1D32FF]/20 pb-3 mb-3 text-[10px] font-mono opacity-80 select-text">
            <div className="flex justify-between text-[#FF3366] font-bold select-none text-[9px] mb-1">
              <span>[INCOMING CLIENT REQUEST]</span>
              <span className="animate-pulse">● WAITING_FOR_BURST</span>
            </div>
            {requests.map((reqLine, index) => (
              <div key={index} className="truncate select-text">
                {reqLine}
              </div>
            ))}
          </div>

          {/* ASCII ART INTERACTIVE RETRO TEAPOT PANEL */}
          <div className="my-4 font-mono text-[10px] sm:text-xs text-center leading-tight flex flex-col items-center">
            <motion.pre 
              animate={isPouringTea ? {
                rotate: [0, -3, 3, -3, 0],
                scale: [1, 1.02, 0.98, 1.02, 1]
              } : {}}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className={`font-mono inline-block text-left select-none text-shadow transition-colors duration-500 p-2.5 ${
                humanTouchMode ? 'text-amber-400 font-bold' : 'text-[#1D32FF] font-semibold'
              }`}
            >
  {`   ┌──────────────────────┐
     │      REQUEST :       │
     │      MAKE COFFEE     │
     ├──────────────────────┤
     │                      │
     │         (  )         │
     │          ||          │
     │      .-""""-.        │
     │     /        \\       │
     │    /_ TEA ___\\      │
     │      )     (         │
     │     /       \\        │
     │                      │
     │  ERROR 418           │
     │  I'M A TEAPOT        │
     │                      │
     │  i can offer warmth  │
     │  but not efficiency  │
     │                      │
     └──────────────────────┘`}
            </motion.pre>
          </div>

          {/* DIALOGUE BUBBLE: TEAPOT SPEAKING INTERFACE */}
          <div className={`border p-3 min-h-[72px] relative transition-all flex flex-col justify-between ${
            humanTouchMode 
              ? 'border-amber-800 bg-[#241B16] text-amber-100 font-hand text-lg rotate-[0.5deg]' 
              : 'border-[#1D32FF] bg-[#05081E] text-soft-white font-mono text-xs'
          }`}>
            <div className="absolute -top-2 left-3 px-1 text-[8px] font-mono bg-[#03061C] uppercase tracking-wider select-none text-[#FF3366]">
              [TEAPOT IDENTITY DIALOGUE]
            </div>
            
            <p className="leading-relaxed select-text">
              {currentResponse || "이곳은 기계의 효율이 거부되는 틈새입니다."}
              {isTyping && <span className="animate-ping inline-block ml-0.5">_</span>}
            </p>

            <div className="flex justify-between items-center text-[9px] opacity-60 mt-2 font-mono select-none">
              <span>ERROR: HTTP 418 I&apos;M A TEAPOT</span>
              <span>ATTEMPT: {errorCount}</span>
            </div>
          </div>
        </div>

        {/* CORE ACTION MODULE BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* BREW COFFEE (Force System to fail and dialogue progresses) */}
          <button
            onClick={handleBrewCoffeeRequest}
            disabled={isPouringTea}
            className={`flex-grow py-3 px-4 border-2 font-bold font-sans text-xs transition-all uppercase flex justify-center items-center gap-2 select-none cursor-pointer ${
              humanTouchMode
                ? 'border-amber-800 bg-amber-950/40 text-amber-300 hover:bg-amber-900 hover:text-white'
                : 'border-[#1D32FF] bg-black text-[#1D32FF] hover:bg-[#1D32FF] hover:text-white hover:shadow-[0_0_15px_rgba(29,50,255,0.4)]'
            }`}
          >
            <Coffee className="w-4 h-4" /> 커피 추출 지시 (BREW COFFEE)
          </button>

          {/* MAKE TEA INSTEAD (Success moment representing human touch integration) */}
          <button
            onClick={handleMakeTeaInstead}
            disabled={isPouringTea}
            className={`flex-grow py-3 px-4 border-2 font-bold font-sans text-xs transition-all uppercase flex justify-center items-center gap-2 select-none cursor-pointer ${
              isPouringTea ? 'animate-pulse' : ''
            } ${
              humanTouchMode
                ? 'border-emerald-700 bg-emerald-800 text-white'
                : 'border-emerald-400 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400 hover:text-black hover:shadow-[0_0_15px_rgba(52,211,153,0.4)]'
            }`}
          >
            <Flame className="w-4 h-4 animate-bounce" /> {isPouringTea ? "차 우려내는 중..." : "따뜻한 차로 타협하기 (MAKE TEA)"}
          </button>
        </div>

        {/* CURRENT LIVE TEAPOT telemetry - purely aesthetic & nostalgic */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className={`p-2 border text-left flex flex-col justify-between ${
            humanTouchMode ? 'border-amber-800/30 bg-[#16120F]' : 'border-[#1D32FF]/20 bg-[#05081E]'
          }`}>
            <span className="text-[8px] opacity-60 font-mono block">체온 온도 (WARMTH)</span>
            <span className={`font-sans text-sm font-bold block mt-0.5 ${humanTouchMode ? 'text-amber-200' : 'text-emerald-400'}`}>
              {localWarmth}°C
            </span>
          </div>
          <div className={`p-2 border text-left flex flex-col justify-between ${
            humanTouchMode ? 'border-amber-800/30 bg-[#16120F]' : 'border-[#1D32FF]/20 bg-[#05081E]'
          }`}>
            <span className="text-[8px] opacity-60 font-mono block">심박 주파수 (HEARTRATE)</span>
            <span className={`font-sans text-sm font-bold block mt-0.5 ${humanTouchMode ? 'text-amber-200' : 'text-[#FF3366]'}`}>
              {heartBeats} bpm
            </span>
          </div>
          <div className={`p-2 border text-left flex flex-col justify-between ${
            humanTouchMode ? 'border-amber-800/30 bg-[#16120F]' : 'border-[#1D32FF]/20 bg-[#05081E]'
          }`}>
            <span className="text-[8px] opacity-60 font-mono block">가열 상태 (STATUS)</span>
            <span className={`font-mono text-[9px] font-bold block truncate mt-1 ${isPouringTea ? 'text-[#FF3366] animate-pulse' : 'text-electric'}`}>
              {isPouringTea ? "BREWING..." : humanTouchMode ? "SOOTHING" : "WAIT_OK"}
            </span>
          </div>
        </div>

        {/* EXTRA DECAL FOOTER */}
        {brewingStatus && (
          <div className={`mt-3 text-[9px] font-mono uppercase tracking-wider text-center p-1.5 border border-dashed rounded-none ${
            humanTouchMode ? 'border-amber-800/30 text-amber-200' : 'border-emerald-400/30 text-emerald-400'
          }`}>
            ⚡ {brewingStatus}
          </div>
        )}
      </div>

      {/* ================================================================= */}
      {/* BRAND NEW RETRO "GIFT OF TEA" DIALOG BOX POPUP (오류/선물 창)       */}
      {/* ================================================================= */}
      <AnimatePresence>
        {showGiftModal && (
          <div className="fixed inset-0 bg-black/85 flex items-center justify-center p-4 z-50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 15, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="bg-[#1D1410] border-4 border-amber-800 p-5 md:p-6 max-w-sm w-full box-solid-shadow text-amber-100 text-left relative z-50"
            >
              {/* Windows 95 Retro Style Blue / Amber Title Bar */}
              <div className="bg-[#241B16] text-amber-100 border-b border-amber-800/30 px-2 py-1.5 flex justify-between items-center text-xs font-mono select-none -mx-5 -mt-5 mb-4 font-bold">
                <div className="flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-amber-300 animate-bounce" />
                  <span>CORE_GIFT_RECEIVED.EXE</span>
                </div>
                <button 
                  onClick={() => {
                    setShowGiftModal(false);
                    playBeep(440, 'sine', 0.1);
                  }}
                  className="bg-[#1C130E] text-amber-100 border border-amber-800 hover:bg-amber-900 px-1 py-0.25 font-bold text-xs cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Gift Modal Content */}
              <div className="space-y-4 font-sans">
                <div className="text-center font-bold text-base md:text-lg text-amber-300 border-b border-amber-800/30 pb-2">
                  🎉 따뜻한 위안의 차가 들어왔습니다!
                </div>

                {/* Aesthetic Tea Coupon Aesthetic Component */}
                <div className="bg-[#241B16] border border-dashed border-amber-800/40 p-4 font-mono text-[10px] leading-relaxed relative select-all my-2">
                  <div className="absolute top-2 right-2 text-amber-300/40 uppercase text-[8px] font-bold">
                    TICKET #986
                  </div>
                  <pre className="text-center text-amber-400 text-xs font-bold leading-none mb-3 select-none">
{`    (¯\`v´¯)  )  (  )
     \`•.¸.•´  (  ) (
    .──────. ___
   (________)___)`}
                  </pre>
                  <div className="text-center text-[11px] font-bold text-[#f59e0b] border-b border-amber-800/20 pb-2 mb-2">
                    [ 따뜻한 차 한 잔 교환 보증서 ]
                  </div>
                  <p className="text-[10px] leading-relaxed text-amber-200 text-justify font-sans bg-[#130E0C] p-2.5 rounded-none border border-amber-800/20">
                    &quot;속도의 사회가 그 어느 때보다 빠르고 완벽한 커피를 내리라고 강요할 때, 우리는 이 작고 엉뚱한 틈새에서 기어코 차를 우리며 잠시 멈췄습니다.{"\n\n"}
                    완벽하지 않은 온기와 느린 사유의 여백을 당신의 오늘 하루에 깊이 선물합니다. 잠시 쉬어서 호호 불어 마셔도 괜찮습니다.&quot;
                  </p>
                  <div className="mt-3 flex justify-between text-[8px] text-amber-300/60 uppercase select-none">
                    <span>수신: 서툰 손끝의 당신</span>
                    <span>발행: CON:NECT</span>
                  </div>
                </div>

                <div className="text-xs text-amber-200/70 leading-relaxed text-justify px-1 font-sans">
                  * 본 보증서는 차가운 기술 사회를 살아가는 당신의 자아와 고유한 서사를 응원하는 마음으로 CON:NECT 기획진이 발행한 가상 티켓입니다.
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      setShowGiftModal(false);
                      playBeep(659.25, 'sine', 0.1);
                    }}
                    className="w-full bg-amber-900/60 hover:bg-amber-800 text-amber-100 border border-amber-700 font-bold py-2 px-4 rounded-none text-xs transition-colors cursor-pointer text-center"
                  >
                    따뜻하게 차 한 모금 들이키기 (ACCEPT_GIFT)
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

