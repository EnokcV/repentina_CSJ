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
}
