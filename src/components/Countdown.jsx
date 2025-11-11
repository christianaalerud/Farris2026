import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const target = new Date("2026-06-20T09:00:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(target - now, 0);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d, h, m, s });
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <div className="flipclock">
      <FlipUnit label="DAGER" value={time.d} pad={3} />
      <FlipUnit label="TIMER" value={time.h} pad={2} />
      <FlipUnit label="MIN" value={time.m} pad={2} />
      <FlipUnit label="SEK" value={time.s} pad={2} />
    </div>
  );
}

function FlipUnit({ label, value, pad }) {
  const formatted = value.toString().padStart(pad, "0");
  const [current, setCurrent] = useState(formatted);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (formatted !== current) {
      setFlipping(true);
      const t = setTimeout(() => {
        setFlipping(false);
        setCurrent(formatted);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [formatted, current]);

  return (
    <div className="flip-unit">
      <div className={`flip-card ${flipping ? "flip" : ""}`}>
        <div className="top">{current}</div>
        <div className="bottom">{formatted}</div>
        <div className="flap">
          <div className="flap-front">{current}</div>
          <div className="flap-back">{formatted}</div>
        </div>
      </div>
      <span className="label">{label}</span>
    </div>
  );
}
