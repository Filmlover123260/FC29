import React, { useState } from 'react';
import { Player } from '../../types';
import { BENCH_PLAYERS, ICON_PLAYERS } from '../../data/mockData';

interface MarketModalProps {
  isOpen: boolean;
  coins: number;
  onClose: () => void;
  onBuyPlayer: (player: Player, cost: number) => void;
}

export const MarketModal: React.FC<MarketModalProps> = ({
  isOpen,
  coins,
  onClose,
  onBuyPlayer,
}) => {
  const [search, setSearch] = useState('');
  const marketList = [...BENCH_PLAYERS, ...ICON_PLAYERS];

  if (!isOpen) return null;

  const filtered = marketList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.position.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#101419] border border-white/10 p-5 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col font-label max-h-[85vh]">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00eefc]">storefront</span>
            <h3 className="font-headline text-lg font-black italic uppercase text-white tracking-wide">
              TRANSFER MARKET
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#181c21] text-white/70 hover:text-white flex items-center justify-center transition active:scale-90 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search Bar */}
        <div className="my-3 relative">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#94a3b8] text-sm">
            search
          </span>
          <input
            type="text"
            placeholder="Search players by name or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#181c21] border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-[#94a3b8] focus:outline-none focus:border-[#00eefc]"
          />
        </div>

        {/* Market listings */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filtered.map((player) => {
            const price = parseInt(player.marketValue?.replace(/,/g, '') || '150000', 10);
            return (
              <div
                key={player.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-[#181c21] border border-white/5 hover:border-white/20 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-12 rounded-lg bg-[#222933] border border-[#d9ef26]/50 flex flex-col items-center justify-center p-0.5">
                    <span className="font-headline text-xs font-black italic text-[#d9ef26]">
                      {player.ovr}
                    </span>
                    <span className="text-[8px] font-black text-white">{player.position}</span>
                  </div>
                  <div>
                    <h4 className="font-headline text-sm font-black italic uppercase text-white">
                      {player.name}
                    </h4>
                    <span className="text-[10px] text-[#94a3b8]">
                      {player.club} • {player.nation}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[9px] text-[#94a3b8] block uppercase">BUY NOW</span>
                    <span className="font-headline text-xs font-black italic text-[#d9ef26]">
                      ⬡ {player.marketValue}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (coins < price) {
                        alert(`You need ${price.toLocaleString()} coins to purchase this player!`);
                        return;
                      }
                      onBuyPlayer(player, price);
                      alert(`Successfully signed ${player.name} to your club!`);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-[#d9ef26] text-[#0a0f13] text-[10px] font-black uppercase tracking-wider hover:brightness-110 active:scale-95 transition cursor-pointer"
                  >
                    BID / BUY
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
