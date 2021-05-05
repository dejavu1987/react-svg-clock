import { useState } from "react";
import "./styles.css";

import useInterval from "./useInterval";


const getAngleFromRatio = (ratio: number): number => {
  return ratio * 2 * Math.PI;
};

export default function Clock() {
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);

  const [hourAngle, setHourAngle] = useState<number>(0);
  const [minAngle, setMinAngle] = useState<number>(0);
  const [secAngle, setSecAngle] = useState<number>(0);


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
      {hourAngle}
      {minAngle}
      {secAngle}

      <h4>Test 0deg</h4>
      {getAngleFromRatio(0 / 12)} === {0}
      <h4>Test 360deg</h4>
      {getAngleFromRatio(12 / 12)} === {2 * Math.PI}
      <h4>Test 180deg</h4>
      {getAngleFromRatio(6 / 12)} === {Math.PI}
      <h4>Test 90deg</h4>
      {getAngleFromRatio(3 / 12)} === {Math.PI / 2}
    </div>
  );
}
