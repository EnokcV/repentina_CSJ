import { MapCategory, MapPoint, UserLocation } from '../types';
import { predefinedPOIs, findNearestCity, getPOIsByCity } from '../data/predefinedPOIs';

const OVERPASS_API_URL = 'https://overpass-api.de/api/interpreter';
const RADIUS_METERS = 3000;

const categoryIcons: Record<MapCategory, string> = {
  comida: 'restaurant',
  diversion: 'local_activity',
  estadios: 'stadium',
  transporte: 'directions_transit',
  todos: 'place'
};

const categoryNames: Record<MapCategory, string> = {
  comida: 'Restaurantes y Comida',
  diversion: 'Diversión y Entretenimiento',
  estadios: 'Estadios',
  transporte: 'Transporte Público',
  todos: 'Todos'
};

function getCategoryQuery(category: MapCategory, lat: number, lng: number): string {
  const queries: Record<MapCategory, string> = {
    comida: `
      [out:json][timeout:25];
      (
        node["amenity"="restaurant"](around:${RADIUS_METERS},${lat},${lng});
        node["amenity"="fast_food"](around:${RADIUS_METERS},${lat},${lng});
        node["shop"="bakery"](around:${RADIUS_METERS},${lat},${lng});
        node["amenity"="cafe"](around:${RADIUS_METERS},${lat},${lng});
        node["shop"="convenience"](around:${RADIUS_METERS},${lat},${lng});
        node["amenity"="marketplace"](around:${RADIUS_METERS},${lat},${lng});
      );
      out body;
    `,
    diversion: `
      [out:json][timeout:25];
      (
        node["leisure"="park"](around:${RADIUS_METERS},${lat},${lng});
        node["leisure"="cinema"](around:${RADIUS_METERS},${lat},${lng});
        node["tourism"="museum"](around:${RADIUS_METERS},${lat},${lng});
        node["tourism"="attraction"](around:${RADIUS_METERS},${lat},${lng});
        node["leisure"="pitch"](around:${RADIUS_METERS},${lat},${lng});
        node["leisure"="playground"](around:${RADIUS_METERS},${lat},${lng});
        node["amenity"="theatre"](around:${RADIUS_METERS},${lat},${lng});
        node["amenity"="nightclub"](around:${RADIUS_METERS},${lat},${lng});
      );
      out body;
    `,
    estadios: `
      [out:json][timeout:25];
      (
        node["leisure"="stadium"](around:${RADIUS_METERS},${lat},${lng});
        way["leisure"="stadium"](around:${RADIUS_METERS},${lat},${lng});
        node["building"="stadium"](around:${RADIUS_METERS},${lat},${lng});
        node["building"="sports_centre"](around:${RADIUS_METERS},${lat},${lng});
        node["leisure"="sports_centre"](around:${RADIUS_METERS},${lat},${lng});
      );
      out body;
    `,
    transporte: `
      [out:json][timeout:25];
      (
        node["public_transport"="station"](around:${RADIUS_METERS},${lat},${lng});
        node["railway"="station"](around:${RADIUS_METERS},${lat},${lng});
        node["highway"="bus_stop"](around:${RADIUS_METERS},${lat},${lng});
        node["station"="subway"](around:${RADIUS_METERS},${lat},${lng});
        node["railway"="halt"](around:${RADIUS_METERS},${lat},${lng});
        node["public_transport"="stop_position"](around:${RADIUS_METERS},${lat},${lng});
      );
      out body;
    `,
    todos: `
      [out:json][timeout:25];
      (
        node["amenity"="restaurant"](around:${RADIUS_METERS},${lat},${lng});
        node["amenity"="fast_food"](around:${RADIUS_METERS},${lat},${lng});
        node["leisure"="park"](around:${RADIUS_METERS},${lat},${lng});
        node["leisure"="cinema"](around:${RADIUS_METERS},${lat},${lng});
        node["leisure"="stadium"](around:${RADIUS_METERS},${lat},${lng});
        node["building"="stadium"](around:${RADIUS_METERS},${lat},${lng});
        node["railway"="station"](around:${RADIUS_METERS},${lat},${lng});
        node["highway"="bus_stop"](around:${RADIUS_METERS},${lat},${lng});
      );
      out body;
    `
  };
  return queries[category] || queries.todos;
}

function mapOSMTagToCategory(tags: Record<string, string>): MapCategory {
  if (tags.amenity === 'restaurant' || tags.amenity === 'fast_food' || tags.amenity === 'cafe' || tags.shop === 'bakery' || tags.shop === 'convenience') {
    return 'comida';
  }
  if (tags.leisure === 'park' || tags.leisure === 'cinema' || tags.tourism === 'museum' || tags.tourism === 'attraction' || tags.amenity === 'theatre' || tags.amenity === 'nightclub') {
    return 'diversion';
  }
  if (tags.leisure === 'stadium' || tags['building'] === 'stadium' || tags['building'] === 'sports_centre' || tags.leisure === 'sports_centre' || tags.leisure === 'pitch') {
    return 'estadios';
  }
  if (tags.railway === 'station' || tags.highway === 'bus_stop' || tags.public_transport === 'station' || tags.station === 'subway' || tags.public_transport === 'stop_position') {
    return 'transporte';
  }
  return 'comida';
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function formatDistance(meters: number): string {
  if (meters < 1000) {
    return Math.round(meters) + 'm';
  }
  return (meters / 1000).toFixed(1) + 'km';
}

class MapService {
  private cachedLocation: UserLocation | null = null;

  async getUserLocation(): Promise<UserLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.cachedLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
          };
          resolve(this.cachedLocation);
        },
        (error) => {
          let errorMessage = 'Unable to get location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }

  async getPointsOfInterest(
    category: MapCategory,
    userLat: number,
    userLng: number
  ): Promise<MapPoint[]> {
    const query = getCategoryQuery(category, userLat, userLng);
    const url = `${OVERPASS_API_URL}?data=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch POIs');
      }

      const data = await response.json();
      const elements = data.elements || [];

      const points: MapPoint[] = elements
        .filter((el: any) => el.lat && el.lng)
        .map((el: any) => {
          const tags = el.tags || {};
          const name = tags.name || tags['name:en'] || tags['name:es'] || 'Sin nombre';
          const category = mapOSMTagToCategory(tags);
          const distance = calculateDistance(userLat, userLng, el.lat, el.lng);

          return {
            id: String(el.id),
            name,
            category,
            lat: el.lat,
            lng: el.lng,
            address: tags['addr:street'] ? `${tags['addr:street']} ${tags['addr:housenumber'] || ''}` : '',
            distance
          };
        })
        .sort((a: MapPoint, b: MapPoint) => (a.distance || 0) - (b.distance || 0))
        .slice(0, 50);

      return points;
    } catch (error) {
      console.error('Error fetching POIs:', error);
      return [];
    }
  }

  async getAllCategories(
    userLat: number,
    userLng: number
  ): Promise<Record<MapCategory, MapPoint[]>> {
    const categories: MapCategory[] = ['comida', 'diversion', 'estadios', 'transporte'];
    const results: Record<MapCategory, MapPoint[]> = {
      comida: [],
      diversion: [],
      estadios: [],
      transporte: [],
      todos: []
    };

    for (const category of categories) {
      results[category] = await this.getPointsOfInterest(category, userLat, userLng);
    }

    return results;
  }

  getCategoryIcon(category: MapCategory): string {
    return categoryIcons[category] || 'place';
  }

  getCategoryName(category: MapCategory): string {
    return categoryNames[category] || category;
  }

  formatDistance(meters: number): string {
    return formatDistance(meters);
  }

  getPredefinedPOIs(userLat: number, userLng: number, category?: MapCategory): MapPoint[] {
    const nearest = findNearestCity(userLat, userLng);
    
    if (nearest) {
      const cityPoints = nearest.city.points;
      if (!category || category === 'todos') {
        return cityPoints.map(p => ({
          ...p,
          distance: calculateDistance(userLat, userLng, p.lat, p.lng)
        }));
      }
      return cityPoints
        .filter(p => p.category === category)
        .map(p => ({
          ...p,
          distance: calculateDistance(userLat, userLng, p.lat, p.lng)
        }));
    }
    
    const allPOIs = getPOIsByCity('');
    if (!allPOIs) {
      return [];
    }
    
    if (!category || category === 'todos') {
      return allPOIs.map(p => ({
        ...p,
        distance: calculateDistance(userLat, userLng, p.lat, p.lng)
      }));
    }
    
    return allPOIs
      .filter(p => p.category === category)
      .map(p => ({
        ...p,
        distance: calculateDistance(userLat, userLng, p.lat, p.lng)
      }));
  }

  async getCombinedPOIs(userLat: number, userLng: number, category: MapCategory): Promise<MapPoint[]> {
    const predefined = this.getPredefinedPOIs(userLat, userLng, category);
    const osm = await this.getPointsOfInterest(category, userLat, userLng);
    
    const combined = [...predefined];
    const existingIds = new Set(predefined.map(p => p.id));
    
    for (const poi of osm) {
      if (!existingIds.has(poi.id)) {
        combined.push(poi);
      }
    }
    
    return combined.sort((a, b) => (a.distance || 0) - (b.distance || 0)).slice(0, 50);
  }
}

const mapService = new MapService();
export default mapService;