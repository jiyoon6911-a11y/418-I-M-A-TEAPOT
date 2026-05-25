import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExhibitionArtifact } from '../types';
import { Layers, Plus, ZoomIn, Eye } from 'lucide-react';

import goodsPinButtons from '../assets/images/goods_pin_buttons_1779454652751.png';
import goodsMemoPad from '../assets/images/goods_memo_pad_1779454669100.png';
import goodsFanLeaflet from '../assets/images/goods_fan_leaflet_1779454684821.png';
import goodsFloorSticker from '../assets/images/goods_floor_sticker_1779454702435.png';

const GOODS_DATA: ExhibitionArtifact[] = [
  {
    id: "pin-01",
    name: "핀버튼 2종 (Pin Buttons)",
    category: "WEARABLE ACCSPEC",
    productionId: "SYS-418-PIN-0x1",
    timestamp: "26.06.02",
    description: "전시의 메인 심볼과 에러 메시지가 인쇄된 핀버튼 2종 세트입니다. 차가운 알루미늄 위에 새겨진 위트 있는 에러 코드로, 일상의 완벽 중심 시스템에 가볍고 유쾌한 사적인 패치(Patch)를 붙여보세요.",
    dimensions: "38mm × 38mm",
    asciiArt: `
     .-------------.
    /   [418-PIN]   \\
   |   ( ) HARDWARE  |
   |   NON-FUNCTIONAL  |
    \\   STILL WARM  /
     '-------------'
    `,
    imageUrl: goodsPinButtons,
    details: ["Raw aluminum core", "전시 공식 심볼 & 로고 2종 구성", "의도적인 스크래치 질감 디자인", "안전 핀 수동 결합 처리"]
  },
  {
    id: "memo-04",
    name: "떡메모지 (Grid Offset Notepad)",
    category: "STATIONERY INTERFACE",
    productionId: "SYS-418-MEMO-0x4",
    timestamp: "26.06.02",
    description: "정적인 좌표계 눈금선(그리드)이 의도적으로 어긋나게 비정렬 처리된 떡메모지입니다. 기계적인 완벽한 정렬에서 벗어나 투박하고 불완전하게 흔들리는 나만의 사유와 영감들을 자유롭게 기록해 보세요.",
    dimensions: "100mm × 100mm (100매)",
    asciiArt: `
     +-----------------+
     | [MEMO: ERROR]   |
     | . . . . . . . . |
     | . . o . . . . . |
     | . . . . . [offset]
     | . . . . . . . . |
     +-----------------+
    `,
    imageUrl: goodsMemoPad,
    details: ["모조지 100g 펜라이팅 최적화", "의도적으로 비틀린 정렬 선박 정밀 가공", "상단 친환경 수성 본드 제본", "아날로그 연필 필기 자국 미세 가공"]
  },
  {
    id: "leaflet-99",
    name: "부채 리플렛 (Fan Booklet Leaflet)",
    category: "DIGITAL TEXTURED PRINT",
    productionId: "SYS-418-FLY-0x9",
    timestamp: "26.06.02",
    description: "부채 모티프 접지를 적용하여 손쉬운 부채질과 동시에 3차원 아카이빙 폴딩을 보여주는 안내 리플렛입니다. 한여름 캠퍼스라이프센터(CLC) 전시장 내부를 시원하게 보조하며 418 가이드 지도를 색다른 손끝의 촉각으로 즐겨보세요.",
    dimensions: "아코디언 지그재그 리플렛",
    asciiArt: `
      /\\/\\/\\/\\/\\/\\/\\
     / / / / / / / /
    / / / / / / / /
   / / / / / / / /
   \\_\\_\\_\\_\\_\\_\\_/
    `,
    imageUrl: goodsFanLeaflet,
    details: ["르네상스 러프 백색 240g 고급지 적용", "아코디언 콘체르티나 수동 정밀 접지 가공", "전시장 1~2층 지도 수록 및 프로젝트 연결", "오프라인 터미널 커맨드 가이드 수록"]
  },
  {
    id: "sticker-07",
    name: "바닥 스티커 (Floor Sticker Decal)",
    category: "TACTILE INTERFERENCE",
    productionId: "SYS-418-STK-0x7",
    timestamp: "26.06.02",
    description: "캠퍼스라이프센터(CLC) 전시장 바닥 도처에 스티킹되어 오프라인 물리적 공간 내에서 '인간 존'과 '에러 구역'을 분리 식별시키는 거대 고대비 PVC 플로어 데칼입니다. 눈길이 머무는 발걸음 아래서 위트 있는 에러 코드를 발견해 보세요.",
    dimensions: "300mm × 300mm",
    asciiArt: `
     +=================+
     |  WARNING ACTION |
     |  HUMAN OCCUPANT |
     |  ZONE_9459_CORE |
     |  STEP REGULATED |
     +=================+
    `,
    imageUrl: goodsFloorSticker,
    details: ["고강도 방수/마찰 보호 특수 코팅 PVC 데칼", "강력 탈부착형 점착제 적용 (바닥 흔적 최소화)", "비비드 퍼플/일렉트릭 블루 형광 인쇄 마감", "현장 동선 유도 라벨 프린팅"]
  }
];

export default function Component({ humanTouchMode }: { humanTouchMode: boolean }) {
  const [selectedArtifact, setSelectedArtifact] = useState<ExhibitionArtifact | null>(null);
  const [simulatedInventoryLoad, setSimulatedInventoryLoad] = useState<number>(0);
  const [successLogs, setSuccessLogs] = useState<string[]>([]);

  const addToInventory = (artifactName: string) => {
    setSimulatedInventoryLoad(prev => Math.min(prev + 25, 418));
    const timestamp = new Date().toLocaleTimeString();
    
    setSuccessLogs(prev => [
      ...prev.slice(-4),
      `[${timestamp}] 굿즈 목록 아카이브 완료 // 로드 상태: ${Math.min(simulatedInventoryLoad + 25, 418)}ml/418ml`
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
          <h2 className="font-sans font-bold text-3xl md:text-6xl text-soft-white tracking-tighter uppercase">
            전시 공식 굿즈 <span className="text-electric vibrant-glitch-shadow h1-shadow">COMPONENTS</span>
          </h2>
          <p className="font-mono text-xs text-faded-gray/70 mt-2 max-w-xl">
            전시 현장에서 실제로 만나볼 수 있는 418 공식 굿즈 라인업입니다. 차가운 기계적 외형 속에 스며든 유쾌한 오류 코드를 직접 조작하고 소장해 보세요.
          </p>
        </div>
        
        {/* SIMULATED SYSTEM LIQUID BAR */}
        <div className="w-full md:w-64 p-3 bg-royal/40 border border-electric/30 rounded-none flex flex-col gap-1.5 select-none box-solid-shadow">
          <div className="flex justify-between font-mono text-[9px] text-soft-white">
            <span>STEAM VESSEL TEMPERATURE</span>
            <span className="text-electric font-bold">{simulatedInventoryLoad}ml / 418ml</span>
          </div>
          <div className="w-full h-2 bg-royal border border-electric/40 overflow-hidden relative">
            <motion.div 
              animate={{ width: `${(simulatedInventoryLoad / 418) * 100}%` }}
              className="h-full bg-electric brightness-125 font-bold"
            />
          </div>
          <span className="font-mono text-[8px] text-faded-gray/60 italic text-right">
            {simulatedInventoryLoad >= 418 ? "⚠️ 수분 가열 한계 돌파 // 418 완료" : "* 플러스 버튼을 눌러 스팀을 가동하세요 *"}
          </span>
        </div>
      </div>

      {/* COMPONENT ARCHIVE LISTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {GOODS_DATA.map((artifact) => (
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
              {artifact.imageUrl && (
                <div className="relative w-full aspect-16/10 mb-5 overflow-hidden border border-electric/25 bg-[#04061A]">
                  <img 
                    src={artifact.imageUrl} 
                    alt={artifact.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-all filter brightness-[0.85] contrast-[1.1]"
                  />
                  <div className="absolute top-2 right-2 bg-royal/80 border border-electric/30 px-2 py-0.5 font-mono text-[8.5px] text-electric backdrop-blur-xs">
                    OFFICIAL MOCKUP
                  </div>
                </div>
              )}

              <span className="font-mono text-[9px] px-2 py-0.5 border border-electric/30 rounded-full inline-block text-electric uppercase select-none mb-3">
                {artifact.category}
              </span>
              <h3 className="font-sans text-xl font-bold text-soft-white tracking-tight">{artifact.name}</h3>

              <p className="font-sans text-xs text-faded-gray leading-relaxed mb-4 mt-3">
                {artifact.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-electric/10 pt-4 text-faded-gray/60 select-none">
                <div>규격/스펙: <span className="text-soft-white font-medium">{artifact.dimensions}</span></div>
                <div>유형: <span className="text-emerald-400 font-medium font-bold">실물 소장 굿즈</span></div>
              </div>
            </div>

            {/* Interactive footer links */}
            <div className="px-6 py-4 bg-royal/20 border-t border-electric/10 flex justify-between items-center">
              <button 
                onClick={() => setSelectedArtifact(artifact)}
                className="font-mono text-xs text-soft-white border border-electric/45 bg-royal/40 px-3 py-1.5 hover:bg-electric hover:border-soft-white hover:text-soft-white transition-all cursor-pointer rounded-none inline-flex items-center gap-1.5"
              >
                <ZoomIn className="w-3.5 h-3.5" /> 상세 스펙 개방
              </button>

              <button
                onClick={() => addToInventory(artifact.name)}
                className="w-10 h-10 border-2 border-electric flex items-center justify-center text-electric hover:text-soft-white hover:bg-electric transition-all cursor-pointer select-none"
                title="Archival Liquid Input"
              >
                <Plus className="w-5 h-5 pointer-events-none" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SIMULATED INVENTORY FEEDBACK PANEL */}
      {successLogs.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-2 border-electric bg-[#06081F] p-4 font-mono text-[11px] text-emerald-300 w-full mb-12 select-none box-solid-shadow"
        >
          <div className="flex justify-between border-b border-electric/20 pb-2 mb-2 font-bold text-soft-white">
            <span>REAL-TIME INVENTORY STREAM // OVERRIDE LOGS</span>
            <span className="text-amber-400 animate-pulse">● STEAMING ON-THE-AIR</span>
          </div>
          <div className="space-y-1.5">
            {successLogs.map((log, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{log}</span>
                <span className="text-royal">STATUS_OK</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ARTIFACT DETAILED MODAL */}
      <AnimatePresence>
        {selectedArtifact && (
          <div className="fixed inset-0 z-50 bg-royal/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#050720] border-2 border-electric rounded-none max-w-xl w-full overflow-hidden shadow-2xl"
            >
              {/* Modal Top Metadata */}
              <div className="bg-electric px-4 py-3 text-soft-white font-mono text-xs flex justify-between items-center">
                <span>INSPECTING HARDWARE COMPONENT // {selectedArtifact.productionId}</span>
                <button 
                  onClick={() => setSelectedArtifact(null)}
                  className="bg-royal font-bold hover:bg-[#FF3366] text-white px-2 py-0.5 rounded-none text-[10px] cursor-pointer"
                >
                  CLOSE_STREAM
                </button>
              </div>

              {/* Modal Core Contents */}
              <div className="p-6 space-y-6">
                <div className="flex gap-4">
                  {selectedArtifact.imageUrl && (
                    <div className="w-24 h-24 flex-shrink-0 border border-electric/40 bg-[#04061A] overflow-hidden">
                      <img 
                        src={selectedArtifact.imageUrl} 
                        alt="Thumbnail" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <span className="font-mono text-[9px] text-electric uppercase font-bold tracking-widest">{selectedArtifact.category}</span>
                    <h3 className="font-sans font-bold text-2xl text-soft-white tracking-tight mt-1">{selectedArtifact.name}</h3>
                    <p className="font-mono text-[10px] text-faded-gray/50 mt-1 select-none">RECORDED METADATA AT {selectedArtifact.timestamp}</p>
                  </div>
                </div>

                {/* Larger ASCII representation */}
                <div className="bg-[#080B22] p-4 border border-electric/30 rounded-none font-code text-[11px] text-amber-300 font-mono flex items-center justify-center whitespace-pre overflow-x-auto min-h-[140px] select-none">
                  {selectedArtifact.asciiArt}
                </div>

                <div>
                  <h4 className="font-mono text-xs text-soft-white mb-2 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-electric" /> 소재 가공 및 세부 구성 사항:
                  </h4>
                  <ul className="text-xs text-faded-gray/90 space-y-1.5 pl-4 list-disc font-mono">
                    {selectedArtifact.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>

                {humanTouchMode && (
                  <div className="p-3 bg-amber-500/10 border border-amber-400 font-hand text-lg text-amber-300 rotate-[-1deg] select-none">
                    ✨ Handwritten log: &quot;전시 공간에서 부담 없이 집어가세요. 세상을 환기하는 아주 작은 균열이 될 것입니다.&quot;
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="bg-royal/30 px-6 py-4 border-t border-electric/20 flex gap-4">
                <button 
                  onClick={() => {
                    addToInventory(selectedArtifact.name);
                    setSelectedArtifact(null);
                  }}
                  className="flex-1 bg-electric hover:bg-[#FF3366] text-soft-white font-mono text-xs py-2 rounded-none text-center transition-all cursor-pointer"
                >
                  LOAD RAW PHYSICAL OBJECT INTO HEATER LIQUID
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
