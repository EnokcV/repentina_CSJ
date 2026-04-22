import React, { useState, useEffect } from 'react';
import offlineService from '../services/offlineService';
import verificationService from '../services/verificationService';
import { AppSettings } from '../types';

interface NegotiationPanelProps {
  settings: AppSettings;
}

const NegotiationPanel: React.FC<NegotiationPanelProps> = ({ settings }) => {
  const [currentPrice, setCurrentPrice] = useState<number>(100);
  const [minPrice, setMinPrice] = useState<number>(50);
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [isNegotiating, setIsNegotiating] = useState(false);
  const [agreementStatus, setAgreementStatus] = useState<'pending' | 'accepted' | 'rejected'>('pending');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [translatedMessage, setTranslatedMessage] = useState<string>('');

  const commonItems = [
    { id: 'taxi', es: 'Taxi', fr: 'Taxi', en: 'Taxi', basePrice: 150 },
    { id: 'food', es: 'Comida', fr: 'Nourriture', en: 'Food', basePrice: 200 },
    { id: 'souvenir', es: 'Recuerdo', fr: 'Souvenir', en: 'Souvenir', basePrice: 100 },
    { id: 'tour', es: 'Tour', fr: 'Visite', en: 'Tour', basePrice: 300 },
    { id: 'hotel', es: 'Hotel', fr: 'Hôtel', en: 'Hotel', basePrice: 800 }
  ];

  const negotiationPhrases = {
    offer: {
      es: '¿Podemos acordar este precio?',
      fr: 'Pouvons-nous nous mettre d\'accord sur ce prix ?',
      en: 'Can we agree on this price?'
    },
    tooHigh: {
      es: 'Es muy caro para mí',
      fr: 'C\'est trop cher pour moi',
      en: 'It\'s too expensive for me'
    },
    counter: {
      es: '¿Qué tal si pagamos menos?',
      fr: 'Et si nous payions moins ?',
      en: 'What if we pay less?'
    },
    accept: {
      es: 'De acuerdo, acepto el precio',
      fr: 'D\'accord, j\'accepte le prix',
      en: 'Okay, I accept the price'
    },
    reject: {
      es: 'No puedo pagar ese precio',
      fr: 'Je ne peux pas payer ce prix',
      en: 'I can\'t pay that price'
    }
  };

  const getTargetLanguage = () => {
    if (settings.language === 'es') return 'fr';
    if (settings.language === 'fr') return 'es';
    return 'fr';
  };

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '0.9rem';
      case 'large': return '1.4rem';
      default: return '1.1rem';
    }
  };

  const getLargeFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '1.5rem';
      case 'large': return '2.5rem';
      default: return '2rem';
    }
  };

  useEffect(() => {
    if (selectedItem) {
      generateNegotiationMessage('offer');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, currentPrice]);

  const handleItemSelect = (item: typeof commonItems[0]) => {
    setSelectedItem(item.id);
    setCurrentPrice(item.basePrice);
    setMinPrice(item.basePrice * 0.5);
    setMaxPrice(item.basePrice * 1.5);
    setAgreementStatus('pending');
    setTranslatedMessage('');
  };

  const adjustPrice = (amount: number) => {
    const newPrice = currentPrice + amount;
    if (newPrice >= minPrice && newPrice <= maxPrice) {
      setCurrentPrice(newPrice);
      setAgreementStatus('pending');
    }
  };

  const generateNegotiationMessage = (type: keyof typeof negotiationPhrases) => {
    const message = negotiationPhrases[type][settings.language];
    const translated = offlineService.translate(message, settings.language, getTargetLanguage());
    setTranslatedMessage(translated);
    
    if (settings.vibrationEnabled) {
      verificationService.signalMessageReceived();
    }
  };

  const handleAccept = async () => {
    setIsNegotiating(true);
    generateNegotiationMessage('accept');
    
    if (settings.vibrationEnabled) {
      await verificationService.confirmMessage('agreement');
    }
    
    setAgreementStatus('accepted');
    setIsNegotiating(false);
  };

  const handleReject = () => {
    generateNegotiationMessage('reject');
    setAgreementStatus('rejected');
  };

  const handleCounter = () => {
    const suggestedPrice = Math.floor((currentPrice + minPrice) / 2);
    setCurrentPrice(suggestedPrice);
    generateNegotiationMessage('counter');
  };

  return (
    <div className="negotiation-panel">
      <h2 style={{ fontSize: getLargeFontSize(), textAlign: 'center', marginBottom: '20px' }}>
        {settings.language === 'es' ? 'Negociador Rápido' : 
         settings.language === 'fr' ? 'Négociateur Rapide' : 
         'Quick Negotiator'}
      </h2>

      <div className="item-selection" style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: getFontSize(), textAlign: 'center', marginBottom: '15px' }}>
          {settings.language === 'es' ? 'Selecciona artículo o servicio' : 
           settings.language === 'fr' ? 'Sélectionnez l\'article ou service' : 
           'Select item or service'}
        </h3>
        
        <div className="items-grid">
          {commonItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemSelect(item)}
              className={`item-card ${selectedItem === item.id ? 'selected' : ''}`}
            >
              <div className="item-icon">
                <span className="material-icons">
                  {item.id === 'taxi' && 'local_taxi'}
                  {item.id === 'food' && 'restaurant'}
                  {item.id === 'souvenir' && 'card_giftcard'}
                  {item.id === 'tour' && 'tour'}
                  {item.id === 'hotel' && 'hotel'}
                </span>
              </div>
              <div style={{ fontWeight: '600' }}>{item[settings.language]}</div>
              <div style={{ fontSize: '0.9rem', marginTop: '5px', opacity: 0.8 }}>
                ${item.basePrice}
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedItem && (
        <div className="negotiation-interface" style={{ 
          background: 'white', 
          borderRadius: '16px', 
          padding: '30px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div className="price-display" style={{ 
            fontSize: getLargeFontSize(), 
            fontWeight: '700',
            color: '#2196F3',
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            ${currentPrice}
          </div>

          <div className="price-controls">
            <button
              onClick={() => adjustPrice(-10)}
              className="price-btn decrease"
            >
              <span className="material-icons">remove</span>
            </button>
            
            <div style={{ fontSize: getFontSize(), fontWeight: '600' }}>
              {settings.language === 'es' ? 'Ajustar Precio' : 
               settings.language === 'fr' ? 'Ajuster le Prix' : 
               'Adjust Price'}
            </div>
            
            <button
              onClick={() => adjustPrice(10)}
              className="price-btn increase"
            >
              <span className="material-icons">add</span>
            </button>
          </div>

          <div className="price-range">
            <div style={{ fontSize: getFontSize(), marginBottom: '10px', color: 'var(--color-text-secondary)' }}>
              {settings.language === 'es' ? 'Rango Sugerido' : 
               settings.language === 'fr' ? 'Gamme Suggérée' : 
               'Suggested Range'}
            </div>
            <div style={{ fontSize: getFontSize(), fontWeight: '600' }}>
              ${minPrice} - ${maxPrice}
            </div>
          </div>

          <div className="negotiation-quick-actions">
            <button
              onClick={handleCounter}
              className="btn-offer"
            >
              <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>trending_down</span>
              {settings.language === 'es' ? 'Ofrecer Menos' : 
               settings.language === 'fr' ? 'Proposer Moins' : 
               'Offer Less'}
            </button>
            
            <button
              onClick={() => generateNegotiationMessage('tooHigh')}
              className="btn-expensive"
            >
              <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>money_off</span>
              {settings.language === 'es' ? 'Muy Caro' : 
               settings.language === 'fr' ? 'Trop Cher' : 
               'Too Expensive'}
            </button>
          </div>

          {translatedMessage && (
            <div className="translated-message">
              <div className="label">
                {settings.language === 'es' ? 'Mensaje para mostrar:' : 
                 settings.language === 'fr' ? 'Message à afficher:' : 
                 'Message to show:'}
              </div>
              <div className="text">
                {translatedMessage}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button
              onClick={handleAccept}
              disabled={isNegotiating}
              className="btn btn-secondary btn-lg"
              style={{ opacity: isNegotiating ? 0.7 : 1 }}
            >
              {isNegotiating ? 
                <span className="material-icons" style={{ animation: 'spin 1s linear infinite' }}>sync</span> : 
                <span className="material-icons">check</span>
              }
              {agreementStatus === 'accepted' ? 
               (settings.language === 'es' ? 'Aceptado' : 
                settings.language === 'fr' ? 'Accepté' : 'Accepted') :
               (settings.language === 'es' ? 'Aceptar' : 
                settings.language === 'fr' ? 'Accepter' : 'Accept')}
            </button>
            
            <button
              onClick={handleReject}
              className="btn btn-danger btn-lg"
            >
              <span className="material-icons">close</span>
              {agreementStatus === 'rejected' ? 
               (settings.language === 'es' ? 'Rechazado' : 
                settings.language === 'fr' ? 'Rejeté' : 'Rejected') :
               (settings.language === 'es' ? 'Rechazar' : 
                settings.language === 'fr' ? 'Rejeter' : 'Reject')}
            </button>
          </div>

          {agreementStatus !== 'pending' && (
            <div className={`agreement-status ${agreementStatus}`}>
              {agreementStatus === 'accepted' ? 
               <><span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>celebration</span></> :
               <><span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px' }}>cancel</span></>
              }
              {agreementStatus === 'accepted' ? 
               (settings.language === 'es' ? '¡Acuerdo alcanzado!' : 
                settings.language === 'fr' ? 'Accord atteint!' : 
                'Agreement reached!') :
               (settings.language === 'es' ? 'Negociación rechazada' : 
                settings.language === 'fr' ? 'Négociation rejetée' : 
                'Negotiation rejected')}
            </div>
          )}
        </div>
      )}

      <div className="negotiation-tips">
        <h4>
          <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1.2rem' }}>lightbulb</span>
          {settings.language === 'es' ? 'Consejos de Negociación' : 
           settings.language === 'fr' ? 'Conseils de Négociation' : 
           'Negotiation Tips'}
        </h4>
        
        <ul>
          <li>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1rem' }}>smartphone</span>
            {settings.language === 'es' ? 'Muestra el precio en la pantalla' : 
             settings.language === 'fr' ? 'Montrez le prix sur l\'écran' : 
             'Show the price on screen'}
          </li>
          <li>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1rem' }}>gesture</span>
            {settings.language === 'es' ? 'Usa gestos para señalar el acuerdo' : 
             settings.language === 'fr' ? 'Utilisez des gestes pour indiquer l\'accord' : 
             'Use gestures to indicate agreement'}
          </li>
          <li>
            <span className="material-icons" style={{ verticalAlign: 'middle', marginRight: '8px', fontSize: '1rem' }}>sentiment_satisfied</span>
            {settings.language === 'es' ? 'Sonríe y mantén contacto visual' : 
             settings.language === 'fr' ? 'Souriez et maintenez le contact visuel' : 
             'Smile and maintain eye contact'}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NegotiationPanel;
