import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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

const logo = "/logo3.png";
const backgroundLogo = "/logo2.png";

export default function App() {
  return (
    <Router>
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "white",
          overflow: "hidden",
        }}
      >
        {/* Bakgrunnslogo */}
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

       function Navbar() {
  return (
    <nav>
      <ul className="nav-list">

        <li><Link to="/">Hjem</Link></li>

        {/* Races dropdown */}
        <li className="nav-dropdown">
          Races ▾
          <ul className="nav-dropdown-menu">
            <li><Link to="/triatlon">Triatlon</Link></li>
            <li><Link to="/akvatlon">Akvatlon</Link></li>
            <li><Link to="/svømming">Svømming</Link></li>
            <li><Link to="/løping">Løping</Link></li>
          </ul>
        </li>

        <li><Link to="/deltakermanual">Deltakermanual</Link></li>
        <li><Link to="/løypeprofiler">Løypeprofiler</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/om-oss">Om oss</Link></li>
        <li><Link to="/påmelding">Påmelding</Link></li>

      </ul>
    </nav>
  );
}

        {/* Sidene */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <Routes>
            {/* HJEM */}
            <Route
              path="/"
              element={
                <div>
                  <div className="hero-header">
                    <div className="logo-top" onClick={() => {}}>
                      <img src={logo} alt="Farris Triatlon logo" />
                    </div>
                    <Countdown />
                  </div>

                  <div className="home-container">
                    <div className="home-text">

                      {/* ⭐ DIN TEKST – UENDRET ⭐ */}
                      <h1>Velkommen til Farris Triatlon 2026!</h1>

                      <p>
                        Farris Triatlon er et lavterskelarrangement for deg som
                        liker frisk luft, fine folk og en utfordring du kan
                        skryte av resten av året. Her får du nesten olympiske
                        distanser, men med lokal sjarm og null krav om toppform.
                      </p>

                      <p>
                        Vi starter med ca. 1500 meter svømming i
                        Ragnhildrødvannet. Ingen bølger, men kanskje en gjedde som
                        lurer på hva du driver med. Deretter venter omtrent 34 km på
                        sykkel gjennom Oklungen, Langangen og Bjørkedalen. Det blir
                        asfalt, svinger, motbakker og god anledning til å snakke litt
                        høyt med seg selv. Til slutt runder vi av med litt over 10 km
                        løping på asfalt og skogsvei, akkurat passe langt til at du
                        rekker å angre, men ikke lenge nok til at du gir opp.
                      </p>

                      <p>
                        Du kan melde deg på én, to eller alle tre disipliner. Her er
                        det plass til både deg som trener jevnt og deg som tenker
                        "hvor vanskelig kan det være?"
                      </p>

                      <p>
                        Farris Triatlon handler om å stille opp, kjenne på
                        mestringen og ha det skikkelig gøy underveis uansett tempo,
                        form eller erfaring. Det blir selvfølgelig utdeling av
                        medaljer og finisher t-skjorte til alle som fullfører.
                      </p>
                    </div>

                    {/* Høyre bilder */}
                    <div className="home-images">
                      <img src="/images/triatlon1.jpg" alt="Triatlonbilde 1" />
                      <img src="/images/triatlon2.jpg" alt="Triatlonbilde 2" />
                      <img src="/images/triatlon3.jpg" alt="Triatlonbilde 3" />
                    </div>
                  </div>
                </div>
              }
            />

            {/* ANDRE SIDER */}
            <Route path="/triatlon" element={<Triatlon />} />
            <Route path="/akvatlon" element={<Akvatlon />} />
            <Route path="/svømming" element={<Svømming />} />
            <Route path="/løping" element={<Løping />} />
            <Route path="/deltakermanual" element={<Deltakermanual />} />
            <Route path="/løypeprofiler" element={<Løypeprofiler />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/om-oss" element={<OmOss />} />
            <Route path="/påmelding" element={<Pamelding />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

/* ----------------------------------------------------------
   NAVBAR-KOMPONENT
---------------------------------------------------------- */

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Hjem</Link></li>

        <li><Link to="/triatlon">Triatlon</Link></li>
        <li><Link to="/akvatlon">Akvatlon</Link></li>
        <li><Link to="/svømming">Svømming</Link></li>
        <li><Link to="/løping">Løping</Link></li>

        <li><Link to="/deltakermanual">Deltakermanual</Link></li>
        <li><Link to="/løypeprofiler">Løypeprofiler</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/om-oss">Om oss</Link></li>
        <li><Link to="/påmelding">Påmelding</Link></li>
      </ul>
    </nav>
  );
}
