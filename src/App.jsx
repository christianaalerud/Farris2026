import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import InfoBar from "./pages/InfoBar.jsx";

import Triatlon from "./pages/Triatlon.jsx";
import Akvatlon from "./pages/Akvatlon.jsx";
import Svømming from "./pages/Svømming.jsx";
import Løping from "./pages/Løping.jsx";
import Deltakermanual from "./pages/Deltakermanual.jsx";
import Løypeprofiler from "./pages/Løypeprofiler.jsx";
import FAQ from "./pages/FAQ.jsx";
import OmOss from "./pages/OmOss.jsx";
import Pamelding from "./pages/Pamelding.jsx";
import Countdown from "./components/Countdown.jsx";

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
        <Navbar />

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

        <InfoBar />

        <div className="page-wrapper" style={{ position: "relative", zIndex: 10 }}>
          <Routes>
            {/* ---------------- Forside / Hjem ---------------- */}
            <Route
              path="/"
              element={
                <div>
                  <div className="hero-header">
                    <div className="logo-top">
                      <img src={logo} alt="Farris Triatlon logo" />
                    </div>
                    <Countdown />
                  </div>

                  <div className="home-container">
                    <div className="home-text">
                      {/* OVERSKRIFT – bold og større kan du styre i CSS (h1) */}
                      <h1>Velkommen til Farris Triatlon 2026!</h1>

                      {/* NØYAKTIG TEKSTEN DU SENDTE – delt i avsnitt for lesbarhet */}
                      <p>
                        Farris Triatlon er et lavterskelarrangement for deg som liker frisk luft, fine folk og en utfordring du kan skryte av resten av året. Her får du nesten olympiske distanser, men med lokal sjarm og null krav om toppform.
                      </p>

                      <p>
                        Vi starter med ca. 1500 meter svømming i Ragnhildrødvannet. Ingen bølger, men kanskje en gjedde som lurer på hva du driver med. Deretter venter omtrent 34 km på sykkel gjennom Oklungen, Langangen og Bjørkedalen. Det blir asfalt, svinger, motbakker og god anledning til å snakke litt høyt med seg selv. Til slutt runder vi av med litt over 10 km løping på asfalt og skogsvei, akkurat passe langt til at du rekker å angre, men ikke lenge nok til at du gir opp.
                      </p>

                      <p>
                        Du kan melde deg på én, to eller alle tre disipliner. Her er det plass til både deg som trener jevnt og deg som tenker "hvor vanskelig kan det være?"
                      </p>

                      <p>
                        Farris Triatlon handler om å stille opp, kjenne på mestringen og ha det skikkelig gøy underveis uansett tempo, form eller erfaring. Det blir selvfølgelig utdeling av medaljer og finisher t-skjorte til alle som fullfører.
                      </p>
                    </div>

                    <div className="home-images">
                      <img src="/images/triatlon1.jpg" alt="Triatlonbilde 1" />
                      <img src="/images/triatlon2.jpg" alt="Triatlonbilde 2" />
                      <img src="/images/triatlon3.jpg" alt="Triatlonbilde 3" />
                    </div>
                  </div>
                </div>
              }
            />

            {/* ---------------- Andre sider ---------------- */}
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

/* -------------------- Navbar -------------------- */
function Navbar() {
  const navItem =
    "hover:text-blue-600 transition-colors duration-200 px-2 py-1";

  const activeStyle = {
    fontWeight: "600",
    color: "#2563eb",
    borderBottom: "2px solid #2563eb",
  };

  return (
    <nav
      className="navbar sticky top-0 z-50 bg-white shadow-md border-b border-gray-100"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255,255,255,0.9)",
      }}
    >
      <ul className="nav-list flex justify-center gap-6 py-3 text-gray-800 font-medium">
        <li>
          <NavLink
            to="/"
            end
            className={navItem}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Hjem
          </NavLink>
        </li>

        <li className="relative group">
          <span className={navItem}>Races ▾</span>
          <ul className="absolute hidden group-hover:block bg-white shadow-lg border border-gray-200 rounded-md mt-2">
            <li>
              <NavLink
                to="/triatlon"
                className="block px-4 py-2 hover:bg-gray-50"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Triatlon
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/akvatlon"
                className="block px-4 py-2 hover:bg-gray-50"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Akvatlon
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/svømming"
                className="block px-4 py-2 hover:bg-gray-50"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Svømming
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/løping"
                className="block px-4 py-2 hover:bg-gray-50"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Løping
              </NavLink>
            </li>
          </ul>
        </li>

        <li>
          <NavLink
            to="/deltakermanual"
            className={navItem}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Deltakermanual
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/løypeprofiler"
            className={navItem}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Løypeprofiler
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/faq"
            className={navItem}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            FAQ
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/om-oss"
            className={navItem}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Om oss
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/påmelding"
            className={navItem}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Påmelding
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
