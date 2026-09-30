/**
 * Eco-Niwas Samhita 2018 (ECBC-R)
 * Residential Envelope Transmittance Value (RETV) Estimator
 * Formula: RETV = a * (A_op * U_op / A_env) + b * (A_fen * U_fen / A_env) + c * (A_fen * SHGC_eq / A_env)
 * 
 * Composite Climate Coefficients (BEE 2018):
 * a = 6.06 (Opaque wall conduction weight)
 * b = 0.093 (Glazing thermal conduction weight)
 * c = 68.99 (Solar heat gain through fenestration weight)
 * 
 * Target Threshold: RETV <= 15.0 W/m2
 */

export interface RetvInputs {
  wwrPercent: number;          // Window to Wall Ratio (15% - 50%, baseline 28%)
  uValueGlazing: number;       // W/m2-K (1.6 to 5.8, baseline 2.4 DGU)
  uValueWall: number;          // W/m2-K (0.4 to 1.8, baseline 0.45 AAC block)
  shgcGlazing: number;         // 0.20 to 0.85 (baseline 0.28 with adaptive fins)
  hasAanganFins: boolean;      // toggle for AANGAN terracotta fin correction
}

export interface RetvOutput {
  retvValue: number;           // W/m2
  threshold: number;           // 15.0 W/m2
  isCompliant: boolean;
  savingsVsBaselinePercent: number;
  unshadedBoxRetv: number;
  breakdown: {
    opaqueWall: number;
    glazingConduction: number;
    solarGain: number;
  };
}

const COEFF_A = 6.06;
const COEFF_B = 0.093;
const COEFF_C = 68.99;
const MANDATORY_LIMIT = 15.0;

export function calculateRetv(inputs: RetvInputs): RetvOutput {
  const { wwrPercent, uValueGlazing, uValueWall, shgcGlazing, hasAanganFins } = inputs;

  const wwr = wwrPercent / 100;
  const opaqueRatio = 1 - wwr;

  // Effective SHGC: AANGAN adaptive fins multiply nominal glass SHGC by shading factor ~0.62
  const effectiveShgc = hasAanganFins ? shgcGlazing * 0.64 : shgcGlazing;

  // Component contributions:
  // Term 1: Opaque Wall Conduction
  const opaqueWall = COEFF_A * opaqueRatio * uValueWall;

  // Term 2: Fenestration Conduction
  const glazingConduction = COEFF_B * wwr * uValueGlazing;

  // Term 3: Solar Radiation Heat Gain through Fenestration
  const solarGain = COEFF_C * wwr * effectiveShgc;

  const retvValue = Math.round((opaqueWall + glazingConduction + solarGain) * 10) / 10;

  // Standard unshaded commercial/residential box: single/low-spec glass, no fins, WWR 40%
  const boxOpaque = COEFF_A * 0.6 * 1.8;
  const boxGlass = COEFF_B * 0.4 * 5.4;
  const boxSolar = COEFF_C * 0.4 * 0.68;
  const unshadedBoxRetv = Math.round((boxOpaque + boxGlass + boxSolar) * 10) / 10;

  const savingsVsBaselinePercent = Math.max(0, Math.round(((unshadedBoxRetv - retvValue) / unshadedBoxRetv) * 100));

  return {
    retvValue,
    threshold: MANDATORY_LIMIT,
    isCompliant: retvValue <= MANDATORY_LIMIT,
    savingsVsBaselinePercent,
    unshadedBoxRetv,
    breakdown: {
      opaqueWall: Math.round(opaqueWall * 10) / 10,
      glazingConduction: Math.round(glazingConduction * 10) / 10,
      solarGain: Math.round(solarGain * 10) / 10,
    },
  };
}
