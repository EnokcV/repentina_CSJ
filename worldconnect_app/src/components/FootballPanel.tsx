import React, { useState, useEffect, useCallback } from 'react';
import { AppSettings, Match } from '../types';

interface FootballPanelProps {
  settings: AppSettings;
}

const mockMatches: Match[] = [
  { id: '1', homeTeam: { id: 'mex', name: 'Mexico', shortName: 'MEX', flag: '🇲🇽', color: '#006847' }, awayTeam: { id: 'rsa', name: 'South Africa', shortName: 'RSA', flag: '🇿🇦', color: '#007749' }, date: '2026-06-11', time: '15:00', venue: 'Estadio Azteca', stadium: 'Mexico City', group: 'A', phase: 'group', status: 'upcoming' },
  { id: '2', homeTeam: { id: 'kor', name: 'South Korea', shortName: 'KOR', flag: '🇰🇷', color: '#003478' }, awayTeam: { id: 'cze', name: 'Czechia', shortName: 'CZE', flag: '🇨🇿', color: '#114357' }, date: '2026-06-11', time: '22:00', venue: 'Estadio Akron', stadium: 'Zapopan', group: 'A', phase: 'group', status: 'upcoming' },
  { id: '3', homeTeam: { id: 'can', name: 'Canada', shortName: 'CAN', flag: '🇨🇦', color: '#FF0000' }, awayTeam: { id: 'bih', name: 'Bosnia and Herzegovina', shortName: 'BIH', flag: '🇧🇦', color: '#002395' }, date: '2026-06-12', time: '15:00', venue: 'BMO Field', stadium: 'Toronto', group: 'B', phase: 'group', status: 'upcoming' },
  { id: '4', homeTeam: { id: 'qat', name: 'Qatar', shortName: 'QAT', flag: '🇶🇦', color: '#8A1538' }, awayTeam: { id: 'sui', name: 'Switzerland', shortName: 'SUI', flag: '🇨🇭', color: '#FF0000' }, date: '2026-06-13', time: '15:00', venue: "Levi's Stadium", stadium: 'Santa Clara', group: 'B', phase: 'group', status: 'upcoming' },
  { id: '5', homeTeam: { id: 'bra', name: 'Brazil', shortName: 'BRA', flag: '🇧🇷', color: '#FFDF00' }, awayTeam: { id: 'mar', name: 'Morocco', shortName: 'MAR', flag: '🇲🇦', color: '#C1272D' }, date: '2026-06-13', time: '18:00', venue: 'MetLife Stadium', stadium: 'East Rutherford', group: 'C', phase: 'group', status: 'upcoming' },
  { id: '6', homeTeam: { id: 'hti', name: 'Haiti', shortName: 'HAI', flag: '🇭🇹', color: '#00209F' }, awayTeam: { id: 'sco', name: 'Scotland', shortName: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#005EB8' }, date: '2026-06-13', time: '21:00', venue: 'Gillette Stadium', stadium: 'Foxborough', group: 'C', phase: 'group', status: 'upcoming' },
  { id: '7', homeTeam: { id: 'usa', name: 'United States', shortName: 'USA', flag: '🇺🇸', color: '#3C3B6E' }, awayTeam: { id: 'par', name: 'Paraguay', shortName: 'PAR', flag: '🇵🇾', color: '#D52B1E' }, date: '2026-06-12', time: '21:00', venue: 'SoFi Stadium', stadium: 'Inglewood', group: 'D', phase: 'group', status: 'upcoming' },
  { id: '8', homeTeam: { id: 'aus', name: 'Australia', shortName: 'AUS', flag: '🇦🇺', color: '#00008B' }, awayTeam: { id: 'tur', name: 'Turkey', shortName: 'TUR', flag: '🇹🇷', color: '#E30A17' }, date: '2026-06-13', time: '00:00', venue: 'BC Place', stadium: 'Vancouver', group: 'D', phase: 'group', status: 'upcoming' },
  { id: '9', homeTeam: { id: 'ger', name: 'Germany', shortName: 'GER', flag: '🇩🇪', color: '#000000' }, awayTeam: { id: 'cuw', name: 'Curaçao', shortName: 'CUW', flag: '🇨🇼', color: '#002395' }, date: '2026-06-14', time: '13:00', venue: 'NRG Stadium', stadium: 'Houston', group: 'E', phase: 'group', status: 'upcoming' },
  { id: '10', homeTeam: { id: 'ned', name: 'Netherlands', shortName: 'NED', flag: '🇳🇱', color: '#FFAB00' }, awayTeam: { id: 'jpn', name: 'Japan', shortName: 'JPN', flag: '🇯🇵', color: '#BC002D' }, date: '2026-06-14', time: '16:00', venue: 'AT&T Stadium', stadium: 'Arlington', group: 'F', phase: 'group', status: 'upcoming' },
  { id: '11', homeTeam: { id: 'civ', name: 'Ivory Coast', shortName: 'CIV', flag: '🇨🇮', color: '#F77F00' }, awayTeam: { id: 'ecu', name: 'Ecuador', shortName: 'ECU', flag: '🇪🇨', color: '#FFD700' }, date: '2026-06-14', time: '19:00', venue: 'Lincoln Financial Field', stadium: 'Philadelphia', group: 'E', phase: 'group', status: 'upcoming' },
  { id: '12', homeTeam: { id: 'swe', name: 'Sweden', shortName: 'SWE', flag: '🇸🇪', color: '#006AA7' }, awayTeam: { id: 'tun', name: 'Tunisia', shortName: 'TUN', flag: '🇹🇳', color: '#E70013' }, date: '2026-06-14', time: '22:00', venue: 'Estadio BBVA', stadium: 'Guadalupe', group: 'F', phase: 'group', status: 'upcoming' },
  { id: '13', homeTeam: { id: 'esp', name: 'Spain', shortName: 'ESP', flag: '🇪🇸', color: '#AA151B' }, awayTeam: { id: 'cpv', name: 'Cape Verde', shortName: 'CPV', flag: '🇨🇻', color: '#003893' }, date: '2026-06-15', time: '13:00', venue: 'Mercedes-Benz Stadium', stadium: 'Atlanta', group: 'H', phase: 'group', status: 'upcoming' },
  { id: '14', homeTeam: { id: 'bel', name: 'Belgium', shortName: 'BEL', flag: '🇧🇪', color: '#FFCE00' }, awayTeam: { id: 'egy', name: 'Egypt', shortName: 'EGY', flag: '🇪🇬', color: '#C09300' }, date: '2026-06-15', time: '18:00', venue: 'Lumen Field', stadium: 'Seattle', group: 'G', phase: 'group', status: 'upcoming' },
  { id: '15', homeTeam: { id: 'sau', name: 'Saudi Arabia', shortName: 'KSA', flag: '🇸🇦', color: '#006C35' }, awayTeam: { id: 'uru', name: 'Uruguay', shortName: 'URU', flag: '🇺🇾', color: '#001489' }, date: '2026-06-15', time: '21:00', venue: 'Hard Rock Stadium', stadium: 'Miami', group: 'H', phase: 'group', status: 'upcoming' },
  { id: '16', homeTeam: { id: 'irn', name: 'Iran', shortName: 'IRN', flag: '🇮🇷', color: '#DA000C' }, awayTeam: { id: 'nzl', name: 'New Zealand', shortName: 'NZL', flag: '🇳🇿', color: '#00247D' }, date: '2026-06-15', time: '00:00', venue: 'SoFi Stadium', stadium: 'Inglewood', group: 'G', phase: 'group', status: 'upcoming' },
  { id: '17', homeTeam: { id: 'fra', name: 'France', shortName: 'FRA', flag: '🇫🇷', color: '#002395' }, awayTeam: { id: 'sen', name: 'Senegal', shortName: 'SEN', flag: '🇸🇳', color: '#00853F' }, date: '2026-06-16', time: '15:00', venue: 'MetLife Stadium', stadium: 'East Rutherford', group: 'I', phase: 'group', status: 'upcoming' },
  { id: '18', homeTeam: { id: 'irq', name: 'Iraq', shortName: 'IRQ', flag: '🇮🇶', color: '#007A3D' }, awayTeam: { id: 'nor', name: 'Norway', shortName: 'NOR', flag: '🇳🇴', color: '#BA0C2F' }, date: '2026-06-16', time: '18:00', venue: 'Gillette Stadium', stadium: 'Foxborough', group: 'I', phase: 'group', status: 'upcoming' },
  { id: '19', homeTeam: { id: 'arg', name: 'Argentina', shortName: 'ARG', flag: '🇦🇷', color: '#75AADB' }, awayTeam: { id: 'alg', name: 'Algeria', shortName: 'ALG', flag: '🇩🇿', color: '#007A3D' }, date: '2026-06-16', time: '21:00', venue: 'GEHA Field at Arrowhead Stadium', stadium: 'Kansas City', group: 'J', phase: 'group', status: 'upcoming' },
  { id: '20', homeTeam: { id: 'aut', name: 'Austria', shortName: 'AUT', flag: '🇦🇹', color: '#ED2939' }, awayTeam: { id: 'jor', name: 'Jordan', shortName: 'JOR', flag: '🇯🇴', color: '#007A3D' }, date: '2026-06-16', time: '00:00', venue: "Levi's Stadium", stadium: 'Santa Clara', group: 'J', phase: 'group', status: 'upcoming' },
];

const teamCodeMap: Record<string, string> = {
  mex: 'mx', rsa: 'za', kor: 'kr', cze: 'cz', can: 'ca', bih: 'ba', qat: 'qa', sui: 'ch', bra: 'br', mar: 'ma', hti: 'ht', sco: 'gb-sct', usa: 'us', par: 'py', aus: 'au', tur: 'tr', ger: 'de', cuw: 'cw', ned: 'nl', jpn: 'jp', civ: 'ci', ecu: 'ec', swe: 'se', tun: 'tn', esp: 'es', cpv: 'cv', bel: 'be', egy: 'eg', sau: 'sa', uru: 'uy', irn: 'ir', nzl: 'nz', fra: 'fr', sen: 'sn', irq: 'iq', nor: 'no', arg: 'ar', alg: 'dz', aut: 'at', jor: 'jo',
};

const getFlagUrl = (teamId: string): string => {
  const code = teamCodeMap[teamId] || teamId;
  return `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
};

const FootballPanel: React.FC<FootballPanelProps> = ({ settings }) => {
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  const getText = useCallback((key: string): string => {
    const texts: Record<string, Record<string, string>> = {
      title: { es: 'Copa Mundial FIFA 2026', fr: 'Coupe du Monde FIFA 2026', en: 'FIFA World Cup 2026' },
      upcoming: { es: 'Próximos Partidos', fr: 'Matchs à Venir', en: 'Upcoming Matches' },
      date: { es: 'Fecha', fr: 'Date', en: 'Date' },
      time: { es: 'Hora', fr: 'Heure', en: 'Time' },
      venue: { es: 'Sede', fr: 'Lieu', en: 'Venue' },
      stadium: { es: 'Estadio', fr: 'Stade', en: 'Stadium' },
      vs: { es: 'vs', fr: 'vs', en: 'vs' },
      group: { es: 'Grupo', fr: 'Groupe', en: 'Group' },
      selectDate: { es: 'Seleccionar Fecha', fr: 'Sélectionner la Date', en: 'Select Date' },
      allDates: { es: 'Todas las Fechas', fr: 'Toutes les Dates', en: 'All Dates' },
      loading: { es: 'Cargando...', fr: 'Chargement...', en: 'Loading...' },
      noMatches: { es: 'No hay partidos', fr: 'Pas de match', en: 'No matches' },
    };
    return texts[key]?.[settings.language] || key;
  }, [settings.language]);

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(settings.language === 'es' ? 'es-ES' : settings.language === 'fr' ? 'fr-FR' : 'en-US', options);
  };

  const formatTime = (timeStr: string): string => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getUniqueDates = (): string[] => {
    const dates = mockMatches.map(m => m.date);
    return [...new Set(dates)].sort();
  };

  const filteredMatches = selectedDate === 'all' 
    ? mockMatches 
    : mockMatches.filter(m => m.date === selectedDate);

  const groupMatchesByDate = () => {
    const grouped: Record<string, Match[]> = {};
    filteredMatches.forEach(match => {
      if (!grouped[match.date]) {
        grouped[match.date] = [];
      }
      grouped[match.date].push(match);
    });
    return grouped;
  };

  const groupedMatches = groupMatchesByDate();
  const uniqueDates = getUniqueDates();

  return (
    <div className="football-panel" style={{ maxWidth: '720px', margin: '0 auto' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px'
      }}>
        <span className="material-icons" style={{ fontSize: '32px', color: 'var(--color-primary)' }}>
          sports_soccer
        </span>
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--on-surface)',
          margin: 0
        }}>
          {getText('title')}
        </h2>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '16px',
        WebkitOverflowScrolling: 'touch'
      }}>
        <button
          onClick={() => setSelectedDate('all')}
          style={{
            padding: '12px 20px',
            borderRadius: '24px',
            border: 'none',
            background: selectedDate === 'all' ? 'var(--primary-container)' : 'var(--surface-container-low)',
            color: selectedDate === 'all' ? 'var(--on-primary)' : 'var(--on-surface)',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s'
          }}
        >
          {getText('allDates')}
        </button>
        {uniqueDates.map(date => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            style={{
              padding: '12px 20px',
              borderRadius: '24px',
              border: 'none',
              background: selectedDate === date ? 'var(--primary-container)' : 'var(--surface-container-low)',
              color: selectedDate === date ? 'var(--on-primary)' : 'var(--on-surface)',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {formatDate(date)}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: 'var(--on-surface-variant)'
        }}>
          <span className="material-icons" style={{ fontSize: '48px', animation: 'spin 1s linear infinite' }}>
            refresh
          </span>
          <p>{getText('loading')}</p>
        </div>
      ) : filteredMatches.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '48px',
          color: 'var(--on-surface-variant)'
        }}>
          <span className="material-icons" style={{ fontSize: '48px' }}>sports_soccer</span>
          <p>{getText('noMatches')}</p>
        </div>
      ) : (
        <>
          {Object.entries(groupedMatches).sort(([dateA], [dateB]) => dateA.localeCompare(dateB)).map(([date, matches]) => (
            <div key={date} style={{ marginBottom: '32px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid var(--outline-variant)'
              }}>
                <span className="material-icons" style={{ color: 'var(--primary)' }}>event</span>
                <span style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--on-surface)'
                }}>
                  {formatDate(date)}
                </span>
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                {matches.sort((a, b) => a.time.localeCompare(b.time)).map(match => (
                  <div
                    key={match.id}
                    style={{
                      background: 'var(--surface-container-lowest)',
                      borderRadius: 'var(--radius-default)',
                      padding: '20px',
                      boxShadow: 'var(--shadow-sm)',
                      transition: 'transform 0.2s'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '16px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          color: 'var(--primary-container)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em'
                        }}>
                          {match.group}
                        </span>
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--outline)'
                        }}>•</span>
                        <span style={{
                          fontSize: '0.75rem',
                          color: 'var(--outline)'
                        }}>
                          {match.phase === 'group' ? getText('group') : match.phase}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--on-surface-variant)'
                      }}>
                        <span className="material-icons" style={{ fontSize: '16px' }}>schedule</span>
                        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                          {formatTime(match.time)}
                        </span>
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '24px'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: '140px'
                      }}>
                        <img 
                          src={getFlagUrl(match.homeTeam.id)} 
                          alt={match.homeTeam.name}
                          style={{ width: '40px', height: '26px', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--on-surface)'
                        }}>
                          {match.homeTeam.name}
                        </span>
                      </div>
                      <div style={{
                        color: 'var(--primary)'
                      }}>
                        <span style={{ 
                          fontSize: '1.25rem', 
                          fontWeight: 700,
                          color: 'var(--primary)'
                        }}>
                          {getText('vs')}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        minWidth: '140px'
                      }}>
                        <span style={{
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--on-surface)'
                        }}>
                          {match.awayTeam.name}
                        </span>
                        <img 
                          src={getFlagUrl(match.awayTeam.id)} 
                          alt={match.awayTeam.name}
                          style={{ width: '40px', height: '26px', objectFit: 'cover', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '16px',
                      paddingTop: '12px',
                      borderTop: '1px solid var(--surface-container-high)'
                    }}>
                      <span className="material-icons" style={{ 
                        fontSize: '16px', 
                        color: 'var(--outline)' 
                      }}>
                        location_on
                      </span>
                      <span style={{
                        fontSize: '0.85rem',
                        color: 'var(--on-surface-variant)'
                      }}>
                        {match.venue}, {match.stadium}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .football-panel {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FootballPanel;