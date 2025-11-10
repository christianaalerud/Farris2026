import { useState } from "react";

const logo = "/logo2.png"; // ligger i public/

export default function App() {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [racesOpen, setRacesOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === "yousonofabitchimin") {
      setAccessGranted(true);
      document.title = "Farris Triatlon";
      const link =
        document.querySelector("link[rel~='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = logo;
      document.head.appendChild(link);
    } else alert("Wrong password");
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
          overflow: "hidden",
        }}
      >
        {/* Logo */}
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

        {/* Passordfelt */}
        <form
          onSubmit={handleSubmit}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 20%)",
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

        {/* invites only */}
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
  invites only
</p>

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
      <Navbar racesOpen={racesOpen} setRacesOpen={setRacesOpen} />

      {/* Gjennomsiktig logo */}
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

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          color: "#333",
        }}
      >
        <h1 style={{ fontSize: "56px", fontWeight: "300" }}>Farris Triatlon</h1>
        <p style={{ marginTop: "16px", fontSize: "20px", color: "#555" }}>
          Velkommen
        </p>
        </div>
    </div>
  ); // lukker return-blokken i App
} // lukker selve App-funksjonen

// ---------- NAVBAR ----------
function Navbar({ racesOpen, setRacesOpen }) {
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
                listStyle: "none",
                padding: 0,
                margin: 0,
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
                  onMouseOver={(e) => (e.target.style.background = "#f3f3f3")}
                  onMouseOut={(e) => (e.target.style.background = "white")}
                >
                  {r}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li style={{ cursor: "pointer" }}>Deltakermanual</li>
        <li style={{ cursor: "pointer" }}>Løypeprofiler</li>
        <li style={{ cursor: "pointer" }}>FAQ</li>
        <li style={{ cursor: "pointer" }}>Om oss</li>
      </ul>
    </nav>
  );
}
