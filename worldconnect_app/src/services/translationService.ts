// Diccionario de traducción bidireccional mejorado
const translationDictionary: Record<string, Record<string, Record<string, string>>> = {
  es: {
    fr: {
      'hola': 'bonjour',
      'buenos días': 'bonjour',
      'buenas tardes': 'bonsoir',
      'buenas noches': 'bonsoir',
      'adiós': 'au revoir',
      'hasta luego': 'à bientôt',
      'gracias': 'merci',
      'muchas gracias': 'merci beaucoup',
      'de nada': 'de rien',
      'por favor': 's\'il vous plaît',
      'disculpa': 'excusez-moi',
      'perdón': 'pardon',
      'sí': 'oui',
      'no': 'non',
      'entiendo': 'je comprends',
      'no entiendo': 'je ne comprends pas',
      'hablas inglés': 'parlez-vous anglais',
      'hablas español': 'parlez-vous espagnol',
      '¿cómo estás?': 'comment allez-vous',
      'estoy bien': 'je vais bien',
      '¿cuál es tu nombre?': 'quel est votre nom',
      'me llamo': 'je m\'appelle',
      'mucho gusto': 'enchanté',
      'agua': 'eau',
      'comida': 'nourriture',
      'bebida': 'boisson',
      'baño': 'toilettes',
      'ayuda': 'aide',
      '¡ayuda!': 'au secours',
      'policía': 'police',
      'doctor': 'docteur',
      'hospital': 'hôpital',
      'farmacia': 'pharmacie',
      'hotel': 'hôtel',
      'restaurant': 'restaurant',
      'dinero': 'argent',
      'precio': 'prix',
      'caro': 'cher',
      'barato': 'bon marché',
      '¿cuánto cuesta?': 'combien ça coûte',
      'pagar': 'payer',
      'tarjeta de crédito': 'carte de crédit',
      'efectivo': 'espèces',
      'sí, quiero': 'oui, je veux',
      'no, no quiero': 'non, je ne veux pas',
      'delicioso': 'délicieux',
      'está picante': 'c\'est épicé',
      'gol': 'but',
      '¡gol!': 'but',
      'fútbol': 'football',
      'equipo': 'équipe',
      'juego': 'match',
      'ganador': 'gagnant',
      'perdedor': 'perdant',
      '¡vamos!': 'allez-y',
      'tramo': 'ensemble',
      'gente': 'gens',
      'personas': 'personnes',
      'familia': 'famille',
      'amigo': 'ami',
      'amiga': 'amie',
      'hermano': 'frère',
      'hermana': 'sœur',
      'padre': 'père',
      'madre': 'mère',
      'hijo': 'fils',
      'hija': 'fille',
      'esposo': 'mari',
      'esposa': 'femme',
      'novio': 'petit ami',
      'novia': 'petite amie',
      'foto': 'photo',
      '¿tomamos foto?': 'prenons une photo',
      'sonríe': 'souris',
      'primero': 'd\'abord',
      '2do lugar': 'deuxième',
      'tercero': 'troisième',
      'último': 'dernier',
      'próximo': 'prochain',
      'anterior': 'précédent',
      'hoy': 'aujourd\'hui',
      'mañana': 'demain',
      'ayer': 'hier',
      'semana': 'semaine',
      'mes': 'mois',
      'año': 'année',
      'hora': 'heure',
      'minuto': 'minute',
      'segundo tiempo': 'seconde',
      'rápido': 'rapide',
      'lento': 'lent',
      'grande': 'grand',
      'pequeño': 'petit',
      'bueno': 'bon',
      'malo': 'mauvais',
      'bonito': 'joli',
      'feo': 'laid',
      'nuevo': 'nouveau',
      'viejo': 'vieux',
      'caliente': 'chaud',
      'temperatura baja': 'froid',
      'calor ambiente': 'chaud',
    },
    en: {
      'hola': 'hello',
      'buenos días': 'good morning',
      'buenas tardes': 'good afternoon',
      'buenas noches': 'good night',
      'adiós': 'goodbye',
      'hasta luego': 'see you later',
      'gracias': 'thank you',
      'muchas gracias': 'thank you very much',
      'de nada': 'you are welcome',
      'por favor': 'please',
      'disculpa': 'excuse me',
      'perdón': 'sorry',
      'sí': 'yes',
      'no': 'no',
      'entiendo': 'i understand',
      'no entiendo': 'i don\'t understand',
      'hablas inglés': 'do you speak english',
      'hablas español': 'do you speak spanish',
      '¿cómo estás?': 'how are you',
      'estoy bien': 'i\'m fine',
      '¿cuál es tu nombre?': 'what is your name',
      'me llamo': 'my name is',
      'mucho gusto': 'nice to meet you',
      'agua': 'water',
      'comida': 'food',
      'bebida': 'drink',
      'baño': 'bathroom',
      'ayuda': 'help',
      '¡ayuda!': 'help',
      'policía': 'police',
      'doctor': 'doctor',
      'hospital': 'hospital',
      'farmacia': 'pharmacy',
      'hotel': 'hotel',
      'restaurant': 'restaurant',
      'dinero': 'money',
      'precio': 'price',
      'caro': 'expensive',
      'barato': 'cheap',
      '¿cuánto cuesta?': 'how much does it cost',
      'pagar': 'pay',
      'tarjeta de crédito': 'credit card',
      'efectivo': 'cash',
      'sí, quiero': 'yes, i want',
      'no, no quiero': 'no, i don\'t want',
      'delicioso': 'delicious',
      'está picante': 'it\'s spicy',
      'gol': 'goal',
      '¡gol!': 'goal',
      'fútbol': 'football',
      'equipo': 'team',
      'juego': 'match',
      'ganador': 'winner',
      'perdedor': 'loser',
      '¡vamos!': 'let\'s go',
      'gente': 'people',
      'personas': 'persons',
      'familia': 'family',
      'amigo': 'friend',
      'amiga': 'friend',
      'hermano': 'brother',
      'hermana': 'sister',
      'padre': 'father',
      'madre': 'mother',
      'hijo': 'son',
      'hija': 'daughter',
      'esposo': 'husband',
      'esposa': 'wife',
      'novio': 'boyfriend',
      'novia': 'girlfriend',
      'foto': 'photo',
      '¿tomamos foto?': 'can we take a photo',
      'sonríe': 'smile',
    }
  },
  fr: {
    es: {
      'bonjour': 'hola',
      'bonsoir': 'buenas noches',
      'au revoir': 'adiós',
      'à bientôt': 'hasta luego',
      'merci': 'gracias',
      'merci beaucoup': 'muchas gracias',
      'de rien': 'de nada',
      's\'il vous plaît': 'por favor',
      'excusez-moi': 'disculpa',
      'pardon': 'perdón',
      'oui': 'sí',
      'non': 'no',
      'je comprends': 'entiendo',
      'je ne comprends pas': 'no entiendo',
      'parlez-vous anglais': 'hablas inglés',
      'parlez-vous espagnol': 'hablas español',
      'comment allez-vous': '¿cómo estás?',
      'je vais bien': 'estoy bien',
      'quel est votre nom': '¿cuál es tu nombre?',
      'je m\'appelle': 'me llamo',
      'enchanté': 'mucho gusto',
    },
    en: {
      'bonjour': 'hello',
      'bonsoir': 'good night',
      'au revoir': 'goodbye',
      'à bientôt': 'see you later',
      'merci': 'thank you',
      'merci beaucoup': 'thank you very much',
      'de rien': 'you are welcome',
      's\'il vous plaît': 'please',
      'excusez-moi': 'excuse me',
      'pardon': 'sorry',
      'oui': 'yes',
      'non': 'no',
      'je comprends': 'i understand',
      'je ne comprends pas': 'i don\'t understand',
    }
  },
  en: {
    es: {
      'hello': 'hola',
      'good morning': 'buenos días',
      'good afternoon': 'buenas tardes',
      'good night': 'buenas noches',
      'goodbye': 'adiós',
      'see you later': 'hasta luego',
      'thank you': 'gracias',
      'thank you very much': 'muchas gracias',
      'you are welcome': 'de nada',
      'please': 'por favor',
      'excuse me': 'disculpa',
      'sorry': 'perdón',
      'yes': 'sí',
      'no': 'no',
      'i understand': 'entiendo',
      'i don\'t understand': 'no entiendo',
      'do you speak english': 'hablas inglés',
      'do you speak spanish': 'hablas español',
      'how are you': '¿cómo estás?',
      'i\'m fine': 'estoy bien',
      'what is your name': '¿cuál es tu nombre?',
      'my name is': 'me llamo',
      'nice to meet you': 'mucho gusto',
      'water': 'agua',
      'food': 'comida',
      'drink': 'bebida',
      'bathroom': 'baño',
      'help': 'ayuda',
      'police': 'policía',
      'doctor': 'doctor',
      'hospital': 'hospital',
      'pharmacy': 'farmacia',
      'hotel': 'hotel',
      'restaurant': 'restaurant',
      'money': 'dinero',
      'price': 'precio',
      'expensive': 'caro',
      'cheap': 'barato',
      'how much does it cost': '¿cuánto cuesta?',
      'pay': 'pagar',
      'credit card': 'tarjeta de crédito',
      'cash': 'efectivo',
      'yes, i want': 'sí, quiero',
      'no, i don\'t want': 'no, no quiero',
      'delicious': 'delicioso',
      'it\'s spicy': 'está picante',
      'goal': 'gol',
      'football': 'fútbol',
      'team': 'equipo',
      'match': 'juego',
      'winner': 'ganador',
      'loser': 'perdedor',
      'let\'s go': '¡vamos!',
      'people': 'gente',
      'family': 'familia',
      'friend': 'amigo',
      'brother': 'hermano',
      'sister': 'hermana',
      'father': 'padre',
      'mother': 'madre',
      'son': 'hijo',
      'daughter': 'hija',
      'husband': 'esposo',
      'wife': 'esposa',
      'boyfriend': 'novio',
      'girlfriend': 'novia',
      'photo': 'foto',
      'can we take a photo': '¿tomamos foto?',
      'smile': 'sonríe',
    },
    fr: {
      'hello': 'bonjour',
      'good night': 'bonsoir',
      'goodbye': 'au revoir',
      'see you later': 'à bientôt',
      'thank you': 'merci',
      'thank you very much': 'merci beaucoup',
      'you are welcome': 'de rien',
      'please': 's\'il vous plaît',
      'excuse me': 'excusez-moi',
      'sorry': 'pardon',
      'yes': 'oui',
      'no': 'non',
      'i understand': 'je comprends',
      'i don\'t understand': 'je ne comprends pas',
    }
  }
};

const MYMEMORY_API_URL = 'https://api.mymemory.translated.net/get';

const CACHE_PREFIX = 'translation_cache_';
const CACHE_DURATION = 60 * 60 * 1000;

function getCacheKey(text: string, from: string, to: string): string {
  return CACHE_PREFIX + from + '_' + to + '_' + text.toLowerCase().replace(/\s+/g, '_');
}

function getFromCache(text: string, from: string, to: string): string | null {
  try {
    const key = getCacheKey(text, from, to);
    const cached = localStorage.getItem(key);
    if (cached) {
      const data = JSON.parse(cached);
      if (Date.now() - data.timestamp < CACHE_DURATION) {
        return data.translation;
      }
      localStorage.removeItem(key);
    }
  } catch {}
  return null;
}

function setCache(text: string, from: string, to: string, translation: string): void {
  try {
    const key = getCacheKey(text, from, to);
    localStorage.setItem(key, JSON.stringify({
      translation,
      timestamp: Date.now()
    }));
  } catch {}
}

async function translateWithAPI(text: string, fromLang: string, toLang: string): Promise<string | null> {
  const cache = getFromCache(text, fromLang, toLang);
  if (cache) return cache;

  const langPair = `${fromLang}|${toLang}`;
  const url = `${MYMEMORY_API_URL}?q=${encodeURIComponent(text)}&langpair=${langPair}`;

  try {
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      const translation = data.responseData.translatedText;
      setCache(text, fromLang, toLang, translation);
      return translation;
    }
  } catch (error) {
    console.warn('MyMemory API error:', error);
  }

  return null;
}

class TranslationService {
  /**
   * Traducir texto de un idioma a otro usando API real + fallback local
   */
  async translate(text: string, fromLang: string, toLang: string): Promise<string> {
    if (!text || !fromLang || !toLang) return text;

    const textTrimmed = text.trim();
    
    const apiResult = await translateWithAPI(textTrimmed, fromLang, toLang);
    if (apiResult) return apiResult;

    return this.translateLocal(textTrimmed, fromLang, toLang);
  }

  /**
   * Fallback: traducción local con diccionario
   */
  translateLocal(text: string, fromLang: string, toLang: string): string {
    if (!text || !fromLang || !toLang) return text;

    const textLower = text.toLowerCase().trim();
    const sourceLang = fromLang as keyof typeof translationDictionary;
    const targetLang = toLang;

    if (translationDictionary[sourceLang]) {
      const langPair = translationDictionary[sourceLang][targetLang];
      if (langPair && langPair[textLower]) {
        return langPair[textLower];
      }
    }

    const words = textLower.split(/\s+/);
    const translatedWords = words.map(word => {
      if (translationDictionary[sourceLang]?.[targetLang]?.[word]) {
        return translationDictionary[sourceLang][targetLang][word];
      }
      return word;
    });

    const result = translatedWords.join(' ');
    return result !== textLower ? result : text;
  }

  /**
   * Obtener el idioma de síntesis de voz apropiado
   */
  getVoiceLanguage(lang: string): string {
    switch(lang) {
      case 'es': return 'es-ES';
      case 'fr': return 'fr-FR';
      case 'en': return 'en-US';
      default: return 'en-US';
    }
  }

  /**
   * Obtener etiqueta de idioma legible
   */
  getLanguageLabel(lang: string): string {
    switch(lang) {
      case 'es': return 'Español';
      case 'fr': return 'Français';
      case 'en': return 'English';
      default: return lang;
    }
  }
}

const translationService = new TranslationService();
export default translationService;
