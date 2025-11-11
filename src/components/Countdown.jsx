import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const target = new Date("2026-06-20T09:00:00").getTime();
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(target - now, 0);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTime({ d, h, m, s });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [target]);

  return (
    <div className="countdown">
      <FlipBox value={time.d} label="DAGER" pad={3} />
      <FlipBox value={time.h} label="TIMER" pad={2} />
      <FlipBox value={time.m} label="MIN" pad={2} />
      <FlipBox value={time.s} label="SEK" pad={2} />
    </div>
  );
}

function FlipBox({ value, label, pad }) {
  const formatted = value.toString().padStart(pad, "0");
  const [prev, setPrev] = useState(formatted);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (formatted !== prev) {
      setFlip(true);
      const timer = setTimeout(() => {
        setFlip(false);
        setPrev(formatted);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [formatted, prev]);

  return (
    <div className="flipbox">
      <div className={`flip ${flip ? "animate" : ""}`}>
        <div className="top">{prev}</div>
        <div className="bottom">{formatted}</div>
      </div>
      <div className="label">{label}</div>
    </div>
  );
}
