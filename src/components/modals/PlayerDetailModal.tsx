import React from 'react';
import { Player } from '../../types';

interface PlayerDetailModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onSetCaptain?: (player: Player) => void;
  onSetFK?: (player: Player) => void;
  onSwapWithBench?: (player: Player) => void;
}

export const PlayerDetailModal: React.FC<PlayerDetailModalProps> = ({
  player,
  isOpen,
  onClose,
  onSetCaptain,
  onSetFK,
  onSwapWithBench,
}) => {
  if (!isOpen || !player) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-2xl bg-[#101419] border border-white/10 p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="font-label text-xs uppercase tracking-widest text-[#00eefc] font-bold">
              PLAYER DOSSIER
            </span>
            {player.isCaptain && (
              <span className="px-2 py-0.5 rounded bg-[#d9ef26] text-[#0a0f13] font-label text-[9px] font-black uppercase">
                CAPTAIN
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#181c21] text-white/70 hover:text-white flex items-center justify-center transition active:scale-90 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Card and Bio */}
        <div className="flex items-center gap-4 my-4">
          <div className="relative w-24 h-32 rounded-xl bg-gradient-to-b from-[#262a30] to-[#101419] border-2 border-[#d9ef26] p-2 flex flex-col justify-between shrink-0 shadow-[0_0_20px_rgba(217,239,38,0.3)]">
            <div className="flex items-start justify-between">
              <span className="font-headline text-2xl font-black italic text-[#d9ef26]">
                {player.ovr}
              </span>
              <span className="font-label text-xs font-black text-white">
                {player.position}
              </span>
            </div>
            <div className="w-full h-16 rounded overflow-hidden bg-black/40">
              <img
                src={player.portrait}
                alt={player.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-headline text-[10px] italic uppercase text-white font-bold text-center truncate">
              {player.shortName}
            </span>
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <h3 className="font-headline text-xl font-black italic text-white uppercase">
              {player.name}
            </h3>
            <div className="flex items-center gap-2 text-xs font-label text-[#94a3b8]">
              <span>{player.club}</span>
              <span>•</span>
              <span>{player.nation}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="font-label text-xs text-[#00eefc] font-bold">CHEMISTRY:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((dot) => (
                  <span
                    key={dot}
                    className={`w-2 h-2 rounded-full ${
                      dot <= player.chemistry ? 'bg-[#00eefc] shadow-[0_0_6px_#00eefc]' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
            {player.marketValue && (
              <div className="font-label text-xs text-[#d9ef26] font-bold mt-1">
                VALUATION: ⬡ {player.marketValue}
              </div>
            )}
          </div>
        </div>

        {/* Tactical Stat Bars */}
        <div className="space-y-2 my-2 bg-[#181c21] p-3 rounded-xl border border-white/5 font-label">
          {[
            { label: 'Pace', val: player.pac },
            { label: 'Shooting', val: player.sho },
            { label: 'Passing', val: player.pas },
            { label: 'Dribbling', val: player.dri },
            { label: 'Defending', val: player.def },
            { label: 'Physical', val: player.phy },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-xs text-[#94a3b8] w-20">{stat.label}</span>
              <div className="flex-1 h-2 rounded-full bg-[#101419] overflow-hidden border border-white/5">
                <div
                  className="h-full bg-gradient-to-r from-[#00eefc] to-[#d9ef26]"
                  style={{ width: `${Math.min(stat.val, 100)}%` }}
                />
              </div>
              <span className="text-xs font-bold text-white w-6 text-right tabular-nums">
                {stat.val}
              </span>
            </div>
          ))}
        </div>

        {/* Squad Tactical Assignment Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            onClick={() => {
              if (onSetCaptain) onSetCaptain(player);
              onClose();
            }}
            className="py-2 px-3 rounded-lg bg-[#181c21] border border-[#d9ef26]/30 text-[#d9ef26] font-label text-xs uppercase font-bold hover:bg-[#262a30] transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">flag</span>
            SET CAPTAIN
          </button>
          <button
            onClick={() => {
              if (onSetFK) onSetFK(player);
              onClose();
            }}
            className="py-2 px-3 rounded-lg bg-[#181c21] border border-[#00eefc]/30 text-[#00eefc] font-label text-xs uppercase font-bold hover:bg-[#262a30] transition active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">gps_fixed</span>
            FREE KICK TAKER
          </button>
        </div>

        {onSwapWithBench && (
          <button
            onClick={() => {
              onSwapWithBench(player);
              onClose();
            }}
            className="w-full mt-2 py-2.5 rounded-lg bg-[#d9ef26] text-[#0a0f13] font-headline text-xs font-black italic uppercase tracking-wider hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-base">swap_vert</span>
            SWAP WITH BENCH
          </button>
        )}
      </div>
    </div>
  );
};
