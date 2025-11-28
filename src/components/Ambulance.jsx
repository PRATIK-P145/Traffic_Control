import React from "react";

/*
Ambulance visual similar to Car but distinct and slightly larger.
*/
export default function Ambulance({ progress = 0, isLeft = true }) {
  return (
    <div className="ambulance" style={{ transform: `translateY(${(1 - progress) * 70}px)` }}>
      A
    </div>
  );
}
