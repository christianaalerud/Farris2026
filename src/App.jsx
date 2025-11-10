import { useState } from "react";

const logo = "/logo2.png"; // hentes fra public/

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [racesOpen, setRacesOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "yousonofabitchimin") {
      setAccessGranted(true);

      // Oppdater faneikon og tittel
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

  // -------- FORSIDE --------
  if (!accessGranted) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
        {/* Logo i midten */}
        <img
          src={logo}
          alt="Farris Triatlon Logo"
          className="w-72 md:w-96 object-contain"
        />

        {/* Passordfelt oppå logo */}
        <form
          onSubmit={handleSubmit}
          className="absolute inset-0 flex items-center justify-center"
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-b border-gray-400 text-black text-center text-lg outline-none placeholder-gray-400"
          />
        </form>

        {/* invites only */}
        <p
          className="absolute text-black font-bold text-4xl left-10"
          style={{ bottom: "5cm" }}
        >
          invites only
        </p>
      </div>
    );
  }

  // -------- HOVEDSIDE --------
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar racesOpen={racesOpen} setRacesOpen={setRacesOpen} />

      {/* Bakgrunnslogo */}
      <img
        src={logo}
        alt="Bakgrunnslogo"
        className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none select-none"
      />

      {/* Innhold midt på */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-gray-800">
        <h1 className="text-5xl md:text-6xl font-light tracking-wide">
          Farris Triatlon
        </h1>
        <p className="mt-4 text-lg text-gray-600">Velkommen</p>
      </div>
    </div>
  );
}

// -------- NAVBAR --------
function Navbar({ racesOpen, setRacesOpen }) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 relative z-20">
      <ul className="flex justify-center space-x-10 py-4 text-gray-800 font-medium">
        {/* Klikkbar Races */}
        <li
          className="cursor-pointer relative select-none"
          onClick={() => setRacesOpen(!racesOpen)}
        >
          Races ▾
          {racesOpen && (
            <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-100">
              {["Triatlon", "Akvatlon", "Svømming", "Løping"].map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 whitespace-nowrap hover:bg-gray-100 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="cursor-pointer hover:text-gray-500">Deltakermanual</li>
        <li className="cursor-pointer hover:text-gray-500">Løypeprofiler</li>
        <li className="cursor-pointer hover:text-gray-500">FAQ</li>
        <li className="cursor-pointer hover:text-gray-500">Om oss</li>
      </ul>
    </nav>
  );
}
