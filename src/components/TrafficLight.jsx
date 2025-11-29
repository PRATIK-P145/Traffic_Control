import React from "react";

const LIGHT_SIZE = 14;
const LIGHT_GAP = 6;
const BOX_PADDING = 6;
const BOX_WIDTH = 40;

export default function TrafficLight({ x, y, state = "red", rotation = 0 }) {

  /**
   * Actual states produced by TrafficContext:
   *  - "red"
   *  - "yellow"
   *  - "green"
   *  - "blue"   (emergency override)
   */

  const COLORS = {
    red:    ["red", "gray", "gray"],        // only red ON
    yellow: ["gray", "yellow", "gray"],     // only yellow ON
    green:  ["gray", "gray", "green"],      // only green ON
    blue:   ["gray", "gray", "#00aaff"],    // emergency
  };

  const active = COLORS[state] || COLORS.red;

  const BOX_HEIGHT =
    3 * LIGHT_SIZE + 2 * LIGHT_GAP + 2 * BOX_PADDING;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Traffic Light Housing */}
      <rect
        x={-BOX_WIDTH / 2}
        y={-BOX_HEIGHT / 2}
        width={BOX_WIDTH}
        height={BOX_HEIGHT}
        rx="6"
        fill="#111"
        stroke="#fff"
        strokeWidth={1}
      />

      {/* Bulbs */}
      {active.map((color, index) => (
        <circle
          key={index}
          cx={0}
          cy={
            -BOX_HEIGHT / 2 +
            BOX_PADDING +
            LIGHT_SIZE / 2 +
            index * (LIGHT_SIZE + LIGHT_GAP)
          }
          r={LIGHT_SIZE / 2}
          fill={color}
          style={{ transition: "fill 0.2s ease" }}
        />
      ))}
    </g>
  );
}
