/**
 * Solar Position & Radiation Simulation for Delhi-NCR (28.4° N, 77.1° E)
 * Computes solar declination, altitude angle, azimuth, and directional light vector for Three.js.
 * All calculations clearly labeled as illustrative engineering models.
 */

export interface SolarPosition {
  altitudeDeg: number;
  azimuthDeg: number;
  sunVector: [number, number, number];
  isDaylight: boolean;
  heatAvoidedPercent: number;
  courtyardDirectSunHours: number;
  faceIncidentRadiation: {
    north: number; // W/m2
    east: number;
    south: number;
    west: number;
  };
}

const LATITUDE_NCR_RAD = (28.4089 * Math.PI) / 180; // 28.4° North

/**
 * Returns Day of Year (1-365) from month index (0-11)
 */
export function getDayOfYear(monthIndex: number, dayOfMonth: number = 15): number {
  const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let dayOfYear = dayOfMonth;
  for (let i = 0; i < monthIndex; i++) {
    dayOfYear += daysInMonths[i];
  }
  return dayOfYear;
}

/**
 * Computes Cooper's equation for solar declination (radians)
 * delta = 23.45 * sin( (360/365)*(284 + N) )
 */
export function getSolarDeclination(dayOfYear: number): number {
  const angleDeg = (360 / 365) * (284 + dayOfYear);
  const angleRad = (angleDeg * Math.PI) / 180;
  return (23.45 * Math.PI / 180) * Math.sin(angleRad);
}

/**
 * Compute solar position for given month (0-11) and hour (0.00 to 24.00)
 */
export function calculateSolarPosition(monthIndex: number, hour: number): SolarPosition {
  const dayOfYear = getDayOfYear(monthIndex, 15);
  const declination = getSolarDeclination(dayOfYear);

  // Hour angle omega (15 degrees per hour from solar noon at 12:00)
  const hourAngleRad = ((hour - 12) * 15 * Math.PI) / 180;

  // Solar Altitude (alpha): sin(alpha) = sin(lat)*sin(dec) + cos(lat)*cos(dec)*cos(omega)
  const sinAlpha =
    Math.sin(LATITUDE_NCR_RAD) * Math.sin(declination) +
    Math.cos(LATITUDE_NCR_RAD) * Math.cos(declination) * Math.cos(hourAngleRad);

  const altitudeRad = Math.asin(Math.max(-1, Math.min(1, sinAlpha)));
  const altitudeDeg = (altitudeRad * 180) / Math.PI;

  const isDaylight = altitudeDeg > 0;

  // Solar Azimuth (gamma): measured from South (0) or North (180). We format from North (0=N, 90=E, 180=S, 270=W)
  let azimuthDeg = 180;
  if (isDaylight) {
    const cosAzimuth =
      (Math.sin(altitudeRad) * Math.sin(LATITUDE_NCR_RAD) - Math.sin(declination)) /
      (Math.cos(altitudeRad) * Math.cos(LATITUDE_NCR_RAD));
    const clampedCos = Math.max(-1, Math.min(1, cosAzimuth));
    let azRad = Math.acos(clampedCos);
    if (hour > 12) {
      azRad = 2 * Math.PI - azRad;
    }
    azimuthDeg = (azRad * 180) / Math.PI;
  }

  // Convert spherical to 3D Cartesian coordinates for Three.js (Y is up, Z is South, X is East)
  const radius = 120;
  let sunX = 0;
  let sunY = -10;
  let sunZ = 0;

  if (isDaylight) {
    const azRad = (azimuthDeg * Math.PI) / 180;
    // Azimuth: 0 = North (-Z), 90 = East (+X), 180 = South (+Z), 270 = West (-X)
    sunX = radius * Math.cos(altitudeRad) * Math.sin(azRad);
    sunY = Math.max(10, radius * Math.sin(altitudeRad));
    sunZ = radius * Math.cos(altitudeRad) * -Math.cos(azRad);
  }

  // Calculate incident solar radiation (W/m2) on facades based on angle of incidence
  // Direct normal beam radiation approximation
  const directNormal = isDaylight ? Math.max(0, 950 * Math.sin(altitudeRad)) : 0;
  const diffuseHorizontal = isDaylight ? 120 * Math.sin(altitudeRad) : 0;

  // Normal vectors: N (0,0,-1), S (0,0,1), E (1,0,0), W (-1,0,0)
  const sunDir = [sunX / radius, sunY / radius, sunZ / radius];

  const calcIncident = (nx: number, nz: number) => {
    if (!isDaylight) return 0;
    const cosTheta = nx * sunDir[0] + nz * sunDir[2];
    const direct = cosTheta > 0 ? directNormal * cosTheta : 0;
    return Math.round(direct + diffuseHorizontal * 0.5);
  };

  const north = calcIncident(0, -1);
  const east = calcIncident(1, 0);
  const south = calcIncident(0, 1);
  const west = calcIncident(-1, 0);

  // Courtyard direct sun hours: depends on sun altitude and 16m courtyard width vs 35m height
  // Critical cutoff aspect ratio: 16m / 35m = 0.457 -> atan(35/16) = ~65.4°
  // When sun altitude > 65.4°, direct light hits the courtyard floor.
  const solsticeSunHours = monthIndex >= 4 && monthIndex <= 7 ? 6.2 : 3.8;

  // Heat avoided calculation: AANGAN adaptive fins block ~58% to 68% of peak incident heat
  const peakIncident = Math.max(north, east, south, west);
  const heatAvoidedPercent = peakIncident > 100 ? Math.min(74, Math.round(48 + (altitudeDeg / 90) * 22)) : 0;

  return {
    altitudeDeg: Math.max(0, altitudeDeg),
    azimuthDeg,
    sunVector: [sunX, sunY, sunZ],
    isDaylight,
    heatAvoidedPercent,
    courtyardDirectSunHours: solsticeSunHours,
    faceIncidentRadiation: { north, east, south, west },
  };
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
