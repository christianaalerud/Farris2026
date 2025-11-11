import { useState } from "react";
import "./App.css";
import Countdown from "./components/Countdown.jsx";


import Triatlon from "./pages/Triatlon.jsx";
import Akvatlon from "./pages/Akvatlon.jsx";
import Svømming from "./pages/Svømming.jsx";
import Løping from "./pages/Løping.jsx";
import Deltakermanual from "./pages/Deltakermanual.jsx";
import Løypeprofiler from "./pages/Løypeprofiler.jsx";
import FAQ from "./pages/FAQ.jsx";
import OmOss from "./pages/OmOss.jsx";
import Pamelding from "./pages/Pamelding.jsx";
import InfoBar from "./pages/InfoBar";

const logo = "/logo3.png"; // brukes i logo-seksjon
const backgroundLogo = "/logo2.png"; // bakgrunnslogo

export default function App() {
  const [racesOpen, setRacesOpen] = useState(false);
  const [page, setPage] = useState("home");

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      {/* TOPPMENY */}
      <Navbar
        racesOpen={racesOpen}
        setRacesOpen={setRacesOpen}
        setPage={setPage}
      />

      {/* BAKGRUNNSLOGO */}
      <img
        src={backgroundLogo}
        alt="Bakgrunnslogo"
        className="background-logo"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60vw",
          maxWidth: "800px",
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* INFO-LINJE UNDER MENY */}
      <InfoBar />

      {/* SIDEINNHOLD */}
      <div className="page-wrapper" style={{ position: "relative", zIndex: 10 }}>
        {page === "home" && (
          <>
        {/* LOGO + FLIPKLOKKE UNDER INFOBAR */}
<div
  className="hero-header"
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "40px",
    marginTop: "40px",
    marginLeft: "60px",
    flexWrap: "wrap",
  }}
>
  <div
    className="logo-top"
    onClick={() => setPage("home")}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
    }}
  >
    <img
      src={logo}
      alt="Farris Triatlon logo"
      style={{
        width: "220px",
        height: "auto",
        userSelect: "none",
      }}
    />
  </div>

  {/* ÉN rad, én instans */}
  <Countdown />
</div>

            {/* HOVEDSEKSJON – RESPONSIV */}
            <div className="home-container">
              {/* VENSTRE: TEKST */}
              <div className="home-text">
                <h1>Velkommen til Farris Triatlon 2026!</h1>
                <p>
                  Farris Triatlon er et lavterskelarrangement for deg som liker
                  frisk luft, fine folk og en utfordring du kan skryte av resten
                  av året. Her får du nesten olympiske distanser, men med lokal
                  sjarm og null krav om toppform.
                </p>
                <p>
                  Vi starter med ca. 1500 meter svømming i Ragnhildrødvannet.
                  Ingen bølger, men kanskje en gjedde som lurer på hva du driver
                  med. Deretter venter omtrent 40 km på sykkel gjennom Oklungen,
                  Langangen og Bjørkedalen. Det blir asfalt, svinger, motbakker
                  og god anledning til å snakke litt høyt med seg selv.
                  Til slutt runder vi av med litt over 10 km løping på asfalt og
                  skogsvei – akkurat passe langt til at du rekker å angre, men
                  ikke lenge nok til at du gir opp.
                </p>
                <p>
                  Du kan melde deg på én, to eller alle tre disipliner. Her er
                  det plass til både deg som trener jevnt og deg som tenker
                  &quot;hvor vanskelig kan det være?&quot; Farris Triatlon
                  handler om å stille opp, kjenne på mestringen og ha det
                  skikkelig gøy underveis uansett tempo, form eller erfaring.
                  Det blir selvfølgelig medalje og finisher t-skjorte til alle
                  som fullfører.
                </p>
              </div>

              {/* HØYRE: BILDER */}
              <div className="home-images">
                <img
                  src="/images/triatlon1.jpg"
                  alt="Triatlonbilde 1"
                />
                <img
                  src="/images/triatlon2.jpg"
                  alt="Triatlonbilde 2"
                />
                <img
                  src="/images/triatlon3.jpg"
                  alt="Triatlonbilde 3"
                />
              </div>
            </div>
          </>
        )}

        {page === "Triatlon" && <Triatlon />}
        {page === "Akvatlon" && <Akvatlon />}
        {page === "Svømming" && <Svømming />}
        {page === "Løping" && <Løping />}
        {page === "Deltakermanual" && <Deltakermanual />}
        {page === "Løypeprofiler" && <Løypeprofiler />}
        {page === "FAQ" && <FAQ />}
        {page === "Om oss" && <OmOss />}
        {page === "Påmelding" && <Pamelding />}
      </div>
    </div>
  );
}

// ---------- NAVBAR ----------
function Navbar({ racesOpen, setRacesOpen, setPage }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li onClick={() => setPage("home")}>Hjem</li>

        <li
          className="nav-dropdown"
          onClick={() => setRacesOpen(!racesOpen)}
        >
          Races ▾
          {racesOpen && (
            <ul className="nav-dropdown-menu">
              {["Triatlon", "Akvatlon", "Svømming", "Løping"].map((r) => (
                <li
                  key={r}
                  onClick={() => {
                    setPage(r);
                    setRacesOpen(false);
                  }}
                >
                  {r}
                </li>
              ))}
            </ul>
          )}
        </li>

        <li onClick={() => setPage("Deltakermanual")}>Deltakermanual</li>
        <li onClick={() => setPage("Løypeprofiler")}>Løypeprofiler</li>
        <li onClick={() => setPage("FAQ")}>FAQ</li>
        <li onClick={() => setPage("Om oss")}>Om oss</li>
        <li onClick={() => setPage("Påmelding")}>Påmelding</li>
      </ul>
    </nav>
  );
}
