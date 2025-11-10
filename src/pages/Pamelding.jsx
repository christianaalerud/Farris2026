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
        Meld deg på Farris Triatlon her! Informasjonen sendes trygt via
        Formspree, og du får bekreftelse på e-post.
      </p>

      <form
        action="https://formspree.io/f/mblqrnav" // 
        method="POST"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          marginTop: "30px",
        }}
      >
        {/* Navn */}
        <input
          type="text"
          name="navn"
          placeholder="Fullt navn"
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />

        {/* E-post */}
        <input
          type="email"
          name="epost"
          placeholder="E-postadresse"
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />

        {/* Telefon */}
        <input
          type="tel"
          name="telefon"
          placeholder="Telefonnummer (valgfritt)"
          style={{ padding: "10px", fontSize: "16px" }}
        />

        {/* Konkurransetype */}
        <select
          name="konkurranse"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            background: "white",
            border: "1px solid #ccc",
          }}
        >
          <option value="">Velg konkurranse</option>
          <option value="Triatlon">Triatlon</option>
          <option value="Akvatlon">Akvatlon</option>
          <option value="Svømming">Svømming</option>
          <option value="Løping">Løping</option>
        </select>

        {/* Melding */}
        <textarea
          name="melding"
          placeholder="Evt. melding, klasse, eller annen informasjon"
          rows="4"
          style={{ padding: "10px", fontSize: "16px" }}
        />

        {/* Samtykke */}
        <label style={{ fontSize: "14px", textAlign: "left" }}>
          <input type="checkbox" required /> Jeg samtykker til at mine
          opplysninger brukes for påmelding til Farris Triatlon.
        </label>

        {/* Send-knapp */}
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
