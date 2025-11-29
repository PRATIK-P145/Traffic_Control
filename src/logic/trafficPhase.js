// // trafficPhases.js

// export const PHASES = {
//   NS_GREEN: 0,   // North-South green
//   NS_YELLOW: 1,
//   ALL_RED_1: 2,  // Safety gap  
//   EW_GREEN: 3,   // East-West green
//   EW_YELLOW: 4,
//   ALL_RED_2: 5,
// };

// export const PHASE_ORDER = [
//   PHASES.NS_GREEN,
//   PHASES.NS_YELLOW,
//   PHASES.ALL_RED_1,
//   PHASES.EW_GREEN,
//   PHASES.EW_YELLOW,
//   PHASES.ALL_RED_2,
// ];

// export const PHASE_DURATION = {
//   [PHASES.NS_GREEN]: 5000,
//   [PHASES.NS_YELLOW]: 2000,
//   [PHASES.ALL_RED_1]: 1000,
//   [PHASES.EW_GREEN]: 5000,
//   [PHASES.EW_YELLOW]: 2000,
//   [PHASES.ALL_RED_2]: 1000,
// };

// trafficPhases.js
// Simple, readable phase identifiers for the entire traffic system.

export const PHASES = {
  NS_GREEN: 0,         // North–South incoming lanes get green
  EW_GREEN: 1,         // East–West incoming lanes get green
  BLUE_EMERGENCY: 2    // Emergency override mode (ambulance)
};
