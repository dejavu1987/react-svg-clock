import { useState } from "react";
import "./styles.css";

import useInterval from "./useInterval";


export default function Clock() {
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);
  const [sec, setSec] = useState<number>(0);


  useInterval(() => {
    const now = new Date();

    const m = now.getMinutes();
    const h = now.getHours();
    const s = now.getSeconds();
    
    setHour(h > 11 ? h - 12 : h);
    setMin(m);
    setSec(s);
    
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
    </div>
  );
}
