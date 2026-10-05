import React from 'react';
import { ScreenType } from '../types';
import { CREST_LOGO_URL, AVATAR_URL } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenType;
  coins: number;
  points: number;
  onTopUpClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  coins,
  points,
  onTopUpClick,
}) => {
  const getSubTitle = () => {
    switch (currentScreen) {
      case 'packs':
        return 'CARD PACKS';
      case 'ultimate':
        return 'ULTIMATE TEAM';
      case 'club':
        return 'SEASONS & CLUB';
      case 'live-match':
        return 'MATCH DAY';
      default:
        return 'ULTIMATE TEAM';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 py-3 bg-[#0a0f13]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
      {/* Brand & Level Lockup */}
      <div className="flex items-center gap-2.5">
        <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-[#181c21] border border-[#00eefc]/30 shadow-[0_0_10px_rgba(0,238,252,0.2)]">
          <img
            src={CREST_LOGO_URL}
            alt="FC 26 Crest"
            className="w-7 h-7 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-headline text-lg sm:text-xl font-black italic tracking-tight text-white uppercase">
              FC 26
            </span>
            <span className="font-label text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#181c21] text-[#d9ef26] border border-[#d9ef26]/40 uppercase tracking-wider">
              LVL 48
            </span>
          </div>
          <span className="font-label text-[9px] uppercase tracking-widest text-[#94a3b8] font-bold">
            {getSubTitle()}
          </span>
        </div>
      </div>

      {/* Currencies & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Gold Coins Pill */}
        <button
          onClick={onTopUpClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181c21] border border-[#d9ef26]/30 text-[#d9ef26] hover:bg-[#262a30] transition active:scale-95 cursor-pointer"
          title="Open Fuel Top-Up"
        >
          <div className="w-3.5 h-3.5 rounded-full border border-[#d9ef26] flex items-center justify-center font-bold text-[8px] leading-none">
            ⬡
          </div>
          <span className="font-headline font-bold text-xs sm:text-sm tracking-tight text-[#d9ef26] tabular-nums">
            {coins.toLocaleString()}
          </span>
        </button>

        {/* FC Points Pill */}
        <button
          onClick={onTopUpClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#181c21] border border-[#00eefc]/30 text-[#00eefc] hover:bg-[#262a30] transition active:scale-95 cursor-pointer"
          title="Open Fuel Top-Up"
        >
          <span className="text-xs leading-none">💎</span>
          <span className="font-headline font-bold text-xs sm:text-sm tracking-tight text-[#00eefc] tabular-nums">
            {points.toLocaleString()}
          </span>
        </button>

        {/* User Profile Avatar with Level 48 Ring */}
        <div className="relative w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-[#d9ef26] to-[#00eefc] shadow-[0_0_12px_rgba(217,239,38,0.3)]">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0f13]">
            <img
              src={AVATAR_URL}
              alt="ApexStriker_FC Avatar"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#00e676] border-2 border-[#0a0f13]" />
        </div>
      </div>
    </header>
  );
};
