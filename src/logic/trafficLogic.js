// computeTimings receives counts array [n,e,s,w] and returns green times in seconds per direction
export function computeTimings(counts) {
    // basic linear: base + perCar
    const base = 8;
    const per = 2;
    const maxT = 60;
    const timings = counts.map(c => Math.min(maxT, base + per * c));
    // if all zero, give a small default so cycling occurs
    return timings.map(t => (t <= 0 ? base : t));
  }
  
  export const computeTimingsDefault = computeTimings;
  