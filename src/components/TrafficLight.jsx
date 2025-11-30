import React from "react";

const LIGHT_SIZE = 12;       // diameter of each circle
const LIGHT_GAP = 6;         // spacing between lights
const BOX_PADDING = 6;       // padding inside the rectangle
const BOX_WIDTH = 40;        // traffic light body width

export default function TrafficLight({ x, y, state = "red", rotation = 0 }) {
  const colors = {
    red: ["red", "gray", "gray", "gray"],
    yellow: ["gray", "yellow", "gray", "gray"],
    green: ["gray", "gray", "green", "gray"],
    blue: ["gray", "gray", "gray", "blue"]
  };

  const active = colors[state] || colors.red;

  const BOX_HEIGHT =
    4 * LIGHT_SIZE + 3 * LIGHT_GAP + 2 * BOX_PADDING;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Traffic Light Box */}
      <rect
        x={-BOX_WIDTH / 2}
        y={-BOX_HEIGHT / 2}
        width={BOX_WIDTH}
        height={BOX_HEIGHT}
        rx="6"
        fill="#000"
        stroke="#fff"
      />

      {/* Vertical Light Stack */}
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
        />
      ))}
    </g>
  );
}