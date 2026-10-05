import React, { useState } from 'react';
import { LeaderboardItem } from '../../types';
import { LEADERBOARD_FRIENDS, LEADERBOARD_GLOBAL } from '../../data/mockData';

interface ClubSeasonsScreenProps {
  onPlayMatch: () => void;
  onOpenTacticsBoard: () => void;
  onOpenMarket: () => void;
}

export const ClubSeasonsScreen: React.FC<ClubSeasonsScreenProps> = ({
  onPlayMatch,
  onOpenTacticsBoard,
  onOpenMarket,
}) => {
  const [leaderboardTab, setLeaderboardTab] = useState<'friends' | 'global'>('friends');
  const [claimedReward, setClaimedReward] = useState<string | null>(null);

  const leaderboardList: LeaderboardItem[] =
    leaderboardTab === 'friends' ? LEADERBOARD_FRIENDS : LEADERBOARD_GLOBAL;

  const handleClaimMilestone = (title: string) => {
    setClaimedReward(title);
    setTimeout(() => setClaimedReward(null), 2500);
  };

  return (
    <div className="w-full max-w-lg mx-auto pb-24 px-3 sm:px-4 pt-2">
      {/* 1. SEASON 04 BANNER & PROGRESS */}
      <div className="w-full rounded-2xl bg-[#14181e] border border-white/10 p-4 mb-4 shadow-xl relative overflow-hidden">
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#d9ef26]/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d9ef26] text-lg">bolt</span>
            <span className="font-headline text-lg sm:text-xl font-black italic uppercase text-white tracking-tight">
              SEASON 04
            </span>
            <span className="px-2 py-0.5 rounded bg-[#262a30] text-[#d9ef26] font-label text-[9px] font-black uppercase tracking-wider">
              VOLT OVERDRIVE
            </span>
          </div>
          <div className="flex items-center gap-1 font-label text-[10px] text-[#00eefc] font-bold">
            <span>ENDS IN</span>
            <span className="text-white">11D 08H</span>
          </div>
        </div>

        {/* Level and XP */}
        <div className="flex items-baseline justify-between mb-1.5 font-label">
          <div className="flex items-baseline gap-1">
            <span className="font-headline text-3xl sm:text-4xl font-black italic text-white">
              LVL 28
            </span>
            <span className="text-xs text-[#94a3b8] font-bold">/ 40</span>
          </div>
          <div className="text-xs font-bold text-white">
            <span className="text-[#d9ef26]">14,250</span> / 20,000 XP
          </div>
        </div>

        {/* Dual-tone Progress Bar */}
        <div className="w-full h-2 rounded-full bg-[#0a0f13] overflow-hidden p-0.5 border border-white/5 mb-3">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00eefc] via-[#bdd100] to-[#d9ef26] shadow-[0_0_12px_#d9ef26]"
            style={{ width: '71%' }}
          />
        </div>

        {/* Milestone Reward Cards */}
        <div className="grid grid-cols-3 gap-2">
          {/* Milestone 1 */}
          <button
            onClick={() => handleClaimMilestone('88+ Rare Player Pack (LV 30)')}
            className="p-2 rounded-xl bg-[#1c2128] border border-white/5 hover:border-[#d9ef26]/50 flex items-center gap-2 text-left transition active:scale-95 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#262c36] flex items-center justify-center text-[#d9ef26] group-hover:bg-[#d9ef26] group-hover:text-[#0a0f13] transition">
              <span className="material-symbols-outlined text-sm">style</span>
            </div>
            <div className="flex flex-col overflow-hidden font-label">
              <div className="flex items-center gap-1 text-[8px] text-[#d9ef26] font-bold uppercase truncate">
                <span>LV 30</span>
                <span className="text-[#00eefc]">IN 2 LVLS</span>
              </div>
              <span className="text-[10px] font-bold text-white truncate">88+ Pl...</span>
              <span className="text-[8px] text-[#94a3b8] truncate">Untradeabl...</span>
            </div>
          </button>

          {/* Milestone 2 */}
          <button
            onClick={() => handleClaimMilestone('100K Club Coins Boost (LV 35)')}
            className="p-2 rounded-xl bg-[#1c2128] border border-white/5 hover:border-[#d9ef26]/50 flex items-center gap-2 text-left transition active:scale-95 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#262c36] flex items-center justify-center text-[#d9ef26] group-hover:bg-[#d9ef26] group-hover:text-[#0a0f13] transition">
              <span className="text-xs font-bold">⬡</span>
            </div>
            <div className="flex flex-col overflow-hidden font-label">
              <div className="text-[8px] text-[#94a3b8] font-bold uppercase truncate">
                LV 35 MILESTONE
              </div>
              <span className="text-[10px] font-bold text-white truncate">100K ...</span>
              <span className="text-[8px] text-[#d9ef26] truncate">Club Boost</span>
            </div>
          </button>

          {/* Milestone 3 */}
          <button
            onClick={() => handleClaimMilestone('Prime Icon Loan 10 Matches (LV 40)')}
            className="p-2 rounded-xl bg-[#1c2128] border border-white/5 hover:border-[#00eefc]/50 flex items-center gap-2 text-left transition active:scale-95 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#262c36] flex items-center justify-center text-[#00eefc] group-hover:bg-[#00eefc] group-hover:text-[#0a0f13] transition">
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
            </div>
            <div className="flex flex-col overflow-hidden font-label">
              <div className="text-[8px] text-[#00eefc] font-bold uppercase truncate">LV 40 MAX</div>
              <span className="text-[10px] font-bold text-white truncate">Icon L...</span>
              <span className="text-[8px] text-[#94a3b8] truncate">Prime 10 Ga...</span>
            </div>
          </button>
        </div>

        {claimedReward && (
          <div className="mt-2 text-center text-xs font-headline text-[#d9ef26] italic animate-bounce">
            CLAIMED: {claimedReward}! Added to club rewards.
          </div>
        )}
      </div>

      {/* 2. COMPETITIVE CIRCUIT: DIVISION 1 */}
      <div className="w-full rounded-2xl bg-[#14181e] border border-white/10 p-4 mb-4 shadow-xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 font-label">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00eefc] shadow-[0_0_8px_#00eefc] animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00eefc]">
              COMPETITIVE CIRCUIT
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#94a3b8] text-[10px] uppercase font-bold">
            <span className="material-symbols-outlined text-xs text-[#d9ef26]">timer</span>
            <span>REWARDS: 2D 14H</span>
          </div>
        </div>

        {/* Tier Title and D1 Polygon Badge */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-label text-[10px] uppercase tracking-widest text-[#94a3b8] font-bold">
              RANKED TIER
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tight">
              DIVISION 1
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="px-1.5 py-0.2 rounded bg-[#d9ef26] text-[#0a0f13] font-label text-[9px] font-black uppercase">
                RANK I
              </span>
              <span className="font-label text-[10px] text-[#94a3b8] font-bold">
                • Top 1.8% Global
              </span>
            </div>
          </div>

          {/* D1 Polygon Emblem Badge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            {/* Holographic Glowing Triangle Shield */}
            <svg className="w-16 h-16" viewBox="0 0 100 100">
              <polygon
                points="50,5 95,85 5,85"
                fill="#101419"
                stroke="#d9ef26"
                strokeWidth="4"
                strokeLinejoin="round"
                className="filter drop-shadow-[0_0_10px_rgba(217,239,38,0.7)]"
              />
              <polygon
                points="50,20 82,80 18,80"
                fill="none"
                stroke="#00eefc"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            </svg>
            <span className="absolute font-headline text-xl font-black italic text-white tracking-tighter drop-shadow-md">
              D1
            </span>
          </div>
        </div>

        {/* Win Streak & Elite Tier */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {/* Win streak */}
          <div className="p-3 rounded-xl bg-[#1c2128] border border-white/5">
            <div className="flex items-center justify-between font-label text-[9px] uppercase font-bold text-[#94a3b8]">
              <span>WIN STREAK</span>
              <span className="text-[#d9ef26]">2X XP</span>
            </div>
            <div className="flex items-center gap-1.5 my-1">
              <span className="text-base">🔥🔥🔥</span>
              <span className="font-headline text-2xl font-black italic text-white">3</span>
            </div>
            <span className="font-label text-[9px] text-[#94a3b8]">1 more to Super Streak</span>
          </div>

          {/* Elite Tier */}
          <div className="p-3 rounded-xl bg-[#1c2128] border border-white/5">
            <div className="flex items-center justify-between font-label text-[9px] uppercase font-bold text-[#94a3b8]">
              <span>ELITE TIER</span>
              <span className="text-[#00eefc]">PROMOTION</span>
            </div>
            <div className="flex items-baseline gap-1 my-1">
              <span className="font-headline text-2xl font-black italic text-[#00eefc]">
                120
              </span>
              <span className="font-label text-[9px] text-white/60 font-bold">PTS</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#0a0f13] overflow-hidden">
              <div className="w-[78%] h-full bg-[#00eefc] rounded-full shadow-[0_0_8px_#00eefc]" />
            </div>
          </div>
        </div>

        {/* Large Play Match CTA */}
        <button
          onClick={onPlayMatch}
          className="w-full py-3.5 px-4 rounded-xl bg-[#d9ef26] text-[#0a0f13] font-headline text-base sm:text-lg font-black italic uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(217,239,38,0.5)] hover:brightness-110 active:scale-95 transition cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">sports_soccer</span>
          PLAY RIVALS MATCH
          <span className="material-symbols-outlined text-base">chevron_right</span>
        </button>
      </div>

      {/* 3. ACTIVE MODES & CLUB */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-headline text-base sm:text-lg font-black italic uppercase text-white tracking-wide">
            ACTIVE MODES & CLUB
          </h3>
          <span className="font-label text-[10px] uppercase font-bold text-[#94a3b8]">
            HUB LIVE 26
          </span>
        </div>

        {/* Champions Weekend League Banner */}
        <div className="w-full p-3.5 rounded-2xl bg-[#14181e] border border-white/10 mb-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#262c36] flex items-center justify-center text-[#d9ef26]">
                <span className="material-symbols-outlined text-base">military_tech</span>
              </div>
              <h4 className="font-headline text-sm sm:text-base font-black italic uppercase text-white tracking-tight">
                CHAMPIONS WEEKEND LEAGUE
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#004f54] text-[#00eefc] font-label text-[9px] font-black uppercase tracking-wider">
              QUALIFIED
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col">
              <span className="font-label text-[9px] text-[#94a3b8] uppercase font-bold mb-1">
                CURRENT FORM
              </span>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff334b]" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="font-headline text-lg font-black italic text-white">14</span>
                <span className="font-label text-[10px] text-[#94a3b8] uppercase font-bold ml-1">
                  WINS / 6 LEFT
                </span>
              </div>
              <button
                onClick={onPlayMatch}
                className="py-1.5 px-4 rounded-lg bg-[#1f2630] border border-white/10 text-white font-headline text-xs font-black italic uppercase tracking-wider hover:bg-[#2a3442] active:scale-95 transition cursor-pointer"
              >
                RESUME
              </button>
            </div>
          </div>
        </div>

        {/* Manager HQ & Market Ticker Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Manager HQ */}
          <div className="p-3 rounded-2xl bg-[#14181e] border border-white/10 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between font-label text-[9px] text-[#94a3b8] font-bold uppercase mb-1">
                <span>MANAGER HQ</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#d9ef26]" />
              </div>
              <h5 className="font-headline text-sm font-black italic uppercase text-white tracking-tight">
                NEXT FIXTURE
              </h5>
              <span className="font-label text-[10px] text-[#94a3b8] block">Premier Division</span>

              <div className="flex items-center justify-between my-2 py-1 px-2 rounded-lg bg-[#1a2027]">
                <div className="flex items-center gap-1 font-label text-xs font-bold text-white">
                  <span className="material-symbols-outlined text-xs text-[#94a3b8]">shield</span>
                  vs Arsenal
                </div>
                <span className="px-1.5 py-0.2 rounded bg-black/40 text-[8px] font-label uppercase text-[#00eefc] font-bold">
                  AWAY
                </span>
              </div>
            </div>

            <button
              onClick={onOpenTacticsBoard}
              className="w-full py-1.5 rounded-lg bg-[#1f2630] text-white font-headline text-[10px] font-black italic uppercase tracking-wider hover:bg-[#283240] transition active:scale-95 cursor-pointer mt-1"
            >
              TACTICS BOARD
            </button>
          </div>

          {/* Market Ticker */}
          <div className="p-3 rounded-2xl bg-[#14181e] border border-white/10 flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center justify-between font-label text-[9px] text-[#00eefc] font-bold uppercase mb-1">
                <span>MARKET TICKER</span>
                <span className="material-symbols-outlined text-xs text-[#00eefc]">trending_up</span>
              </div>
              <h5 className="font-headline text-sm font-black italic uppercase text-white tracking-tight">
                WATCHLIST (3)
              </h5>
              <span className="font-label text-[10px] text-[#94a3b8] block">
                Live Valuation Alerts
              </span>

              <div className="my-2 py-1 px-2 rounded-lg bg-[#1a2027] font-label text-xs">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>Mbappé 91</span>
                  <span className="text-[#ff334b] text-[10px]">-4.2%</span>
                </div>
                <div className="flex items-center justify-between text-[9px] text-[#94a3b8] mt-0.5">
                  <span>Current Bid:</span>
                  <span className="text-[#d9ef26] font-bold">1,820,000</span>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenMarket}
              className="w-full py-1.5 rounded-lg bg-[#004f54] text-[#00eefc] font-headline text-[10px] font-black italic uppercase tracking-wider hover:brightness-110 transition active:scale-95 cursor-pointer mt-1"
            >
              OPEN MARKET
            </button>
          </div>
        </div>
      </div>

      {/* 4. CLUB RIVALS TOP 100 LEADERBOARD */}
      <div className="w-full rounded-2xl bg-[#14181e] border border-white/10 p-3.5 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d9ef26] text-lg">bar_chart</span>
            <h4 className="font-headline text-sm sm:text-base font-black italic uppercase text-white tracking-tight">
              CLUB RIVALS TOP 100
            </h4>
          </div>
          <div className="flex items-center p-0.5 rounded-lg bg-[#1c2128] font-label text-[10px] font-bold uppercase">
            <button
              onClick={() => setLeaderboardTab('friends')}
              className={`px-2.5 py-0.5 rounded-md transition cursor-pointer ${
                leaderboardTab === 'friends'
                  ? 'bg-[#262c36] text-white shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              FRIENDS
            </button>
            <button
              onClick={() => setLeaderboardTab('global')}
              className={`px-2.5 py-0.5 rounded-md transition cursor-pointer ${
                leaderboardTab === 'global'
                  ? 'bg-[#262c36] text-white shadow-sm'
                  : 'text-[#94a3b8] hover:text-white'
              }`}
            >
              GLOBAL
            </button>
          </div>
        </div>

        {/* Leaderboard rows */}
        <div className="space-y-1.5">
          {leaderboardList.map((item) => (
            <div
              key={item.rank + item.username}
              className={`flex items-center justify-between p-2 rounded-xl border transition ${
                item.isUser
                  ? 'bg-[#1e2530] border-[#d9ef26]/40 shadow-[0_0_12px_rgba(217,239,38,0.2)]'
                  : 'bg-[#181c22] border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="font-headline text-base font-black italic text-[#d9ef26] w-6 text-center">
                  {item.rank}
                </span>

                <div className="w-7 h-7 rounded-lg bg-[#222933] flex items-center justify-center text-white/80">
                  {item.isUser ? (
                    <span className="font-label text-[10px] font-black text-[#d9ef26]">YOU</span>
                  ) : (
                    <span className="material-symbols-outlined text-sm">sports_esports</span>
                  )}
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline text-xs font-black italic uppercase text-white">
                      {item.username}
                    </span>
                    {item.isUser && (
                      <span className="px-1 py-0.2 rounded bg-[#d9ef26] text-[#0a0f13] font-label text-[8px] font-black uppercase">
                        YOU
                      </span>
                    )}
                  </div>
                  <span className="font-label text-[9px] text-[#94a3b8]">
                    {item.division} • {item.skillRating.toLocaleString()} Skill
                  </span>
                </div>
              </div>

              <span
                className={`font-headline text-sm font-black italic ${
                  item.isUser ? 'text-[#d9ef26]' : 'text-[#00eefc]'
                }`}
              >
                {item.record}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
