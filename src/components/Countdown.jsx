import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const target = new Date("2026-06-20T09:00:00").getTime();

  const [time, setTime] = useState({
    d: "000",
    h: "00",
    m: "00",
    s: "00",
  });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(target - now, 0);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTime({
        d: days.toString().padStart(3, "0"),
        h: hours.toString().padStart(2, "0"),
        m: minutes.toString().padStart(2, "0"),
        s: seconds.toString().padStart(2, "0"),
      });
    };

    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [target]);

  const blocks = [
    { label: "DAGER", val: time.d },
    { label: "TIMER", val: time.h },
    { label: "MIN", val: time.m },
    { label: "SEK", val: time.s },
  ];

  return (
    <div className="flipclock">
      {blocks.map((b) => (
        <div className="flip-unit" key={b.label}>
          {/* key på flip-card gjør at den animerer kun når verdien endres */}
          <div className="flip-card" key={b.val}>
            <div className="top">{b.val}</div>
            <div className="bottom">{b.val}</div>
          </div>
          <span className="label">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
