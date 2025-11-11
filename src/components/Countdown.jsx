import { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const target = new Date("2026-06-20T09:00:00").getTime();
  const [time, setTime] = useState(calc());

  function calc() {
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
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flipclock">
      <Flip value={time.d} label="DAGER" />
      <Flip value={time.h} label="TIMER" />
      <Flip value={time.m} label="MIN" />
      <Flip value={time.s} label="SEK" />
    </div>
  );
}

function Flip({ value, label }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => {
        setFlipping(false);
        setPrev(value);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const formattedPrev = prev.toString().padStart(2, "0");
  const formattedVal = value.toString().padStart(2, "0");

  return (
    <div className="flipbox">
      <div className="card">
        <div className="top">{formattedPrev}</div>
        <div className="bottom">{formattedVal}</div>

        {/* klaff som bretter ned */}
        <div className={`flap ${flipping ? "flip" : ""}`}>
          <div className="front">{formattedPrev}</div>
          <div className="back">{formattedVal}</div>
        </div>
      </div>
      <span className="label">{label}</span>
    </div>
  );
}
