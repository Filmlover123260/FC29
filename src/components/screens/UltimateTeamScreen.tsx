import React, { useState } from 'react';
import { Player } from '../../types';
import { STARTING_ELEVEN, BENCH_PLAYERS } from '../../data/mockData';

interface UltimateTeamScreenProps {
  onInspectPlayer: (player: Player) => void;
  onOpenTactics?: () => void;
}

export const UltimateTeamScreen: React.FC<UltimateTeamScreenProps> = ({
  onInspectPlayer,
}) => {
  const [squadName] = useState('APEX TITANS FC');
  const [formation, setFormation] = useState('4-3-3 ATTACK');
  const [startingXI, setStartingXI] = useState<Player[]>(STARTING_ELEVEN);
  const [bench, setBench] = useState<Player[]>(BENCH_PLAYERS);
  const [captainId, setCaptainId] = useState<string>('p2'); // Haaland
  const [fkId, setFkId] = useState<string>('p6'); // De Bruyne
  const [autoXINotice, setAutoXINotice] = useState(false);

  // Calculate overall rating
  const avgOVR = Math.round(
    startingXI.reduce((acc, p) => acc + p.ovr, 0) / startingXI.length
  );
  // Full chemistry
  const totalChem = 33;

  const handleAutoXI = () => {
    // Sort starting XI and bench to maximize overall rating
    const all = [...startingXI, ...bench];
    all.sort((a, b) => b.ovr - a.ovr);
    const newStarting = all.slice(0, 11);
    const newBench = all.slice(11);
    setStartingXI(newStarting);
    setBench(newBench);
    setAutoXINotice(true);
    setTimeout(() => setAutoXINotice(false), 2500);
  };

  const handleCycleCaptain = () => {
    const candidates = startingXI.map((p) => p.id);
    const currIndex = candidates.indexOf(captainId);
    const nextId = candidates[(currIndex + 1) % candidates.length];
    setCaptainId(nextId);
  };

  const handleCycleFK = () => {
    const candidates = startingXI.map((p) => p.id);
    const currIndex = candidates.indexOf(fkId);
    const nextId = candidates[(currIndex + 1) % candidates.length];
    setFkId(nextId);
  };

  // Find assigned player names
  const captainPlayer = startingXI.find((p) => p.id === captainId) || startingXI[1];
  const fkPlayer = startingXI.find((p) => p.id === fkId) || startingXI[5];

  // Map squad positions to 4-3-3 layout:
  // Forward line: [0] LW, [1] ST, [2] RW
  // Midfield line: [3] CM, [4] CDM, [5] CM
  // Defense line: [6] LB, [7] CB, [8] CB, [9] RB
  // Keeper: [10] GK
  const attackers = startingXI.slice(0, 3);
  const midfielders = startingXI.slice(3, 6);
  const defenders = startingXI.slice(6, 10);
  const goalkeeper = startingXI[10] || startingXI[startingXI.length - 1];

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-3 sm:px-4 pt-2">
      {/* 1. SQUAD TITLE & FORMATION PICKER */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-[#004f54] text-[#00eefc] font-label text-[10px] font-black uppercase tracking-wider">
            ACTIVE SQUAD
          </span>
          <h2 className="font-headline text-base sm:text-lg font-black italic uppercase text-white tracking-tight">
            {squadName}
          </h2>
        </div>
        <button
          onClick={() => {
            const list = ['4-3-3 ATTACK', '4-2-3-1 NARROW', '4-4-2 FLAT', '3-5-2 WINGERS'];
            const idx = list.indexOf(formation);
            setFormation(list[(idx + 1) % list.length]);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181c21] border border-white/10 hover:border-[#d9ef26]/50 transition cursor-pointer active:scale-95"
        >
          <span className="material-symbols-outlined text-xs text-[#d9ef26]">tune</span>
          <span className="font-label text-xs uppercase font-bold text-white tracking-wider">
            {formation}
          </span>
        </button>
      </div>

      {/* 2. STATS SUMMARY METRICS: RATING, CHEMISTRY, MARKET EST. */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {/* Rating */}
        <div className="p-3 rounded-2xl bg-[#14181e] border border-white/5 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
          <span className="font-label text-[10px] uppercase tracking-wider text-[#94a3b8] font-bold">
            RATING
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-headline text-3xl sm:text-4xl font-black italic text-[#d9ef26] drop-shadow-[0_0_12px_rgba(217,239,38,0.4)]">
              {avgOVR}
            </span>
            <span className="font-label text-[10px] font-black text-white/60">OVR</span>
          </div>
        </div>

        {/* Chemistry */}
        <div className="p-3 rounded-2xl bg-[#14181e] border border-white/5 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-1">
            <span className="font-label text-[10px] uppercase tracking-wider text-[#94a3b8] font-bold">
              CHEMISTRY
            </span>
            <span className="material-symbols-outlined text-[10px] text-[#00eefc]">verified</span>
          </div>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-headline text-3xl sm:text-4xl font-black italic text-[#00eefc] drop-shadow-[0_0_12px_rgba(0,238,252,0.4)]">
              {totalChem}
            </span>
            <span className="font-label text-xs text-white/50 font-bold">/33</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00eefc]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00eefc]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#00eefc]" />
          </div>
        </div>

        {/* Market Est */}
        <div className="p-3 rounded-2xl bg-[#14181e] border border-white/5 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden">
          <span className="font-label text-[10px] uppercase tracking-wider text-[#94a3b8] font-bold">
            MARKET EST.
          </span>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[#d9ef26] text-xs font-bold">⬡</span>
            <span className="font-headline text-2xl sm:text-3xl font-black italic text-white tracking-tight">
              4.2M
            </span>
          </div>
          <span className="font-label text-[9px] uppercase tracking-wider text-[#94a3b8] font-bold">
            COINS
          </span>
        </div>
      </div>

      {/* Auto XI feedback toast */}
      {autoXINotice && (
        <div className="mb-3 py-1.5 px-3 rounded-xl bg-[#d9ef26] text-[#0a0f13] font-headline text-xs font-black italic uppercase text-center tracking-wider shadow-[0_0_15px_rgba(217,239,38,0.5)] animate-fade-in">
          ⚡ AUTO XI OPTIMIZED! HIGHEST RATED SQUAD DEPLOYED!
        </div>
      )}

      {/* 3. TACTICAL PITCH BOARD WITH LASER CHEMISTRY LINKS */}
      <div className="relative w-full rounded-2xl bg-[#0d1014] border border-white/10 p-3 sm:p-4 overflow-hidden shadow-2xl">
        {/* Subtle Pitch Grass & Field Grid Vector */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#14181e]/90 via-[#0d1014] to-[#101419] opacity-90 pointer-events-none" />
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
          preserveAspectRatio="none"
          viewBox="0 0 400 560"
        >
          {/* Halfway line */}
          <line x1="20" y1="280" x2="380" y2="280" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="200" cy="280" r="50" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Penalty areas */}
          <rect x="100" y="20" width="200" height="90" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          <rect x="100" y="450" width="200" height="90" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Outer field border */}
          <rect x="20" y="20" width="360" height="520" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>

        {/* Laser Chemistry Connection SVG Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {/* Attack to Midfield links */}
          <line x1="20" y1="12" x2="50" y2="12" stroke="#d9ef26" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.85" />
          <line x1="50" y1="12" x2="80" y2="12" stroke="#d9ef26" strokeWidth="0.8" strokeDasharray="2,2" opacity="0.85" />
          <line x1="20" y1="12" x2="25" y2="38" stroke="#00eefc" strokeWidth="0.9" opacity="0.85" />
          <line x1="50" y1="12" x2="50" y2="40" stroke="#00eefc" strokeWidth="0.9" opacity="0.85" />
          <line x1="80" y1="12" x2="75" y2="38" stroke="#00eefc" strokeWidth="0.9" opacity="0.85" />

          {/* Midfield internal links */}
          <line x1="25" y1="38" x2="50" y2="40" stroke="#d9ef26" strokeWidth="0.8" opacity="0.75" />
          <line x1="50" y1="40" x2="75" y2="38" stroke="#d9ef26" strokeWidth="0.8" opacity="0.75" />

          {/* Midfield to Defense links */}
          <line x1="25" y1="38" x2="16" y2="65" stroke="#00eefc" strokeWidth="0.8" opacity="0.8" />
          <line x1="50" y1="40" x2="38" y2="65" stroke="#d9ef26" strokeWidth="0.8" opacity="0.8" />
          <line x1="50" y1="40" x2="62" y2="65" stroke="#d9ef26" strokeWidth="0.8" opacity="0.8" />
          <line x1="75" y1="38" x2="84" y2="65" stroke="#00eefc" strokeWidth="0.8" opacity="0.8" />

          {/* Defense internal & to GK */}
          <line x1="16" y1="65" x2="38" y2="65" stroke="#d9ef26" strokeWidth="0.8" opacity="0.75" />
          <line x1="38" y1="65" x2="62" y2="65" stroke="#d9ef26" strokeWidth="0.8" opacity="0.75" />
          <line x1="62" y1="65" x2="84" y2="65" stroke="#d9ef26" strokeWidth="0.8" opacity="0.75" />
          <line x1="38" y1="65" x2="50" y2="88" stroke="#00eefc" strokeWidth="0.9" opacity="0.85" />
          <line x1="62" y1="65" x2="50" y2="88" stroke="#00eefc" strokeWidth="0.9" opacity="0.85" />
        </svg>

        {/* Starting XI Player Cards Layers */}
        <div className="relative z-20 flex flex-col justify-between h-[490px] py-1">
          {/* 1. Attackers Row: LW, ST, RW */}
          <div className="flex items-center justify-around px-2">
            {attackers.map((player) => (
              <PlayerPitchCard
                key={player.id}
                player={player}
                isCaptain={player.id === captainId}
                onClick={() => onInspectPlayer(player)}
              />
            ))}
          </div>

          {/* 2. Midfield Row: CM, CDM, CM */}
          <div className="flex items-center justify-around px-3">
            {midfielders.map((player) => (
              <PlayerPitchCard
                key={player.id}
                player={player}
                isCaptain={player.id === captainId}
                onClick={() => onInspectPlayer(player)}
              />
            ))}
          </div>

          {/* 3. Defense Row: LB, CB, CB, RB */}
          <div className="flex items-center justify-around px-1">
            {defenders.map((player) => (
              <PlayerPitchCard
                key={player.id}
                player={player}
                isCaptain={player.id === captainId}
                onClick={() => onInspectPlayer(player)}
              />
            ))}
          </div>

          {/* 4. Goalkeeper Row: GK */}
          <div className="flex items-center justify-center">
            {goalkeeper && (
              <PlayerPitchCard
                player={goalkeeper}
                isCaptain={goalkeeper.id === captainId}
                onClick={() => onInspectPlayer(goalkeeper)}
              />
            )}
          </div>
        </div>
      </div>

      {/* 4. TACTICAL ROLES BAR UNDER PITCH: CAPTAIN, FK, PK, AUTO XI */}
      <div className="grid grid-cols-4 gap-1.5 my-3">
        {/* Captain button */}
        <button
          onClick={handleCycleCaptain}
          className="p-2 rounded-xl bg-[#14181e] border border-white/5 hover:border-[#d9ef26]/50 flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
          title="Change Captain"
        >
          <span className="material-symbols-outlined text-xs text-[#d9ef26]">flag</span>
          <div className="flex flex-col text-left font-label">
            <span className="text-[8px] uppercase text-[#94a3b8] font-bold">CAPTAIN</span>
            <span className="text-[11px] font-black text-white truncate max-w-16">
              {captainPlayer.shortName}
            </span>
          </div>
        </button>

        {/* Free Kick button */}
        <button
          onClick={handleCycleFK}
          className="p-2 rounded-xl bg-[#14181e] border border-white/5 hover:border-[#00eefc]/50 flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
          title="Change Free Kick Taker"
        >
          <span className="material-symbols-outlined text-xs text-[#00eefc]">gps_fixed</span>
          <div className="flex flex-col text-left font-label">
            <span className="text-[8px] uppercase text-[#94a3b8] font-bold">FK</span>
            <span className="text-[11px] font-black text-white truncate max-w-16">
              {fkPlayer.shortName}
            </span>
          </div>
        </button>

        {/* Penalty Kick button */}
        <button
          onClick={() => alert('Penalty Taker: Vinícius Júnior (92 Penalties / 90 Composure)')}
          className="p-2 rounded-xl bg-[#14181e] border border-white/5 hover:border-white/20 flex items-center justify-center gap-1.5 transition active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xs text-white/70">sports_score</span>
          <div className="flex flex-col text-left font-label">
            <span className="text-[8px] uppercase text-[#94a3b8] font-bold">PK</span>
            <span className="text-[11px] font-black text-white">Vini Jr</span>
          </div>
        </button>

        {/* AUTO XI Button */}
        <button
          onClick={handleAutoXI}
          className="p-2 rounded-xl bg-[#d9ef26] text-[#0a0f13] flex items-center justify-center gap-1 shadow-[0_0_12px_rgba(217,239,38,0.4)] hover:brightness-110 active:scale-95 transition cursor-pointer"
          title="Optimize Squad XI"
        >
          <span className="material-symbols-outlined text-sm font-black">auto_fix_high</span>
          <span className="font-headline text-xs font-black italic uppercase tracking-wider">
            AUTO XI
          </span>
        </button>
      </div>

      {/* 5. BENCH & RESERVES SECTION */}
      <div className="mt-4">
        <div className="flex items-center justify-between px-1 mb-2">
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-sm sm:text-base font-black italic uppercase text-white tracking-wide">
              BENCH & RESERVES
            </h3>
            <span className="px-1.5 py-0.5 rounded bg-[#181c21] text-[#94a3b8] font-label text-[9px] font-bold">
              {bench.length} / 12
            </span>
          </div>
          <button
            onClick={() => alert('Full Squad Depth & Reserve Reserves: 24 Players in Club reserves')}
            className="flex items-center gap-0.5 font-label text-[10px] uppercase font-bold text-[#d9ef26] hover:underline cursor-pointer"
          >
            SQUAD DEPTH
            <span className="material-symbols-outlined text-xs">chevron_right</span>
          </button>
        </div>

        {/* Bench Players Horizontal Scroll */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 scrollbar-thin">
          {bench.map((player) => (
            <div
              key={player.id}
              onClick={() => onInspectPlayer(player)}
              className="relative w-28 sm:w-32 shrink-0 p-2.5 rounded-xl bg-[#14181e] border border-white/10 hover:border-[#d9ef26]/50 transition cursor-pointer active:scale-95 group shadow-lg"
            >
              {/* OVR, Position, Trend */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1 font-label">
                  <span className="font-headline text-base sm:text-lg font-black italic text-[#d9ef26]">
                    {player.ovr}
                  </span>
                  <span className="text-[10px] font-black text-white/80">{player.position}</span>
                </div>
                {player.formTrend === 'up' && (
                  <span className="material-symbols-outlined text-xs text-[#00e676]">
                    north_east
                  </span>
                )}
                {player.formTrend === 'flat' && (
                  <span className="text-xs text-[#94a3b8] font-bold">—</span>
                )}
              </div>

              {/* Player Image */}
              <div className="relative w-full h-16 my-1.5 rounded-lg overflow-hidden bg-black/40">
                <img
                  src={player.portrait}
                  alt={player.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Player Name */}
              <div className="font-headline text-xs font-black italic uppercase text-white truncate text-center">
                {player.shortName}
              </div>

              {/* Key Stats Bar */}
              <div className="flex items-center justify-between text-[9px] font-label text-[#94a3b8] mt-1 pt-1 border-t border-white/5">
                <span>PAC {player.pac}</span>
                <span>DRI {player.dri}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-component: Player Pitch Card Lockup
interface PlayerPitchCardProps {
  player: Player;
  isCaptain?: boolean;
  onClick: () => void;
}

const PlayerPitchCard: React.FC<PlayerPitchCardProps> = ({
  player,
  isCaptain,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center group cursor-pointer active:scale-95 transition-transform"
    >
      {/* Captain Ribbon Badge */}
      {isCaptain && (
        <span className="absolute -top-3 z-30 px-1.5 py-0.2 rounded bg-[#d9ef26] text-[#0a0f13] font-label text-[8px] font-black uppercase shadow-[0_0_8px_#d9ef26]">
          CAPTAIN
        </span>
      )}

      {/* Card Body */}
      <div className="relative w-16 sm:w-18 h-20 sm:h-22 rounded-xl bg-gradient-to-b from-[#262a30] via-[#181c21] to-[#0a0f13] border border-white/20 group-hover:border-[#d9ef26] p-1 flex flex-col items-center justify-between shadow-xl transition-colors">
        {/* Top Header: OVR + Position */}
        <div className="w-full flex items-center justify-between px-0.5">
          <span className="font-headline text-xs sm:text-sm font-black italic text-[#d9ef26]">
            {player.ovr}
          </span>
          <span className="font-label text-[9px] font-black text-white">{player.position}</span>
        </div>

        {/* Portrait */}
        <div className="relative w-11 sm:w-12 h-11 sm:h-12 rounded-md overflow-hidden bg-black/50">
          <img
            src={player.portrait}
            alt={player.shortName}
            className="w-full h-full object-cover filter contrast-105"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Short Name */}
        <span className="font-headline text-[9px] sm:text-[10px] font-black italic uppercase text-white truncate max-w-full leading-none">
          {player.shortName}
        </span>
      </div>

      {/* 3 Chemistry Dots */}
      <div className="flex items-center gap-0.5 mt-1">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={`w-1.5 h-1.5 rounded-full ${
              dot <= player.chemistry ? 'bg-[#00eefc] shadow-[0_0_6px_#00eefc]' : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </button>
  );
};
