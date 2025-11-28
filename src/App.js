import React, { useState } from "react";
import IntersectionRoad from "./components/IntersectionRoad";
import ControlPanel from "./components/ControlPanel";

const CANVAS_SIZE = 600;
const CENTER = CANVAS_SIZE / 2;

// Spawn origins for each lane (same as your original)
const SPAWN_ORIGIN = {
  0: { x: CENTER, y: 80, rotation: 180 }, // NORTH → moving down (toward center)
  1: { x: 520, y: CENTER, rotation: 270 }, // EAST → moving left (toward center)
  2: { x: CENTER, y: 520, rotation: 0 },   // SOUTH → moving up (toward center)
  3: { x: 80,  y: CENTER, rotation: 90 },  // WEST → moving right (toward center)
};

const COLS = 3;        // number of columns per row
const SPACING = 45;    // distance in px between grid cells (tweakable)

export default function App() {
  const [lanes, setLanes] = useState(
    Array.from({ length: 4 }, () => ({ cars: [], hasAmbulance: false }))
  );
  const [mode, setMode] = useState("Normal");
  const timings = [10, 10, 10, 10];

  // Add car to lane (append)
  function addCar(dir) {
    setLanes(prev => {
      const copy = [...prev];
      copy[dir] = { ...copy[dir], cars: [...copy[dir].cars, { id: Date.now() + Math.random() }] };
      return copy;
    });
  }

  // Toggle ambulance: add/remove single ambulance per lane
  function addAmbulance(dir) {
    setLanes(prev => {
      const copy = [...prev];
      copy[dir] = { ...copy[dir], hasAmbulance: !copy[dir].hasAmbulance };

      // set global mode
      const anyAmb = copy.some(l => l.hasAmbulance);
      setMode(anyAmb ? "Emergency" : "Normal");

      return copy;
    });
  }

  // Clear lane
  function clearLane(dir) {
    setLanes(prev => {
      const copy = [...prev];
      copy[dir] = { cars: [], hasAmbulance: false };
      const anyAmb = copy.some(l => l.hasAmbulance);
      setMode(anyAmb ? "Emergency" : "Normal");
      return copy;
    });
  }

  // Compute positions for all vehicles using SPAWN_ORIGIN and grid math
  function computePositions() {
    const positions = [];

    // Some lanes might need reversed column ordering to match your ASCII examples.
    // If a lane's columns should be reversed (A on the right instead of left),
    // set reverseColsFor[dir] = true. Feel free to tweak after you test.
    const reverseColsFor = {
      0: true, // NORTH
      1: false,  // EAST  (I reversed EAST columns by default — we can flip later)
      2: true, // SOUTH
      3: false, // WEST
    };

    lanes.forEach((lane, dir) => {
      // combine cars then ambulance (ambulance occupies next free slot)
      const items = lane.cars.map(c => ({ ...c, isAmbulance: false }));
      if (lane.hasAmbulance) items.push({ id: `AMB-${dir}`, isAmbulance: true });

      items.forEach((item, idx) => {
        const row = Math.floor(idx / COLS);
        let col = idx % COLS;

        // optionally reverse column order for lanes where ASCII specified opposite column order
        if (reverseColsFor[dir]) {
          col = (COLS - 1) - col;
        }

        // center the columns around lane center: e.g., for 3 columns col offsets are -1,0,+1
        const colOffset = (col - (COLS - 1) / 2) * SPACING;

        const origin = SPAWN_ORIGIN[dir];
        let x = origin.x;
        let y = origin.y;
        const rotation = origin.rotation-90;

        // Rows move TOWARD the intersection (so positive/negative depends on lane)
        if (dir === 0) {
          // NORTH: origin at top -> rows move down (y increases). cols offset X.
          x = origin.x + colOffset - 60;
          y = origin.y - row * SPACING + 50;
        } else if (dir === 2) {
          // SOUTH: origin at bottom -> rows move up (y decreases). cols offset X.
          x = origin.x + colOffset + 60;
          y = origin.y + row * SPACING - 50;
        } else if (dir === 1) {
          // EAST: origin at right -> rows move left (x decreases). cols offset Y.
          x = origin.x + row * SPACING - 50;
          y = origin.y + colOffset - 60;
        } else if (dir === 3) {
          x = origin.x - row * SPACING + 50;
          y = origin.y + colOffset + 60;
        }

        positions.push({
          id: item.id,
          isAmbulance: !!item.isAmbulance,
          x,
          y,
          rotation,
        });
      });
    });

    return positions;
  }

  const vehicles = computePositions();

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <div style={{ width: "70vw", height: "100vh" }}>
        <IntersectionRoad vehicles={vehicles} />
      </div>

      <div style={{
        width: "30vw",
        height: "100vh",
        background: "#1b2a1b",
        color: "white",
        padding: "20px",
        overflowY: "auto",
      }}>
        <ControlPanel
          lanes={lanes}
          addCar={addCar}
          addAmbulance={addAmbulance}
          clearLane={clearLane}
          timings={timings}
          mode={mode}
        />
      </div>
    </div>
  );
}
