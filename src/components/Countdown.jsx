import React, { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const eventDate = new Date("2026-06-20T09:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = eventDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-inline">
      {[
        { label: "D", value: timeLeft.days },
        { label: "T", value: timeLeft.hours },
        { label: "M", value: timeLeft.minutes },
        { label: "S", value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="cd-box">
          <div className="cd-num">{item.value}</div>
          <div className="cd-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
