import React, { useState, useEffect } from "react";
import "./Countdown.css";

export default function Countdown() {
  const targetDate = new Date("2026-06-20T09:00:00").getTime();
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(targetDate - now, 0);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTime({ days, hours, minutes, seconds });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="countdown-wrapper">
      <FlipCard value={time.days} label="DAGER" />
      <FlipCard value={time.hours} label="TIMER" />
      <FlipCard value={time.minutes} label="MIN" />
      <FlipCard value={time.seconds} label="SEK" />
    </div>
  );
}

function FlipCard({ value, label }) {
  const [previousValue, setPreviousValue] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== previousValue) {
      setFlipping(true);
      const timeout = setTimeout(() => {
        setFlipping(false);
        setPreviousValue(value);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [value, previousValue]);

  return (
    <div className="flip-card-container">
      <div className={`flip-card ${flipping ? "flipping" : ""}`}>
        <div className="top">{previousValue.toString().padStart(2, "0")}</div>
        <div className="bottom">{value.toString().padStart(2, "0")}</div>
        <div className="flip">
          <div className="flip-front">{previousValue.toString().padStart(2, "0")}</div>
          <div className="flip-back">{value.toString().padStart(2, "0")}</div>
        </div>
      </div>
      <div className="label">{label}</div>
    </div>
  );
}
