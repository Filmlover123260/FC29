import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  activeScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  packsCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onSelectScreen,
  packsCount = 1,
}) => {
  const tabs = [
    {
      id: 'live-match' as ScreenType,
      label: 'LIVE MATCH',
      icon: 'sports_soccer',
    },
    {
      id: 'ultimate' as ScreenType,
      label: 'ULTIMATE',
      icon: 'groups',
    },
    {
      id: 'packs' as ScreenType,
      label: 'PACKS',
      icon: 'style',
      badge: packsCount > 0 ? packsCount : undefined,
    },
    {
      id: 'club' as ScreenType,
      label: 'CLUB',
      icon: 'military_tech',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0f13]/95 backdrop-blur-xl border-t border-white/5 py-1.5 px-3 max-w-lg mx-auto md:max-w-2xl">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const isActive = activeScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectScreen(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'text-[#d9ef26] bg-[#181c21]/90 shadow-[inset_0_1px_0_rgba(217,239,38,0.25)]'
                  : 'text-[#94a3b8] hover:text-white hover:bg-white/5'
              }`}
            >
              {/* Active Top Bar Indicator */}
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-[#d9ef26] rounded-full shadow-[0_0_8px_#d9ef26]" />
              )}

              {/* Icon with potential badge */}
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px] leading-none">
                  {tab.icon}
                </span>
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#00eefc] text-[#0a0f13] font-label text-[9px] font-black flex items-center justify-center shadow-[0_0_8px_#00eefc]">
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`font-label text-[10px] tracking-wider mt-1 uppercase font-bold ${
                  isActive ? 'text-[#d9ef26]' : 'text-[#94a3b8]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
