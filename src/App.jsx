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

  if (!accessGranted) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-white">
        {/* Logo */}
        <img
          src={logo}
          alt="Farris Triatlon"
          className="absolute w-80 md:w-[28rem]"
        />

        {/* Passordfelt midt over logo */}
        <form
          onSubmit={handleSubmit}
          className="absolute flex flex-col items-center justify-center"
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-transparent border-b border-gray-500 text-black text-center text-xl outline-none placeholder-gray-400"
          />
        </form>

        {/* invites only */}
        <p
          className="absolute text-black font-bold text-5xl"
          style={{ bottom: "5cm", left: "4rem" }}
        >
          invites only
        </p>
      </div>
    );
  }

  // ---------- Hovedside ----------
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar showRaces={showRaces} setShowRaces={setShowRaces} />

      {/* Bakgrunnslogo */}
      <img
        src={logo}
        alt="Farris Triatlon bakgrunnslogo"
        className="absolute inset-0 w-full h-full object-contain opacity-10 select-none pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-gray-800">
        <h1 className="text-5xl font-light tracking-wide">Farris Triatlon</h1>
        <p className="mt-4 text-lg text-gray-600">Velkommen</p>
      </div>
    </div>
  );
}

function Navbar({ showRaces, setShowRaces }) {
  return (
    <nav className="relative z-20 w-full bg-white border-b border-gray-200">
      <ul className="flex justify-center space-x-10 py-4 text-gray-800 font-medium">
        <li
          className="relative cursor-pointer select-none"
          onClick={() => setShowRaces(!showRaces)}
        >
          Races ▾
          {showRaces && (
            <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-100">
              {["Triatlon", "Akvatlon", "Svømming", "Løping"].map((item) => (
                <li
                  key={item}
                  className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap cursor-pointer"
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
