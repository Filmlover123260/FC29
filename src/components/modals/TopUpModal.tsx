import React from 'react';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPoints: (amount: number) => void;
  onAddCoins: (amount: number) => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({
  isOpen,
  onClose,
  onAddPoints,
  onAddCoins,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-[#101419] border border-white/10 p-5 shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00eefc]">local_gas_station</span>
            <h3 className="font-headline text-lg font-black italic uppercase text-white tracking-wide">
              QUICK FUEL TOP-UP
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#181c21] text-white/70 hover:text-white flex items-center justify-center transition active:scale-90 cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="py-4 space-y-3 font-label">
          {/* FC Points option 1 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#181c21] border border-[#00eefc]/20 hover:border-[#00eefc]/60 transition">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">💎</span>
              <div>
                <div className="text-sm font-bold text-white uppercase">+1,050 FC POINTS</div>
                <div className="text-[10px] text-[#00eefc]">INSTANT SQUAD DELIVERY</div>
              </div>
            </div>
            <button
              onClick={() => {
                onAddPoints(1050);
                onClose();
              }}
              className="py-1.5 px-3 rounded-lg bg-[#00eefc] text-[#0a0f13] text-xs font-black uppercase hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              $9.99
            </button>
          </div>

          {/* FC Points option 2 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#181c21] border border-[#00eefc]/20 hover:border-[#00eefc]/60 transition">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">💎</span>
              <div>
                <div className="text-sm font-bold text-white uppercase">+2,800 FC POINTS</div>
                <div className="text-[10px] text-[#d9ef26]">PROMO VAULT SPECIAL</div>
              </div>
            </div>
            <button
              onClick={() => {
                onAddPoints(2800);
                onClose();
              }}
              className="py-1.5 px-3 rounded-lg bg-[#00eefc] text-[#0a0f13] text-xs font-black uppercase hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              $24.99
            </button>
          </div>

          {/* Coins deal 1 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#181c21] border border-[#d9ef26]/20 hover:border-[#d9ef26]/60 transition">
            <div className="flex items-center gap-2.5">
              <span className="text-xl text-[#d9ef26]">⬡</span>
              <div>
                <div className="text-sm font-bold text-white uppercase">+150,000 COINS</div>
                <div className="text-[10px] text-[#d9ef26]">SBC LIQUIDITY DEAL</div>
              </div>
            </div>
            <button
              onClick={() => {
                onAddCoins(150000);
                onClose();
              }}
              className="py-1.5 px-3 rounded-lg bg-[#d9ef26] text-[#0a0f13] text-xs font-black uppercase hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              CLAIM DEAL
            </button>
          </div>

          {/* Coins deal 2 */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#181c21] border border-[#d9ef26]/20 hover:border-[#d9ef26]/60 transition">
            <div className="flex items-center gap-2.5">
              <span className="text-xl text-[#d9ef26]">⬡</span>
              <div>
                <div className="text-sm font-bold text-white uppercase">+300,000 COINS</div>
                <div className="text-[10px] text-[#00eefc]">TRANSFER MARKET VAULT</div>
              </div>
            </div>
            <button
              onClick={() => {
                onAddCoins(300000);
                onClose();
              }}
              className="py-1.5 px-3 rounded-lg bg-[#d9ef26] text-[#0a0f13] text-xs font-black uppercase hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              BOOST COINS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
