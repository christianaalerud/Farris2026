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
      <Flip value={time.d} label="DAGER" />
      <Flip value={time.h} label="TIMER" />
      <Flip value={time.m} label="MIN" />
      <Flip value={time.s} label="SEK" />
    </div>
  );
}

function FlipUnit({ value, label }) {
  const [previousValue, setPreviousValue] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== previousValue) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setFlipping(false);
        setPreviousValue(value);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  const prev = previousValue.toString().padStart(2, "0");
  const next = value.toString().padStart(2, "0");

  return (
    <div className={`flip-unit ${flipping ? "flipping" : ""}`}>
      <div className="upper">{prev}</div>
      <div className="lower">{next}</div>

      <div className={`flipper ${flipping ? "flip" : ""}`}>
        <div className="front">{prev}</div>
        <div className="back">{next}</div>
      </div>

      <span className="label">{label}</span>
    </div>
  );
}
