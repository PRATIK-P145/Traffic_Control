import React from "react";
import { useTraffic } from "./TrafficContext";
import Car from "./Car";

export default function CarRenderer() {
  const { cars } = useTraffic();

  return (
    <>
      {cars.map((c) => (
        <Car key={c.id} x={c.x} y={c.y} dir={c.dir} />
      ))}
    </>
  );
}
