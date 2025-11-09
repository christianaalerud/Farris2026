import { useState } from "react";

const PASSWORD = "yousonofabitchimin";

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim() === PASSWORD) {
      setAuthorized(true);
    } else {
      setError("Feil passord");
    }
  }

 if (!authorized) {
  return (
    <div className="gate-wrap">
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Passord"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="gate-input"
        />
        {error && <p className="gate-error">{error}</p>}
      </form>
    </div>
  );
}


  return (
    <div className="app">
      <header className="header">
        <h1>Farris Triatlon 26´</h1>
        <p>Triatlon og akvatlon i fantastisk natur!</p>
      </header>
      <main className="main">
        <section>
          <h2>Påmelding åpner snart</h2>
          <p>Mer informasjon kommer – følg med!</p>
        </section>
      </main>
      <footer className="footer">
        © 2025 Farris Triatlon – Designet med ❤️ av hobbymosjonister
      </footer>
    </div>
  );
}
