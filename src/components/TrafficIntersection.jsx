import React from "react";
import TrafficLight from "./TrafficLight";
import Car from "./Car";
import Ambulance from "./Ambulance";

/*
Props:
- lanes: array[4] each { cars: [{id, progress, isAmbulance}], hasAmbulance: bool }
- lights: array[4] each {red,yellow,green,blue}
Mapping directions idx:
0: North (cars move down)
1: East (cars move left)
2: South (cars move up)
3: West (cars move right)
*/

function laneKey(dir, laneIndex) {
  // dir: 0..3, laneIndex: 0 left,1 right (two lanes per direction)
  const map = [
    ["n-left","n-right"],
    ["e-left","e-right"],
    ["s-left","s-right"],
    ["w-left","w-right"]
  ];
  return map[dir][laneIndex];
}

export default function TrafficIntersection({ lanes, lights }) {
  // each lanes[dir] contains cars array with progress -0.2 .. 1.0 etc.
  // we will place cars inside lane-zones and position them based on progress.
  // For each car compute absolute position (left/top) via CSS transforms in Car component.

  return (
    <div className="intersection">
      <div className="center" />
      <div className="road-n" />
      <div className="road-s" />
      <div className="road-w" />
      <div className="road-e" />

      {/* Traffic lights */}
      <div className="traffic-lights lights-n"><TrafficLight state={lights[0]} /></div>
      <div className="traffic-lights lights-e"><TrafficLight state={lights[1]} rotate={90} /></div>
      <div className="traffic-lights lights-s"><TrafficLight state={lights[2]} rotate={180} /></div>
      <div className="traffic-lights lights-w"><TrafficLight state={lights[3]} rotate={270} /></div>

      {/* Lane zones and cars */}
      {/* North direction lanes (cars travel down) */}
      <div className="lane-zone n-left">
        {renderCarsForLane(lanes[0], 0)}
      </div>
      <div className="lane-zone n-right">
        {renderCarsForLane(lanes[0], 1)}
      </div>

      {/* East direction (cars travel left) */}
      <div className="lane-zone e-left">
        {renderCarsForLane(lanes[1], 0)}
      </div>
      <div className="lane-zone e-right">
        {renderCarsForLane(lanes[1], 1)}
      </div>

      {/* South direction (cars travel up) */}
      <div className="lane-zone s-left">
        {renderCarsForLane(lanes[2], 0)}
      </div>
      <div className="lane-zone s-right">
        {renderCarsForLane(lanes[2], 1)}
      </div>

      {/* West direction (cars travel right) */}
      <div className="lane-zone w-left">
        {renderCarsForLane(lanes[3], 0)}
      </div>
      <div className="lane-zone w-right">
        {renderCarsForLane(lanes[3], 1)}
      </div>
    </div>
  );
}

function renderCarsForLane(laneObj, laneIndex) {
  // laneObj.cars is an array; assign every even/odd car to left/right lane for visual spread
  if (!laneObj) return null;
  return laneObj.cars.map((c, idx) => {
    const isLeft = (idx % 2) === laneIndex; // distribute visualization
    const key = c.id;
    if (c.isAmbulance) {
      return <Ambulance key={key} progress={c.progress} dirBase={laneObj.dir} isLeft={isLeft} />;
    }
    return <Car key={key} progress={c.progress} isLeft={isLeft} />;
  });
}
