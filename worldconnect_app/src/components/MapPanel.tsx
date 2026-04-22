import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mapService from '../services/mapService';
import { AppSettings, MapCategory, MapPoint, UserLocation } from '../types';

interface MapPanelProps {
  settings: AppSettings;
}

const categoryFilters: { id: MapCategory; icon: string; label: Record<string, string> }[] = [
  { id: 'comida', icon: 'restaurant', label: { es: 'Comida', fr: 'Nourriture', en: 'Food' } },
  { id: 'diversion', icon: 'local_activity', label: { es: 'Diversión', fr: 'Divertissement', en: 'Fun' } },
  { id: 'estadios', icon: 'stadium', label: { es: 'Estadios', fr: 'Stades', en: 'Stadiums' } },
  { id: 'transporte', icon: 'directions_transit', label: { es: 'Transporte', fr: 'Transport', en: 'Transport' } },
  { id: 'todos', icon: 'place', label: { es: 'Todos', fr: 'Tous', en: 'All' } }
];

const categoryColors: Record<string, string> = {
  comida: '#FF6B6B',
  diversion: '#4ECDC4',
  estadios: '#45B7D1',
  transporte: '#96CEB4',
  todos: '#95A5A6'
};

function createCustomIcon(category: string) {
  const color = categoryColors[category] || '#95A5A6';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <span class="material-icons" style="color: white; font-size: 16px;">${getCategoryIcon(category)}</span>
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    comida: 'restaurant',
    diversion: 'local_activity',
    estadio: 'stadium',
    estadios: 'stadium',
    transporte: 'directions_transit'
  };
  return icons[category] || 'place';
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center[0] !== 0 && center[1] !== 0) {
      map.setView(center, 14);
    }
  }, [center, map]);
  return null;
}

const MapPanel: React.FC<MapPanelProps> = ({ settings }) => {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<MapCategory>('todos');
  const [pois, setPois] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const mapRef = useRef<L.Map>(null);

  const getFontSize = () => {
    switch (settings.fontSize) {
      case 'small': return '0.85rem';
      case 'large': return '1.2rem';
      default: return '1rem';
    }
  };

  const loadUserLocation = async () => {
    setLocationLoading(true);
    setError('');
    try {
      const location = await mapService.getUserLocation();
      setUserLocation(location);
      await loadPOIs(location.lat, location.lng, selectedCategory);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error getting location');
    } finally {
      setLocationLoading(false);
    }
  };

  const loadPOIs = async (lat: number, lng: number, category: MapCategory) => {
    setLoading(true);
    setError('');
    try {
      const points = await mapService.getPointsOfInterest(category, lat, lng);
      setPois(points);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading POIs');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async (category: MapCategory) => {
    setSelectedCategory(category);
    if (userLocation) {
      await loadPOIs(userLocation.lat, userLocation.lng, category);
    }
  };

  useEffect(() => {
    loadUserLocation();
  }, []);

  const defaultCenter: [number, number] = userLocation 
    ? [userLocation.lat, userLocation.lng] 
    : [19.4326, -99.1332];

  const defaultZoom = 14;

  return (
    <div className="map-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="map-header" style={{ 
        padding: '15px', 
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <h2 style={{ fontSize: getFontSize(), margin: 0, fontWeight: '700' }}>
            📍 {settings.language === 'es' ? 'Mapa de Interés' : 
                settings.language === 'fr' ? 'Carte\'intérêt' : 
                'Points of Interest'}
          </h2>
          <button
            onClick={loadUserLocation}
            disabled={locationLoading}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: getFontSize() }}
          >
            <span className="material-icons" style={{ 
              animation: locationLoading ? 'spin 1s linear infinite' : 'none',
              fontSize: '1rem'
            }}>
              {locationLoading ? 'hourglass_empty' : 'my_location'}
            </span>
          </button>
        </div>

        <div className="category-filters" style={{ 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              style={{
                background: selectedCategory === cat.id ? categoryColors[cat.id] : 'var(--color-surface)',
                color: selectedCategory === cat.id ? 'white' : 'var(--color-text)',
                border: `2px solid ${categoryColors[cat.id]}`,
                padding: '8px 12px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: getFontSize(),
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <span className="material-icons" style={{ fontSize: '1rem' }}>
                {cat.icon}
              </span>
              {cat.label[settings.language]}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ 
          padding: '15px', 
          background: '#fee',
          color: '#c00',
          textAlign: 'center',
          fontSize: getFontSize()
        }}>
          {error}
        </div>
      )}

      <div className="map-container" style={{ flex: 1, minHeight: '300px' }}>
        <MapContainer
          center={defaultCenter}
          zoom={defaultZoom}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController center={defaultCenter} />
          
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.divIcon({
                className: 'user-location-marker',
                html: `<div style="
                  background: #3B82F6;
                  width: 20px;
                  height: 20px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 0 0 8px rgba(59, 130, 246, 0.3);
                "></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
              })}
            >
              <Popup>
                <div style={{ fontSize: '0.9rem' }}>
                  📍 {settings.language === 'es' ? 'Tu ubicación' : 
                      settings.language === 'fr' ? 'Votre position' : 
                      'Your location'}
                </div>
              </Popup>
            </Marker>
          )}

          {pois.map((poi) => (
            <Marker
              key={poi.id}
              position={[poi.lat, poi.lng]}
              icon={createCustomIcon(poi.category)}
            >
              <Popup>
                <div style={{ minWidth: '150px' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {poi.name}
                  </div>
                  <div style={{ color: categoryColors[poi.category], fontSize: '0.8rem' }}>
                    {mapService.getCategoryName(poi.category)}
                  </div>
                  {poi.distance && (
                    <div style={{ marginTop: '5px', fontSize: '0.85rem' }}>
                      📏 {mapService.formatDistance(poi.distance)}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="poi-list" style={{ 
        maxHeight: '200px', 
        overflowY: 'auto',
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)'
      }}>
        {loading ? (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            fontSize: getFontSize()
          }}>
            <span className="material-icons" style={{ animation: 'spin 1s linear infinite' }}>
              hourglass_empty
            </span>
            <div>{settings.language === 'es' ? 'Cargando lugares...' : 
                 settings.language === 'fr' ? 'Chargement...' : 
                 'Loading places...'}</div>
          </div>
        ) : pois.length > 0 ? (
          <div>
            <div style={{ 
              padding: '10px 15px', 
              fontWeight: '600', 
              fontSize: getFontSize(),
              borderBottom: '1px solid var(--color-border)'
            }}>
              {settings.language === 'es' ? `${pois.length} lugares cerca` : 
               settings.language === 'fr' ? `${pois.length} lieux proches` : 
               `${pois.length} places nearby`}
            </div>
            {pois.slice(0, 10).map((poi) => (
              <div
                key={poi.id}
                style={{
                  padding: '12px 15px',
                  borderBottom: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  if (mapRef.current) {
                    mapRef.current.setView([poi.lat, poi.lng], 16);
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span 
                    className="material-icons" 
                    style={{ color: categoryColors[poi.category], fontSize: '1.2rem' }}
                  >
                    {getCategoryIcon(poi.category)}
                  </span>
                  <div>
                    <div style={{ fontWeight: '500', fontSize: getFontSize() }}>
                      {poi.name}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem' }}>
                      {poi.distance ? mapService.formatDistance(poi.distance) : ''}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {pois.length > 10 && (
              <div style={{ 
                padding: '10px', 
                textAlign: 'center',
                fontSize: getFontSize(),
                color: 'var(--color-text-secondary)'
              }}>
                {settings.language === 'es' ? `+ ${pois.length - 10} más` : 
                 settings.language === 'fr' ? `+ ${pois.length - 10} de plus` : 
                 `+ ${pois.length - 10} more`}
              </div>
            )}
          </div>
        ) : (
          <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            fontSize: getFontSize(),
            color: 'var(--color-text-secondary)'
          }}>
            <span className="material-icons" style={{ fontSize: '2rem', marginBottom: '10px' }}>
              search_off
            </span>
            <div>{settings.language === 'es' ? 'No se encontraron lugares' : 
                 settings.language === 'fr' ? 'Aucun lieu trouvé' : 
                 'No places found'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPanel;