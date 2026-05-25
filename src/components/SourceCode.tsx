import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, AlertTriangle, Eye, ShieldAlert, Heart, Terminal } from 'lucide-react';

export default function SourceCode({ humanTouchMode }: { humanTouchMode: boolean }) {
  const [unlockedSubtext, setUnlockedSubtext] = useState<Record<string, boolean>>({
    intent: true,
    theme: true,
    concept: true,
  });

  const toggleSubtext = (id: string) => {
    setUnlockedSubtext(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="relative w-full min-h-screen py-12 px-4 md:px-8 max-w-5xl mx-auto z-10">
      
      {/* HEADER SECTION */}
      <div className="border-b border-electric/35 pb-6 mb-12">
        <span className="font-mono text-[9px] text-electric tracking-widest block mb-1 uppercase">
          // SYS.DOCUMENTATION // SPEC_418 // SOURCE CODE
        </span>
        <h2 className="font-sans font-bold text-3xl md:text-6xl text-soft-white tracking-tighter uppercase">
          ② SOURCE CODE: <span className="text-electric vibrant-glitch-shadow h1-shadow">기획 및 의도</span>
        </h2>
        <p className="font-mono text-xs text-faded-gray/70 mt-3 max-w-xl">
          차가운 디지털 시스템의 틈새에서 발견되는 인간다움을 탐구하는 디인예 기말 전시회의 기획 의도 및 핵심 가치를 기록합니다.
        </p>
      </div>

      {/* RHYTHMIC LAYOUT: SECTION 1: THE MANIFESTO */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-4">
          <div className="sticky top-24 font-mono text-xs text-electric space-y-4">
            <div className="p-4 bg-royal/40 border-2 border-electric rounded-none box-solid-shadow">
              <span className="font-bold block text-soft-white mb-2">[0x418] PRIMARY METADATA</span>
              <ul className="space-y-1 text-[10px] text-faded-gray/90">
                <li>• Major: 디지털인문예술전공</li>
                <li>• Core: Human Touch (휴먼 터치)</li>
                <li>• Status: Cold Brew Rejected</li>
                <li>• Device: Standard Teapot</li>
              </ul>
            </div>
            
            {humanTouchMode && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-amber-50/15 border border-amber-400 font-hand text-lg text-amber-300 rotate-1 shadow-lg"
              >
                * 커피를 요구하는 완벽한 세상, 따뜻함을 머금은 투박한 차 한 잔.
              </motion.div>
            )}
          </div>
        </div>

        <div className="md:col-span-8 space-y-10">
          
          {/* SECTION 1: 기획 의도 */}
          <div className="border-2 border-electric bg-royal/30 p-6 box-solid-shadow relative">
            <span className="font-mono text-[10px] text-electric/80 block mb-1">[DECLARATION_01 // 기획 의도]</span>
            <h3 className="font-sans text-xl font-bold text-soft-white mb-4">
              기술의 고도화와 인간적인 빈틈
            </h3>
            <p className="font-sans text-sm text-faded-gray/90 leading-relaxed text-justify space-y-4">
              기술이 일상의 많은 부분을 대신하면서 우리는 그 어느 때보다 효율을 중시하는 사회에서 살고 있다. 
              AI가 정교한 결과물을 내놓고 많은 과정이 자동화되는 흐름은 효율적이지만 한편으로는 정해진 정답만 가득한 딱딱한 인상을 주기도 한다. 
              인간의 능력을 추월하고 완벽한 정답을 제시하는 시대가 도래함에 따라, 역설적으로 사회는 기술이 흉내 낼 수 없는 ‘인간의 흔적’에 주목하기 시작했다.
            </p>
            <p className="font-sans text-sm text-faded-gray/90 mt-3 leading-relaxed text-justify">
              모든 과정이 자동화되고 매끄럽게 흘러가는 디지털 환경 속에서 사람들은 정교한 알고리즘보다 투박하더라도 진정성이 느껴지는 정서적 연결에 더 큰 가치를 부여한다. 
              기술이 고도화될수록 그 이면에 숨겨진 창작자의 사유와 의도적인 빈틈이 인간다움을 증명하는 핵심 요소가 된 것이다.
            </p>
            <p className="font-sans text-sm text-faded-gray/90 mt-3 leading-relaxed text-justify">
              이번 전시는 이러한 사회적 흐름을 바탕으로, 디지털 시스템의 틈새에서 발견되는 인간다움을 탐구하고자 한다. 
              이는 곧 디지털 기술을 단순한 효율의 도구를 넘어, 인간 본성을 이해하는 새로운 렌즈로 삼고자 하는 &apos;디지털인문예술전공&apos;의 방향성과 맞닿아 있다. 
              우리는 기술과 시스템 속에 의도적인 빈틈을 부여하는 방식을 통해, 최신 기술 시대에 인문학이 어떻게 새로운 통찰을 발굴하고 그 깊이를 확장할 수 있는지 그 구체적인 가능성을 제시하고자 한다.
            </p>
          </div>

          {/* DENSE CODE WINDOW */}
          <div className="border-2 border-electric rounded-none bg-[#0A0D30] overflow-hidden box-solid-shadow">
            <div className="bg-royal/30 px-4 py-2 border-b-2 border-electric flex justify-between items-center">
              <span className="font-mono text-[10px] text-soft-white flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#FF3366] inline-block animate-pulse" />
                tea_handler.cpp // Human Touch State
              </span>
              <Terminal className="w-3.5 h-3.5 text-electric" />
            </div>
            <pre className="p-4 font-mono text-[11px] leading-relaxed text-emerald-400 overflow-x-auto">
{`#include <humanity.h>

int handle_request(Request req) {
  if (req.is_perfect_algorithm() == true) {
    // 인간적인 빈틈과 사유를 주입하여 정형화된 시스템을 환기합니다.
    inject_human_error(0x418);
    return HTTP_IM_A_TEAPOT; 
  }
  
  if (req.has_warm_touch() == true) {
    return STATUS_GENUINE_CONNECTION;
  }
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* SECTION 2: THE EXHIBITION THEME & CONCEPT */}
      <div className="space-y-8 mb-16 mt-16">
        
        {/* EXHIBITION THEME // HUMAN TOUCH */}
        <div className="border-2 border-electric bg-royal/15 p-6 md:p-8 rounded-none relative box-solid-shadow">
          <div className="absolute top-4 right-4 text-electric/30">
            <ShieldAlert className="w-8 h-8" />
          </div>
          
          <span className="font-mono text-[10px] text-amber-500 block mb-1 uppercase font-bold">
            [EXHIBITION THEME // 전시 주제]
          </span>
          <h3 className="font-sans text-2xl font-bold text-soft-white mb-4">
            휴먼 터치 (Human touch)
          </h3>
          <p className="font-sans text-sm text-faded-gray/95 leading-relaxed text-justify space-y-4">
            이번 전시의 중심 주제는 ‘휴먼 터치(Human touch)’이다. 이는 차가운 디지털 매체 안에 어떻게 인간의 온기를 담아낼 수 있을지에 대한 깊은 고민에서 시작되었다. 
            고도화된 기술로 기계적인 완벽함 및 매끄러운 결과값이 당연해진 시대지만, 사람들은 역설적으로 완벽하게 통제된 시스템 속에서 투박하더라도 진정성이 느껴지는 &apos;인간의 흔적&apos;을 갈망한다. 
            오차 없는 알고리즘이 정답을 제시할지라도, 우리의 마음을 진정으로 움직이는 것은 결국 사람의 감수성과 시선이 묻어나는 불완전한 순간들이다.
          </p>
          <p className="font-sans text-sm text-faded-gray/95 mt-3 leading-relaxed text-justify">
            본 전시는 기술이 인간을 소외시키는 차가운 도구로 전락하는 것을 경계하며, 오히려 인간의 내면을 연결하는 따뜻하고 유연한 매개체로 기능할 수 있는 가능성을 탐구한다. 
            거대한 시스템의 표면 아래에 존재하는 작가의 고민과 의도적인 빈틈을 보여줌으로써, 매끄러운 자동화의 물결 속에서도 결코 지워지지 않는 고유한 인간다움을 증명하고자 한다.
          </p>
        </div>

        {/* CONCEPT // 418 I'M A TEAPOT */}
        <div className="border-2 border-electric bg-[#0c144a] p-6 md:p-8 rounded-none relative box-solid-shadow">
          <span className="font-mono text-[10px] text-purple-400 block mb-1 uppercase font-bold">
            [CORE CONCEPT // 전시 핵심 콘셉트]
          </span>
          <h3 className="font-sans text-2xl font-bold text-soft-white mb-4">
            418 I&apos;m a teapot
          </h3>
          <p className="font-sans text-sm text-faded-gray/95 leading-relaxed text-justify space-y-4">
            전시의 핵심 콘셉트인 ‘418 I’m a teapot’은 1998년 만우절 농담에서 유래한 기술 표준으로, 
            커피를 내리라는 명령에 대해 서버가 &quot;나는 찻주전자이기에 커피를 내릴 수 없다&quot;고 응답하며 거절하는 상황을 뜻한다. 
            이는 시스템의 단순한 기능 정지가 아니라, 자신의 정체성과 맞지 않는 요청에 대해 명확하게 ‘나다움’을 밝히며 유쾌하게 응답을 거부하는 인간적인 위트를 상징한다.
          </p>
          <p className="font-sans text-sm text-faded-gray/95 mt-3 leading-relaxed text-justify">
            이번 전시에서는 이 개념을 효율 중심의 시스템 속에서 창작자의 자아를 드러내는 방식으로 풀어내고자 한다. 
            모두가 자동화된 툴을 이용해 정답을 내놓으려 할 때, 우리는 오히려 의도적인 오류와 엉뚱한 응답을 통해 기술 너머에 사람이 살고 있음을 보여준다. 
            이는 단순히 시스템의 오류를 재현하는 것을 넘어, 정해진 매뉴얼에서 벗어나 자신의 고유한 서사를 지켜내려는 능동적인 태도를 의미한다. 
            결과적으로 이러한 의도적 오류는 기술을 단순한 효율성의 도구가 아닌, 개인의 정체성을 투영하는 ‘휴먼 터치(Human touch)’의 매개체로 작용할 것이다.
          </p>
        </div>

      </div>

      {/* SYSTEM OVERLAY WARNING */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-rose-500/30 bg-rose-950/15 text-rose-300 rounded-none font-mono text-[11px] leading-relaxed">
          <p className="font-bold flex items-center gap-1.5 text-rose-400 mb-1">
            <AlertTriangle className="w-4 h-4 cursor-help" />
            CRITICAL LEAK REGISTERED:
          </p>
          &quot;Memory address 0xFF0418 has stored a series of personal text messages instead of production telemetry. This has caused a permanent drop in compiler speed.&quot;
        </div>
        <div className="p-4 border border-electric/30 bg-royal/20 text-electric rounded-none font-mono text-[11px] leading-relaxed">
          <p className="font-bold flex items-center gap-1.5 text-soft-white mb-1">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline-block" />
            HUMAN RECOVERY VERDICT:
          </p>
          &quot;Do not purge the leaked registers. The error messages are the only meaningful evidence that this software was commissioned by breathing beings.&quot;
        </div>
      </div>

    </div>
  );
}
