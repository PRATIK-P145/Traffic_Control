import React, { createContext, useState, useEffect, useCallback } from "react";
import { startTrafficCycle } from "../logic/trafficController";

export const TrafficContext = createContext();

export default function TrafficProvider({ children }) {
  // ---------------------------------------------------
  // STATE
  // ---------------------------------------------------
  const [phase, setPhase] = useState(0); // 0 = NS green, 1 = EW green
  const [colors, setColors] = useState({});
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [emergencyDir, setEmergencyDir] = useState(null);

  // You MUST update this function when lanes change
  // You will pass car counts from parent component later.
  const [laneCarCounts, setLaneCarCounts] = useState({
    0: 0, // North incoming
    1: 0, // East incoming
    2: 0, // South incoming
    3: 0, // West incoming
  });

  // ---------------------------------------------------
  // LIGHT COLOR LOGIC
  // ---------------------------------------------------
  const getColors = useCallback(() => {
    // Emergency override
    if (emergencyMode && emergencyDir !== null) {
      return {
        north: emergencyDir === 0 ? "green" : "blue",
        east:  emergencyDir === 1 ? "green" : "blue",
        south: emergencyDir === 2 ? "green" : "blue",
        west:  emergencyDir === 3 ? "green" : "blue"
      };
    }

    // Normal mode — 2-phase logic
    if (phase === 0) {
      // NS green
      return {
        north: "green",
        south: "green",
        east: "red",
        west: "red"
      };
    } else {
      // EW green
      return {
        north: "red",
        south: "red",
        east: "green",
        west: "green"
      };
    }
  }, [phase, emergencyMode, emergencyDir]);

  useEffect(() => {
    setColors(getColors());
  }, [getColors]);

  // ---------------------------------------------------
  // DYNAMIC TIMING LOGIC
  // ---------------------------------------------------
  const getDynamicTiming = useCallback(
    (index) => {
      // If ambulance → stay on same phase forever until cleared
      if (emergencyMode) {
        return {
          phase,        // keep current phase (no switching)
          duration: 500 // check again every 0.5s
        };
      }

      // Determine which phase we are entering:
      // index = 0 -> NS green
      // index = 1 -> EW green
      const newPhase = index;

      // Car counts:
      const north = laneCarCounts[0];
      const east  = laneCarCounts[1];
      const south = laneCarCounts[2];
      const west  = laneCarCounts[3];

      // Phase 0 → NS green, EW red
      if (newPhase === 0) {
        const carCount = north + south;
        const duration = 1000 + carCount * 500; // base 1s + 0.5s/car
        return { phase: 0, duration };
      }

      // Phase 1 → EW green, NS red
      if (newPhase === 1) {
        const carCount = east + west;
        const duration = 1000 + carCount * 500;
        return { phase: 1, duration };
      }

      return { phase: 0, duration: 1000 };
    },
    [laneCarCounts, emergencyMode, phase]
  );

  // ---------------------------------------------------
  // START TRAFFIC CYCLE
  // ---------------------------------------------------
  useEffect(() => {
    const stopFn = startTrafficCycle(setPhase, getDynamicTiming);
    return stopFn;
  }, [getDynamicTiming]);

  // ---------------------------------------------------
  // EMERGENCY HANDLERS
  // ---------------------------------------------------
  const activateEmergency = (dir) => {
    setEmergencyDir(dir);
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
        clearEmergency
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
}
