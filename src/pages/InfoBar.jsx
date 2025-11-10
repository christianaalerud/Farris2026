import React from "react";
import "./InfoBar.css";

const InfoBar = () => {
  return (
    <div className="info-bar">
      <div className="info-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="icon"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="#222" strokeWidth="2" />
          <path
            d="M15 36c6-4 10 0 14 0s8-4 14-4 10 4 14 4"
            stroke="#222"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <div>
          <div className="label">Svøm</div>
          <div className="value">Innsjø</div>
        </div>
      </div>

      <div className="info-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="icon"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="#222" strokeWidth="2" />
          <line x1="12" y1="32" x2="52" y2="32" stroke="#222" strokeWidth="2" />
        </svg>
        <div>
          <div className="label">Sykkel</div>
          <div className="value">Kuppert</div>
        </div>
      </div>

      <div className="info-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="icon"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="#222" strokeWidth="2" />
          <path
            d="M12 32h40"
            stroke="#222"
            strokeWidth="2"
            fill="none"
          />
        </svg>
        <div>
          <div className="label">Løp</div>
          <div className="value">Relativt flatt</div>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
