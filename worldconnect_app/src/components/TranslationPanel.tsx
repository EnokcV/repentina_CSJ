import React, { useState, useEffect } from 'react';
import offlineService from '../services/offlineService';
import verificationService from '../services/verificationService';
import translationService from '../services/translationService';
import audioService from '../services/audioService';
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
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [listeningError, setListeningError] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [speakingSource, setSpeakingSource] = useState<'original' | 'translated' | null>(null);

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

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    setIsTranslating(true);
    try {
      const translated = await translationService.translate(inputText, fromLang, toLang);
      setTranslatedText(translated);
      
      if (settings.vibrationEnabled) {
        verificationService.signalMessageReceived();
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    await verificationService.confirmMessage('translation');
    setIsVerifying(false);
  };

  const handleQuickPhrase = async (phrase: string) => {
    setInputText(phrase);
    setIsTranslating(true);
    try {
      const translated = await translationService.translate(phrase, fromLang, toLang);
      setTranslatedText(translated);
      
      if (settings.vibrationEnabled) {
        verificationService.signalMessageReceived();
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
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

  const startListening = () => {
    if (!audioService.supportsRecognition()) {
      setListeningError('Speech Recognition not supported');
      return;
    }

    setListeningError('');
    setInterimTranscript('');

    audioService.startListening({
      language: translationService.getVoiceLanguage(fromLang),
      onStart: () => {
        setIsListening(true);
      },
      onEnd: () => {
        setIsListening(false);
      },
      onError: (error: string) => {
        setListeningError(error);
        setIsListening(false);
      },
      onResult: (text: string, isFinal: boolean) => {
        if (isFinal) {
          const full = inputText + ' ' + text;
          setInputText(full.trim());
          setInterimTranscript('');
          
          handleTranslateFromInput(full.trim());
        } else {
          setInterimTranscript(text);
        }
      }
    });
  };

  const stopListening = () => {
    audioService.stopListening();
    setIsListening(false);
  };

  const handleTranslateFromInput = async (text: string) => {
    if (!text.trim()) return;
    
    setIsTranslating(true);
    try {
      const translated = await translationService.translate(text, fromLang, toLang);
      setTranslatedText(translated);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const speakText = async (text: string, lang: string, source: 'original' | 'translated') => {
    if (!audioService.supportsSynthesis()) {
      alert('Speech Synthesis not supported');
      return;
    }

    if (isSpeaking) {
      audioService.stopSpeaking();
      setIsSpeaking(false);
      setSpeakingSource(null);
      return;
    }

    if (!text) {
      alert('No text to speak');
      return;
    }

    try {
      setIsSpeaking(true);
      setSpeakingSource(source);
      await audioService.speak(text, {
        language: lang,
        rate: 0.9,
        pitch: 1,
        volume: 1
      });
      setIsSpeaking(false);
      setSpeakingSource(null);
    } catch (error) {
      console.error('Error speaking:', error);
      setIsSpeaking(false);
      setSpeakingSource(null);
    }
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
          className="swap-btn"
          title="Swap languages"
        >
          <span className="material-icons">swap_horiz</span>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <span style={{ fontSize: getFontSize(), color: 'var(--color-text-secondary)' }}>
            {settings.language === 'es' ? 'Tu mensaje:' : 
             settings.language === 'fr' ? 'Ton message:' : 
             'Your message:'}
          </span>
          <button
            onClick={isListening ? stopListening : startListening}
            className={`btn ${isListening ? 'btn-danger' : 'btn-secondary'} btn-sm`}
            style={{ 
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title={isListening ? 'Stop listening' : 'Voice input'}
          >
            <span className="material-icons" style={{ 
              animation: isListening ? 'pulse 1s infinite' : 'none',
              color: isListening ? 'white' : 'inherit'
            }}>
              {isListening ? 'stop' : 'mic'}
            </span>
          </button>
        </div>
        
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
        
        {interimTranscript && (
          <div style={{ 
            color: '#888', 
            fontStyle: 'italic',
            marginTop: '5px',
            fontSize: getFontSize()
          }}>
            {interimTranscript}
          </div>
        )}

        {listeningError && (
          <div style={{ 
            color: '#dc3545', 
            marginTop: '5px',
            fontSize: getFontSize()
          }}>
            {listeningError}
          </div>
        )}
        
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

      <div className="translation-actions">
        <button
          onClick={handleTranslate}
          disabled={isTranslating || !inputText.trim()}
          className="btn btn-primary btn-lg"
          style={{ fontSize: getFontSize() }}
        >
          <span className="material-icons">
            {isTranslating ? 'hourglass_empty' : 'translate'}
          </span>
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
          className="btn btn-danger btn-lg"
          style={{ fontSize: getFontSize() }}
        >
          <span className="material-icons">clear</span>
          {settings.language === 'es' ? 'Limpiar' : 
           settings.language === 'fr' ? 'Effacer' : 
           'Clear'}
        </button>
      </div>

      {translatedText && (
        <div className={`translation-card ${isVerifying ? 'verified' : ''}`} style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: getFontSize(), color: 'var(--color-text-secondary)' }}>
              {settings.language === 'es' ? 'Traducción:' : 
               settings.language === 'fr' ? 'Traduction:' : 
               'Translation:'}
            </span>
            <button
              onClick={() => speakText(inputText, fromLang, 'original')}
              className={`btn ${speakingSource === 'original' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ 
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Listen to original"
            >
              <span className="material-icons" style={{ 
                animation: speakingSource === 'original' && isSpeaking ? 'pulse 1s infinite' : 'none'
              }}>
                {speakingSource === 'original' && isSpeaking ? 'stop' : 'volume_up'}
              </span>
            </button>
          </div>
          
          <div className="original-text" style={{ fontSize: getFontSize() }}>
            {inputText}
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginTop: '15px',
            marginBottom: '10px'
          }}>
            <span style={{ fontSize: getLargeFontSize(), fontWeight: 'bold' }}>
              {translatedText}
            </span>
            <button
              onClick={() => speakText(translatedText, toLang, 'translated')}
              className={`btn ${speakingSource === 'translated' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ 
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Listen to translation"
            >
              <span className="material-icons" style={{ 
                animation: speakingSource === 'translated' && isSpeaking ? 'pulse 1s infinite' : 'none',
                color: speakingSource === 'translated' ? 'white' : 'inherit'
              }}>
                {speakingSource === 'translated' && isSpeaking ? 'stop' : 'volume_up'}
              </span>
            </button>
          </div>
          
          <div className="verification-actions">
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="btn btn-secondary"
              style={{
                fontSize: getFontSize(),
                borderRadius: '20px',
                cursor: isVerifying ? 'not-allowed' : 'pointer',
              }}
            >
              {isVerifying ? (
                <span className="material-icons" style={{ animation: 'spin 1s linear infinite' }}>sync</span>
              ) : (
                <span className="material-icons">check_circle</span>
              )}
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
        
        <div className="quick-phrases-grid">
          {quickPhrases.map((phrase) => (
            <button
              key={phrase.id}
              onClick={() => handleQuickPhrase(phrase[fromLang])}
              className="phrase-chip"
              style={{ fontSize: getFontSize() }}
            >
              <div style={{ fontWeight: '600', marginBottom: '5px' }}>
                {phrase[fromLang]}
              </div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: getFontSize() }}>
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
