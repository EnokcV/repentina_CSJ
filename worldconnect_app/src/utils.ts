/**
 * Funciones utilidad reutilizables
 */

/**
 * Obtiene el tamaño de fuente basado en la preferencia del usuario
 * @param fontSize - Tamaño de fuente ('small', 'medium', 'large')
 * @param isLarge - Si es true, retorna tamaño más grande
 * @returns Tamaño de fuente en rem
 */
export const getFontSize = (
  fontSize: 'small' | 'medium' | 'large' = 'medium',
  isLarge: boolean = false
): string => {
  const sizeMap = {
    small: isLarge ? '1.2rem' : '0.9rem',
    medium: isLarge ? '1.5rem' : '1.1rem',
    large: isLarge ? '1.8rem' : '1.4rem'
  };
  
  return sizeMap[fontSize];
};

/**
 * Traduce una palabra clave de idioma de corta a descripción completa
 * @param lang - Código de idioma ('es', 'fr', 'en')
 * @returns Nombre del idioma
 */
export const getLanguageName = (lang: string): string => {
  const languages: Record<string, string> = {
    es: 'Español',
    fr: 'Français',
    en: 'English'
  };
  
  return languages[lang] || lang;
};

/**
 * Valida si un texto es válido para traducción
 * @param text - Texto a validar
 * @returns true si es válido
 */
export const isValidTranslationText = (text: unknown): text is string => {
  return typeof text === 'string' && text.trim().length > 0;
};

/**
 * Valida si un código de idioma es válido
 * @param lang - Código a validar
 * @returns true si es válido
 */
export const isValidLanguage = (lang: unknown): lang is string => {
  return typeof lang === 'string' && ['es', 'fr', 'en'].includes(lang);
};

/**
 * Obtiene el idioma de destino basado en el idioma actual
 * @param currentLang - Idioma actual
 * @returns Idioma de destino
 */
export const getTargetLanguage = (
  currentLang: 'es' | 'fr' | 'en'
): 'es' | 'fr' | 'en' => {
  const targets: Record<'es' | 'fr' | 'en', 'es' | 'fr' | 'en'> = {
    es: 'fr',
    fr: 'es',
    en: 'fr'
  };
  
  return targets[currentLang];
};

/**
 * Normaliza un texto para búsqueda
 * @param text - Texto a normalizar
 * @returns Texto normalizado
 */
export const normalizeSearchText = (text: string): string => {
  return text.toLowerCase().trim();
};

/**
 * Formatea un precio con símbolo de dólar
 * @param price - Precio a formatear
 * @returns Precio formateado
 */
export const formatPrice = (price: number): string => {
  return `$${Math.max(0, Math.floor(price))}`;
};

/**
 * Valida un rango de precios
 * @param min - Precio mínimo
 * @param max - Precio máximo
 * @param current - Precio actual
 * @returns true si el precio está en rango
 */
export const isPriceInRange = (min: number, max: number, current: number): boolean => {
  return current >= min && current <= max;
};

/**
 * Obtiene una clase CSS basada en el estado
 * @param isActive - Si está activo
 * @param activeClass - Clase cuando está activo
 * @param inactiveClass - Clase cuando está inactivo
 * @returns Clase CSS
 */
export const getConditionalClass = (
  isActive: boolean,
  activeClass: string = 'active',
  inactiveClass: string = ''
): string => {
  return isActive ? activeClass : inactiveClass;
};

/**
 * Intenta recuperar configuración del localStorage
 * @returns Configuración o null
 */
export const loadSettingsFromStorage = (): any => {
  try {
    const stored = localStorage.getItem('worldconnect_settings');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading settings from storage:', error);
    return null;
  }
};

/**
 * Guarda configuración en localStorage
 * @param settings - Configuración a guardar
 * @returns true si fue exitoso
 */
export const saveSettingsToStorage = (settings: any): boolean => {
  try {
    localStorage.setItem('worldconnect_settings', JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings to storage:', error);
    return false;
  }
};

/**
 * Detecta si el dispositivo soporta vibración
 * @returns true si soporta vibración
 */
export const supportsVibration = (): boolean => {
  try {
    return 'vibrate' in navigator && typeof navigator.vibrate === 'function';
  } catch {
    return false;
  }
};

/**
 * Detecta si el dispositivo soporta Web Audio API
 * @returns true si soporta Web Audio
 */
export const supportsWebAudio = (): boolean => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    return !!AudioContext;
  } catch {
    return false;
  }
};

/**
 * Obtiene una traducción alternativa si la principal no existe
 * @param text - Texto a mostrar
 * @param fallback - Texto alternativo
 * @returns Texto a mostrar
 */
export const getTextWithFallback = (text: string | undefined, fallback: string): string => {
  return text && text.trim().length > 0 ? text : fallback;
};

/**
 * Pausa la ejecución por un tiempo especificado
 * @param ms - Milisegundos
 * @returns Promise que se resuelve después del tiempo
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, Math.max(0, ms)));
};

/**
 * Valida un rango de valores
 * @param value - Valor a validar
 * @param min - Valor mínimo
 * @param max - Valor máximo
 * @returns Valor ajustado al rango
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};
