import { useState } from "react";

const logo = "/logo2.png"; // fra public/

export default function App() {
  const [password, setPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [showRaces, setShowRaces] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.trim() === "yousonofabitchimin") {
      setAccessGranted(true);

      // Sett tittel og favicon når man er inne
      if (typeof document !== "undefined") {
        document.title = "Farris Triatlon";
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.head.appendChild(link);
        }
        link.href = logo;
      }
    } else {
      alert("Wrong password");
    }
  };

  // ---------- FORSIDE MED PASSORD ----------
  if (!accessGranted) {
    return (
      <div className="relative min-h-screen bg-white flex items-center justify-center">
        {/* Wrapper som sentrerer logo og passordfelt */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={logo}
            alt="Farris Triatlon Logo"
            className="w-72 md:w-96 object-contain mb-6"
          />
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-transparent border-b border-gray-500 text-black text-center text-xl outline-none placeholder-gray-400"
            />
          </form>
        </div>

        {/* invites only: venstre, ca 5cm opp, stor og bold */}
        <p
          className="absolute text-black font-bold text-5xl"
          style={{ left: "40px", bottom: "5cm" }}
        >
          invites only
        </p>
      </div>
    );
  }

  // ---------- HOVEDSIDE ----------
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar showRaces={showRaces} setShowRaces={setShowRaces} />

      {/* Watermark-logo midt i bakgrunnen */}
      <div className="pointer-events-none select-none fixed inset-0 flex items-center justify-center -z-10">
        <img
          src={logo}
          alt="Farris Triatlon watermark"
          className="w-[60vw] max-w-[800px] opacity-10"
        />
      </div>

      {/* Innhold */}
      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-gray-800">
        <h1 className="text-5xl md:text-6xl font-light tracking-wide">
          Farris Triatlon
        </h1>
        <p className="mt-4 text-lg text-gray-600">Velkommen</p>
      </div>
    </div>
  );
}

// ---------- NAVBAR ----------
function Navbar({ showRaces, setShowRaces }) {
  return (
    <nav className="relative z-20 w-full bg-white border-b border-gray-200">
      <ul className="flex justify-center space-x-10 py-4 text-gray-800 font-medium">
        {/* Races med klikkbare underfaner */}
        <li
          className="relative cursor-pointer select-none"
          onClick={() => setShowRaces((open) => !open)}
        >
          Races ▾
          {showRaces && (
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
