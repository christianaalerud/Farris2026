import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const targetDate = new Date("2026-06-20T09:00:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(targetDate - now, 0);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d, h, m, s });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  return (
    <div className="flipclock">
      <FlipUnit value={time.d} label="DAGER" pad={3} />
      <FlipUnit value={time.h} label="TIMER" pad={2} />
      <FlipUnit value={time.m} label="MIN" pad={2} />
      <FlipUnit value={time.s} label="SEK" pad={2} />
    </div>
  );
}

/* Én boks per tidsenhet */
function FlipUnit({ value, label, pad }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => {
        setFlip(false);
        setPrev(value);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const current = prev.toString().padStart(pad, "0");
  const next = value.toString().padStart(pad, "0");

  return (
    <div className="flip-unit">
      <div className={`flip-card ${flip ? "flipping" : ""}`}>
        <div className="card-upper">
          <div className="half top">{current}</div>
          <div className="half bottom">{next}</div>
        </div>
        <div className="card-lower">{next}</div>
      </div>
      <span className="label">{label}</span>
    </div>
  );
}
