import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const targetDate = new Date("2026-06-20T09:00:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(targetDate - now, 0);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d, h, m, s });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flipclock">
      <FlipBox value={time.d} label="DAGER" pad={3} />
      <FlipBox value={time.h} label="TIMER" pad={2} />
      <FlipBox value={time.m} label="MIN" pad={2} />
      <FlipBox value={time.s} label="SEK" pad={2} />
    </div>
  );
}

function FlipBox({ value, label, pad }) {
  const [display, setDisplay] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== display) {
      setFlipping(true);
      const t = setTimeout(() => {
        setDisplay(value);
        setFlipping(false);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [value, display]);

  const formatted = value.toString().padStart(pad, "0");

  return (
    <div className="flipbox">
      <div className={`flip ${flipping ? "animate" : ""}`}>
        <div className="flip-top">{formatted}</div>
        <div className="flip-bottom">{formatted}</div>
      </div>
      <span className="flip-label">{label}</span>
    </div>
  );
}
