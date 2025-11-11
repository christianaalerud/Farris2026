import React from "react";


const InfoBar = () => {
  return (
    <div className="info-bar">
      {/* Svøm */}
      <div className="info-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="icon"
          width="40"
          height="40"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="#222" strokeWidth="2" />
          <path d="M6 36c6-4 12 0 18 0s12-4 18-4 12 4 18 4" stroke="#222" strokeWidth="2" fill="none" />
          <path d="M22 22l4-4m-2 4v-6m12 6h8m-20 0h4" stroke="#222" strokeWidth="2" fill="none" />
        </svg>
        <div>
          <div className="label">Svøm</div>
          <div className="value">Innsjø</div>
        </div>
      </div>

      {/* Sykkel */}
      <div className="info-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="icon"
          width="40"
          height="40"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="#222" strokeWidth="2" />
          <path d="M10 40c6-8 12-6 18-2s12 8 18 2 12-8 18-2" stroke="#222" strokeWidth="2" fill="none" />
        </svg>
        <div>
          <div className="label">Sykkel</div>
          <div className="value">Kuppert</div>
        </div>
      </div>

      {/* Løp */}
      <div className="info-item">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="icon"
          width="40"
          height="40"
        >
          <circle cx="32" cy="32" r="30" fill="none" stroke="#222" strokeWidth="2" />
          <line x1="10" y1="32" x2="54" y2="32" stroke="#222" strokeWidth="2" />
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
