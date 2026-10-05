/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ScreenType, Player, PackDefinition } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CardPacksScreen } from './components/screens/CardPacksScreen';
import { UltimateTeamScreen } from './components/screens/UltimateTeamScreen';
import { ClubSeasonsScreen } from './components/screens/ClubSeasonsScreen';
import { LiveMatchScreen } from './components/screens/LiveMatchScreen';
import { PackOpeningModal } from './components/modals/PackOpeningModal';
import { PlayerDetailModal } from './components/modals/PlayerDetailModal';
import { TopUpModal } from './components/modals/TopUpModal';
import { TacticsBoardModal } from './components/modals/TacticsBoardModal';
import { MarketModal } from './components/modals/MarketModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('packs');
  const [coins, setCoins] = useState<number>(12450);
  const [points, setPoints] = useState<number>(1850);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activePackToOpen, setActivePackToOpen] = useState<PackDefinition | null>(null);
  const [isTopUpOpen, setIsTopUpOpen] = useState<boolean>(false);
  const [isTacticsOpen, setIsTacticsOpen] = useState<boolean>(false);
  const [isMarketOpen, setIsMarketOpen] = useState<boolean>(false);

  // Handle pack purchase & open
  const handleOpenPack = (pack: PackDefinition) => {
    if (pack.coinsPrice > 0) {
      if (coins >= pack.coinsPrice) {
        setCoins((prev) => prev - pack.coinsPrice);
      } else if (pack.pointsPrice !== undefined && points >= pack.pointsPrice) {
        const pts = pack.pointsPrice;
        setPoints((prev) => prev - pts);
      }
    }
    setActivePackToOpen(pack);
  };

  const handleClaimPackPlayer = (_player: Player) => {
    // Add bonus coins reward for duplicate
    setCoins((prev) => prev + 15000);
  };

  const handleBuyMarketPlayer = (_player: Player, cost: number) => {
    setCoins((prev) => Math.max(0, prev - cost));
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0f13] text-[#e0e2ea] flex flex-col relative overflow-x-hidden selection:bg-[#d9ef26] selection:text-[#0a0f13]">
      {/* Top Header - Rendered on hub screens */}
      {currentScreen !== 'live-match' && (
        <Header
          currentScreen={currentScreen}
          coins={coins}
          points={points}
          onTopUpClick={() => setIsTopUpOpen(true)}
        />
      )}

      {/* Main Screen Container */}
      <main className="flex-1 w-full flex flex-col items-center">
        {currentScreen === 'packs' && (
          <CardPacksScreen
            coins={coins}
            points={points}
            onOpenPack={handleOpenPack}
            onOpenTopUp={() => setIsTopUpOpen(true)}
          />
        )}

        {currentScreen === 'ultimate' && (
          <UltimateTeamScreen
            onInspectPlayer={(player) => setSelectedPlayer(player)}
            onOpenTactics={() => setIsTacticsOpen(true)}
          />
        )}

        {currentScreen === 'club' && (
          <ClubSeasonsScreen
            onPlayMatch={() => setCurrentScreen('live-match')}
            onOpenTacticsBoard={() => setIsTacticsOpen(true)}
            onOpenMarket={() => setIsMarketOpen(true)}
          />
        )}

        {currentScreen === 'live-match' && (
          <LiveMatchScreen onExitToHub={() => setCurrentScreen('ultimate')} />
        )}
      </main>

      {/* Bottom Navigation - Hidden in Live Match for clean fullscreen gameplay HUD */}
      {currentScreen !== 'live-match' && (
        <BottomNav
          activeScreen={currentScreen}
          onSelectScreen={(screen) => setCurrentScreen(screen)}
          packsCount={1}
        />
      )}

      {/* Interactive Modals */}
      <PackOpeningModal
        isOpen={Boolean(activePackToOpen)}
        pack={activePackToOpen}
        onClose={() => setActivePackToOpen(null)}
        onClaimPlayer={handleClaimPackPlayer}
      />

      <PlayerDetailModal
        isOpen={Boolean(selectedPlayer)}
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
        onSetCaptain={(p) => {
          setSelectedPlayer(null);
          alert(`${p.name} is now Team Captain!`);
        }}
        onSetFK={(p) => {
          setSelectedPlayer(null);
          alert(`${p.name} assigned as Free Kick Specialist!`);
        }}
      />

      <TopUpModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
        onAddPoints={(amt) => setPoints((p) => p + amt)}
        onAddCoins={(amt) => setCoins((c) => c + amt)}
      />

      <TacticsBoardModal
        isOpen={isTacticsOpen}
        onClose={() => setIsTacticsOpen(false)}
      />

      <MarketModal
        isOpen={isMarketOpen}
        coins={coins}
        onClose={() => setIsMarketOpen(false)}
        onBuyPlayer={handleBuyMarketPlayer}
      />
    </div>
  );
}
