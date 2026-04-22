/**
 * Constantes globales de la aplicación WorldConnect
 */

// Configuración de almacenamiento
export const STORAGE_KEY = 'worldconnect_settings';

// Configuración por defecto
export const DEFAULT_SETTINGS = {
  language: 'es' as const,
  soundEnabled: true,
  vibrationEnabled: true,
  ecoMode: false,
  fontSize: 'medium' as const
};

// Idiomas soportados
export const SUPPORTED_LANGUAGES = ['es', 'fr', 'en'] as const;

// Tamaños de fuente disponibles
export const FONT_SIZES = ['small', 'medium', 'large'] as const;

// Vistas disponibles
export const VIEWS = ['home', 'translate', 'emergency', 'negotiate', 'settings'] as const;

// Patrones de verificación
export const VERIFICATION_PATTERNS = {
  received: {
    pattern: [100, 50, 100],
    duration: 250
  },
  confirmed: {
    pattern: [200, 100, 200, 100, 200],
    duration: 700
  }
} as const;

// URLs de recursos
export const RESOURCE_URLS = {
  translations: '/data/translations.json'
} as const;

// Intervalos de tiempo (ms)
export const INTERVALS = {
  noiseCheckInterval: 5000,
  silentModeTimeout: 5000,
  flashingDuration: 5000
} as const;

// Colores y estilos
export const COLORS = {
  primary: '#2196F3',
  secondary: '#4CAF50',
  danger: '#F44336',
  warning: '#FF9800',
  darkBg: '#1a1a1a',
  lightBg: '#ffffff',
  textPrimary: '#333333',
  textSecondary: '#666666'
} as const;

// Tamaños de fuente en rem
export const FONT_SIZE_MAP = {
  small: {
    default: '0.9rem',
    large: '1.2rem'
  },
  medium: {
    default: '1.1rem',
    large: '1.5rem'
  },
  large: {
    default: '1.4rem',
    large: '1.8rem'
  }
} as const;

// Mensajes de error
export const ERROR_MESSAGES = {
  translationsFailed: 'No se pudieron cargar las traducciones',
  invalidInput: 'Entrada inválida',
  audioContextFailed: 'No se pudo inicializar el contexto de audio',
  vibrationFailed: 'La vibración no está disponible'
} as const;

// Categorías de traducción disponibles
export const TRANSLATION_CATEGORIES = [
  'emergency',
  'transportation',
  'food',
  'football_slang',
  'local_expressions',
  'negotiation',
  'social'
] as const;

// Artículos para negociación
export const NEGOTIATION_ITEMS = [
  { id: 'taxi', basePrice: 150 },
  { id: 'food', basePrice: 200 },
  { id: 'souvenir', basePrice: 100 },
  { id: 'tour', basePrice: 300 },
  { id: 'hotel', basePrice: 800 }
] as const;

// Estados de negociación
export const AGREEMENT_STATUSES = ['pending', 'accepted', 'rejected'] as const;

// Categorías de emergencia
export const EMERGENCY_CATEGORIES = ['medical', 'lost', 'safety'] as const;
