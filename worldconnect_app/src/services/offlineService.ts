import { TranslationsData, QuickPhrase } from '../types';

class OfflineService {
  private translationsData: TranslationsData | null = null;
  private quickPhrases: QuickPhrase[] = [];
  private isInitialized: boolean = false;

  constructor() {
    this.initializeService();
  }

  private async initializeService(): Promise<void> {
    try {
      await this.loadTranslations();
      this.loadQuickPhrases();
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing OfflineService:', error);
      this.isInitialized = false;
    }
  }

  private async loadTranslations(): Promise<void> {
    try {
      const response = await fetch('/data/translations.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid translations format');
      }
      
      this.translationsData = data;
      console.log('Translations loaded successfully');
    } catch (error) {
      console.error('Error loading translations:', error);
      this.translationsData = null;
    }
  }

  private loadQuickPhrases(): void {
    this.quickPhrases = [
      { id: '1', category: 'emergency', icon: 'help', es: '¡Ayuda!', fr: 'Au secours !', en: 'Help!' },
      { id: '2', category: 'transportation', icon: 'directions', es: '¿Dónde está el Metro?', fr: 'Où est le métro ?', en: 'Where is the subway?' },
      { id: '3', category: 'food', icon: 'restaurant', es: '¿Es picante?', fr: 'Est-ce épicé ?', en: 'Is it spicy?' },
      { id: '4', category: 'football', icon: 'sports_soccer', es: '¡GOOOL!', fr: 'BUT !', en: 'GOAL!' },
      { id: '5', category: 'negotiation', icon: 'attach_money', es: '¿Mejor precio?', fr: 'Meilleur prix ?', en: 'Better price?' },
      { id: '6', category: 'social', icon: 'people', es: '¿Tomamos foto?', fr: 'Photo ?', en: 'Photo?' },
    ];
  }

  translate(text: string, fromLang: string, toLang: string): string {
    // Validar entrada
    if (!text || typeof text !== 'string') {
      console.warn('Invalid text input for translation:', text);
      return text || '';
    }

    if (!fromLang || !toLang || typeof fromLang !== 'string' || typeof toLang !== 'string') {
      console.warn('Invalid language parameters:', { fromLang, toLang });
      return text;
    }

    if (!this.translationsData) {
      console.warn('Translations data not loaded');
      return text;
    }

    const textLower = text.toLowerCase().trim();

    try {
      for (const category of Object.keys(this.translationsData)) {
        const categoryData = this.translationsData[category as keyof TranslationsData];
        
        if (!categoryData || typeof categoryData !== 'object') {
          continue;
        }
        
        for (const key of Object.keys(categoryData)) {
          const translation = categoryData[key];
          
          if (!translation || typeof translation !== 'object') {
            continue;
          }
          
          const sourceText = translation[fromLang as keyof typeof translation];
          
          if (sourceText && sourceText.toLowerCase().trim() === textLower) {
            const result = translation[toLang as keyof typeof translation];
            return result || text;
          }
        }
      }
    } catch (error) {
      console.error('Error during translation:', error);
    }
    
    return text;
  }

  getQuickPhrases(category?: string): QuickPhrase[] {
    if (!category) return this.quickPhrases;
    return this.quickPhrases.filter(phrase => phrase.category === category);
  }

  searchTranslations(query: string, lang: string): any[] {
    if (!query || typeof query !== 'string') {
      return [];
    }

    if (!lang || typeof lang !== 'string') {
      return [];
    }

    if (!this.translationsData) {
      console.warn('Translations data not loaded, cannot search');
      return [];
    }

    const results: any[] = [];
    const queryLower = query.toLowerCase().trim();

    if (queryLower.length < 2) {
      return [];
    }

    try {
      for (const category of Object.keys(this.translationsData)) {
        const categoryData = this.translationsData[category as keyof TranslationsData];
        
        if (!categoryData || typeof categoryData !== 'object') {
          continue;
        }
        
        for (const key of Object.keys(categoryData)) {
          const translation = categoryData[key];
          
          if (!translation || typeof translation !== 'object') {
            continue;
          }
          
          const text = translation[lang as keyof typeof translation];
          
          if (text && typeof text === 'string' && text.toLowerCase().includes(queryLower)) {
            results.push({
              category,
              key,
              ...translation
            });
          }
        }
      }
    } catch (error) {
      console.error('Error searching translations:', error);
    }

    return results;
  }

  isDataLoaded(): boolean {
    return this.translationsData !== null;
  }
}

export default new OfflineService();
