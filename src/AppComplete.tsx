import { useState } from "react";
import "./styles.css";

import useInterval from "./useInterval";

type coord = {
  x: number;
  y: number;
};

const BASE_DIMENSION = 400;
const minR = (BASE_DIMENSION / 2) * 0.74;
const secR = (BASE_DIMENSION / 2) * 0.7;
const hourR = (BASE_DIMENSION / 2) * 0.4;

const polarToCartesian = (r: number, angle: number): coord => {
  return {
    x: r * Math.cos(angle) + BASE_DIMENSION / 2,
    y: -r * Math.sin(angle) + BASE_DIMENSION / 2
  };
};

const getAngleFromRatio = (ratio: number): number => {
  return 2 * Math.PI - ratio * 2 * Math.PI + Math.PI / 2;
};

export default function App() {
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
    setMin(m);
    const h = now.getHours() + m / 60;
    setHour(h > 11 ? h - 12 : h);
    const s = now.getSeconds();
    setSec(s);

    setHourAngle(getAngleFromRatio(h / 12));
    setMinAngle(getAngleFromRatio(m / 60));
    setSecAngle(getAngleFromRatio(s / 60));

    setHourPt(polarToCartesian(hourR, hourAngle));
    setMinPt(polarToCartesian(minR, minAngle));
    setSecPt(polarToCartesian(secR, secAngle));
  }, 1000);

  return (
    <div className="App">
      <h1>React SVG Clock</h1>
      <h2>
        <a href="https://anilmaharjan.com.np/blog/introduction-to-polar-coordinates-plotting-on-radial-diagrams">
          Polar coordinates fundamentals
        </a>
      </h2>
      <h3>
        Hour: {hour}, Minutes: {min}, Seconds: {sec}
      </h3>

      <svg width={BASE_DIMENSION} height={BASE_DIMENSION}>
        <defs>
          <marker
            id="head"
            orient="auto"
            markerWidth="6"
            markerHeight="6"
            refX="0.1"
            refY="2"
          >
            <path d="M0,0 V4 L6,2 Z" fill="white" />
          </marker>
        </defs>
        <circle
          r={BASE_DIMENSION / 2}
          cx={BASE_DIMENSION / 2}
          cy={BASE_DIMENSION / 2}
          fill="#333"
        ></circle>
        <circle
          r={(BASE_DIMENSION / 2) * 0.7}
          cx={BASE_DIMENSION / 2}
          cy={BASE_DIMENSION / 2}
          fill="rgba(0,0,0,0.3)"
          stroke="white"
        ></circle>
        {new Array(12).fill("").map((d, i) => {
          const numPos = polarToCartesian(
            BASE_DIMENSION / 2 - 25,
            getAngleFromRatio(i / 12)
          );
          return (
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
          );
        })}

        <circle
          r={10}
          fill="white"
          cx={BASE_DIMENSION / 2}
          cy={BASE_DIMENSION / 2}
        ></circle>
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
