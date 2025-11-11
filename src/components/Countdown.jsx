import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const target = new Date("2026-06-20T09:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = Date.now();
    const diff = Math.max(target - now, 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flipclock">
      <FlipCard value={timeLeft.days} label="DAGER" />
      <FlipCard value={timeLeft.hours} label="TIMER" />
      <FlipCard value={timeLeft.minutes} label="MIN" />
      <FlipCard value={timeLeft.seconds} label="SEK" />
    </div>
  );
}

function FlipCard({ value, label }) {
  const [current, setCurrent] = useState(value);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (value !== current) {
      setFlip(true);
      const timeout = setTimeout(() => {
        setFlip(false);
        setCurrent(value);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [value, current]);

  return (
    <div className="flipcard-container">
      <div className={`flipcard ${flip ? "flip" : ""}`}>
        <div className="upper">{current.toString().padStart(2, "0")}</div>
        <div className="lower">{value.toString().padStart(2, "0")}</div>
        <div className="flip-half">
          <div className="front">{current.toString().padStart(2, "0")}</div>
          <div className="back">{value.toString().padStart(2, "0")}</div>
        </div>
      </div>
      <span className="label">{label}</span>
    </div>
  );
}
