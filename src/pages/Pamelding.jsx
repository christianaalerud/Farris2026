import { useState } from "react";

export default function Pamelding() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // Send dataen trygt til Formspree
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setSubmitted(true);
      form.reset();
    } else {
      alert("Noe gikk galt, prøv igjen senere.");
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          padding: "80px 20px",
          textAlign: "center",
          color: "#222",
        }}
      >
        <h2>Takk for påmeldingen!</h2>
        <p>
          Vi har mottatt informasjonen din, og du vil snart få en bekreftelse på
          e-post.
        </p>
        <p>Vi gleder oss til å se deg ved Farris Triatlon!</p>
      </div>
    );
  }

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
        onSubmit={handleSubmit}
        action="https://formspree.io/f/mblqrnav"
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
        <textarea
          name="melding"
          placeholder="Evt. melding, klasse eller annen informasjon"
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
