export default function Pamelding() {
  return (
    <div
      style={{
        padding: "60px 20px",
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h2>Påmelding</h2>
      <p>
        Meld deg på Farris Triatlon her! Informasjonen lagres sikkert via
        Formspree, og du får bekreftelse på e-post.
      </p>

      <form
        action="https://formspree.io/f/melddegpa123" // ← BYTT ut denne med din egen Formspree-URL
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "30px",
        }}
      >
        <input
          type="text"
          name="navn"
          placeholder="Fullt navn"
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <input
          type="email"
          name="epost"
          placeholder="E-postadresse"
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <input
          type="tel"
          name="telefon"
          placeholder="Telefonnummer (valgfritt)"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <textarea
          name="melding"
          placeholder="Evt. melding eller klasse du ønsker å delta i"
          rows="4"
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <label style={{ fontSize: "14px", textAlign: "left" }}>
          <input type="checkbox" required /> Jeg samtykker til at mine
          opplysninger brukes for påmelding til Farris Triatlon.
        </label>
        <button
          type="submit"
          style={{
            background: "black",
            color: "white",
            padding: "12px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Send påmelding
        </button>
      </form>
    </div>
  );
}

