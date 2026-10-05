import React, { useState, useEffect, useRef } from 'react';
import { CREST_LOGO_URL, STADIUM_PITCH_URL } from '../../data/mockData';

interface LiveMatchScreenProps {
  onExitToHub: () => void;
}

export const LiveMatchScreen: React.FC<LiveMatchScreenProps> = ({ onExitToHub }) => {
  const [activeTactic, setActiveTactic] = useState<'park' | 'balanced' | 'attacking' | 'allout'>('attacking');
  const [isPaused, setIsPaused] = useState(false);
  const [cameraMode, setCameraMode] = useState<'broadcast' | 'coop' | 'tactical'>('broadcast');
  const [activePlayer, setActivePlayer] = useState({
    name: 'K. DE BRUYNE',
    num: '91',
    role: 'CAM',
    stamina: 84,
  });
  const [homeScore, setHomeScore] = useState(2);
  const [awayScore] = useState(1);
  const [seconds, setSeconds] = useState(78 * 60 + 47);
  const [commentary, setCommentary] = useState<string | null>(null);
  const [ballPosition, setBallPosition] = useState({ x: 45, y: 58 });
  const [isShooting, setIsShooting] = useState(false);
  const [shotPower, setShotPower] = useState(0);

  // Joystick touch/mouse state
  const joystickBaseRef = useRef<HTMLDivElement>(null);
  const [joystickDelta, setJoystickDelta] = useState({ x: 0, y: 0 });
  const [isDraggingJoystick, setIsDraggingJoystick] = useState(false);

  // Live match clock
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  // Format clock mm:ss
  const formattedMinutes = Math.floor(seconds / 60);
  const formattedSeconds = seconds % 60;
  const timeString = `${formattedMinutes}:${formattedSeconds < 10 ? '0' : ''}${formattedSeconds}`;

  // Handle Joystick drag
  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!joystickBaseRef.current) return;
    const rect = joystickBaseRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const maxRadius = rect.width / 2 - 28;

    let deltaX = clientX - centerX;
    let deltaY = clientY - centerY;
    const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (dist > maxRadius) {
      deltaX = (deltaX / dist) * maxRadius;
      deltaY = (deltaY / dist) * maxRadius;
    }

    setJoystickDelta({ x: deltaX, y: deltaY });

    // Move player / ball slightly with joystick
    setBallPosition((prev) => ({
      x: Math.max(30, Math.min(70, 45 + deltaX / 5)),
      y: Math.max(40, Math.min(70, 58 + deltaY / 5)),
    }));
  };

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDraggingJoystick(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    handlePointerMove(clientX, clientY);
  };

  useEffect(() => {
    const handleGlobalMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingJoystick) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      handlePointerMove(clientX, clientY);
    };

    const handleGlobalUp = () => {
      if (isDraggingJoystick) {
        setIsDraggingJoystick(false);
        setJoystickDelta({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleGlobalMove);
    window.addEventListener('mouseup', handleGlobalUp);
    window.addEventListener('touchmove', handleGlobalMove);
    window.addEventListener('touchend', handleGlobalUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMove);
      window.removeEventListener('mouseup', handleGlobalUp);
      window.removeEventListener('touchmove', handleGlobalMove);
      window.removeEventListener('touchend', handleGlobalUp);
    };
  }, [isDraggingJoystick]);

  // Actions
  const handleShoot = () => {
    setIsShooting(true);
    setShotPower(85);
    setCommentary('🚀 ROCKET SHOT! K. DE BRUYNE UNLEASHES FROM 25 YARDS!');
    setBallPosition({ x: 80, y: 35 });

    setTimeout(() => {
      // 50% chance of GOAL!
      const isGoal = Math.random() > 0.4;
      if (isGoal) {
        setHomeScore((s) => s + 1);
        setCommentary('⚽ GOAAALLL! TOP CORNER BULLET! MAN CITY 3 - 1 REAL MADRID!');
      } else {
        setCommentary('🧤 SPECTACULAR DIVING SAVE BY COURTOIS! CORNER KICK AWARDED!');
      }
      setIsShooting(false);
      setShotPower(0);
      setTimeout(() => {
        setBallPosition({ x: 45, y: 58 });
        setCommentary(null);
      }, 3000);
    }, 1200);
  };

  const handleThroughBall = () => {
    setCommentary('⚡ INCREDIBLE THROUGH BALL CURVED INTO HAALAND’S STRIDE!');
    setBallPosition({ x: 66, y: 41 });
    setTimeout(() => {
      setCommentary('HAALAND BEATS RÜDIGER TO THE APEX LANE!');
      setTimeout(() => {
        setBallPosition({ x: 45, y: 58 });
        setCommentary(null);
      }, 2500);
    }, 1000);
  };

  const handlePass = () => {
    setCommentary('🎯 PINPOINT GROUND PASS LINKED!');
    setBallPosition({ x: 50, y: 52 });
    setTimeout(() => {
      setBallPosition({ x: 45, y: 58 });
      setCommentary(null);
    }, 1200);
  };

  const handleSprint = () => {
    setCommentary('⚡ KINETIC SPRINT ACTIVATED! +8 PACE BURST!');
    setActivePlayer((prev) => ({
      ...prev,
      stamina: Math.max(20, prev.stamina - 6),
    }));
    setTimeout(() => setCommentary(null), 1500);
  };

  const handleSkillMove = () => {
    setCommentary('✨ ELASTICO & ROULETTE FLICK PAST ALABA!');
    setTimeout(() => setCommentary(null), 1500);
  };

  const handleSub = (name: string, num: string, role: string) => {
    setActivePlayer({
      name,
      num,
      role,
      stamina: 100,
    });
    setCommentary(`🔄 TACTICAL SUB: ${name} IN!`);
    setTimeout(() => setCommentary(null), 2000);
  };

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#0a0f13] select-none text-[#e0e2ea] font-body">
      {/* 1. BROADCAST STADIUM BACKGROUND VIEW */}
      <div
        className="absolute inset-0 bg-cover bg-center filter saturate-[1.12] brightness-[0.88] transition-transform duration-700"
        style={{
          backgroundImage: `url('${STADIUM_PITCH_URL}')`,
          transform: cameraMode === 'tactical' ? 'scale(1.2)' : cameraMode === 'coop' ? 'scale(1.02)' : 'scale(1.06)',
        }}
      />

      {/* Atmospheric lighting and vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f13]/90 via-transparent to-[#0a0f13]/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f13]/70 via-transparent to-[#0a0f13]/70 pointer-events-none" />

      {/* Holographic Pitch Telemetry Vectors */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-55"
        preserveAspectRatio="none"
        viewBox="0 0 1280 720"
      >
        <defs>
          <linearGradient id="vector-cyan" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#00eefc" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00eefc" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="vector-volt" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#d9ef26" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#d9ef26" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {/* Passing Arc to Haaland Forward Run */}
        <path
          d="M 570,430 Q 690,320 840,305"
          fill="none"
          stroke="url(#vector-cyan)"
          strokeDasharray="6,6"
          strokeWidth="3"
        />
        {/* Deep Goal Attack Vector */}
        <path
          d="M 570,430 L 980,270"
          fill="none"
          opacity="0.75"
          stroke="url(#vector-volt)"
          strokeLinecap="round"
          strokeWidth="2.5"
        />
        {/* Tactical Overlapping Run Cone */}
        <polygon fill="rgba(0,238,252,0.07)" points="570,430 840,290 870,335" />
      </svg>

      {/* Simulated Ball with Kinetic Trail Tracer */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-300"
        style={{
          top: `${ballPosition.y}%`,
          left: `${ballPosition.x}%`,
        }}
      >
        <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_#ffffff] flex items-center justify-center animate-pulse">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0a0f13]" />
        </div>
        <div className="absolute -inset-2.5 rounded-full border border-[#00eefc]/50 animate-ping" />
      </div>

      {/* Active Teammate Forward Run Indicator (Erling Haaland) */}
      <div className="absolute top-[41%] left-[66%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none z-20">
        <div className="px-2 py-0.5 rounded bg-[#0a0f13]/85 border border-[#00eefc]/50 text-[#00eefc] font-label text-[9px] uppercase font-bold shadow-lg flex items-center gap-1">
          <span className="material-symbols-outlined text-xs">arrow_forward</span>
          9 Haaland
        </div>
        <div className="w-3 h-3 rounded-full bg-[#00eefc] shadow-[0_0_12px_#00eefc] mt-1" />
      </div>

      {/* Opponent Defender Holograms (Rüdiger & Alaba) */}
      <div className="absolute top-[40%] left-[54%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-90 z-20">
        <div className="px-1.5 py-0.5 rounded bg-[#0a0f13]/80 text-[#ffb4ab] font-label text-[9px] uppercase font-bold border border-[#ffb4ab]/30">
          Rüdiger
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff334b] shadow-[0_0_10px_#ffb4ab] mt-1" />
      </div>
      <div className="absolute top-[46%] left-[62%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-80 z-20">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff334b] shadow-[0_0_8px_#ffb4ab]" />
      </div>

      {/* Active Controlled Player Hologram & HUD */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 pointer-events-none transition-all duration-75"
        style={{
          top: `calc(60% + ${joystickDelta.y / 2}px)`,
          left: `calc(40% + ${joystickDelta.x / 2}px)`,
        }}
      >
        {/* Neon Overhead Diamond Cursor */}
        <div className="relative flex flex-col items-center mb-1 animate-bounce">
          <div className="w-4 h-4 rotate-45 bg-[#d9ef26] shadow-[0_0_16px_rgba(217,239,38,1)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#0a0f13]" />
          </div>
        </div>

        {/* Player HUD Banner */}
        <div className="flex flex-col items-center glass-panel px-3 py-1 rounded-lg shadow-2xl border border-[#d9ef26]/30">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.2 rounded bg-[#262a30] text-[#d9ef26] font-label text-[10px] font-bold">
              {activePlayer.num}
            </span>
            <span className="font-headline text-[16px] italic uppercase text-white tracking-tight leading-none">
              {activePlayer.name}
            </span>
          </div>
          {/* Stamina / Sprint Meter */}
          <div className="w-24 h-1 bg-[#262a30] rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-gradient-to-r from-[#d9ef26] to-[#00eefc] transition-all"
              style={{ width: `${activePlayer.stamina}%` }}
            />
          </div>
        </div>

        {/* Ground Precision Halo */}
        <div className="w-20 h-9 rounded-[100%] border-2 border-[#d9ef26] shadow-[0_0_24px_rgba(217,239,38,0.85)] mt-1.5 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#d9ef26]" />
        </div>
      </div>

      {/* 2. TOP BROADCAST SCOREBOARD & TELEMETRY HUD */}
      <header className="absolute top-0 left-0 w-full px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between z-40 pointer-events-none">
        {/* Top-Left: FC 29 Brand & Mentality */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <div className="flex items-center gap-2 glass-panel px-2.5 sm:px-3 py-1.5 rounded-xl shadow-lg">
            <img
              src={CREST_LOGO_URL}
              alt="FC 29 Crest"
              className="h-5 sm:h-6 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-headline text-xs sm:text-sm italic uppercase text-white tracking-tight">
                FC 29 LIVE
              </span>
              <span className="font-label text-[7px] sm:text-[8px] uppercase tracking-widest text-[#d9ef26] font-bold">
                CHAMPIONS LEAGUE
              </span>
            </div>
          </div>
          <div className="glass-pill px-2.5 py-1.5 rounded-xl hidden sm:flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#d9ef26] text-xs">bolt</span>
            <span className="font-label text-[10px] font-bold uppercase text-[#d9ef26] tracking-wider">
              ATTACKING FOCUS
            </span>
          </div>
        </div>

        {/* Top-Center: UEFA Broadcast Scoreboard */}
        <div className="flex flex-col items-center pointer-events-auto">
          <div className="glass-panel px-3 sm:px-4 py-1.5 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-[0_8px_30px_rgba(0,0,0,0.8)] border border-white/10">
            {/* Home: MCI */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#1c2025] flex items-center justify-center font-label text-xs sm:text-sm font-bold text-[#00eefc] border border-[#00eefc]/30">
                MCI
              </div>
              <span className="font-headline text-xl sm:text-2xl font-black italic uppercase text-white">
                {homeScore}
              </span>
            </div>

            {/* Live Clock */}
            <div className="flex flex-col items-center justify-center px-2.5 sm:px-3 py-0.5 rounded-lg bg-[#262a30]/80 border border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d9ef26] animate-ping" />
                <span className="font-headline text-sm sm:text-base italic text-[#d9ef26] tracking-tight tabular-nums">
                  {timeString}
                </span>
              </div>
              <span className="font-label text-[8px] sm:text-[9px] uppercase tracking-widest text-[#00eefc] font-bold">
                2ND HALF +4'
              </span>
            </div>

            {/* Away: RMA */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-headline text-xl sm:text-2xl font-black italic uppercase text-white">
                {awayScore}
              </span>
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#1c2025] flex items-center justify-center font-label text-xs sm:text-sm font-bold text-white border border-white/20">
                RMA
              </div>
            </div>
          </div>

          {/* Live xG Momentum */}
          <div className="glass-pill px-3 py-0.5 mt-1 rounded-full flex items-center gap-2 text-[9px] sm:text-[10px] font-label uppercase">
            <span className="text-[#00eefc] font-bold">2.4 xG</span>
            <div className="w-16 sm:w-20 h-1 bg-[#262a30] rounded-full overflow-hidden flex">
              <div className="w-[68%] h-full bg-[#00eefc]" />
              <div className="w-[32%] h-full bg-[#ff334b]" />
            </div>
            <span className="text-[#ffb4ab] font-bold">1.1 xG</span>
          </div>
        </div>

        {/* Top-Right: Radar Minimap + Controls */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          {/* 2D Radar */}
          <div className="glass-panel p-1 rounded-xl shadow-lg hidden sm:flex flex-col items-center">
            <div className="relative w-24 h-12 sm:w-28 sm:h-14 rounded bg-[#181c21]/90 overflow-hidden flex items-center justify-center border border-white/10">
              <div className="w-px h-full bg-white/20" />
              <div className="w-5 h-5 rounded-full border border-white/15 absolute" />
              {/* Blips */}
              <span className="absolute top-[48%] left-[42%] w-1.5 h-1.5 rounded-full bg-[#d9ef26] shadow-[0_0_6px_#d9ef26]" />
              <span className="absolute top-[34%] left-[64%] w-1.5 h-1.5 rounded-full bg-[#00eefc]" />
              <span className="absolute top-[62%] left-[58%] w-1.5 h-1.5 rounded-full bg-[#00eefc]" />
              <span className="absolute top-[42%] left-[72%] w-1.5 h-1.5 rounded-full bg-[#ff334b]" />
              <span className="absolute top-[52%] left-[76%] w-1.5 h-1.5 rounded-full bg-[#ff334b]" />
              <span className="absolute top-[47%] left-[45%] w-1 h-1 rounded-full bg-white animate-ping" />
            </div>
            <div className="w-full flex items-center justify-between px-1 mt-0.5 font-label text-[8px] text-[#94a3b8] uppercase font-bold">
              <span>RADAR 2D</span>
              <span className="text-[#d9ef26]">4-3-3 ATT</span>
            </div>
          </div>

          {/* Quick Buttons: Camera, Pause, Exit */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                setCameraMode((prev) =>
                  prev === 'broadcast' ? 'coop' : prev === 'coop' ? 'tactical' : 'broadcast'
                );
              }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass-panel text-white flex items-center justify-center hover:bg-[#262a30] transition active:scale-90 cursor-pointer"
              title={`Switch Camera: ${cameraMode.toUpperCase()}`}
            >
              <span className="material-symbols-outlined text-base sm:text-lg">videocam</span>
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#d9ef26] text-[#0a0f13] flex items-center justify-center active:scale-90 transition shadow-[0_0_14px_rgba(217,239,38,0.5)] cursor-pointer"
              title="Pause Match"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">
                {isPaused ? 'play_arrow' : 'pause'}
              </span>
            </button>
            <button
              onClick={onExitToHub}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl glass-panel text-white hover:text-[#d9ef26] flex items-center justify-center transition active:scale-90 cursor-pointer"
              title="Return to Squad Hub"
            >
              <span className="material-symbols-outlined text-base sm:text-lg">close</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. PASSING LANE LIVE ALERT BANNER */}
      <div className="absolute top-16 sm:top-20 left-4 sm:left-6 z-30 pointer-events-none">
        <div className="glass-pill px-3 py-1 rounded-lg border border-[#00eefc]/30 flex items-center gap-2 shadow-lg animate-pulse">
          <span className="material-symbols-outlined text-[#00eefc] text-sm">swap_horiz</span>
          <span className="font-label text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
            Lane Open: Haaland Sprinting
          </span>
        </div>
      </div>

      {/* Live Commentary Toast Overlay */}
      {commentary && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
          <div className="glass-panel px-4 py-2 rounded-xl border border-[#d9ef26]/50 text-white font-headline text-sm italic uppercase tracking-wider shadow-[0_0_24px_rgba(217,239,38,0.6)] animate-bounce text-center">
            {commentary}
          </div>
        </div>
      )}

      {/* 4. BOTTOM FLOATING BAR: QUICK TACTICS + QUICK SUBS BENCH */}
      <div className="absolute bottom-2.5 sm:bottom-3 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 pointer-events-auto w-auto max-w-[95%]">
        {/* Tactical Mentality Quick Selectors */}
        <div className="glass-panel px-1.5 py-1 rounded-xl flex items-center gap-1 sm:gap-1.5 shadow-2xl border border-white/10">
          {(['park', 'balanced', 'attacking', 'allout'] as const).map((tactic) => {
            const labels = {
              park: 'Ultra Def',
              balanced: 'Balanced',
              attacking: 'Attacking',
              allout: 'Full Press',
            };
            const isActive = activeTactic === tactic;
            return (
              <button
                key={tactic}
                onClick={() => {
                  setActiveTactic(tactic);
                  setCommentary(`TACTICAL SHIFT: ${labels[tactic].toUpperCase()}`);
                  setTimeout(() => setCommentary(null), 1500);
                }}
                className={`px-2.5 sm:px-3 py-1 rounded-lg font-label text-[10px] sm:text-xs uppercase tracking-wider font-bold transition active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-[#d9ef26] text-[#0a0f13] font-black shadow-[0_0_12px_rgba(217,239,38,0.5)]'
                    : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {labels[tactic]}
              </button>
            );
          })}
        </div>

        {/* Quick Bench Subs Dock */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sub 1: J. Alvarez */}
          <button
            onClick={() => handleSub('J. ALVAREZ', '88', 'ST')}
            className="glass-panel px-2 sm:px-2.5 py-1 rounded-xl flex items-center gap-1.5 sm:gap-2 active:scale-95 transition hover:border-[#d9ef26]/40 cursor-pointer"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#1c2025] flex items-center justify-center font-label text-[10px] sm:text-xs font-bold text-[#d9ef26]">
              88
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline text-[10px] sm:text-xs italic uppercase text-white leading-tight">
                J. Alvarez
              </span>
              <span className="font-label text-[8px] sm:text-[9px] text-[#d9ef26] uppercase font-bold leading-none">
                ST ▲ +8 PAC
              </span>
            </div>
            <span className="material-symbols-outlined text-[#d9ef26] text-sm">
              swap_vertical_circle
            </span>
          </button>

          {/* Sub 2: J. Doku */}
          <button
            onClick={() => handleSub('J. DOKU', '87', 'LW')}
            className="glass-panel px-2 sm:px-2.5 py-1 rounded-xl flex items-center gap-1.5 sm:gap-2 active:scale-95 transition hover:border-[#00eefc]/40 cursor-pointer"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-[#1c2025] flex items-center justify-center font-label text-[10px] sm:text-xs font-bold text-[#00eefc]">
              87
            </div>
            <div className="flex flex-col text-left">
              <span className="font-headline text-[10px] sm:text-xs italic uppercase text-white leading-tight">
                J. Doku
              </span>
              <span className="font-label text-[8px] sm:text-[9px] text-[#00eefc] uppercase font-bold leading-none">
                LW ▲ +12 DRI
              </span>
            </div>
            <span className="material-symbols-outlined text-[#00eefc] text-sm">
              swap_vertical_circle
            </span>
          </button>

          {/* Sub Fitness Status */}
          <div className="glass-pill px-2.5 py-1 rounded-xl hidden md:flex items-center gap-1.5 font-label text-[9px] text-[#94a3b8] uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d9ef26]" />
            FITNESS 86%
          </div>
        </div>
      </div>

      {/* 5. ERGONOMIC LANDSCAPE THUMB CONTROLS */}
      {/* LEFT THUMB ZONE: ANALOG JOYSTICK */}
      <div className="absolute bottom-4 sm:bottom-6 left-3 sm:left-7 z-30 select-none pointer-events-auto">
        <div
          ref={joystickBaseRef}
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full glass-panel shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-[#00eefc]/20 flex items-center justify-center cursor-grab active:cursor-grabbing"
          id="joystick-base"
        >
          {/* Telemetry Degree Rings */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              fill="none"
              r="74"
              stroke="#00eefc"
              strokeDasharray="5,9"
              strokeOpacity="0.25"
              strokeWidth="1.5"
            />
            <circle
              cx="80"
              cy="80"
              fill="none"
              r="62"
              stroke="#d9ef26"
              strokeOpacity="0.15"
              strokeWidth="1"
            />
          </svg>

          {/* Compass Arrows */}
          <span className="material-symbols-outlined text-[#00eefc]/50 absolute top-1.5 text-xs sm:text-sm pointer-events-none">
            expand_less
          </span>
          <span className="material-symbols-outlined text-[#00eefc]/50 absolute bottom-1.5 text-xs sm:text-sm pointer-events-none">
            expand_more
          </span>
          <span className="material-symbols-outlined text-[#00eefc]/50 absolute left-1.5 text-xs sm:text-sm pointer-events-none">
            chevron_left
          </span>
          <span className="material-symbols-outlined text-[#00eefc]/50 absolute right-1.5 text-xs sm:text-sm pointer-events-none">
            chevron_right
          </span>

          {/* Interactive Thumb Puck */}
          <div
            className="joystick-surface relative w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-[#00eefc]/40 shadow-[0_0_24px_rgba(0,238,252,0.45)] flex items-center justify-center pointer-events-none"
            style={{
              transform: `translate(${joystickDelta.x}px, ${joystickDelta.y}px)`,
              transition: isDraggingJoystick ? 'none' : 'transform 0.15s ease-out',
            }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00eefc]/20 flex items-center justify-center">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-[#00eefc] shadow-[0_0_12px_#00eefc]" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT THUMB ZONE: DIAMOND CLUSTER ACTION BUTTONS */}
      <div className="absolute bottom-4 sm:bottom-6 right-3 sm:right-7 z-30 select-none pointer-events-auto">
        <div className="relative w-48 h-44 sm:w-60 sm:h-56">
          {/* TOP ACTION: SHOOT (Crimson Button) */}
          <button
            onClick={handleShoot}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-[#93000a] to-[#262a30] border border-[#ff334b]/50 shadow-[0_0_20px_rgba(147,0,10,0.7)] flex flex-col items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-white text-lg sm:text-xl leading-none">
              sports_score
            </span>
            <span className="font-headline text-xs sm:text-sm italic uppercase text-white tracking-tight leading-none mt-0.5">
              SHOOT
            </span>
            <div className="w-6 sm:w-8 h-1 bg-[#0a0f13] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#ff334b] transition-all"
                style={{ width: `${isShooting ? shotPower : 75}%` }}
              />
            </div>
          </button>

          {/* LEFT ACTION: THROUGH (Cyan Lob Button) */}
          <button
            onClick={handleThroughBall}
            className="absolute top-1/2 left-0 -translate-y-1/2 w-13 h-13 sm:w-16 sm:h-16 rounded-2xl glass-panel border border-[#00eefc]/60 shadow-[0_0_18px_rgba(0,238,252,0.3)] flex flex-col items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#00eefc] text-base sm:text-lg leading-none">
              call_made
            </span>
            <span className="font-headline text-[11px] sm:text-xs italic uppercase text-white tracking-tight leading-none mt-0.5">
              THROUGH
            </span>
            <span className="font-label text-[7px] sm:text-[8px] text-[#00eefc] uppercase font-bold">
              LOB
            </span>
          </button>

          {/* RIGHT ACTION: SPRINT & TACKLE (Electric Volt) */}
          <button
            onClick={handleSprint}
            className="absolute top-1/2 right-0 -translate-y-1/2 w-14 h-14 sm:w-18 sm:h-18 rounded-2xl bg-[#d9ef26] text-[#0a0f13] shadow-[0_0_24px_rgba(217,239,38,0.6)] flex flex-col items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg sm:text-xl leading-none">bolt</span>
            <span className="font-headline text-xs sm:text-sm italic uppercase text-[#0a0f13] tracking-tight leading-none mt-0.5">
              SPRINT
            </span>
            <span className="font-label text-[7px] sm:text-[8px] text-[#2e3400] uppercase font-extrabold">
              TACKLE
            </span>
          </button>

          {/* BOTTOM ACTION: PASS (Frosted Glass Button) */}
          <button
            onClick={handlePass}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-18 sm:h-18 rounded-2xl glass-panel border border-white/20 shadow-lg flex flex-col items-center justify-center active:scale-90 transition-transform cursor-pointer"
          >
            <span className="material-symbols-outlined text-[#00eefc] text-lg sm:text-xl leading-none">
              arrow_forward
            </span>
            <span className="font-headline text-xs sm:text-sm italic uppercase text-white tracking-tight leading-none mt-0.5">
              PASS
            </span>
            <span className="font-label text-[7px] sm:text-[8px] text-[#00eefc] uppercase font-bold">
              GROUND
            </span>
          </button>

          {/* CENTER MICRO ACTION: SKILL MOVE */}
          <button
            onClick={handleSkillMove}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#00eefc] text-[#00363a] flex items-center justify-center shadow-[0_0_14px_#00eefc] active:rotate-45 transition-transform cursor-pointer"
            title="Skill Move: Roulette"
          >
            <span className="material-symbols-outlined text-sm sm:text-base">flare</span>
          </button>
        </div>
      </div>

      {/* MATCH PAUSE MODAL */}
      {isPaused && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="glass-panel p-6 rounded-2xl border border-white/10 max-w-sm w-full text-center flex flex-col items-center shadow-[0_0_50px_rgba(0,0,0,0.9)]">
            <span className="font-label text-xs uppercase tracking-widest text-[#d9ef26] font-bold">
              UEFA CHAMPIONS LEAGUE
            </span>
            <h3 className="font-headline text-2xl font-black italic uppercase text-white mt-1 mb-4">
              MATCH PAUSED
            </h3>

            <div className="w-full space-y-2.5 font-headline italic">
              <button
                onClick={() => setIsPaused(false)}
                className="w-full py-3 rounded-xl bg-[#d9ef26] text-[#0a0f13] text-sm uppercase tracking-wider font-black shadow-[0_0_15px_rgba(217,239,38,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                RESUME MATCH
              </button>
              <button
                onClick={() => {
                  setCameraMode((prev) => (prev === 'broadcast' ? 'tactical' : 'broadcast'));
                  setIsPaused(false);
                }}
                className="w-full py-2.5 rounded-xl bg-[#181c21] border border-white/10 text-white text-xs uppercase tracking-wider font-bold hover:bg-[#262a30] transition active:scale-95 cursor-pointer"
              >
                SWITCH CAMERA ANGLE
              </button>
              <button
                onClick={onExitToHub}
                className="w-full py-2.5 rounded-xl bg-transparent border border-white/10 text-[#94a3b8] hover:text-white text-xs uppercase tracking-wider font-bold transition active:scale-95 cursor-pointer"
              >
                RETURN TO ULTIMATE HUB
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
