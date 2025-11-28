import React from "react";
import IntersectionRoad from "./components/IntersectionRoad";

function App() {
  return (
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      width: "100vw", 
      margin: 0, 
      padding: 0,
      overflow: "hidden"
    }}>
      {/* Left - SVG Road */}
      <div style={{ width: "70vw", height: "100vh" }}>
        <IntersectionRoad />
      </div>
    
      {/* Right Side Panel Placeholder */}
      <div style={{ 
        width: "30vw", 
        height: "100vh", 
        background: "#1b2a1b",
        color: "white",
        padding: "20px"
      }}>
        <h2>Control Panel</h2>
        {/* Add controls later */}
      </div>
    </div>
    
  );
}

export default App;
