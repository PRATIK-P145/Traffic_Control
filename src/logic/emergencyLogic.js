// applyEmergency(ambulanceIdx, directions) -> returns array of lights for all directions
export function applyEmergency(ambulanceIdx, countDirections = 4) {
    const lights = [];
    for (let i = 0; i < countDirections; i++) {
      if (i === ambulanceIdx) {
        lights.push({ red: false, yellow: false, green: true, blue: true });
      } else {
        lights.push({ red: true, yellow: false, green: false, blue: true });
      }
    }
    return lights;
  }
  