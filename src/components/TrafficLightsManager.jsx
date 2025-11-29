import React, { useContext } from "react";
import TrafficLight from "./TrafficLight";
import { TrafficContext } from "./TrafficContext";

/**
 * TrafficLightsManager renders all 4 traffic lights,
 * converts phase → color for each direction,
 * and overrides everything with BLUE during emergencies.
 */

export default function TrafficLightsManager() {
  const { phase, emergencyActive } = useContext(TrafficContext);

  /**
   * PHASE MAP (from controller):
   *
   * 0 = NS_GREEN
   * 1 = NS_YELLOW
   * 2 = ALL_RED
   * 3 = EW_GREEN
   * 4 = EW_YELLOW
   * 5 = ALL_RED
   *
   * During emergencyActive → force BLUE for all lights.
   */

  function mapLightState(direction) {
    // Emergency always wins
    if (emergencyActive) return "blue";

    switch (direction) {
      case "north":
      case "south":
        if (phase === 0) return "green";
        if (phase === 1) return "yellow";
        return "red"; // phases 2,3,4,5  
      
      case "east":
      case "west":
        if (phase === 3) return "green";
        if (phase === 4) return "yellow";
        return "red"; // phases 0,1,2,5

      default:
        return "red";
    }
  }

  /**
   * Light positions (adjust these values if your intersection shifts)
   *
   * rotation:
   *   - North faces DOWN → 180°
   *   - South faces UP   → 0°
   *   - East  faces LEFT → 270°
   *   - West  faces RIGHT→ 90°
   */

  const LIGHT_POS = {
    north: { x: 300, y: 120, rotation: 180 },
    south: { x: 300, y: 480, rotation: 0 },
    east:  { x: 480, y: 300, rotation: 270 },
    west:  { x: 120, y: 300, rotation: 90 },
  };

  return (
    <>
      {/* NORTH */}
      <TrafficLight
        x={LIGHT_POS.north.x}
        y={LIGHT_POS.north.y}
        rotation={LIGHT_POS.north.rotation}
        state={mapLightState("north")}
      />

      {/* SOUTH */}
      <TrafficLight
        x={LIGHT_POS.south.x}
        y={LIGHT_POS.south.y}
        rotation={LIGHT_POS.south.rotation}
        state={mapLightState("south")}
      />

      {/* EAST */}
      <TrafficLight
        x={LIGHT_POS.east.x}
        y={LIGHT_POS.east.y}
        rotation={LIGHT_POS.east.rotation}
        state={mapLightState("east")}
      />

      {/* WEST */}
      <TrafficLight
        x={LIGHT_POS.west.x}
        y={LIGHT_POS.west.y}
        rotation={LIGHT_POS.west.rotation}
        state={mapLightState("west")}
      />
    </>
  );
}
