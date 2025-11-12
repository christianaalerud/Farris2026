import { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const target = new Date("2026-06-20T09:00:00").getTime();
  const [time, setTime] = useState(getTime());

  function getTime() {
    const now = Date.now();
    const diff = Math.max(target - now, 0);
    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const t = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flipclock">
     <FlipUnit value={time.d} label="DAGER" />
<FlipUnit value={time.h} label="TIMER" />
<FlipUnit value={time.m} label="MIN" />
<FlipUnit value={time.s} label="SEK" />
    </div>
  );
}

function FlipUnit({ value, label }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setFlipping(false);
        setPrev(value);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [value, prev]);

  const prevTxt = prev.toString().padStart(2, "0");
  const nextTxt = value.toString().padStart(2, "0");

  return (
    <div className={`flip-unit ${flipping ? "flipping" : ""}`}>
      {/* bare øvre tall synlig når ikke flipper */}
      <div className="upper">{prevTxt}</div>
      <div className="lower">{flipping ? nextTxt : ""}</div>

      {/* klaffen som beveger seg */}
      <div className={`flipper ${flipping ? "flip" : ""}`}>
        <div className="front">{prevTxt}</div>
        <div className="back">{nextTxt}</div>
      </div>

      <span className="label">{label}</span>
    </div>
  );
}
