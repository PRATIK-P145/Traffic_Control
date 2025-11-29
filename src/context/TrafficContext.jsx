// TrafficContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";

import { PHASES } from "../logic/trafficPhases";
import { startTrafficCycle } from "../logic/trafficController";
import { computeDynamicTiming } from "../logic/dynamicTiming";

export const TrafficContext = createContext();

export default function TrafficProvider({ children }) {
  // ---------------------------------------------------
  // STATE
  // ---------------------------------------------------
  const [phaseIndex, setPhaseIndex] = useState(0);          // 0 = NS, 1 = EW
  const [activePhase, setActivePhase] = useState(PHASES.NS_GREEN);

  // Car counts from your CarManager (parent component will update this)
  const [laneCarCounts, setLaneCarCounts] = useState({
    0: 0, // North
    1: 0, // East
    2: 0, // South
    3: 0  // West
  });

  // Emergency control
  const [hasAmbulance, setHasAmbulance] = useState(false);
  const [ambulanceDir, setAmbulanceDir] = useState(null);

  // ---------------------------------------------------
  // COLOR MAPPING LOGIC — output used by TrafficLightsManager
  // ---------------------------------------------------
  const colors = useCallback(() => {
    // Emergency override → BLUE everywhere except the ambulance lane which gets GREEN
    if (hasAmbulance && ambulanceDir !== null) {
      return {
        north: ambulanceDir === 0 ? "green" : "blue",
        east:  ambulanceDir === 1 ? "green" : "blue",
        south: ambulanceDir === 2 ? "green" : "blue",
        west:  ambulanceDir === 3 ? "green" : "blue"
      };
    }

    // Normal NS/EW logic
    if (activePhase === PHASES.NS_GREEN) {
      return {
        north: "green",
        south: "green",
        east:  "red",
        west:  "red"
      };
    }

    if (activePhase === PHASES.EW_GREEN) {
      return {
        north: "red",
        south: "red",
        east:  "green",
        west:  "green"
      };
    }

    // Fallback
    return {
      north: "red",
      south: "red",
      east:  "red",
      west:  "red"
    };
  }, [activePhase, hasAmbulance, ambulanceDir]);

  // ---------------------------------------------------
  // DYNAMIC TIMING HANDLER
  // ---------------------------------------------------
  const getDynamicTiming = useCallback(
    (index) => {
      const carCounts = {
        ns: laneCarCounts[0] + laneCarCounts[2],
        ew: laneCarCounts[1] + laneCarCounts[3]
      };

      const result = computeDynamicTiming({
        phaseIndex: index,
        carCounts,
        hasAmbulance
      });

      // Update active phase
      if (!result.emergencyHold) {
        setActivePhase(result.phase);
      } else {
        setActivePhase(PHASES.BLUE_EMERGENCY);
      }

      return result;
    },
    [laneCarCounts, hasAmbulance]
  );

  // ---------------------------------------------------
  // TRAFFIC CYCLE STARTER
  // ---------------------------------------------------
  useEffect(() => {
    const stop = startTrafficCycle(setPhaseIndex, getDynamicTiming);
    return stop; // cleanup timer
  }, [getDynamicTiming]);

  // ---------------------------------------------------
  // EMERGENCY CONTROL
  // ---------------------------------------------------
  const activateEmergency = (dir) => {
    setHasAmbulance(true);
    setAmbulanceDir(dir);
  };

  const clearEmergency = () => {
    setHasAmbulance(false);
    setAmbulanceDir(null);
  };

  // ---------------------------------------------------
  // PUBLIC API — what components can use
  // ---------------------------------------------------
  return (
    <TrafficContext.Provider
      value={{
        phaseIndex,
        activePhase,
        lightColors: colors(),
        laneCarCounts,
        setLaneCarCounts,
        hasAmbulance,
        activateEmergency,
        clearEmergency
      }}
    >
      {children}
    </TrafficContext.Provider>
  );
}
