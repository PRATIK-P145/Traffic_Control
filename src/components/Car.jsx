import React from "react";

const Car = ({ x, y, rotation = 0, color = "#3A7AFE" }) => {
  // Base sizes you can tweak anytime
  const CAR_WIDTH = 43;
  const CAR_HEIGHT = 30;
  const ROOF_WIDTH = 24;
  const ROOF_HEIGHT = 12;

  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation})`}
      style={{ transition: "transform 0.3s linear" }}
    >
      {/* Car Body */}
      <rect
        x={-CAR_WIDTH / 2}
        y={-CAR_HEIGHT / 2}
        width={CAR_WIDTH}
        height={CAR_HEIGHT}
        rx="8"
        ry="8"
        fill={color}
        stroke="#1f1f1f"
        strokeWidth="1.5"
      />

      {/* Car Roof */}
      <rect
        x={-ROOF_WIDTH / 2}
        y={-ROOF_HEIGHT / 2}
        width={ROOF_WIDTH}
        height={ROOF_HEIGHT}
        rx="5"
        ry="5"
        fill="#ffffffaa"
      />

      {/* Headlights (front side = +X direction before rotation) */}
      <rect
        x={CAR_WIDTH / 2 - 4}
        y={-CAR_HEIGHT / 2 + 4}
        width="4"
        height="6"
        rx="2"
        fill="#fff9c4"
      />
      <rect
        x={CAR_WIDTH / 2 - 4}
        y={CAR_HEIGHT / 2 - 10}
        width="4"
        height="6"
        rx="2"
        fill="#fff9c4"
      />
    </g>
  );
};

export default Car;
