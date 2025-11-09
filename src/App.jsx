import { useState } from "react";

const PASSWORD = "yousonofabitchimin";

const sections = [
  "Forside",
  "Triatlon",
  "Akvatlon",
  "Deltakerinfo",
  "Løypeprofiler",
  "Påmelding",
  "Om oss",
];

function Nav({ current, setCurrent }) {
  return (
    <nav className="nav">
      <div className="nav-left">
        <img src="/logo.png" alt="Farris Triatlon logo" className="nav-logo" />
        <span className="nav-title">Farris Triatlon</span>
      </div>
      <div className="nav-links">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setCurrent(s)}
            className={`nav-link ${current === s ? "nav-link-active" : ""}`}
          >
            {s}
          </button>
        ))}
      </div>
    </nav>
  );
}

function PasswordGate({ onSuccess }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("Feil passord. Prøv igjen.");
    }
  }

  return (
    <div className="gate-wrap">
      <div className="gate-card">
        <img src="/logo.png" alt="Farris Triatlon logo" className="gate-logo" />
        <h1 className="gate-title">Farris Triatlon 26´</h1>
        <p className="gate-sub">
          triatlon og akvatlon i fantastisk natur!
        </p>
        <p className="gate-info">Påmelding åpner snart</p>

        <form onSubmit={handleSubmit} className="gate-form">
          <input
            type="password"
            placeholder="Skriv inn passord"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="gate-input"
          />
          <button type="submit" className="gate-button">
            Gå inn
          </button>
        </form>
        {error && <div className="gate-error">{error}</div>}
      </div>
    </div>
  );
}

function SectionWrapper({ title, children }) {
  return (
    <section className="section">
      <h2 className="section-title">{title}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [currentSection, setCurrentSection] = useState("Forside");

  if (!authorized) {
    return <PasswordGate onSuccess={() => setAuthorized(true)} />;
  }

  return (
    <div className="app">
      <Nav current={currentSection} setCurrent={setCurrentSection} />

      <main className="main">
        {currentSection === "Forside" && (
          <SectionWrapper title="Farris Triatlon 26´">
            <p>
              Triatlon og akvatlon i fantastisk natur rundt Farrisvannet.
              Dette er en invite only-opplevelse for hobbymosjonister som liker
              god stemning, en liten dose alvor og mye utsikt.
            </p>
            <p className="mt">
              Påmelding åpner snart – detaljer publiseres her.
            </p>
          </SectionWrapper>
        )}

        {currentSection === "Triatlon" && (
          <SectionWrapper title="Triatlon">
            <p>
              Her kommer info om distanser, starttid, utstyrskrav og regler for
              triatlon-løpet. Du kan senere fylle inn eksakte meter, høydemeter,
              kart og bilder.
            </p>
          </SectionWrapper>
        )}

        {currentSection === "Akvatlon" && (
          <SectionWrapper title="Akvatlon">
            <p>
              For de som vil svømme og løpe uten sykkel. Eget felt, samme gode
              stemning. Legg til detaljer om distanse og løype når dere har
              spikret alt.
            </p>
          </SectionWrapper>
        )}

        {currentSection === "Deltakerinfo" && (
          <SectionWrapper title="Deltakerinfo">
            <ul>
              <li>Oppmøtested og parkering</li>
              <li>Sikkerhetsregler for svømming</li>
              <li>Skiftesoner og merking</li>
              <li>Ansvarsfraskrivelse / deltakererklæring (signeres ved start)</li>
            </ul>
          </SectionWrapper>
        )}

        {currentSection === "Løypeprofiler" && (
          <SectionWrapper title="Løypeprofiler">
            <p>
              Her kan dere legge inn kart, GPX-lenker og høydeprofiler for
              svøm, sykkel og løp. Perfekt å lenke til Strava eller GPX-filer.
            </p>
          </SectionWrapper>
        )}

        {currentSection === "Påmelding" && (
          <SectionWrapper title="Påmelding">
            <p>
              Påmelding åpner snart. Plan:
            </p>
            <ol>
              <li>Vipps til arrangør med navn + distanse.</li>
              <li>Fyll ut enkelt skjema (lenke legges inn her).</li>
            </ol>
          </SectionWrapper>
        )}

        {currentSection === "Om oss" && (
          <SectionWrapper title="Om oss">
            <p>
              Farris Triatlon er arrangert av en gjeng hobbymosjonister som
              liker å lage noe litt for seriøst ut av noe som egentlig bare
              skulle være gøy.
            </p>
            <p className="mt">
              Kontakt: <a href="mailto:post@farristriatlon.com">post@farristriatlon.com</a>
            </p>
          </SectionWrapper>
        )}
      </main>

      <footer className="footer">
        © 2025 Farris Triatlon – Designet med ❤️ av hobbymosjonister
      </footer>
    </div>
  );
}
