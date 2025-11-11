import { useEffect, useState } from "react";
import "./Countdown.css";

export default function Countdown() {
  const target = new Date("2026-06-20T09:00:00").getTime();
  const [time, setTime] = useState(getTime());

  function getTime() {
    const now = Date.now();
    const diff = Math.max(target - now, 0);
    return {
      d: Math.floor(diff / (1000 * 60 * 60 * 24)),
      h: Math.floor((diff / (1000 * 60 * 60)) % 24),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flipclock">
      <Flip value={time.d} label="DAGER" />
      <Flip value={time.h} label="TIMER" />
      <Flip value={time.m} label="MIN" />
      <Flip value={time.s} label="SEK" />
    </div>
  );
}

function Flip({ value, label }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => {
        setFlipping(false);
        setPrev(value);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  const prevFormatted = prev.toString().padStart(2, "0");
  const valFormatted = value.toString().padStart(2, "0");

  return (
    <div className="flipbox">
      <div className="card">
        {/* statisk top og bottom */}
        <div className="top">{prevFormatted}</div>
        <div className="bottom">{valFormatted}</div>

        {/* øvre klaff (flipper ned) */}
        <div className={`flap upper ${flipping ? "flip" : ""}`}>
          <div className="front">{prevFormatted}</div>
          <div className="back">{valFormatted}</div>
        </div>

        {/* nedre klaff (dukker opp etterpå) */}
        <div className={`flap lower ${flipping ? "flip" : ""}`}>
          <div className="front">{valFormatted}</div>
          <div className="back">{prevFormatted}</div>
        </div>
      </div>
      <span className="label">{label}</span>
    </div>
  );
}
