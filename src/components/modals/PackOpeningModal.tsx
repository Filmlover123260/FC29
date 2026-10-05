import React, { useState, useEffect } from 'react';
import { Player, PackDefinition } from '../../types';

interface PackOpeningModalProps {
  pack: PackDefinition | null;
  isOpen: boolean;
  onClose: () => void;
  onClaimPlayer: (player: Player) => void;
}

export const PackOpeningModal: React.FC<PackOpeningModalProps> = ({
  pack,
  isOpen,
  onClose,
  onClaimPlayer,
}) => {
  const [stage, setStage] = useState<'sealed' | 'opening' | 'walkout'>('sealed');
  const [revealedPlayer, setRevealedPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (isOpen && pack) {
      setStage('sealed');
      // Generate guaranteed high-tier walkout
      if (pack.id === 'pack-prime-heroes') {
        setRevealedPlayer({
          id: 'walkout-zidane',
          name: 'Zinedine Zidane',
          shortName: 'Zidane',
          ovr: 95,
          position: 'CAM',
          club: 'Icons',
          nation: 'France',
          cardType: 'icon',
          pac: 85,
          sho: 92,
          pas: 96,
          dri: 95,
          def: 75,
          phy: 84,
          chemistry: 3,
          portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          marketValue: '3,800,000',
        });
      } else if (pack.id === 'pack-toty-foundation') {
        setRevealedPlayer({
          id: 'walkout-haaland',
          name: 'Erling Haaland',
          shortName: 'Haaland',
          ovr: 91,
          position: 'ST',
          club: 'Manchester City',
          nation: 'Norway',
          cardType: 'toty',
          pac: 89,
          sho: 93,
          pas: 70,
          dri: 81,
          def: 45,
          phy: 88,
          chemistry: 3,
          portrait: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
          marketValue: '1,450,000',
        });
      } else {
        setRevealedPlayer({
          id: 'walkout-vini',
          name: 'Vinícius Júnior',
          shortName: 'Vini Jr',
          ovr: 90,
          position: 'LW',
          club: 'Real Madrid',
          nation: 'Brazil',
          cardType: 'totw',
          pac: 96,
          sho: 84,
          pas: 81,
          dri: 92,
          def: 30,
          phy: 69,
          chemistry: 3,
          portrait: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
          marketValue: '840,000',
        });
      }
    }
  }, [isOpen, pack]);

  if (!isOpen || !pack) return null;

  const handleRipPack = () => {
    setStage('opening');
    setTimeout(() => {
      setStage('walkout');
    }, 1200);
  };

  const handleStore = () => {
    if (revealedPlayer) {
      onClaimPlayer(revealedPlayer);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0a0f13] border border-white/10 p-6 flex flex-col items-center text-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]">
        {/* Glow backdrop fx */}
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#d9ef26]/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-[#00eefc]/15 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#181c21] border border-white/10 text-white/70 hover:text-white flex items-center justify-center transition active:scale-90 z-20 cursor-pointer"
        >
          ✕
        </button>

        {stage === 'sealed' && (
          <div className="flex flex-col items-center py-4 w-full animate-fade-in">
            <span className="font-label text-xs uppercase tracking-widest text-[#00eefc] font-bold mb-1">
              {pack.subTitle}
            </span>
            <h2 className="font-headline text-2xl font-black italic uppercase text-white tracking-tight">
              {pack.title}
            </h2>
            <span className="font-label text-xs text-[#d9ef26] font-bold mt-1 px-3 py-0.5 rounded-full bg-[#181c21] border border-[#d9ef26]/30">
              {pack.tag}
            </span>

            {/* Pack Visual Art with Hover Glow */}
            <div className="relative my-6 w-64 h-40 rounded-xl overflow-hidden border border-white/15 shadow-[0_0_30px_rgba(217,239,38,0.25)] group">
              <img
                src={pack.image}
                alt={pack.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f13] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-2 left-2 right-2 text-center">
                <span className="font-label text-[11px] font-bold uppercase text-white tracking-wider">
                  {pack.description}
                </span>
              </div>
            </div>

            <button
              onClick={handleRipPack}
              className="w-full py-3.5 px-6 rounded-xl bg-[#d9ef26] text-[#0a0f13] font-headline text-base font-black italic uppercase tracking-wider shadow-[0_0_24px_rgba(217,239,38,0.6)] hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">bolt</span>
              RIP PACK & REVEAL WALKOUT
            </button>
          </div>
        )}

        {stage === 'opening' && (
          <div className="flex flex-col items-center justify-center py-16 w-full">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-[#00eefc] border-t-transparent animate-spin" />
              <div className="absolute inset-3 rounded-full border-4 border-[#d9ef26] border-b-transparent animate-spin duration-700" />
              <span className="material-symbols-outlined text-4xl text-white animate-bounce">
                grade
              </span>
            </div>
            <h3 className="font-headline text-2xl font-black italic uppercase text-white mt-6 tracking-wide animate-pulse">
              ANALYZING SQUAD SIGNATURE...
            </h3>
            <span className="font-label text-xs text-[#00eefc] uppercase tracking-widest mt-1">
              WALKOUT DETECTED
            </span>
          </div>
        )}

        {stage === 'walkout' && revealedPlayer && (
          <div className="flex flex-col items-center py-2 w-full animate-fade-in">
            {/* Walkout Banner */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#181c21] border border-[#d9ef26]/40 text-[#d9ef26] font-label text-xs uppercase tracking-widest font-black shadow-[0_0_15px_rgba(217,239,38,0.4)] mb-3">
              <span className="material-symbols-outlined text-sm">stars</span>
              WALKOUT • {revealedPlayer.cardType.toUpperCase()} ITEM
            </div>

            {/* Futuristic Ultimate Team Player Card Shield */}
            <div className="relative w-56 sm:w-60 rounded-2xl bg-gradient-to-b from-[#262a30] via-[#181c21] to-[#0a0f13] border-2 border-[#d9ef26] p-3 shadow-[0_0_40px_rgba(217,239,38,0.45)]">
              {/* Card Header: Rating, Position, Nation */}
              <div className="flex items-start justify-between">
                <div className="flex flex-col items-center">
                  <span className="font-headline text-3xl sm:text-4xl font-black italic text-[#d9ef26] leading-none">
                    {revealedPlayer.ovr}
                  </span>
                  <span className="font-label text-sm font-black text-white mt-0.5">
                    {revealedPlayer.position}
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-label text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white uppercase">
                    {revealedPlayer.nation}
                  </span>
                  <span className="font-label text-[9px] text-[#94a3b8] uppercase">
                    {revealedPlayer.club}
                  </span>
                </div>
              </div>

              {/* Player Portrait Art */}
              <div className="relative w-full h-36 my-2 rounded-lg overflow-hidden bg-black/40 flex items-center justify-center">
                <img
                  src={revealedPlayer.portrait}
                  alt={revealedPlayer.name}
                  className="w-full h-full object-cover filter contrast-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#181c21] via-transparent to-transparent opacity-80" />
              </div>

              {/* Player Name */}
              <h3 className="font-headline text-xl font-black italic uppercase text-white tracking-tight border-b border-white/10 pb-1.5 text-center">
                {revealedPlayer.name}
              </h3>

              {/* 6 Attributes Grid */}
              <div className="grid grid-cols-6 gap-1 mt-2 text-center font-label">
                <div>
                  <div className="text-[10px] text-[#94a3b8]">PAC</div>
                  <div className="text-xs font-black text-white">{revealedPlayer.pac}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8]">SHO</div>
                  <div className="text-xs font-black text-white">{revealedPlayer.sho}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8]">PAS</div>
                  <div className="text-xs font-black text-white">{revealedPlayer.pas}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8]">DRI</div>
                  <div className="text-xs font-black text-white">{revealedPlayer.dri}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8]">DEF</div>
                  <div className="text-xs font-black text-white">{revealedPlayer.def}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#94a3b8]">PHY</div>
                  <div className="text-xs font-black text-white">{revealedPlayer.phy}</div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2 w-full mt-5">
              <button
                onClick={handleStore}
                className="w-full py-3 rounded-xl bg-[#00eefc] text-[#0a0f13] font-headline text-sm font-black italic uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_0_15px_rgba(0,238,252,0.4)] cursor-pointer"
              >
                SEND TO CLUB & SQUAD
              </button>
              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl bg-[#181c21] border border-white/10 text-white font-label text-xs uppercase tracking-wider hover:bg-[#262a30] transition active:scale-95 cursor-pointer"
              >
                QUICK SELL (15,000 COINS)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
