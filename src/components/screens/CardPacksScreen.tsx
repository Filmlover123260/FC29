import React, { useState } from 'react';
import { PackDefinition } from '../../types';
import { PACKS_DATA } from '../../data/mockData';

interface CardPacksScreenProps {
  coins: number;
  points: number;
  onOpenPack: (pack: PackDefinition) => void;
  onOpenTopUp: () => void;
}

export const CardPacksScreen: React.FC<CardPacksScreenProps> = ({
  coins,
  points,
  onOpenPack,
  onOpenTopUp,
}) => {
  const [activeTab, setActiveTab] = useState<'promo' | 'foundation' | 'my-packs'>('promo');
  const [claimedDaily, setClaimedDaily] = useState(false);

  const handleBuyWithCoins = (pack: PackDefinition) => {
    if (coins < pack.coinsPrice) {
      alert(`Insufficient Coins! You need ${pack.coinsPrice.toLocaleString()} coins. Use Quick Fuel Top-Up to boost your balance.`);
      return;
    }
    onOpenPack(pack);
  };

  const handleBuyWithPoints = (pack: PackDefinition) => {
    if (!pack.pointsPrice) return;
    if (points < pack.pointsPrice) {
      alert(`Insufficient FC Points! You need ${pack.pointsPrice.toLocaleString()} FP. Use Quick Fuel Top-Up to acquire more points.`);
      return;
    }
    onOpenPack(pack);
  };

  const handleClaimDailyGift = () => {
    if (claimedDaily) return;
    setClaimedDaily(true);
    onOpenPack({
      id: 'pack-daily-bronze',
      title: 'DAILY BRONZE GIFT',
      subTitle: 'DAILY REWARD DROP',
      tag: 'FREE DAILY',
      badge: 'GIFT',
      image: '/src/assets/images/pack_totw_icons_1791170438755.jpg',
      description: 'INCLUDES 3 PLAYERS • RESETS AT 00:00 UTC',
      probabilities: [
        { label: 'RARE ITEM', value: '45.0%', color: '#00eefc' },
        { label: 'COIN BOOST', value: '100%', color: '#d9ef26' },
      ],
      coinsPrice: 0,
    });
  };

  const handleInspectFeatured = () => {
    onOpenPack({
      id: 'pack-featured-totw',
      title: 'TOTW & ICONS ULTIMATE EDITION',
      subTitle: 'WEEK 12 LIVE',
      tag: '93+ ICON CHANCE',
      badge: 'FEATURED SPOTLIGHT',
      image: '/src/assets/images/pack_totw_icons_1791170438755.jpg',
      description: 'ZIDANE, CRUYFF & VINI JR IN-FORM SPOTLIGHT',
      probabilities: [
        { label: '90+ TOTW', value: '34.5%', color: '#00eefc' },
        { label: '93+ ICON', value: '18.2%', color: '#d9ef26' },
        { label: 'WALKOUT', value: '88.0%', color: '#00eefc' },
      ],
      coinsPrice: 200000,
      pointsPrice: 3000,
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-3 sm:px-4 pt-2">
      {/* 1. FEATURED EVENT DROPS HEADER & BANNER */}
      <div className="flex items-center justify-between py-1.5 px-1 font-label text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#d9ef26] shadow-[0_0_8px_#d9ef26] animate-pulse" />
          <span className="font-bold tracking-wider text-[#d9ef26] uppercase">
            FEATURED EVENT DROPS
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#00eefc]">
          <span className="material-symbols-outlined text-xs">schedule</span>
          <span className="font-bold tracking-wider uppercase text-[10px]">
            EXPIRES IN 18H 42M
          </span>
        </div>
      </div>

      {/* Hero Featured Pack Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-[#181c21] shadow-2xl mb-4 group">
        <div className="relative h-56 sm:h-64 w-full">
          <img
            src="/src/assets/images/pack_totw_icons_1791170438755.jpg"
            alt="TOTW & ICONS"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101419] via-[#101419]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#101419]/80 via-transparent to-transparent" />

          {/* Top Tag inside banner */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 rounded bg-[#d9ef26] text-[#0a0f13] font-label text-[10px] font-black uppercase tracking-wider">
              WEEK 12 LIVE
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl font-black italic uppercase text-white tracking-tight mt-1">
              TOTW & ICONS
            </h2>
          </div>

          {/* Icon walkout chance chip */}
          <div className="absolute bottom-16 right-3 glass-pill px-2.5 py-1 rounded-lg border border-[#d9ef26]/30 flex items-center gap-1.5 shadow-lg">
            <span className="material-symbols-outlined text-xs text-[#d9ef26]">bolt</span>
            <span className="font-label text-[10px] font-black uppercase text-white tracking-wide">
              93+ ICON WALKOUT CHANCE
            </span>
          </div>

          {/* Bottom strip in banner */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-[#0a0f13]/90 backdrop-blur-md flex items-center justify-between border-t border-white/5">
            <div className="flex flex-col">
              <span className="font-headline text-sm font-black italic uppercase text-white tracking-tight">
                APEX ICON SPOTLIGHT
              </span>
              <span className="font-body text-xs text-[#94a3b8]">
                Zidane, Cruyff, & Vini Jr In-Form
              </span>
            </div>
            <button
              onClick={handleInspectFeatured}
              className="py-1.5 px-3.5 rounded-lg bg-[#d9ef26] text-[#0a0f13] font-headline text-xs font-black italic uppercase tracking-wider shadow-[0_0_12px_rgba(217,239,38,0.5)] hover:brightness-110 active:scale-95 transition cursor-pointer flex items-center gap-1"
            >
              INSPECT
              <span className="material-symbols-outlined text-sm">visibility</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PACK CATEGORY TABS & INFO */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setActiveTab('promo')}
            className={`py-1.5 px-3 rounded-lg font-label text-xs uppercase font-extrabold transition-all cursor-pointer ${
              activeTab === 'promo'
                ? 'bg-[#d9ef26] text-[#0a0f13] shadow-[0_0_12px_rgba(217,239,38,0.4)]'
                : 'bg-[#181c21] text-[#94a3b8] hover:text-white'
            }`}
          >
            PROMO PACKS
          </button>
          <button
            onClick={() => setActiveTab('foundation')}
            className={`py-1.5 px-3 rounded-lg font-label text-xs uppercase font-extrabold transition-all cursor-pointer ${
              activeTab === 'foundation'
                ? 'bg-[#d9ef26] text-[#0a0f13] shadow-[0_0_12px_rgba(217,239,38,0.4)]'
                : 'bg-[#181c21] text-[#94a3b8] hover:text-white'
            }`}
          >
            FOUNDATION
          </button>
          <button
            onClick={() => setActiveTab('my-packs')}
            className={`py-1.5 px-3 rounded-lg font-label text-xs uppercase font-extrabold transition-all cursor-pointer ${
              activeTab === 'my-packs'
                ? 'bg-[#d9ef26] text-[#0a0f13] shadow-[0_0_12px_rgba(217,239,38,0.4)]'
                : 'bg-[#181c21] text-[#94a3b8] hover:text-white'
            }`}
          >
            MY PACKS (1)
          </button>
        </div>
        <button
          onClick={() => alert('FC 26 Pack Probabilities are independently certified under UEFA Esports Regulations. All packs guarantee maximum tier transparency.')}
          className="w-8 h-8 rounded-lg bg-[#181c21] border border-white/10 text-[#00eefc] hover:bg-[#262a30] flex items-center justify-center transition active:scale-95 cursor-pointer"
          title="Pack Odds & Probability Info"
        >
          <span className="material-symbols-outlined text-sm">info</span>
        </button>
      </div>

      {/* 3. DAILY BRONZE GIFT BANNER */}
      <div className="w-full p-3 rounded-xl bg-gradient-to-r from-[#004f54]/40 via-[#181c21] to-[#181c21] border border-[#00eefc]/30 flex items-center justify-between mb-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#004f54]/60 border border-[#00eefc]/50 flex items-center justify-center text-[#00eefc] shadow-[0_0_12px_rgba(0,238,252,0.3)]">
            <span className="material-symbols-outlined text-xl">redeem</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-headline text-sm font-black italic uppercase text-white tracking-tight">
                DAILY BRONZE GIFT
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#00eefc]/20 text-[#00eefc] font-label text-[9px] font-black uppercase">
                FREE
              </span>
            </div>
            <span className="font-body text-[11px] text-[#94a3b8]">
              Includes 3 Players • Resets daily at 00:00 UTC
            </span>
          </div>
        </div>
        <button
          onClick={handleClaimDailyGift}
          disabled={claimedDaily}
          className={`py-1.5 px-4 rounded-lg font-headline text-xs font-black italic uppercase tracking-wider transition cursor-pointer shadow-md ${
            claimedDaily
              ? 'bg-white/10 text-white/40 cursor-not-allowed'
              : 'bg-[#00eefc] text-[#0a0f13] hover:brightness-110 active:scale-95 shadow-[0_0_14px_rgba(0,238,252,0.4)]'
          }`}
        >
          {claimedDaily ? 'CLAIMED' : 'CLAIM'}
        </button>
      </div>

      {/* 4. LIVE PACK SHOWCASE (3 LIMITED OFFERS) */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#d9ef26] text-base animate-pulse">
            bolt
          </span>
          <h3 className="font-headline text-lg sm:text-xl font-black italic uppercase text-white tracking-wide">
            LIVE PACK SHOWCASE
          </h3>
        </div>
        <span className="font-label text-xs uppercase tracking-wider text-[#94a3b8] font-bold">
          3 LIMITED OFFERS
        </span>
      </div>

      {/* Packs Cards Stack */}
      <div className="space-y-4">
        {PACKS_DATA.map((pack) => (
          <div
            key={pack.id}
            className="w-full rounded-2xl bg-[#14181e] border border-white/10 overflow-hidden shadow-xl hover:border-white/20 transition group"
          >
            {/* Top Tag & Guarantee */}
            <div className="px-4 pt-3 pb-1 flex items-center justify-between">
              <span className="font-label text-[10px] font-black uppercase tracking-wider text-[#d9ef26]">
                {pack.subTitle}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#1f252e] border border-white/10 font-label text-[9px] font-bold uppercase text-white">
                {pack.tag}
              </span>
            </div>

            {/* Pack Title */}
            <div className="px-4 pb-2">
              <h4 className="font-headline text-xl sm:text-2xl font-black italic uppercase text-white tracking-tight">
                {pack.title}
              </h4>
            </div>

            {/* Pack Visual Backdrop */}
            <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#0d1014] flex items-center justify-center">
              <img
                src={pack.image}
                alt={pack.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14181e] via-transparent to-transparent opacity-80" />

              {/* Items Callout Overlay */}
              <div className="absolute bottom-2 left-4">
                <span className="font-label text-xs font-bold uppercase text-white/90 drop-shadow-md">
                  {pack.description}
                </span>
              </div>
            </div>

            {/* Probability Specs Strip */}
            <div className="grid grid-cols-3 divide-x divide-white/5 py-2.5 px-3 bg-[#101317] border-y border-white/5 font-label text-center">
              {pack.probabilities.map((prob, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] uppercase text-[#94a3b8] font-bold">
                    {prob.label}
                  </span>
                  <span
                    className="font-headline text-sm font-black italic tracking-tight"
                    style={{ color: prob.color || '#ffffff' }}
                  >
                    {prob.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Purchase CTA Buttons */}
            <div className="p-3">
              {pack.isCoinsOnly ? (
                <button
                  onClick={() => handleBuyWithCoins(pack)}
                  className="w-full py-3 rounded-xl bg-[#d9ef26] text-[#0a0f13] font-headline text-sm font-black italic uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_0_20px_rgba(217,239,38,0.5)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="text-base font-bold">⬡</span>
                  OPEN FOR {pack.coinsPrice.toLocaleString()} COINS
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleBuyWithCoins(pack)}
                    className="py-2.5 px-3 rounded-xl bg-[#1b2129] border border-[#d9ef26]/30 text-[#d9ef26] font-headline text-xs font-black italic uppercase tracking-wider hover:bg-[#252c36] active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>⬡</span>
                    {pack.coinsPrice.toLocaleString()}
                  </button>
                  <button
                    onClick={() => handleBuyWithPoints(pack)}
                    className="py-2.5 px-3 rounded-xl bg-[#d9ef26] text-[#0a0f13] font-headline text-xs font-black italic uppercase tracking-wider hover:brightness-110 active:scale-95 transition shadow-[0_0_15px_rgba(217,239,38,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>💎</span>
                    {pack.pointsPrice?.toLocaleString()} FP
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 5. QUICK FUEL TOP-UP SECTION */}
      <div className="mt-6 mb-2">
        <div className="flex items-center justify-between px-1 mb-2">
          <h4 className="font-headline text-base font-black italic uppercase text-white tracking-wide">
            QUICK FUEL TOP-UP
          </h4>
          <span className="font-label text-[10px] uppercase font-bold text-[#00eefc]">
            FAST DELIVERY
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Points top-up button */}
          <button
            onClick={onOpenTopUp}
            className="p-3 rounded-xl bg-[#14181e] border border-[#00eefc]/30 hover:border-[#00eefc] transition flex items-center justify-between group active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-left">
              <span className="text-base">💎</span>
              <div className="flex flex-col font-label">
                <span className="text-xs font-bold text-white uppercase">+1,050 FP</span>
                <span className="text-[10px] text-[#94a3b8]">$9.99</span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-md bg-[#1f252e] group-hover:bg-[#00eefc] group-hover:text-[#0a0f13] text-[#00eefc] flex items-center justify-center transition">
              <span className="material-symbols-outlined text-sm">add</span>
            </div>
          </button>

          {/* Coins deal button */}
          <button
            onClick={onOpenTopUp}
            className="p-3 rounded-xl bg-[#14181e] border border-[#d9ef26]/30 hover:border-[#d9ef26] transition flex items-center justify-between group active:scale-95 cursor-pointer"
          >
            <div className="flex items-center gap-2 text-left">
              <span className="text-base text-[#d9ef26]">⬡</span>
              <div className="flex flex-col font-label">
                <span className="text-xs font-bold text-white uppercase">+150K Coins</span>
                <span className="text-[10px] text-[#d9ef26]">SBC Deal</span>
              </div>
            </div>
            <div className="w-6 h-6 rounded-md bg-[#1f252e] group-hover:bg-[#d9ef26] group-hover:text-[#0a0f13] text-[#d9ef26] flex items-center justify-center transition">
              <span className="material-symbols-outlined text-sm">swap_horiz</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
