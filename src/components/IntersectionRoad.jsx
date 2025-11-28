import React from "react";
import TrafficLight from "./TrafficLight";
import Car from "./Car";
import Ambulance from "./Ambulance";

// Configuration Constants
const CANVAS_SIZE = 600;
const CENTER = CANVAS_SIZE / 2;
const ROAD_WIDTH = 240;
const SIDEWALK_WIDTH = 20;
const LANE_WIDTH = ROAD_WIDTH / 2;
const CORNER_RADIUS = 20;

const STRIPE_GAP = 10;
const STRIPE_WIDTH = 12;
const STRIPE_COUNT = Math.floor((ROAD_WIDTH + STRIPE_GAP) / (STRIPE_WIDTH + STRIPE_GAP));

const ROAD_HALF = ROAD_WIDTH / 2;
const TOTAL_ROAD_HALF = ROAD_HALF + SIDEWALK_WIDTH;

const IntersectionRoad = ({ vehicles = [] }) => {
  return (
    <svg
      viewBox={`0 0 ${CANVAS_SIZE} ${CANVAS_SIZE}`}
      preserveAspectRatio="xMidYMid meet"
      style={{
        width: "100%",
        height: "100%",
        background: "#7cc57c"
      }}
    >
      <defs>
        <pattern
          id="zebra-stripe"
          x="0"
          y="0"
          width="30"
          height="10"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(90)"
        >
          <rect x="0" y="0" width="10" height="10" fill="white" />
        </pattern>
      </defs>

      {/* --- SIDEWALKS --- */}
      <rect
        x={-180}
        y={CENTER - TOTAL_ROAD_HALF}
        width={CANVAS_SIZE * 2}
        height={ROAD_WIDTH + SIDEWALK_WIDTH * 2}
        fill="#b0bec5"
      />
      <rect
        x={CENTER - TOTAL_ROAD_HALF}
        y={0}
        width={ROAD_WIDTH + SIDEWALK_WIDTH * 2}
        height={CANVAS_SIZE}
        fill="#b0bec5"
      />

      {/* --- ASPHALT --- */}
      <rect
        x={-180}
        y={CENTER - ROAD_HALF}
        width={CANVAS_SIZE + 600}
        height={ROAD_WIDTH}
        fill="#2c3e50"
      />
      <rect
        x={CENTER - ROAD_HALF}
        y={0}
        width={ROAD_WIDTH}
        height={CANVAS_SIZE}
        fill="#2c3e50"
      />

      {/* --- CORNERS --- */}
      <rect x={0} y={0} width={CENTER - TOTAL_ROAD_HALF} height={CENTER - TOTAL_ROAD_HALF} fill="#81c784" />
      <rect x={CENTER + TOTAL_ROAD_HALF} y={0} width={CENTER - TOTAL_ROAD_HALF} height={CENTER - TOTAL_ROAD_HALF} fill="#81c784" />
      <rect x={0} y={CENTER + TOTAL_ROAD_HALF} width={CENTER - TOTAL_ROAD_HALF} height={CENTER - TOTAL_ROAD_HALF} fill="#81c784" />
      <rect x={CENTER + TOTAL_ROAD_HALF} y={CENTER + TOTAL_ROAD_HALF} width={CENTER - TOTAL_ROAD_HALF} height={CENTER - TOTAL_ROAD_HALF} fill="#81c784" />

      <circle cx={CENTER - TOTAL_ROAD_HALF} cy={CENTER - TOTAL_ROAD_HALF} r={CORNER_RADIUS} fill="#b0bec5" />
      <circle cx={CENTER + TOTAL_ROAD_HALF} cy={CENTER - TOTAL_ROAD_HALF} r={CORNER_RADIUS} fill="#b0bec5" />
      <circle cx={CENTER - TOTAL_ROAD_HALF} cy={CENTER + TOTAL_ROAD_HALF} r={CORNER_RADIUS} fill="#b0bec5" />
      <circle cx={CENTER + TOTAL_ROAD_HALF} cy={CENTER + TOTAL_ROAD_HALF} r={CORNER_RADIUS} fill="#b0bec5" />

      {/* --- CENTER BLOCK --- */}
      <rect
        x={CENTER - ROAD_HALF}
        y={CENTER - ROAD_HALF}
        width={ROAD_WIDTH}
        height={ROAD_WIDTH}
        fill="#2c3e50"
      />

      {/* --- ROAD MARKINGS --- */}
      <line x1={-180} y1={CENTER} x2={CENTER - ROAD_HALF - 20} y2={CENTER} stroke="white" strokeWidth="2" strokeDasharray="15, 15" />
      <line x1={CENTER + ROAD_HALF + 20} y1={CENTER} x2={CANVAS_SIZE * 2} y2={CENTER} stroke="white" strokeWidth="2" strokeDasharray="15, 15" />
      <line x1={CENTER} y1={0} x2={CENTER} y2={CENTER - ROAD_HALF - 20} stroke="white" strokeWidth="2" strokeDasharray="15, 15" />
      <line x1={CENTER} y1={CENTER + ROAD_HALF + 20} x2={CENTER} y2={CANVAS_SIZE} stroke="white" strokeWidth="2" strokeDasharray="15, 15" />

      {/* STOP BARS */}
      <rect x={CENTER - ROAD_HALF - 4} y={CENTER - ROAD_HALF} width={4} height={ROAD_WIDTH} fill="white" />
      <rect x={CENTER + ROAD_HALF} y={CENTER - ROAD_HALF} width={4} height={ROAD_WIDTH} fill="white" />
      <rect x={CENTER - ROAD_HALF} y={CENTER - ROAD_HALF - 4} width={ROAD_WIDTH} height={4} fill="white" />
      <rect x={CENTER - ROAD_HALF} y={CENTER + ROAD_HALF} width={ROAD_WIDTH} height={4} fill="white" />

      {/* CROSSWALKS (zebra stripes) */}
      <g fill="white">
        {Array.from({ length: STRIPE_COUNT }).map((_, i) => (
          <rect key={`top-${i}`}
            x={CENTER - ROAD_HALF + i * (STRIPE_WIDTH + STRIPE_GAP)}
            y={CENTER - ROAD_HALF - 24}
            width={STRIPE_WIDTH}
            height={16}
          />
        ))}

        {Array.from({ length: STRIPE_COUNT }).map((_, i) => (
          <rect key={`bottom-${i}`}
            x={CENTER - ROAD_HALF + i * (STRIPE_WIDTH + STRIPE_GAP)}
            y={CENTER + ROAD_HALF + 8}
            width={STRIPE_WIDTH}
            height={16}
          />
        ))}
      </g>

      {/* TRAFFIC LIGHTS (unchanged) */}
      <TrafficLight
        x={CENTER+ ROAD_HALF - 20}
        y={CENTER - ROAD_HALF - 100 }
        rotation={0}
      />

      <TrafficLight
        x={CENTER - ROAD_HALF+ 20}
        y={CENTER + ROAD_HALF + 100}
        rotation={0}
      />

      <TrafficLight
        x={CENTER - ROAD_HALF - 55}
        y={CENTER- ROAD_HALF + 40}
        rotation={0}
      />

      <TrafficLight
        x={CENTER + ROAD_HALF + 55}
        y={CENTER + ROAD_HALF - 40}
        rotation={0}
      />

      {/* ---------- DYNAMIC VEHICLES ---------- */}
      {vehicles.map(v =>
        v.isAmbulance ? (
          <Ambulance key={v.id} x={v.x} y={v.y} rotation={v.rotation} />
        ) : (
          <Car key={v.id} x={v.x} y={v.y} rotation={v.rotation} />
        )
      )}

    </svg>
  );
};

export default IntersectionRoad;
