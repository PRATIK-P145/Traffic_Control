import React from "react";

const DIR_LABEL = ["North (1)", "East (2)", "South (3)", "West (4)"];

export default function ControlPanel({
  lanes,
  addCar,
  addAmbulance,
  clearLane,
  timings,
  mode,
}) {
  return (
    <div className="control-panel">
      <h2>Control Panel</h2>
      <p className="small">
        Add cars or toggle ambulance. Each direction controls the incoming lane.
      </p>

      {lanes.map((l, i) => (
        <div
          key={i}
          style={{
            marginBottom: 12,
            padding: 10,
            borderRadius: 8,
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <strong>{DIR_LABEL[i]}</strong>
            <div className="small">Cars: {l.cars.length}</div>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <button onClick={() => addCar(i)}>Add Car</button>

            <button
              onClick={() => addAmbulance(i)}
              style={{
                background: l.hasAmbulance ? "#b30000" : undefined,
              }}
            >
              Toggle Ambulance
            </button>

            <button onClick={() => clearLane(i)}>Clear</button>
          </div>

          {/* Status Section */}
          <div style={{ marginTop: 8 }}>
            <div className="small">
              Green time (computed): <b>{timings[i] || 0}s</b>
            </div>
            <div className="small">
              Ambulance: <b>{l.hasAmbulance ? "Yes" : "No"}</b>
            </div>
          </div>
        </div>
      ))}

      {/* System Mode Box */}
      <div style={{ marginTop: 10 }} className="small">
        System Mode: <b>{mode}</b>
      </div>
    </div>
  );
}
