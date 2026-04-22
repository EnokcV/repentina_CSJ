import React, { useState, useEffect } from 'react';
import './styles/global.css';
import QuickActions from './components/QuickActions';
import TranslationPanel from './components/TranslationPanel';
import EmergencyPanel from './components/EmergencyPanel';
import NegotiationPanel from './components/NegotiationPanel';
import SettingsPanel from './components/SettingsPanel';
import { AppSettings } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'translate' | 'emergency' | 'negotiate' | 'settings'>('home');
  const [settings, setSettings] = useState<AppSettings>({
    language: 'es',
    soundEnabled: true,
    vibrationEnabled: true,
    ecoMode: false,
    fontSize: 'medium'
  });
  const [isSilentMode, setIsSilentMode] = useState(false);

  useEffect(() => {
    const savedSettings = localStorage.getItem('worldconnect_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    const checkNoiseLevel = () => {
      const simulatedNoise = Math.random() > 0.7;
      setIsSilentMode(simulatedNoise);
    };

    const interval = setInterval(checkNoiseLevel, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('worldconnect_settings', JSON.stringify(settings));
    document.body.className = settings.ecoMode ? 'eco-mode' : '';
  }, [settings]);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'translate':
        return <TranslationPanel settings={settings} />;
      case 'emergency':
        return <EmergencyPanel settings={settings} />;
      case 'negotiate':
        return <NegotiationPanel settings={settings} />;
      case 'settings':
        return <SettingsPanel settings={settings} setSettings={setSettings} />;
      default:
        return <QuickActions setCurrentView={setCurrentView} settings={settings} />;
    }
  };

  return (
    <div className={`app ${settings.ecoMode ? 'eco-mode' : ''}`}>
      {isSilentMode && (
        <div className="silent-mode-indicator">
          🔕 Modo Silencioso Activado
        </div>
      )}
      
      <header className="header">
        <h1>⚽ WorldConnect</h1>
        <p>Traducción instantánea para el Mundial</p>
      </header>

      <main className="container">
        {renderCurrentView()}
      </main>

      <nav className="bottom-nav">
        <button 
          className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentView('home')}
        >
          🏠
        </button>
        <button 
          className={`nav-btn ${currentView === 'translate' ? 'active' : ''}`}
          onClick={() => setCurrentView('translate')}
        >
          💬
        </button>
        <button 
          className={`nav-btn ${currentView === 'emergency' ? 'active' : ''}`}
          onClick={() => setCurrentView('emergency')}
        >
          🚨
        </button>
        <button 
          className={`nav-btn ${currentView === 'negotiate' ? 'active' : ''}`}
          onClick={() => setCurrentView('negotiate')}
        >
          💰
        </button>
        <button 
          className={`nav-btn ${currentView === 'settings' ? 'active' : ''}`}
          onClick={() => setCurrentView('settings')}
        >
          ⚙️
        </button>
      </nav>
    </div>
  );
}

export default App;
