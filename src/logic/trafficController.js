import React, { createContext, useState, useEffect, useCallback } from "react";
import { startTrafficCycle } from "../logic/trafficController";

export const TrafficContext = createContext();

export default function TrafficProvider({ children }) {
  // ---------------------------------------------------
  // STATE
  // ---------------------------------------------------
  const [phase, setPhase] = useState(0); // 0..5 → full 6-phase cycle
  const [colors, setColors] = useState({});
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [emergencyDir, setEmergencyDir] = useState(null);

  // Car counts per direction (incoming lane only)
  const [laneCarCounts, setLaneCarCounts] = useState({
    0: 0, // North incoming
    1: 0, // East incoming
    2: 0, // South incoming
    3: 0, // West incoming
  });

  // ---------------------------------------------------
  // SIGNAL COLOR DECISION (based on PHASE + EMERGENCY)
  // ---------------------------------------------------
  const computeColors = useCallback(() => {
    // Emergency override → blue for all except path
    if (emergencyMode && emergencyDir !== null) {
      return {
        north: emergencyDir === 0 ? "green" : "blue",
        east:  emergencyDir === 1 ? "green" : "blue",
        south: emergencyDir === 2 ? "green" : "blue",
        west:  emergencyDir === 3 ? "green" : "blue",
      };
    }

    switch (phase) {
      case 0: // NS Green
        return { north: "green", south: "green", east: "red",   west: "red" };
      case 1: // NS Yellow
        return { north: "yellow", south: "yellow", east: "red",   west: "red" };
      case 2: // All Red
        return { north: "red",   south: "red",   east: "red",   west: "red" };

      case 3: // EW Green
        return { north: "red",   south: "red",   east: "green", west: "green" };
      case 4: // EW Yellow
        return { north: "red",   south: "red",   east: "yellow", west: "yellow" };
      case 5: // All Red
        return { north: "red",   south: "red",   east: "red",   west: "red" };

      default:
        return { north: "red", south: "red", east: "red", west: "red" };
    }
  }, [phase, emergencyMode, emergencyDir]);

  useEffect(() => {
    setColors(computeColors());
  }, [computeColors]);

  // ---------------------------------------------------
  // DYNAMIC TIMING PER PHASE
  // ---------------------------------------------------
  const getDynamicTiming = useCallback(
    (index) => {
      // ---------------------------------------------------
      // EMERGENCY OVERRIDE: freeze cycle
      // ---------------------------------------------------
      if (emergencyMode) {
        return {
          phase,             // stay in current phase
          duration: 300,     // re-check frequently
          emergencyHold: true,
        };
      }

      // ---------------------------------------------------
      // NORMAL 6-PHASE LOGIC
      // ---------------------------------------------------

      // Green durations depend on traffic load
      const north = laneCarCounts[0];
      const east  = laneCarCounts[1];
      const south = laneCarCounts[2];
      const west  = laneCarCounts[3];

      switch (index) {
        case 0: // NS Green
          return {
            phase: 0,
            duration: 1000 + (north + south) * 500, // dynamic
            emergencyHold: false,
          };

        case 1: // NS Yellow
          return { phase: 1, duration: 600, emergencyHold: false };

        case 2: // All Red
          return { phase: 2, duration: 400, emergencyHold: false };

        case 3: // EW Green
          return {
            phase: 3,
            duration: 1000 + (east + west) * 500,
            emergencyHold: false,
          };

        case 4: // EW Yellow
          return { phase: 4, duration: 600, emergencyHold: false };

        case 5: // All Red
          return { phase: 5, duration: 400, emergencyHold: false };

        default:
          return { phase: 0, duration: 1000, emergencyHold: false };
      }
    },
    [laneCarCounts, emergencyMode, phase]
  );

  // ---------------------------------------------------
  // START TRAFFIC CYCLE (with 6-phase controller)
  // ---------------------------------------------------
  useEffect(() => {
    const stopFn = startTrafficCycle(setPhase, getDynamicTiming);
    return stopFn;
  }, [getDynamicTiming]);

  // ---------------------------------------------------
  // EMERGENCY API
  // ---------------------------------------------------
  const activateEmergency = (dir) => {
    setEmergencyDir(dir);   // 0=North, 1=East, 2=South, 3=West
    setEmergencyMode(true);
  };

  const clearEmergency = () => {
    setEmergencyDir(null);
    setEmergencyMode(false);
  };

  // ---------------------------------------------------
  // PUBLIC API
  // ---------------------------------------------------
  return (
    <TrafficContext.Provider
      value={{
        phase,
        colors,
        laneCarCounts,
        setLaneCarCounts,
        emergencyMode,
        activateEmergency,
        clearEmergency,
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
}
