import { useState } from "react";

export default function Pamelding() {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const correctPassword = "yousonofabitchimin"; // <- du kan endre dette selv

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (enteredPassword === correctPassword) {
      setAccessGranted(true);
    } else {
      alert("Feil passord");
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Send e-post til Formspree (enkelt)
    fetch("https://formspree.io/f/xanaynqo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then(() => setSubmitted(true));
  };

  // Hvis riktig passord:
  if (accessGranted) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Påmelding åpnet</h2>
        <p>
          Her kan du fylle ut påmeldingsskjemaet (du kan legge inn Google Form,
          Stripe-betaling eller lignende her).
        </p>
      </div>
    );
  }

  // Ellers: vis låst side
  return (
    <div style={{ maxWidth: "500px", margin: "60px auto", textAlign: "center" }}>
      <h2>Invites only</h2>
      <p>
        Dette arrangementet er for inviterte deltakere. Skriv inn e-posten din for å
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
