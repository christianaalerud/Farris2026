import { useState } from "react";

export default function Pamelding() {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const correctPassword = "yousonofabitchimin"; // <- du kan endre dette selv

  // --- Passordkontroll ---
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      setAccessGranted(true);
    } else {
      alert("Feil passord");
    }
  };

  // --- E-postregistrering for nyhetsbrev/passord ---
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    fetch("https://formspree.io/f/xanaynqo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then(() => setSubmitted(true));
  };

  // --- Skjemainnsending (Formspree) ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch("https://formspree.io/f/mblqrnav", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });
    setFormSubmitted(true);
    e.target.reset();
  };

  // ---------- VISNING 1: Låst side ----------
  if (!accessGranted) {
    return (
      <div style={{ maxWidth: "500px", margin: "60px auto", textAlign: "center" }}>
        <h2>Invites only</h2>
        <p>
          Dette arrangementet er kun for inviterte deltakere. Skriv inn e-posten din for å
          motta passord og bli lagt til på nyhetsbrevlisten. 
        </p>

        {submitted ? (
          <p>Takk! Du er registrert. Du vil få passordet tilsendt når påmelding åpner.</p>
        ) : (
          <form onSubmit={handleEmailSubmit} style={{ marginTop: "20px" }}>
            <input
              type="email"
              placeholder="Din e-postadresse"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                maxWidth: "400px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                marginBottom: "12px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "#222",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </form>
        )}

        <hr style={{ margin: "40px 0" }} />

        <form onSubmit={handlePasswordSubmit}>
          <p>Allerede fått passord? Logg inn her:</p>
          <input
            type="password"
            placeholder="Skriv passord"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "100%",
              maxWidth: "400px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#0077cc",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Gå videre
          </button>
        </form>
      </div>
    );
  }

  // ---------- VISNING 2: Påmeldingsskjema etter passord ----------
  if (formSubmitted) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          textAlign: "center",
          lineHeight: "1.6",
        }}
      >
        <h2>Takk for påmeldingen!</h2>
        <p>
          Betalingsinformasjon vil bli sendt på e-post.
          <br />
          Ingen påmeldinger er gyldige før betaling er gjennomført.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        background: "white",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Påmelding – Farris Triatlon 2026
      </h2>

      <form onSubmit={handleFormSubmit}>
        {/* Fullt navn */}
        <label style={{ display: "block", marginBottom: "10px" }}>
          Fullt navn:
          <input
            type="text"
            name="fullt_navn"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "4px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        {/* E-post */}
        <label style={{ display: "block", marginBottom: "10px" }}>
          E-post:
          <input
            type="email"
            name="epost"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "4px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        {/* Kjønn */}
        <label style={{ display: "block", marginBottom: "10px" }}>
          Kjønn:
          <select
            name="kjonn"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "4px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Velg kjønn</option>
            <option value="mann">Mann</option>
            <option value="kvinne">Kvinne</option>
          </select>
        </label>

        {/* Gren */}
        <label style={{ display: "block", marginBottom: "10px" }}>
          Gren:
          <select
            name="gren"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "4px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Velg gren</option>
            <option value="Triatlon">Triatlon</option>
            <option value="Akvatlon">Akvatlon</option>
            <option value="Svømming">Svømming</option>
            <option value="Løping">Løping</option>
          </select>
        </label>

        {/* Klasse */}
        <label style={{ display: "block", marginBottom: "20px" }}>
          Klasse:
          <select
            name="klasse"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "4px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Velg klasse</option>
            <option value="Elite">Elite</option>
            <option value="Mosjonist">Mosjonist</option>
          </select>
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            fontWeight: "600",
            backgroundColor: "#1a1a1a",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Meld meg på
        </button>
      </form>
    </div>
  );
}
