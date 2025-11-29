export function calculateDynamicTiming(counts) {
    const totalNS = counts.north + counts.south;
    const totalEW = counts.east + counts.west;
  
    const GREEN_MIN = 5000;
    const GREEN_MAX = 12000;
  
    const W_SCALE = 200;
  
    const nsGreen = Math.min(
      GREEN_MAX,
      GREEN_MIN + totalNS * W_SCALE * 2
    );
  
    const ewGreen = Math.min(
      GREEN_MAX,
      GREEN_MIN + totalEW * W_SCALE * 2
    );
  
    return {
      GREEN_NS: nsGreen,
      GREEN_EW: ewGreen,
      YELLOW: 2000,
      ALL_RED: 700
    };
  }
  