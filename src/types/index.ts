export type ScreenType = 'live-match' | 'ultimate' | 'packs' | 'club';

export interface Player {
  id: string;
  name: string;
  shortName: string;
  ovr: number;
  position: string;
  club: string;
  nation: string;
  ratingColor?: string;
  pac: number;
  sho: number;
  pas: number;
  dri: number;
  def: number;
  phy: number;
  cardType: 'toty' | 'gold' | 'totw' | 'hero' | 'icon';
  portrait: string;
  chemistry: number; // 0 - 3
  isCaptain?: boolean;
  formTrend?: 'up' | 'flat' | 'down';
  marketValue?: string;
}

export interface PackDefinition {
  id: string;
  title: string;
  subTitle: string;
  tag: string;
  badge: string;
  image: string;
  description: string;
  probabilities: { label: string; value: string; color?: string }[];
  coinsPrice: number;
  pointsPrice?: number;
  isCoinsOnly?: boolean;
}

export interface LeaderboardItem {
  rank: string;
  username: string;
  isUser?: boolean;
  division: string;
  skillRating: number;
  record: string;
}
