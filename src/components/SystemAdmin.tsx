import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Shield, Terminal, Settings, HardDrive, RefreshCw, Cpu, BookOpen, Globe, Instagram, ExternalLink } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  clearance: string;
  status: string;
  matricule: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "📸 인스타그램",
    role: "박근영, 김미소, 김주연, 김지혜",
    clearance: "SYS_LEVEL_01_PROMO",
    status: "🔥 HOT_BOILING",
    matricule: "CONNECT-DEP-01"
  },
  {
    name: "💻 웹 기획 및 제작",
    role: "홍지윤, 손예빈, 김주연",
    clearance: "SYS_LEVEL_02_DEV",
    status: "👾 ACTIVE_GLITCH",
    matricule: "CONNECT-DEP-02"
  },
  {
    name: "🧸 굿즈",
    role: "박근영, 김미소, 이정연, 손예빈, 현나경",
    clearance: "SYS_LEVEL_03_GOODS",
    status: "☕ WARM_STANDBY",
    matricule: "CONNECT-DEP-03"
  },
  {
    name: "🎪 현장 연출",
    role: "홍지윤, 이정연, 현나경, 손예빈, 김재홍",
    clearance: "SYS_LEVEL_04_SPACE",
    status: "🔥 HOT_BOILING",
    matricule: "CONNECT-DEP-04"
  }
];

export default function SystemAdmin({ humanTouchMode }: { humanTouchMode: boolean }) {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "BOOTING CON:NECT FLUX PORT v3.02...",
    "관리자 권한 인증 성공 // 포트 스캔 승인 완료.",
    "도움말을 보려면 'help'를 입력하세요."
  ]);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let reply: string[] = [];

    switch (cmd) {
      case 'help':
        reply = [
          `> ${terminalInput}`,
          "--- CON:NECT 터미널 사용 가능 명령어 목록 ---",
          "help          도움말 및 데이터 채널 가이드 로드",
          "steam         가압 보일러 스팀 수치 주입 진행",
          "fingerprint   터미널 정전식 패드 지문 측정",
          "system_logs   서버 히스토리 로깅 로그 덤프 출력",
          "clear         화면 덤프 지우기",
          "--------------------------------------------"
        ];
        break;
      case 'steam':
        reply = [
          `> ${terminalInput}`,
          "🔥 보일러 강제 주입 가열 프로토콜 개시...",
          "알림: 프로세서 내부 하우징 수증기 온도 102.5°C 도달.",
          "의도적 수막 접촉 안전 변이 정상 분출 제어 개방 완료!"
        ];
        break;
      case 'fingerprint':
        reply = [
          `> ${terminalInput}`,
          "🔍 정전식 스캔 패널 응답 추적 중...",
          "손끝 유입 오차 지문 감지되었습니다.",
          "   .-----------.",
          "  /  ( ) ( )    \\",
          " |  (  ( )  )   |",
          "  \\  ( ) ( )   /",
          "   '-----------'",
          "인간성 확인 필터 결과: PASS",
          "\"디지털 시스템 너머, 온기를 주는 인간의 터치를 승인합니다.\""
        ];
        break;
      case 'system_logs':
        reply = [
          `> ${terminalInput}`,
          "LOG: 02일 11:32:04 -> SYS_STANDBY // 에러 코드 활성 로드 완료",
          "LOG: 02일 11:45:15 -> WARNING // 수분 이탈 경보 차단 처리됨",
          "LOG: 02일 12:00:01 -> CRITICAL // 지나치게 인간적인 온도로 복구 거부"
        ];
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput("");
        return;
      default:
        reply = [
          `> ${terminalInput}`,
          `오류: Command "${terminalInput}" 을(를) 인식하지 못했습니다.`,
          "예외 조치: HTTP EXCEPTION STATUS CODE 418"
        ];
        break;
    }

    setTerminalLogs(prev => [...prev, ...reply]);
    setTerminalInput("");
  };

  const forceRefreshDiagnostics = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      setTerminalLogs(prev => [
        ...prev,
        `> DIAG_FORCED 완료 [${new Date().toLocaleTimeString()}] // 센서 패리티 체크 리셋 완료`
      ]);
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen py-12 px-4 md:px-8 max-w-6xl mx-auto z-10 text-left">
      
      {/* SECTION TOP HEADER */}
      <div className="border-b border-electric/30 pb-6 mb-12 select-none">
        <span className="font-mono text-[9px] text-electric tracking-widest block mb-1 uppercase">
          // UTILITY_CONSOLE // ROOT_ADMINISTRATOR // SYSTEM CONTROL
        </span>
        <h2 className="font-sans font-bold text-3xl md:text-6xl text-soft-white tracking-tighter uppercase flex flex-col md:flex-row md:items-baseline">
          <span>⑤ System Admin</span>
        </h2>
        <p className="font-mono text-xs text-faded-gray/70 mt-2 max-w-xl">
          디지털인문예술 동아리 CON:NECT 및 시스템 분석 도구를 관리 제어하는 어드민 콘솔 패널입니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: ACTIVE DATA TABLES RECORDRAL - Span 7 */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CLUB CON:NECT INTRODUCDTION */}
          <div className="border-2 border-electric bg-[#050720] p-6 box-solid-shadow relative">
            <div className="absolute top-4 right-4 text-electric select-none">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-sans text-lg font-bold text-soft-white mb-3 flex items-center gap-2 uppercase">
              디지털인문예술 동아리 <span className="text-electric font-mono">CON:NECT</span>
            </h3>
            <p className="font-sans text-xs text-faded-gray leading-relaxed text-justify mb-5">
              <strong>CON:NECT</strong>는 한림대학교 디지털인문예술 전공 문화·콘텐츠 동아리로 콘텐츠 매체를 활용해 사람과 문화를, 문화와 예술을 이어주는 연결점이 되겠다는 의미를 내포하고 있습니다. ✨
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href="https://sites.google.com/glab.hallym.ac.kr/connect/home?authuser=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-electric bg-electric/10 hover:bg-electric text-white font-sans text-xs font-bold transition-all cursor-pointer box-solid-shadow"
              >
                <Globe className="w-4 h-4" />
                <span>공식 홈페이지 방문</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>
              <a 
                href="https://www.instagram.com/connect.archive?igsh=a2IzOHdoNTdoaXRv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-electric bg-electric/10 hover:bg-electric text-white font-sans text-xs font-bold transition-all cursor-pointer box-solid-shadow"
              >
                <Instagram className="w-4 h-4" />
                <span>공식 인스타그램 아카이브</span>
                <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
              </a>
            </div>
          </div>

          <div className="border-2 border-electric bg-royal/10 p-6 relative box-solid-shadow">
            <h3 className="font-sans text-lg font-bold text-soft-white mb-4 flex items-center gap-2 uppercase">
              <Users className="w-5 h-5 text-electric" /> 팀원 프로필 및 역할 분담 (ROLES DIRECTORY)
            </h3>

            {/* RESPONSIVE TABLE CONTAINER */}
            <div className="overflow-x-auto w-full">
              <table className="w-full font-mono text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-electric/30 text-electric text-[10px] select-none">
                    <th className="pb-2 font-bold uppercase">성명 / ID</th>
                    <th className="pb-2 font-bold uppercase">담당 직제 / 기여 세부</th>
                    <th className="pb-2 font-bold uppercase">승인 레벨</th>
                    <th className="pb-2 font-bold uppercase">현재 온도</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-electric/10 text-faded-gray">
                  {TEAM_MEMBERS.map((member, index) => (
                    <tr key={index} className="hover:bg-royal/25 duration-150">
                      <td className="py-4">
                        <div className="font-bold text-soft-white">{member.name}</div>
                        <div className="text-[9px] text-faded-gray/50">{member.matricule}</div>
                      </td>
                      <td className="py-4 text-[11px] leading-tight max-w-[200px] text-justify">{member.role}</td>
                      <td className="py-4 text-[10px] text-electric font-semibold">{member.clearance}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded-none text-[9px] inline-block font-semibold ${
                          member.status.includes('BOILING') 
                            ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400' 
                            : member.status.includes('GLITCHING') 
                            ? 'bg-electric/10 border border-electric/30 text-electric animate-pulse' 
                            : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* HUMAN TRACE ANNOTATION */}
            {humanTouchMode && (
              <div className="mt-6 p-4 bg-amber-500/10 border border-amber-400 font-hand text-lg text-amber-200 rotate-[0.5deg] select-none">
                💡 기획진 비하인드 코멘트: &quot;서툰 손끝을 모아 완성했습니다. 불완전하기에 비로소 숨 쉴 수 있는 전시회가 되었기를 바래봅니다.&quot;
              </div>
            )}
          </div>

          {/* DIAGNOISTIC HARDWARE STATE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 select-none">
            <div className="border border-electric p-4 bg-royal/10 flex flex-col justify-between box-solid-shadow">
              <span className="font-mono text-[9px] text-faded-gray/50 block">스팀 물 가열 충전량</span>
              <span className="font-sans text-2xl font-bold text-soft-white block mt-1">418ml / 418ml</span>
              <div className="mt-2 h-1 bg-royal overflow-hidden">
                <div className="h-full bg-electric w-[100%]" />
              </div>
            </div>

            <div className="border border-electric p-4 bg-royal/10 flex flex-col justify-between box-solid-shadow">
              <span className="font-mono text-[9px] text-faded-gray/50 block">인간 예술 감수 수치</span>
              <span className="font-sans text-2xl font-bold text-emerald-400 block mt-1">98.42%</span>
              <div className="mt-2 h-1 bg-royal overflow-hidden">
                <div className="h-full bg-emerald-400 w-[98%]" />
              </div>
            </div>

            <div className="border border-electric p-4 bg-royal/10 flex flex-col justify-between box-solid-shadow">
              <span className="font-mono text-[9px] text-faded-gray/50 block">기계 강제 최적 효율화도</span>
              <span className="font-sans text-2xl font-bold text-rose-500 block mt-1">0.00%</span>
              <div className="mt-2 h-1 bg-royal overflow-hidden">
                <div className="h-full bg-rose-500 w-[0%]" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TERMINAL CONSOLE PORT - Description 5 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-2 border-emerald-400/40 bg-[#04061A] p-6 text-emerald-400 relative box-solid-shadow">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <RefreshCw 
                onClick={forceRefreshDiagnostics}
                className={`w-4 h-4 cursor-pointer hover:text-white ${isDiagnosticRunning ? 'animate-spin' : ''}`} 
              />
              <Terminal className="w-4 h-4 text-emerald-400" />
            </div>

            <h3 className="font-sans text-base font-bold text-white mb-2 flex items-center gap-1.5 label select-none uppercase">
              콘셉트 터미널 // CORE_SHELL_SH
            </h3>
            <p className="font-mono text-[10px] text-faded-gray/60 mb-4 select-none">
              전시장 인터랙션 모듈과의 메인 통로를 흉내냅니다. 명령을 하단에 타이핑하세요.
            </p>

            {/* SCREEN PORT FOR LOG VIEW */}
            <div className="bg-[#02030B] border border-emerald-400/20 p-3 h-64 overflow-y-auto rounded-none font-mono text-[10px] space-y-1 select-all">
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed select-text">
                  {log}
                </div>
              ))}
            </div>

            {/* COMMAND PROMPT ENTRY */}
            <form onSubmit={handleCommandSubmit} className="flex gap-2">
              <span className="font-mono text-emerald-400 select-none font-bold align-middle pt-1.5">&gt;</span>
              <input 
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="도움말: 'help', 'steam', 'fingerprint' 입력..."
                className="flex-grow bg-royal/40 border border-emerald-400/40 text-emerald-300 rounded-none px-2.5 py-1 text-xs font-mono outline-none focus:border-emerald-400"
              />
              <button 
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs px-3 rounded-none cursor-pointer"
              >
                송신_
              </button>
            </form>
          </div>

          {/* ACCESS RULES SPEC GRID */}
          <div className="border-2 border-electric p-4 bg-royal/10 font-mono text-[10px] text-faded-gray/50 space-y-2 select-none box-solid-shadow">
            <div className="font-bold text-soft-white mb-1 uppercase text-electric">[시스템 접근 규칙 사항]</div>
            <div>[RULES_01] 본 디바이스 노드는 1:1 촉각 아날로그 링크를 우선시합니다.</div>
            <div>[RULES_02] 지인간 사랑과 불완전성 상태 정보가 지속 가습 주입 완료되어 있습니다.</div>
            <div>[RULES_03] 418 가열 스팀 주전자의 물리 파워 플러그를 절대로 뽑지 마십시오.</div>
          </div>
        </div>

      </div>

    </div>
  );
}
