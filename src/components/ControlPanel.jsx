import React from "react";

/*
Props:
- lanes: array
- addCar(dir)
- addAmbulance(dir)
- clearLane(dir)
- timings (array)
- mode
*/

const DIR_LABEL = ["North (1)", "East (2)", "South (3)", "West (4)"];

export default function ControlPanel({ lanes, addCar, addAmbulance, clearLane, timings, mode }) {
  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <p className="small">Add cars or toggle ambulance. Each direction controls both incoming lanes.</p>

      {lanes.map((l, i) => (
        <div key={i} style={{ marginBottom: 12, padding: 8, borderRadius: 8, background: "rgba(255,255,255,0.02)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong>{DIR_LABEL[i]}</strong>
            <div className="small">Cars: {l.cars.length}</div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => addCar(i)}>Add Car</button>
            <button onClick={() => addAmbulance(i)} style={{ background: l.hasAmbulance ? "#8b0000" : undefined }}>
              Toggle Ambulance
            </button>
            <button onClick={() => clearLane(i)}>Clear</button>
          </div>

          <div style={{ marginTop: 8 }}>
            <div className="small">Green time (computed): {timings[i] || 0}s</div>
            <div className="small">Ambulance: {l.hasAmbulance ? "Yes" : "No"}</div>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 6 }} className="small">
        System Mode: <b>{mode}</b>
      </div>
    </div>
  );
}
