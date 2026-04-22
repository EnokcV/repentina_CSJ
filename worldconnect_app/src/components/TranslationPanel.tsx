import React, { useState, useEffect } from 'react';
import offlineService from '../services/offlineService';
import verificationService from '../services/verificationService';
import { AppSettings } from '../types';

interface TranslationPanelProps {
  settings: AppSettings;
}

const TranslationPanel: React.FC<TranslationPanelProps> = ({ settings }) => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [fromLang, setFromLang] = useState<'es' | 'fr' | 'en'>('es');
  const [toLang, setToLang] = useState<'es' | 'fr' | 'en'>('fr');
  const [isVerifying, setIsVerifying] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (settings.language === 'es') {
      setFromLang('es');
      setToLang('fr');
    } else if (settings.language === 'fr') {
      setFromLang('fr');
      setToLang('es');
    } else {
      setFromLang('es');
      setToLang('fr');
    }
  }, [settings.language]);

  const handleTranslate = () => {
    if (!inputText.trim()) return;

    const translated = offlineService.translate(inputText, fromLang, toLang);
    setTranslatedText(translated);
    
    if (settings.vibrationEnabled) {
      verificationService.signalMessageReceived();
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    await verificationService.confirmMessage('translation');
    setIsVerifying(false);
  };

  const handleQuickPhrase = (phrase: string) => {
    setInputText(phrase);
    const translated = offlineService.translate(phrase, fromLang, toLang);
    setTranslatedText(translated);
    
    if (settings.vibrationEnabled) {
      verificationService.signalMessageReceived();
    }
  };

  const handleSearch = (query: string) => {
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    const results = offlineService.searchTranslations(query, fromLang);
    setSearchResults(results);
    setShowSearch(true);
  };

  const handleSelectResult = (result: any) => {
    setInputText(result[fromLang]);
    setTranslatedText(result[toLang]);
    setShowSearch(false);
    setSearchResults([]);
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const quickPhrases = offlineService.getQuickPhrases();

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '0.9rem';
      case 'large': return '1.4rem';
      default: return '1.1rem';
    }
  };

  const getLargeFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '1.1rem';
      case 'large': return '1.8rem';
      default: return '1.5rem';
    }
  };

  return (
    <div className="translation-panel">
      <h2 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '20px' }}>
        {settings.language === 'es' ? 'Traductor Instantáneo' : 
         settings.language === 'fr' ? 'Traducteur Instantané' : 
         'Instant Translator'}
      </h2>

      <div className="language-selector" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: '20px',
        gap: '15px'
      }}>
        <select 
          value={fromLang} 
          onChange={(e) => setFromLang(e.target.value as any)}
          style={{ padding: '10px', fontSize: getFontSize() }}
        >
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
        
        <button 
          onClick={swapLanguages}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          swap_horiz
        </button>
        
        <select 
          value={toLang} 
          onChange={(e) => setToLang(e.target.value as any)}
          style={{ padding: '10px', fontSize: getFontSize() }}
        >
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="translation-input" style={{ marginBottom: '20px' }}>
        <textarea
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder={settings.language === 'es' ? 'Escribe tu mensaje aquí...' : 
                      settings.language === 'fr' ? 'Écris ton message ici...' : 
                      'Type your message here...'}
          style={{ 
            width: '100%', 
            height: '100px', 
            padding: '15px', 
            fontSize: getFontSize(),
            borderRadius: '8px',
            border: '2px solid #ddd',
            resize: 'vertical'
          }}
        />
        
        {showSearch && searchResults.length > 0 && (
          <div className="search-results" style={{
            position: 'absolute',
            background: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            maxHeight: '200px',
            overflowY: 'auto',
            zIndex: 1000,
            width: '100%'
          }}>
            {searchResults.map((result, index) => (
              <div
                key={index}
                onClick={() => handleSelectResult(result)}
                style={{
                  padding: '10px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee'
                }}
              >
                <div style={{ fontWeight: '600', fontSize: getFontSize() }}>
                  {result[fromLang]}
                </div>
                <div style={{ color: '#666', fontSize: getFontSize() }}>
                  {result[toLang]}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="translation-actions" style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '20px',
        gap: '10px'
      }}>
        <button
          onClick={handleTranslate}
          style={{
            background: '#2196F3',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: getFontSize(),
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {settings.language === 'es' ? 'Traducir' : 
           settings.language === 'fr' ? 'Traduire' : 
           'Translate'}
        </button>
        
        <button
          onClick={() => {
            setInputText('');
            setTranslatedText('');
            setSearchResults([]);
            setShowSearch(false);
          }}
          style={{
            background: '#f44336',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            fontSize: getFontSize(),
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          {settings.language === 'es' ? 'Limpiar' : 
           settings.language === 'fr' ? 'Effacer' : 
           'Clear'}
        </button>
      </div>

      {translatedText && (
        <div className={`translation-card ${isVerifying ? 'verified' : ''}`} style={{ marginBottom: '20px' }}>
          <div className="original-text" style={{ fontSize: getFontSize() }}>
            {inputText}
          </div>
          
          <div className="translated-text" style={{ fontSize: getLargeFontSize() }}>
            {translatedText}
          </div>
          
          <div className="verification-actions" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: '10px',
            marginTop: '15px'
          }}>
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              style={{
                background: isVerifying ? '#ccc' : '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                fontSize: getFontSize(),
                borderRadius: '20px',
                cursor: isVerifying ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              {isVerifying ? '...' : 'check'} 
              {settings.language === 'es' ? ' Verificar' : 
               settings.language === 'fr' ? ' Vérifier' : 
               ' Verify'}
            </button>
            
            {isVerifying && (
              <div className="verification-indicator">
                {settings.language === 'es' ? 'Verificando...' : 
                 settings.language === 'fr' ? 'Vérification...' : 
                 'Verifying...'}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="quick-phrases" style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: getFontSize(), marginBottom: '15px' }}>
          {settings.language === 'es' ? 'Frases Rápidas' : 
           settings.language === 'fr' ? 'Phases Rapides' : 
           'Quick Phrases'}
        </h3>
        
        <div className="quick-phrases-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '10px'
        }}>
          {quickPhrases.map((phrase) => (
            <button
              key={phrase.id}
              onClick={() => handleQuickPhrase(phrase[fromLang])}
              style={{
                background: '#f5f5f5',
                border: '1px solid #ddd',
                padding: '15px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: getFontSize(),
                textAlign: 'left'
              }}
            >
              <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                {phrase[fromLang]}
              </div>
              <div style={{ color: '#666', fontSize: getFontSize() }}>
                {phrase[toLang]}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TranslationPanel;
