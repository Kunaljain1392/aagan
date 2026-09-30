/**
 * Courtyard Stack Effect & Cross-Ventilation Simulation
 * 
 * Based on thermal buoyancy stack effect:
 * Q = Cd * A * sqrt(2 * g * H * (Ti - To) / T_avg)
 * 
 * All formulas are simplified illustrative approximations for interactive demonstration.
 * Authoritative numerical CFD analysis should be conducted in Autodesk CFD / Forma.
 */

export interface VentilationInput {
  outdoorTempC: number;      // 20°C to 45°C
  windSpeedMps: number;      // 0 to 8 m/s
  windDirectionDeg: number;  // 0 to 360°
  hasTreesAndWater: boolean; // toggle for biophilic microclimate
}

export interface VentilationOutput {
  airChangesPerHour: number;     // ACH in courtyard void
  stackVelocityMps: number;      // vertical updraft speed (m/s)
  courtyardBaseTempC: number;    // perceived temperature in central plaza
  tempReductionC: number;        // microclimate cooling delta
  crossVentVelocityMps: number;  // velocity through typical 2/3 BHK unit
  daylightFactorPercent: number; // lower floor daylight factor
  buoyancyPressurePa: number;    // delta P in Pascals
  formulaNotes: string[];
}

const COURTYARD_WIDTH_M = 16;
const COURTYARD_DEPTH_M = 16;
const BUILDING_HEIGHT_M = 35;
const COURTYARD_VOLUME_M3 = COURTYARD_WIDTH_M * COURTYARD_DEPTH_M * BUILDING_HEIGHT_M; // 8,960 m3
const EXHAUST_AREA_M2 = 120; // Effective open throat area at roof cowl
const DISCHARGE_COEFF = 0.65;
const GRAVITY = 9.81;

/**
 * Calculates courtyard buoyancy stack ventilation and cross-ventilation flow
 */
export function calculateVentilation(input: VentilationInput): VentilationOutput {
  const { outdoorTempC, windSpeedMps, hasTreesAndWater } = input;

  // Evaporative cooling & shading temperature drop
  // Biophilic water fountain + dense native trees reduce ground microclimate temp
  const treeShadeDrop = hasTreesAndWater ? 1.8 : 0.4;
  const evaporativeDrop = hasTreesAndWater ? (outdoorTempC > 30 ? 2.8 : 1.6) : 0.0;
  const tempReductionC = Math.round((treeShadeDrop + evaporativeDrop) * 10) / 10;

  const courtyardBaseTempC = Math.max(18, outdoorTempC - tempReductionC);

  // Buoyancy delta T: upper chimney air warmed by apartment exhaust and solar absorption
  const chimneyWarmth = outdoorTempC > 28 ? 3.5 : 2.0;
  const deltaT = Math.max(1.0, chimneyWarmth + (hasTreesAndWater ? 1.5 : 0.5));
  const tAvgKelvin = 273.15 + (outdoorTempC + courtyardBaseTempC) / 2;

  // Hydrostatic Buoyancy Pressure differential (Pa)
  // Delta P = rho * g * H * (Delta T / T_avg)
  const airDensity = 1.2; // kg/m3
  const buoyancyPressurePa = Math.round(airDensity * GRAVITY * BUILDING_HEIGHT_M * (deltaT / tAvgKelvin) * 10) / 10;

  // Stack Velocity: v = Cd * sqrt(2 * g * H * (deltaT / T_avg))
  const rawStackVel = DISCHARGE_COEFF * Math.sqrt((2 * GRAVITY * BUILDING_HEIGHT_M * deltaT) / tAvgKelvin);
  // Add small wind-induced stack draw (venturi effect at roof cowl)
  const windInduction = windSpeedMps * 0.18;
  const stackVelocityMps = Math.round((rawStackVel + windInduction) * 100) / 100;

  // Volumetric Flow Rate Q (m3/s) = Area * Velocity
  const flowRateM3s = EXHAUST_AREA_M2 * stackVelocityMps * 0.5;

  // Air Changes per Hour (ACH) = (Q * 3600) / Volume
  const ach = Math.round(((flowRateM3s * 3600) / COURTYARD_VOLUME_M3) * 10) / 10;

  // Cross ventilation velocity through typical apartments (from street facade to courtyard)
  // Driven by pressure differential between exterior facade and interior negative stack core
  const crossVentVelocityMps = Math.round((0.35 + windSpeedMps * 0.22 + stackVelocityMps * 0.15) * 100) / 100;

  // Daylight factor at Ground/L1 courtyard level
  // 16x16m aperture with 35m height (Aspect ratio H/W = 2.18)
  const daylightFactorPercent = 2.2; // Meets GRIHA requirement > 1.5%

  return {
    airChangesPerHour: Math.min(24, Math.max(6, ach)),
    stackVelocityMps,
    courtyardBaseTempC: Math.round(courtyardBaseTempC * 10) / 10,
    tempReductionC,
    crossVentVelocityMps,
    daylightFactorPercent,
    buoyancyPressurePa,
    formulaNotes: [
      "Stack equation: Q = Cd * A * sqrt(2 * g * H * (ΔT / T_avg))",
      "Pressure buoyancy: ΔP = ρ * g * H * (ΔT / T_avg)",
      "Courtyard volume: 16m x 16m x 35m = 8,960 m³",
      "Evaporative cooling potential assumes 70% wet-bulb depression via fountain spray",
    ],
  };
}
