import { useState } from "react";

const logo = "/logo2.png"; // ligger i public/

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");
  const [racesOpen, setRacesOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "yousonofabitchimin") {
      setAccessGranted(true);

      // Oppdater fanetittel og ikon
      document.title = "Farris Triatlon";
      const link =
        document.querySelector("link[rel~='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = logo;
      document.getElementsByTagName("head")[0].appendChild(link);
    } else {
      alert("Wrong password");
    }
  };

  // ---- FORSIDE ----
  if (!accessGranted) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-white">
        {/* Logo */}
        <img
          src={logo}
          alt="Farris Triatlon Logo"
          className="w-72 md:w-96 object-contain"
        />

        {/* Passordfelt flytende over logo */}
        <form
          onSubmit={handleSubmit}
          className="absolute top-1/2 transform -translate-y-1/2"
        >
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border-b border-gray-400 text-black text-center text-lg outline-none placeholder-gray-400"
          />
        </form>

        {/* Invites only */}
        <p
          className="absolute left-10 text-black font-bold text-3xl opacity-90"
          style={{ bottom: "5cm" }}
        >
          invites only
        </p>
      </div>
    );
  }

  // ---- HOVEDSIDE ----
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar racesOpen={racesOpen} setRacesOpen={setRacesOpen} />
      <img
        src={logo}
        alt="Background logo"
        className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none select-none"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-gray-800">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide">
          Farris Triatlon
        </h1>
        <p className="mt-4 text-lg text-gray-600">Velkommen</p>
      </div>
    </div>
  );
}

// ---- NAVBAR ----
function Navbar({ racesOpen, setRacesOpen }) {
  return (
    <nav className="w-full bg-white border-b border-gray-200 relative z-20">
      <ul className="flex justify-center space-x-8 py-4 text-gray-800 font-medium">
        <li
          className="cursor-pointer relative select-none"
          onClick={() => setRacesOpen(!racesOpen)}
        >
          Races ▾
          {racesOpen && (
            <ul className="absolute bg-white shadow-lg mt-2 rounded-lg border border-gray-100">
              {["Triatlon", "Akvatlon", "Svømming", "Løping"].map((race) => (
                <li
                  key={race}
                  className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
                >
                  {race}
                </li>
              ))}
            </ul>
          )}
        </li>
        <li className="cursor-pointer hover:text-gray-500">Deltakermanual</li>
        <li className="cursor-pointer hover:text-gray-500">Løypeprofiler</li>
        <li className="cursor-pointer hover:text-gray-500">FAQ</li>
        <li className="cursor-pointer hover:text-gray-500">Om oss</li>
      </ul
