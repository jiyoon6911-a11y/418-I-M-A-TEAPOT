export type NavSection = 'home' | 'source-code' | 'component' | 'feed' | 'run' | 'admin';

export interface FloatingLog {
  id: string;
  text: string;
  timestamp: string;
  coordinates: { x: number; y: number };
  systemOverride?: boolean;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  errorCode: string;
  message: string;
  timestamp: string;
  humanOverride: boolean;
  systemResponse?: string;
}

export interface ExhibitionArtifact {
  id: string;
  name: string;
  category: string;
  productionId: string;
  timestamp: string;
  description: string;
  dimensions: string;
  asciiArt: string;
  details: string[];
  imageUrl?: string;
}

export interface FeedPost {
  id: string;
  imageUrl: string;
  caption: string;
  timestamp: string;
  status: string;
  commentsCount: number;
  likesCount: number;
  isUnlocked: boolean;
  asciiVisual?: string;
}

