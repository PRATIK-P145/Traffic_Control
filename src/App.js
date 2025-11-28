import React, { useState } from "react";
import IntersectionRoad from "./components/IntersectionRoad";
import ControlPanel from "./components/ControlPanel";

function App() {
  const [lanes, setLanes] = useState([
    { cars: [], hasAmbulance: false },
    { cars: [], hasAmbulance: false },
    { cars: [], hasAmbulance: false },
    { cars: [], hasAmbulance: false },
  ]);

  const [timings, setTimings] = useState([0, 0, 0, 0]);
  const [mode, setMode] = useState("Normal");

  const addCar = (dir) => {
    setLanes((prev) => {
      const updated = [...prev];
      updated[dir].cars.push({ id: Date.now() });
      return updated;
    });
  };

  const addAmbulance = (dir) => {
    setLanes((prev) => {
      const updated = [...prev];
      updated[dir].hasAmbulance = !updated[dir].hasAmbulance;
      return updated;
    });

    setMode((m) => (m === "Normal" ? "Emergency" : "Normal"));
  };

  const clearLane = (dir) => {
    setLanes((prev) => {
      const updated = [...prev];
      updated[dir] = { cars: [], hasAmbulance: false };
      return updated;
    });
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      
      {/* LEFT SIDE – SVG Intersection */}
      <div style={{ width: "70vw", height: "100vh" }}>
        <IntersectionRoad lanes={lanes} />
      </div>

      {/* RIGHT SIDE – CONTROL PANEL */}
      <div
        style={{
          width: "30vw",
          height: "100vh",
          background: "#1b2a1b",
          color: "white",
          padding: "20px",
          overflowY: "auto",
        }}
      >
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

export default App;
