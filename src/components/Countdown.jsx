import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const eventDate = new Date("2026-06-20T09:00:00"); // <-- Endre hvis ønskelig
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <h3 className="countdown-title">Nedtelling til Farris Triatlon 2026</h3>

      <div className="countdown-grid">
        <div className="countdown-box fade">
          <div className="countdown-number">{timeLeft.days ?? 0}</div>
          <div className="countdown-label">Dager</div>
        </div>
        <div className="countdown-box fade">
          <div className="countdown-number">{timeLeft.hours ?? 0}</div>
          <div className="countdown-label">Timer</div>
        </div>
        <div className="countdown-box fade">
          <div className="countdown-number">{timeLeft.minutes ?? 0}</div>
          <div className="countdown-label">Minutter</div>
        </div>
        <div className="countdown-box fade">
          <div className="countdown-number">{timeLeft.seconds ?? 0}</div>
          <div className="countdown-label">Sekunder</div>
        </div>
      </div>
    </div>
  );
}
