import React from "react";

export default function Ambulance({ x, y, rotation = 0 }) {
  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation})`}>
      {/* Vehicle Body */}
      <rect
        x={-18}
        y={-10}
        width={36}
        height={20}
        rx={4}
        fill="#ffffff"
        stroke="#d3d3d3"
        strokeWidth={1.5}
      />

      {/* Red Stripe */}
      <rect
        x={-18}
        y={-3}
        width={36}
        height={6}
        fill="red"
      />

      {/* Red Cross */}
      <g transform="translate(0,0)">
        <rect x={-3} y={-8} width={6} height={16} fill="red" />
        <rect x={-8} y={-3} width={16} height={6} fill="red" />
      </g>

      {/* Light Bar (top) */}
      <rect
        x={-10}
        y={-14}
        width={20}
        height={4}
        rx={2}
        fill="#3da7ff"
      />

      {/* Headlights */}
      <circle cx={14} cy={-6} r={2} fill="#ffffcc" />
      <circle cx={14} cy={6} r={2} fill="#ffffcc" />

      {/* Wheels */}
      <rect x={-16} y={-12} width={8} height={4} rx={1} fill="#222" />
      <rect x={-16} y={8} width={8} height={4} rx={1} fill="#222" />
      <rect x={8} y={-12} width={8} height={4} rx={1} fill="#222" />
      <rect x={8} y={8} width={8} height={4} rx={1} fill="#222" />
    </g>
  );
}
