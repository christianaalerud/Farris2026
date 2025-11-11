import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const targetDate = new Date("2026-06-20T09:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const update = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, targetDate - now);
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft({
        days: d.toString().padStart(3, "0"),
        hours: h.toString().padStart(2, "0"),
        minutes: m.toString().padStart(2, "0"),
        seconds: s.toString().padStart(2, "0"),
      });
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [targetDate]);

  const blocks = [
    { label: "DAGER", value: timeLeft.days },
    { label: "TIMER", value: timeLeft.hours },
    { label: "MIN", value: timeLeft.minutes },
    { label: "SEK", value: timeLeft.seconds },
  ];

  return (
    <div className="flipclock">
      {blocks.map((b) => (
        <div className="flip-unit" key={b.label}>
          <div className="flip-card">
            <div className="top">{b.value}</div>
            <div className="bottom">{b.value}</div>
          </div>
          <span className="label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
