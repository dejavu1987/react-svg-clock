import { useState } from "react";
import "./styles.css";

import useInterval from "./useInterval";

type coord = {
  x: number;
  y: number;
};

const BASE_DIMENSION = 400;
const RADIUS = BASE_DIMENSION / 2;
const minR = RADIUS * 0.74;
const secR = RADIUS * 0.7;
const hourR = RADIUS * 0.4;

const getAngleFromRatio = (ratio: number): number => {
  return 2 * Math.PI - ratio * 2 * Math.PI + Math.PI/2;
};

const polarToCartesian = (r: number, angle: number): coord => {
  return {
    x: r * Math.cos(angle) + RADIUS,
    y: -r * Math.sin(angle) + RADIUS
  };
};

export default function Clock() {
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const [hourAngle, setHourAngle] = useState<number>(0);
  const [minAngle, setMinAngle] = useState<number>(0);
  const [secAngle, setSecAngle] = useState<number>(0);

  const [hourPt, setHourPt] = useState<coord>();
  const [minPt, setMinPt] = useState<coord>();
  const [secPt, setSecPt] = useState<coord>();

  useInterval(() => {
    const now = new Date();

    const m = now.getMinutes();
    const h = now.getHours();
    const s = now.getSeconds();
    
    setHour(h > 11 ? h - 12 : h);
    setMin(m);
    setSec(s);

    setHourAngle(getAngleFromRatio(h / 12));
    setMinAngle(getAngleFromRatio(m / 60));
    setSecAngle(getAngleFromRatio(s / 60));

    setHourPt(polarToCartesian(hourR, hourAngle));
    setMinPt(polarToCartesian(minR, minAngle));
    setSecPt(polarToCartesian(secR, secAngle));

  }, 1000);


  return (
    <div className="clock">
      <h1>React SVG Clock</h1>
      <h2>
        Polar coordinates fundamentals
      </h2>
      <h3>
        Hour: {hour}, Minutes: {min}, Seconds: {sec}
      </h3>
      <svg width={BASE_DIMENSION} height={BASE_DIMENSION}>
        <circle
          r={RADIUS}
          cx={RADIUS}
          cy={RADIUS}
          fill="#333"
        ></circle>
        <circle
          r={(RADIUS) * 0.7}
          cx={RADIUS}
          cy={RADIUS}
          fill="rgba(0,0,0,0.3)"
          stroke="white"
        ></circle>
        <circle
          r={10}
          fill="white"
          cx={RADIUS}
          cy={RADIUS}
        ></circle>
        {new Array(12).fill("").map((d, i) => {
          const numPos = polarToCartesian(
            RADIUS - 25,
            getAngleFromRatio(i / 12)
          );
          return (
            <>
              <text
                x={numPos.x}
                y={numPos.y}
                fill="white"
                textAnchor="middle"
                dy=".5rem"
                fontSize="2rem"
              >
                {i}
              </text>
              <text
                x={numPos.x}
                y={numPos.y}
                fill="white"
                textAnchor="middle"
                dx="-1rem"
                fontSize=".5rem"
              >
              {i*5}
              </text>
            </>
          );
        })}
        {hourPt && (
          <line
            x1={BASE_DIMENSION / 2}
            y1={BASE_DIMENSION / 2}
            stroke="white"
            x2={hourPt.x}
            y2={hourPt.y}
            stroke-width={4}
            markerEnd="url(#head)"
          ></line>
        )}
        {minPt && (
          <line
            x1={BASE_DIMENSION / 2}
            y1={BASE_DIMENSION / 2}
            stroke="#aaa"
            x2={minPt.x}
            y2={minPt.y}
            stroke-width={2}
            markerEnd="url(#head)"
          ></line>
        )}
        {secPt && (
          <circle r={9} fill="white" cx={secPt.x} cy={secPt.y}></circle>
        )}
      </svg>
    </div>
  );
}
