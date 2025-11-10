import { useState } from "react";

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


const logo = "/logo2.png";

export default function App() {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [racesOpen, setRacesOpen] = useState(false);
  const [page, setPage] = useState("home");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === "yousonofabitchimin") {
      setAccessGranted(true);
      document.title = "Farris Triatlon";
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = logo;
    } else {
      alert("Wrong password");
    }
  };

  // ---------- FORSIDE ----------
  if (!accessGranted) {
    return (
      <div
        style={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          backgroundColor: "white",
        }}
      >
        <img
          src={logo}
          alt="Farris Triatlon logo"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "420px",
            transform: "translate(-50%, -60%)",
          }}
        />

        <form
          onSubmit={handleSubmit}
          style={{
            position: "absolute",
            top: "calc(50% + 5cm)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: "2px solid #888",
              textAlign: "center",
              fontSize: "18px",
              outline: "none",
              color: "#000",
            }}
          />
        </form>

        <p
          style={{
            position: "absolute",
            left: "40px",
            bottom: "5cm",
            fontWeight: "900",
            fontSize: "70px",
            WebkitTextStroke: "2px black",
            color: "transparent",
          }}
        >
          Invites only
        </p>
      </div>
    );
  }

  // ---------- HOVEDSIDE ----------
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Navbar
        racesOpen={racesOpen}
        setRacesOpen={setRacesOpen}
        setPage={setPage}
      />

<img
  src={logo}
  alt="Background logo"
  style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    maxWidth: "800px",
    opacity: 0.1,
    pointerEvents: "none",
  }}
/>

     <InfoBar />  

      <div style={{ position: "relative", zIndex: 10 }}>
 {page === "home" && (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      maxWidth: "1200px",
      margin: "80px auto",
      padding: "0 20px",
      position: "relative",
      zIndex: 10,
    }}
  >
    {/* VENSTRE SIDE – TEKST */}
    <div style={{ flex: "1 1 60%", paddingRight: "40px" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Velkommen til Farris Triatlon 2026!
      </h1>
      <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#333" }}>
       Farris Triatlon er et lavterskelarrangement for deg som liker frisk luft, 
       fine folk og en utfordring du kan skryte av resten av året. Her får du nesten 
       olympiske distanser, men med lokal sjarm og null krav om toppform.

      </p>
      <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#333" }}>
        Vi starter med ca. 1500 meter svømming i Ragnhildrødvannet. 
        Ingen bølger, men kanskje en gjedde som lurer på hva du driver med.
        Deretter venter omtrent 40 km på sykkel gjennom Oklungen, Langangen og Bjørkedalen. 
        Det blir asfalt, svinger, motbakker og god anledning til å snakke litt høyt med seg selv. 
        Til slutt runder vi av med litt over 10 km løping på asfalt og skogsvei, akkurat passe 
        langt til at du rekker å angre, men ikke lenge nok til at du gir opp.
        Du kan melde deg på én, to eller alle tre disipliner. Her er det plass til både 
        deg som trener jevnt og deg som tenker "hvor vanskelig kan det være?"

  <p style={{ fontSize: "18px", lineHeight: "1.6", color: "#333" }}>
        Farris Triatlon handler om å stille opp, kjenne på mestringen og ha det skikkelig gøy underveis 
        uansett tempo, form eller erfaring. Det blir selvfølgelig utdeling av medaljer og 
        finisher t-skjorte til alle som fullfører.
      </p>
    </div>

    {/* HØYRE SIDE – BILDER */}
    <div
      style={{
        flex: "1 1 35%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <img
        src="/images/triatlon1.jpg"
        alt="Triatlonbilde 1"
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <img
        src="/images/triatlon2.jpg"
        alt="Triatlonbilde 2"
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <img
        src="/images/triatlon3.jpg"
        alt="Triatlonbilde 3"
        style={{ width: "100%", borderRadius: "12px" }}
      />
    </div>
  </div>
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
  );
}

// ---------- NAVBAR ----------
function Navbar({ racesOpen, setRacesOpen, setPage }) {
  return (
    <nav
      style={{
        width: "100%",
        background: "white",
        borderBottom: "1px solid #ddd",
        position: "relative",
        zIndex: 20,
      }}
    >
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          listStyle: "none",
          padding: "16px",
          margin: 0,
          fontWeight: 500,
        }}
      >
        <li style={{ cursor: "pointer" }} onClick={() => setPage("home")}>
  Hjem
</li>
        <li
          style={{ cursor: "pointer", position: "relative" }}
          onClick={() => setRacesOpen(!racesOpen)}
        >
          Races ▾
          {racesOpen && (
            <ul
              style={{
                position: "absolute",
                left: 0,
                top: "100%",
                background: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderRadius: "6px",
                padding: 0,
                margin: 0,
                listStyle: "none",
              }}
            >
              {["Triatlon", "Akvatlon", "Svømming", "Løping"].map((r) => (
                <li
                  key={r}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                  onClick={() => {
                    setPage(r);
                    setRacesOpen(false);
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#f3f3f3")}
                  onMouseOut={(e) => (e.target.style.background = "white")}
                >
                  {r}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => setPage("Deltakermanual")}>
          Deltakermanual
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => setPage("Løypeprofiler")}>
          Løypeprofiler
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => setPage("FAQ")}>
          FAQ
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => setPage("Om oss")}>
          Om oss
        </li>
        <li style={{ cursor: "pointer" }} onClick={() => setPage("Påmelding")}>
  Påmelding
</li>
      </ul>
    </nav>
  );
}
