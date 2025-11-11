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
    <div className="countdown">
      <TimerBox value={time.d} label="DAGER" pad={3} />
      <TimerBox value={time.h} label="TIMER" pad={2} />
      <TimerBox value={time.m} label="MIN" pad={2} />
      <TimerBox value={time.s} label="SEK" pad={2} />
    </div>
  );
}

function TimerBox({ value, label, pad }) {
  const [prev, setPrev] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlip(true);
      const t = setTimeout(() => {
        setFlip(false);
        setPrev(value);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const formatted = value.toString().padStart(pad, "0");

  return (
    <div className="timer-box">
      <div className={`timer-top ${flip ? "animate" : ""}`}>
        {formatted}
      </div>
      <div className="timer-bottom">{formatted}</div>
      <div className="timer-label">{label}</div>
    </div>
  );
}
