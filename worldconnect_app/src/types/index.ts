export interface Translation {
  [key: string]: {
    es: string;
    fr: string;
    en: string;
  };
}

export interface TranslationsData {
  emergency: Translation;
  transportation: Translation;
  food: Translation;
  football_slang: Translation;
  local_expressions: Translation;
  negotiation: Translation;
  social: Translation;
}

export interface Message {
  id: string;
  text: string;
  translated: string;
  timestamp: Date;
  from: 'user' | 'other';
  verified: boolean;
}

export interface QuickPhrase {
  id: string;
  category: string;
  icon: string;
  es: string;
  fr: string;
  en: string;
}

export interface AppSettings {
  language: 'es' | 'fr' | 'en';
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  ecoMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
  themeMode: 'light' | 'dark' | 'system';
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  stadium: string;
  group?: string;
  phase: 'group' | 'round16' | 'quarter' | 'semi' | 'final' | 'third';
  status: 'upcoming' | 'live' | 'finished';
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  color: string;
}

export interface Venue {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  stadium: string;
  capacity: number;
  type: 'stadium' | 'training' | 'fanfest';
}

export interface PointOfInterest {
  id: string;
  name: string;
  category: 'hospital' | 'police' | 'restaurant' | 'hotel' | 'metro' | 'embassy' | 'market';
  lat: number;
  lng: number;
  address: string;
  city: string;
}

export interface TranslationHistoryItem {
  id: string;
  originalText: string;
  translatedText: string;
  fromLang: string;
  toLang: string;
  timestamp: number;
  isFavorite: boolean;
}

export type MapCategory = 'comida' | 'diversion' | 'estadios' | 'transporte' | 'todos';

export interface MapPoint {
  id: string;
  name: string;
  category: MapCategory;
  lat: number;
  lng: number;
  address: string;
  distance?: number;
  icon?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  timestamp?: number;
}
