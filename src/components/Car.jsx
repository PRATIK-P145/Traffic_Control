import React from "react";

/*
props:
- progress: number - position along path (-0.3 .. 1.1)
- isLeft: boolean - left lane vs right lane (visual offset)
We will compute transform for 8 lane layout.
For simplicity, Car renders as a small rectangle and its position depends on CSS translation.
*/

export default function Car({ progress = 0, isLeft = true }) {
  // clamp progress for visualization:
  const p = progress;
  // determine style: vertical or horizontal depends on context; parent positioned zone decides orientation
  // We'll set transform translate for basic motion inside the zone using progress.
  const offset = isLeft ? -10 : 10;
  const translate = `translateY(${(1 - p) * 120 - 40}px)`; // used in some zones; Car wrapper parent will adjust
  // For flexible placement, the parent zone will use absolute and Car will use inline style set via top/left in embedding usage.
  // Here we render a simple block and let parent CSS handle placement via transforms
  return (
    <div className="car" style={{ transform: `translateY(${(1 - p) * 70}px)` }}>
      {/* small colored box */}
    </div>
  );
}
