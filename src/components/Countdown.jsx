import React, { useEffect, useState } from "react";

export default function Countdown() {
  const eventDate = new Date("2026-06-20T09:00:00"); // <-- sett dato og klokkeslett her
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
    <div
      style={{
        textAlign: "center",
        marginTop: "10px",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: "20px",
        color: "#333",
      }}
    >
      🕒{" "}
      {`${timeLeft.days ?? 0}d ${timeLeft.hours ?? 0}t ${timeLeft.minutes ?? 0}m ${timeLeft.seconds ?? 0}s`}{" "}
      igjen til Farris Triatlon 2026
    </div>
  );
}
