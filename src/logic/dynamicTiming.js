// dynamicTiming.js
// Core timing logic for the traffic controller.
// Reads car counts + emergency flags and produces phase + duration.

import { PHASES } from "./trafficPhases";

export function computeDynamicTiming({
  phaseIndex,        // 0 = NS_GREEN, 1 = EW_GREEN
  carCounts,         // { ns: number, ew: number }
  hasAmbulance       // true or false
}) {

  // ----------------------------------------
  // 1. EMERGENCY MODE (BLUE LIGHT OVERRIDE)
  // ----------------------------------------
  if (hasAmbulance) {
    return {
      phase: PHASES.BLUE_EMERGENCY,
      duration: 200,         // recheck quickly; do NOT switch phases
      emergencyHold: true
    };
  }

  // ----------------------------------------
  // 2. NORMAL MODE
  // ----------------------------------------
  const BASE_GREEN = 1000;        // 1 second
  const EXTRA_PER_CAR = 500;      // +0.5 second per car

  let phase = phaseIndex === 0 ? PHASES.NS_GREEN : PHASES.EW_GREEN;

  // dynamic duration per car count
  const nsDuration = BASE_GREEN + carCounts.ns * EXTRA_PER_CAR;
  const ewDuration = BASE_GREEN + carCounts.ew * EXTRA_PER_CAR;

  const duration = (phase === PHASES.NS_GREEN)
    ? nsDuration
    : ewDuration;

  return {
    phase,
    duration,
    emergencyHold: false
  };
}
