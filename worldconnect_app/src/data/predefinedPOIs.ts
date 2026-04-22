import { MapPoint } from '../types';

export interface CountryPOIs {
  country: string;
  cities: CityPOI[];
}

export interface CityPOI {
  city: string;
  lat: number;
  lng: number;
  points: MapPoint[];
}

const mexicoPOIs: CityPOI[] = [
  {
    city: 'Ciudad de México',
    lat: 19.4326,
    lng: -99.1332,
    points: [
      { id: 'mx-cdmx-1', name: 'Estadio Azteca', category: 'estadios', lat: 19.3159, lng: -99.2618, address: 'Estadio Azteca, Coyoacán' },
      { id: 'mx-cdmx-2', name: 'Estadio BBVA', category: 'estadios', lat: 19.4041, lng: -99.1389, address: 'Estadio BBVA, Chapalapa' },
      { id: 'mx-cdmx-3', name: 'Arena Ciudad de México', category: 'estadios', lat: 19.7796, lng: -99.1105, address: 'Arena Ciudad de México, Azcapotzalco' },
      { id: 'mx-cdmx-4', name: 'Parque Chapultepec', category: 'diversion', lat: 19.4206, lng: -99.1856, address: 'Parque Chapultepec, CDMX' },
      { id: 'mx-cdmx-5', name: 'Zócalo de Ciudad de México', category: 'diversion', lat: 19.4324, lng: -99.1332, address: 'Zócalo, Centro Histórico' },
      { id: 'mx-cdmx-6', name: 'Café de Tacuba', category: 'comida', lat: 19.4391, lng: -99.1334, address: 'Calle Tacuba 28, Centro' },
      { id: 'mx-cdmx-7', name: 'El Huequito', category: 'comida', lat: 19.4393, lng: -99.1336, address: 'Calle Montenegro, Centro' },
      { id: 'mx-cdmx-8', name: 'Puntomx', category: 'comida', lat: 19.4285, lng: -99.1612, address: 'Av. Mazaryk, Polanco' },
      { id: 'mx-cdmx-9', name: 'Metro Centro', category: 'transporte', lat: 19.4331, lng: -99.1424, address: 'Metro Centro, Lineas 1,2,3' },
      { id: 'mx-cdmx-10', name: 'Metro Chapalapa', category: 'transporte', lat: 19.4039, lng: -99.1387, address: 'Metro Chapalapa, Linea 12' },
      { id: 'mx-cdmx-11', name: 'Metro Azteca', category: 'transporte', lat: 19.3158, lng: -99.2615, address: 'Metro Azteca, Linea 3' },
      { id: 'mx-cdmx-12', name: 'Museo Frida Kahlo', category: 'diversion', lat: 19.3574, lng: -99.1676, address: 'Museo Frida Kahlo, Coyoacán' },
      { id: 'mx-cdmx-13', name: 'Museo Nacional de Antropología', category: 'diversion', lat: 19.4256, lng: -99.1866, address: 'Museo Antropología, Chapultepec' },
      { id: 'mx-cdmx-14', name: 'Cinemark Santa Fe', category: 'diversion', lat: 19.3658, lng: -99.2823, address: 'Centro Comercial Santa Fe' },
      { id: 'mx-cdmx-15', name: 'Cinepolis Gran Terraza', category: 'diversion', lat: 19.3892, lng: -99.1424, address: 'Gran Terraza, Coapa' },
      { id: 'mx-cdmx-16', name: 'El副市长', category: 'comida', lat: 19.4323, lng: -99.1336, address: 'Centro Histórico' },
      { id: 'mx-cdmx-17', name: 'Limosneros', category: 'comida', lat: 19.4366, lng: -99.1433, address: 'Calle Limosneros, Centro' },
      { id: 'mx-cdmx-18', name: 'Hanky Panky', category: 'comida', lat: 19.4296, lng: -99.1584, address: 'Av. Mazaryk, Polanco' },
      { id: 'mx-cdmx-19', name: 'Pulquerías Los Insurgentes', category: 'comida', lat: 19.4067, lng: -99.1654, address: 'Insurgentes, Roma' },
      { id: 'mx-cdmx-20', name: 'Taquería El Güero', category: 'comida', lat: 19.4156, lng: -99.1324, address: 'Av. Cuauhtémoc, Doctores' },
    ]
  },
  {
    city: 'Guadalajara',
    lat: 20.6597,
    lng: -103.3496,
    points: [
      { id: 'mx-gdl-1', name: 'Estadio Akron', category: 'estadios', lat: 20.6568, lng: -103.3567, address: 'Estadio Akron, Zapopan' },
      { id: 'mx-gdl-2', name: 'Estadio Jalisco', category: 'estadios', lat: 20.6823, lng: -103.3315, address: 'Estadio Jalisco, Guadalajara' },
      { id: 'mx-gdl-3', name: 'Parque Metropolitan', category: 'diversion', lat: 20.7211, lng: -103.3889, address: 'Parque Metropolitan, Zapopan' },
      { id: 'mx-gdl-4', name: 'Instituto Cultural Cabañas', category: 'diversion', lat: 20.6439, lng: -103.3349, address: ' Cabañas, Centro' },
      { id: 'mx-gdl-5', name: 'La Casa de los Tacos', category: 'comida', lat: 20.6789, lng: -103.3456, address: 'Av. Chapultepec, Americana' },
      { id: 'mx-gdl-6', name: 'Birriarías Toto', category: 'comida', lat: 20.6543, lng: -103.3678, address: 'Zapopan Centro' },
      { id: 'mx-gdl-7', name: 'Metro Juanacatlán', category: 'transporte', lat: 20.6789, lng: -103.3567, address: 'Línea 1, Metro' },
      { id: 'mx-gdl-8', name: 'Estación Cámara', category: 'transporte', lat: 20.6437, lng: -103.3456, address: 'Tren Eléctrico' },
      { id: 'mx-gdl-9', name: 'Cinepolis Centro Magno', category: 'diversion', lat: 20.6734, lng: -103.3456, address: 'Centro Magno, Centro' },
      { id: 'mx-gdl-10', name: 'Arena Guadalajara', category: 'estadios', lat: 20.6894, lng: -103.3234, address: 'Arena Guadalaja, Oblatos' },
    ]
  },
  {
    city: 'Monterrey',
    lat: 25.6866,
    lng: -100.3161,
    points: [
      { id: 'mx-mty-1', name: 'Estadio BBVA', category: 'estadios', lat: 25.6825, lng: -100.3025, address: 'Estadio BBVA, San Pedro' },
      { id: 'mx-mty-2', name: 'Estadio Universitario', category: 'estadios', lat: 25.7231, lng: -100.3112, address: 'Estadio Universitario, San Nicolás' },
      { id: 'mx-mty-3', name: 'Parque Fundidora', category: 'diversion', lat: 25.6789, lng: -100.2967, address: 'Parque Fundidora, Centro' },
      { id: 'mx-mty-4', name: 'Macroplaza', category: 'diversion', lat: 25.6866, lng: -100.3161, address: 'Macroplaza, Centro' },
      { id: 'mx-mty-5', name: 'Barrio Antiguo', category: 'comida', lat: 25.6723, lng: -100.2956, address: 'Barrio Antiguo, Centro' },
      { id: 'mx-mty-6', name: 'Tacos Gordo', category: 'comida', lat: 25.6789, lng: -100.3234, address: 'Av. Juárez, Centro' },
      { id: 'mx-mty-7', name: 'Metro Santa Lucía', category: 'transporte', lat: 25.6823, lng: -100.3156, address: 'Metro Santa Lucía, Linea 1' },
      { id: 'mx-mty-8', name: 'Metro Exposición', category: 'transporte', lat: 25.6723, lng: -100.2978, address: 'Metro Exposición, Linea 2' },
      { id: 'mx-mty-9', name: 'Parque La Gran Via', category: 'diversion', lat: 25.6894, lng: -100.3245, address: 'Av. Eugenio Cuzin, Centro' },
      { id: 'mx-mty-10', name: 'Cinepolis Valle', category: 'diversion', lat: 25.6945, lng: -100.3234, address: 'Plaza Valle, Valle' },
    ]
  },
  {
    city: 'Cancún',
    lat: 21.1619,
    lng: -86.8515,
    points: [
      { id: 'mx-can-1', name: 'Estadio Andrés Quintana Roo', category: 'estadios', lat: 21.1890, lng: -86.8281, address: 'Estadio Cancún, Puerto Juárez' },
      { id: 'mx-can-2', name: 'Parque Kabah', category: 'diversion', lat: 21.1594, lng: -86.8451, address: 'Parque Kabah, Zona Hotelera' },
      { id: 'mx-can-3', name: 'Mercado 28', category: 'comida', lat: 21.1919, lng: -86.8255, address: 'Mercado 28, Centro' },
      { id: 'mx-can-4', name: 'La Parilla', category: 'comida', lat: 21.1629, lng: -86.8519, address: 'Av. Náder, Centro' },
      { id: 'mx-can-5', name: 'Muelle de Puerto Juárez', category: 'transporte', lat: 21.1950, lng: -86.8209, address: 'Muelle, Puerto Juárez' },
      { id: 'mx-can-6', name: 'ADG Bus Station', category: 'transporte', lat: 21.1889, lng: -86.8256, address: 'Terminal ADA, Centro' },
      { id: 'mx-can-7', name: 'Cinepolis Plaza Lar', category: 'diversion', lat: 21.1894, lng: -86.8334, address: 'Plaza Lar, Centro' },
      { id: 'mx-can-8', name: 'Parque Las Palapas', category: 'diversion', lat: 21.1956, lng: -86.8245, address: 'Parque Las Palapas, Centro' },
      { id: 'mx-can-9', name: 'La Casa de los Tacos', category: 'comida', lat: 21.1623, lng: -86.8523, address: 'Avenida Náder' },
      { id: 'mx-can-10', name: 'Mares Seafood', category: 'comida', lat: 21.1594, lng: -86.8492, address: 'Zona Hotelera' },
    ]
  }
];

const usaPOIs: CityPOI[] = [
  {
    city: 'Los Angeles',
    lat: 34.0522,
    lng: -118.2437,
    points: [
      { id: 'us-lax-1', name: 'SoFi Stadium', category: 'estadios', lat: 33.9533, lng: -118.2451, address: 'SoFi Stadium, Inglewood' },
      { id: 'us-lax-2', name: 'Dodger Stadium', category: 'estadios', lat: 34.0722, lng: -118.2567, address: 'Dodger Stadium, Chavez Ravine' },
      { id: 'us-lax-3', name: 'Crypto.com Arena', category: 'estadios', lat: 34.0431, lng: -118.2673, address: 'Crypto.com Arena, Downtown' },
      { id: 'us-lax-4', name: 'Hollywood Bowl', category: 'estadios', lat: 34.1122, lng: -118.3391, address: 'Hollywood Bowl, Hollywood' },
      { id: 'us-lax-5', name: 'Hollywood Sign', category: 'diversion', lat: 34.1341, lng: -118.3215, address: 'Hollywood Sign, Mt. Lee' },
      { id: 'us-lax-6', name: 'Universal Studios', category: 'diversion', lat: 34.1369, lng: -118.3615, address: 'Universal Studios, Universal City' },
      { id: 'us-lax-7', name: 'Santa Monica Pier', category: 'diversion', lat: 34.0094, lng: -118.4973, address: 'Santa Monica Pier' },
      { id: 'us-lax-8', name: 'Grand Central Market', category: 'comida', lat: 34.0506, lng: -118.2487, address: 'Grand Central Market, Downtown' },
      { id: 'us-lax-9', name: 'Philippe the Original', category: 'comida', lat: 34.0034, lng: -118.2367, address: 'Philippe, Chinatown' },
      { id: 'us-lax-10', name: 'Howlin Rays', category: 'comida', lat: 34.0892, lng: -118.2148, address: 'Howlin Rays, Chinatown' },
      { id: 'us-lax-11', name: 'Metro Union Station', category: 'transporte', lat: 34.0567, lng: -118.2365, address: 'Union Station, Downtown' },
      { id: 'us-lax-12', name: 'LAX Terminal', category: 'transporte', lat: 33.9456, lng: -118.4021, address: 'Los Angeles Airport' },
      { id: 'us-lax-13', name: 'The Grove', category: 'diversion', lat: 34.0718, lng: -118.3571, address: 'The Grove, Mid-Wilshire' },
      { id: 'us-lax-14', name: 'Venice Beach', category: 'diversion', lat: 33.9850, lng: -118.4695, address: 'Venice Beach Boardwalk' },
      { id: 'us-lax-15', name: 'In-N-Out Burger', category: 'comida', lat: 34.0627, lng: -118.2442, address: 'In-N-Out, Little Tokyo' },
    ]
  },
  {
    city: 'New York',
    lat: 40.7128,
    lng: -74.0060,
    points: [
      { id: 'us-nyc-1', name: 'Madison Square Garden', category: 'estadios', lat: 40.7505, lng: -73.9934, address: 'MSG, Midtown' },
      { id: 'us-nyc-2', name: 'Yankee Stadium', category: 'estadios', lat: 40.8296, lng: -73.9262, address: 'Yankee Stadium, Bronx' },
      { id: 'us-nyc-3', name: 'Citi Field', category: 'estadios', lat: 40.7571, lng: -73.8483, address: 'Citi Field, Queens' },
      { id: 'us-nyc-4', name: 'Central Park', category: 'diversion', lat: 40.7829, lng: -73.9654, address: 'Central Park, Manhattan' },
      { id: 'us-nyc-5', name: 'Times Square', category: 'diversion', lat: 40.7580, lng: -73.9855, address: 'Times Square, Midtown' },
      { id: 'us-nyc-6', name: 'Brooklyn Bridge', category: 'diversion', lat: 40.7061, lng: -73.9969, address: 'Brooklyn Bridge' },
      { id: 'us-nyc-7', name: 'Grand Central Terminal', category: 'transporte', lat: 40.7527, lng: -73.9772, address: 'Grand Central, Midtown' },
      { id: 'us-nyc-8', name: 'Penn Station', category: 'transporte', lat: 40.7506, lng: -73.9935, address: 'Penn Station, Midtown' },
      { id: 'us-nyc-9', name: 'Katzs Delicatessen', category: 'comida', lat: 40.7223, lng: -73.9878, address: 'Katz Deli, Lower East Side' },
      { id: 'us-nyc-10', name: 'Carmines', category: 'comida', lat: 40.7456, lng: -73.9861, address: 'Carmines, Times Square' },
      { id: 'us-nyc-11', name: 'Blue Smoke', category: 'comida', lat: 40.7378, lng: -73.9895, address: 'Blue Smoke, NoHo' },
      { id: 'us-nyc-12', name: 'Shake Shack', category: 'comida', lat: 40.7521, lng: -73.9733, address: 'Shake Shack, Midtown' },
      { id: 'us-nyc-13', name: 'Empire State Building', category: 'diversion', lat: 40.7484, lng: -73.9857, address: 'Empire State, Midtown' },
      { id: 'us-nyc-14', name: 'Statue of Liberty', category: 'diversion', lat: 40.6892, lng: -74.0445, address: 'Liberty Island' },
      { id: 'us-nyc-15', name: 'Broadway Theatre', category: 'diversion', lat: 40.7590, lng: -73.9845, address: 'Broadway, Theater District' },
    ]
  },
  {
    city: 'Miami',
    lat: 25.7617,
    lng: -80.1918,
    points: [
      { id: 'us-mia-1', name: 'Hard Rock Stadium', category: 'estadios', lat: 25.9580, lng: -80.2390, address: 'Hard Rock Stadium, Miami Gardens' },
      { id: 'us-mia-2', name: 'Kaseya Center', category: 'estadios', lat: 25.7814, lng: -80.1870, address: 'Kaseya Center, Downtown' },
      { id: 'us-mia-3', name: 'Wynwood Walls', category: 'diversion', lat: 25.8015, lng: -80.1993, address: 'Wynwood, Miami' },
      { id: 'us-mia-4', name: 'South Beach', category: 'diversion', lat: 25.7827, lng: -80.1340, address: 'South Beach, Miami Beach' },
      { id: 'us-mia-5', name: 'Bayside Marketplace', category: 'diversion', lat: 25.7799, lng: -80.1847, address: 'Bayside, Downtown' },
      { id: 'us-mia-6', name: 'Prime Fish', category: 'comida', lat: 25.7825, lng: -80.1309, address: 'Prime Fish, South Beach' },
      { id: 'us-mia-7', name: 'Versailles Restaurant', category: 'comida', lat: 25.7597, lng: -80.1307, address: 'Versailles, Little Havana' },
      { id: 'us-mia-8', name: 'La Cornisa', category: 'comida', lat: 25.7656, lng: -80.1944, address: 'La Cornisa, Brickell' },
      { id: 'us-mia-9', name: 'Metro Transfer', category: 'transporte', lat: 25.7756, lng: -80.1889, address: 'Metromover, Downtown' },
      { id: 'us-mia-10', name: 'Miami Airport', category: 'transporte', lat: 25.7959, lng: -80.2870, address: 'Miami International Airport' },
    ]
  },
  {
    city: 'Houston',
    lat: 29.7604,
    lng: -95.3698,
    points: [
      { id: 'us-hou-1', name: 'Minute Maid Park', category: 'estadios', lat: 29.7623, lng: -95.3555, address: 'Minute Maid Park, Downtown' },
      { id: 'us-hou-2', name: 'NRG Stadium', category: 'estadios', lat: 29.6847, lng: -95.4106, address: 'NRG Stadium, South Main' },
      { id: 'us-hou-3', name: 'Toyota Center', category: 'estadios', lat: 29.7508, lng: -95.3621, address: 'Toyota Center, Downtown' },
      { id: 'us-hou-4', name: 'Hermann Park', category: 'diversion', lat: 29.7375, lng: -95.4303, address: 'Hermann Park, Houston' },
      { id: 'us-hou-5', name: 'Discovery Green', category: 'diversion', lat: 29.7629, lng: -95.3579, address: 'Discovery Green, Downtown' },
      { id: 'us-hou-6', name: 'The Galleria', category: 'diversion', lat: 29.7351, lng: -95.4595, address: 'The Galleria, Uptown' },
      { id: 'us-hou-7', name: 'Killen Tacos', category: 'comida', lat: 29.7509, lng: -95.3541, address: 'Killen Tacos, Downtown' },
      { id: 'us-hou-8', name: 'Pappasitos', category: 'comida', lat: 29.7365, lng: -95.4612, address: 'Pappasitos, Galleria' },
      { id: 'us-hou-9', name: 'Metro Main', category: 'transporte', lat: 29.7605, lng: -95.3691, address: 'METRO Main, Downtown' },
      { id: 'us-hou-10', name: 'IAH Airport', category: 'transporte', lat: 29.9902, lng: -95.3369, address: 'George Bush Airport' },
    ]
  },
  {
    city: 'Dallas',
    lat: 32.7767,
    lng: -96.7970,
    points: [
      { id: 'us-dal-1', name: 'AT&T Stadium', category: 'estadios', lat: 32.7473, lng: -97.0925, address: 'AT&T Stadium, Arlington' },
      { id: 'us-dal-2', name: 'American Airlines Center', category: 'estadios', lat: 32.7952, lng: -96.8103, address: 'AAC, Victory Park' },
      { id: 'us-dal-3', name: 'Globe Life Field', category: 'estadios', lat: 32.7473, lng: -97.0825, address: 'Globe Life Field, Arlington' },
      { id: 'us-dal-4', name: 'Klyde Warren Park', category: 'diversion', lat: 32.7867, lng: -96.8067, address: 'Klyde Warren Park, Downtown' },
      { id: 'us-dal-5', name: 'Bishop Arts', category: 'diversion', lat: 32.7477, lng: -96.8287, address: 'Bishop Arts, Oak Cliff' },
      { id: 'us-dal-6', name: 'Pecan Lodge', category: 'comida', lat: 32.7427, lng: -96.8009, address: 'Pecan Lodge, Deep Ellum' },
      { id: 'us-dal-7', name: 'Cane Rosso', category: 'comida', lat: 32.7876, lng: -96.8089, address: 'Cane Rosso, Deep Ellum' },
      { id: 'us-dal-8', name: 'Dallas BBQ', category: 'comida', lat: 32.7834, lng: -96.7990, address: 'Dallas BBQ, Downtown' },
      { id: 'us-dal-9', name: 'DART Station', category: 'transporte', lat: 32.7812, lng: -96.7972, address: 'DART Station, Downtown' },
      { id: 'us-dal-10', name: 'DFW Airport', category: 'transporte', lat: 32.8998, lng: -97.0401, address: 'Dallas Fort Worth Airport' },
    ]
  },
  {
    city: 'Atlanta',
    lat: 33.7490,
    lng: -84.3880,
    points: [
      { id: 'us-atl-1', name: 'Mercedes-Benz Stadium', category: 'estadios', lat: 33.7556, lng: -84.4006, address: 'MBS, Downtown' },
      { id: 'us-atl-2', name: 'Truist Park', category: 'estadios', lat: 33.8912, lng: -84.4676, address: 'Truist Park, Cumberland' },
      { id: 'us-atl-3', name: 'State Farm Arena', category: 'estadios', lat: 33.7552, lng: -84.3963, address: 'State Farm Arena, Downtown' },
      { id: 'us-atl-4', name: 'Piedmont Park', category: 'diversion', lat: 33.7752, lng: -84.3656, address: 'Piedmont Park, Midtown' },
      { id: 'us-atl-5', name: 'World of Coca-Cola', category: 'diversion', lat: 33.7630, lng: -84.3926, address: 'World of Coke, Downtown' },
      { id: 'us-atl-6', name: 'The Battery', category: 'diversion', lat: 33.8893, lng: -84.4688, address: 'The Battery, Cumberland' },
      { id: 'us-atl-7', name: 'The Varsity', category: 'comida', lat: 33.7478, lng: -84.3886, address: 'The Varsity, Midtown' },
      { id: 'us-atl-8', name: 'Mary Mac Tea Room', category: 'comida', lat: 33.7445, lng: -84.3787, address: 'Mary Mac, Midtown' },
      { id: 'us-atl-9', name: 'Metro Civic Center', category: 'transporte', lat: 33.7526, lng: -84.3898, address: 'MARTA, Downtown' },
      { id: 'us-atl-10', name: 'ATL Airport', category: 'transporte', lat: 33.6407, lng: -84.4277, address: 'Hartsfield-Jackson Airport' },
    ]
  }
];

const canadaPOIs: CityPOI[] = [
  {
    city: 'Toronto',
    lat: 43.6532,
    lng: -79.3832,
    points: [
      { id: 'ca-tor-1', name: 'Scotiabank Arena', category: 'estadios', lat: 43.6424, lng: -79.3792, address: 'Scotiabank Arena, Downtown' },
      { id: 'ca-tor-2', name: 'BMO Field', category: 'estadios', lat: 43.6328, lng: -79.4176, address: 'BMO Field, Exhibition Place' },
      { id: 'ca-tor-3', name: 'Rogers Centre', category: 'estadios', lat: 43.6421, lng: -79.3891, address: 'Rogers Centre, Downtown' },
      { id: 'ca-tor-4', name: 'CN Tower', category: 'diversion', lat: 43.6425, lng: -79.3892, address: 'CN Tower, Downtown' },
      { id: 'ca-tor-5', name: 'High Park', category: 'diversion', lat: 43.6615, lng: -79.4646, address: 'High Park, Bloor West' },
      { id: 'ca-tor-6', name: 'Distillery District', category: 'diversion', lat: 43.6387, lng: -79.3596, address: 'Distillery District, Downtown' },
      { id: 'ca-tor-7', name: 'St. Lawrence Market', category: 'comida', lat: 43.6486, lng: -79.3799, address: 'St. Lawrence Market, Downtown' },
      { id: 'ca-tor-8', name: 'Pai', category: 'comida', lat: 43.6463, lng: -79.3953, address: 'Pai, Downtown' },
      { id: 'ca-tor-9', name: 'Union Station', category: 'transporte', lat: 43.6428, lng: -79.3816, address: 'Union Station, Downtown' },
      { id: 'ca-tor-10', name: 'YYZ Airport', category: 'transporte', lat: 43.6777, lng: -79.6248, address: 'Toronto Pearson Airport' },
      { id: 'ca-tor-11', name: 'Casa Loma', category: 'diversion', lat: 43.6626, lng: -79.4086, address: 'Casa Loma, Annex' },
      { id: 'ca-tor-12', name: 'Ripleys Aquarium', category: 'diversion', lat: 43.6427, lng: -79.3896, address: 'Ripleys, Downtown' },
      { id: 'ca-tor-13', name: 'Blue Jay Way', category: 'comida', lat: 43.6454, lng: -79.3935, address: 'Blue Jays Way, Downtown' },
      { id: 'ca-tor-14', name: 'Taco Night', category: 'comida', lat: 43.6489, lng: -79.3812, address: 'St. Lawrence Market' },
      { id: 'ca-tor-15', name: 'Aloette', category: 'comida', lat: 43.6456, lng: -79.3889, address: 'Aloette, Downtown' },
    ]
  },
  {
    city: 'Vancouver',
    lat: 49.2827,
    lng: -123.1207,
    points: [
      { id: 'ca-van-1', name: 'BC Place', category: 'estadios', lat: 49.2783, lng: -123.1110, address: 'BC Place, Downtown' },
      { id: 'ca-van-2', name: 'Rogers Arena', category: 'estadios', lat: 49.2774, lng: -123.1086, address: 'Rogers Arena, Downtown' },
      { id: 'ca-van-3', name: 'Stanley Park', category: 'diversion', lat: 49.3003, lng: -123.1416, address: 'Stanley Park, Vancouver' },
      { id: 'ca-van-4', name: 'Granville Island', category: 'diversion', lat: 49.2693, lng: -123.1338, address: 'Granville Island' },
      { id: 'ca-van-5', name: 'Gastown', category: 'diversion', lat: 49.2822, lng: -123.1056, address: 'Gastown, Downtown' },
      { id: 'ca-van-6', name: 'Japadog', category: 'comida', lat: 49.2827, lng: -123.1201, address: 'Japadog, Downtown' },
      { id: 'ca-van-7', name: 'Tacofino', category: 'comida', lat: 49.2829, lng: -123.1025, address: 'Tacofino, Gastown' },
      { id: 'ca-van-8', name: 'Canada Place', category: 'diversion', lat: 49.2888, lng: -123.1114, address: 'Canada Place, Downtown' },
      { id: 'ca-van-9', name: 'SkyTrain', category: 'transporte', lat: 49.2827, lng: -123.1089, address: 'SkyTrain, Downtown' },
      { id: 'ca-van-10', name: 'YVR Airport', category: 'transporte', lat: 49.1967, lng: -123.1815, address: 'Vancouver Airport' },
    ]
  },
  {
    city: 'Montreal',
    lat: 45.5017,
    lng: -73.5673,
    points: [
      { id: 'ca-mtl-1', name: 'Stade Olympique', category: 'estadios', lat: 45.5144, lng: -73.5547, address: 'Stade Olympique, Hochelaga' },
      { id: 'ca-mtl-2', name: 'Bell Centre', category: 'estadios', lat: 45.4959, lng: -73.5423, address: 'Bell Centre, Downtown' },
      { id: 'ca-mtl-3', name: 'Stade Didier', category: 'estadios', lat: 45.5421, lng: -73.5519, address: 'Stade Didier, Parc-Ex' },
      { id: 'ca-mtl-4', name: 'Vieux-Montréal', category: 'diversion', lat: 45.5023, lng: -73.5598, address: 'Vieux Montréal, Vieux-Port' },
      { id: 'ca-mtl-5', name: 'Mont-Royal', category: 'diversion', lat: 45.5042, lng: -73.5992, address: 'Mont-Royal Park' },
      { id: 'ca-mtl-6', name: 'Parc Jean-Drapeau', category: 'diversion', lat: 45.4428, lng: -73.5340, address: 'Parc Jean-Drapeau' },
      { id: 'ca-mtl-7', name: 'Schwartzs', category: 'comida', lat: 45.5204, lng: -73.5734, address: 'Schwartzs, Mile End' },
      { id: 'ca-mtl-8', name: 'La Banquise', category: 'comida', lat: 45.5369, lng: -73.5782, address: 'La Banquise, Plateau' },
      { id: 'ca-mtl-9', name: 'STM Central', category: 'transporte', lat: 45.5076, lng: -73.5540, address: 'Gare Centrale, Downtown' },
      { id: 'ca-mtl-10', name: 'YUL Airport', category: 'transporte', lat: 45.4703, lng: -73.7410, address: 'Montréal-Trudeau Airport' },
    ]
  },
  {
    city: 'Edmonton',
    lat: 53.5461,
    lng: -113.4938,
    points: [
      { id: 'ca-edm-1', name: 'Commonwealth Stadium', category: 'estadios', lat: 53.5634, lng: -113.4545, address: 'Commonwealth Stadium, Downtown' },
      { id: 'ca-edm-2', name: 'Rogers Place', category: 'estadios', lat: 53.5468, lng: -113.4940, address: 'Rogers Place, Downtown' },
      { id: 'ca-edm-3', name: 'Northlands Park', category: 'diversion', lat: 53.5433, lng: -113.5086, address: 'Northlands Park, Exhibition' },
      { id: 'ca-edm-4', name: 'West Edmonton Mall', category: 'diversion', lat: 53.5230, lng: -113.6253, address: 'West Edmonton Mall' },
      { id: 'ca-edm-5', name: 'River Valley', category: 'diversion', lat: 53.5461, lng: -113.5338, address: 'River Valley, Downtown' },
      { id: 'ca-edm-6', name: 'Bündok', category: 'comida', lat: 53.5417, lng: -113.4935, address: 'Bündok, Downtown' },
      { id: 'ca-edm-7', name: 'Riverside Bakery', category: 'comida', lat: 53.5451, lng: -113.4898, address: 'Riverside, Downtown' },
      { id: 'ca-edm-8', name: 'LRT Station', category: 'transporte', lat: 53.5467, lng: -113.4938, address: 'LRT Central, Downtown' },
      { id: 'ca-edm-9', name: 'YEG Airport', category: 'transporte', lat: 53.3097, lng: -113.5801, address: 'Edmonton International' },
      { id: 'ca-edm-10', name: 'Borden Park', category: 'diversion', lat: 53.5641, lng: -113.4478, address: 'Borden Park, Norwood' },
    ]
  }
];

export const predefinedPOIs: CountryPOIs[] = [
  { country: 'Mexico', cities: mexicoPOIs },
  { country: 'USA', cities: usaPOIs },
  { country: 'Canada', cities: canadaPOIs }
];

export function getPredefinedPOIs(): MapPoint[] {
  return predefinedPOIs.flatMap(country => 
    country.cities.flatMap(city => city.points)
  );
}

export function getPOIsByCity(cityName: string): MapPoint[] | null {
  for (const country of predefinedPOIs) {
    const city = country.cities.find(c => 
      c.city.toLowerCase() === cityName.toLowerCase()
    );
    if (city) return city.points;
  }
  return null;
}

export function findNearestCity(lat: number, lng: number): { city: CityPOI; distance: number } | null {
  let nearestCity: CityPOI | null = null;
  let minDistance = Infinity;

  for (const country of predefinedPOIs) {
    for (const city of country.cities) {
      const distance = calculateDistance(lat, lng, city.lat, city.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city;
      }
    }
  }

  return nearestCity ? { city: nearestCity, distance: minDistance } : null;
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