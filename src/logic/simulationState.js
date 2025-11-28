// initialSimulationState returns lanes array with empty car lists and metadata
export function initialSimulationState() {
    // lanes: 0:N,1:E,2:S,3:W
    return {
      lanes: [
        { cars: [ { id: "n-1", progress: -0.1 }, { id: "n-2", progress: -0.4 } ], hasAmbulance: false, dir: 0 },
        { cars: [ { id: "e-1", progress: -0.2 } ], hasAmbulance: false, dir: 1 },
        { cars: [ { id: "s-1", progress: -0.3 }, { id: "s-2", progress: -0.6 } ], hasAmbulance: false, dir: 2 },
        { cars: [ { id: "w-1", progress: -0.15 } ], hasAmbulance: false, dir: 3 }
      ]
    };
  }
  


  