import { useState } from "react";
import logo from "/logo2.png";

export default function App() {
  const [accessGranted, setAccessGranted] = useState(false);
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "yousonofabitchimin") {
      setAccessGranted(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!accessGranted) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-white">
        <img
          src={logo}
          alt="Farris Triatlon Logo"
          className="w-72 md:w-96 opacity-100"
        />
        <form onSubmit={handleSubmit} className="mt-10">
          <input
            type="password"
            placeholder="Password"
            className="border-b border-gray-400 bg-transparent text-black text-center outline-none text-lg placeholder-gray-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        <p className="absolute bottom-5 left-5 text-black text-sm opacity-70">
          invites only
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      <Navbar />
      <img
        src={logo}
        alt="Background logo"
        className="absolute inset-0 w-full h-full object-contain opacity-10 pointer-events-none select-none"
      />
      <div className="relative z-10 flex flex-col items-center justify-center h-[80vh] text-gray-800">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide">
          Farris Triatlon
        </h1>
        <p className="mt-4 text-lg text-gray-600">Velkommen til hovedsiden</p>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 relative z-20">
      <ul className="flex justify-center space-x-8 py-4 text-gray-800 font-medium">
        <li className="group relative cursor-pointer">
          Races
          <ul className="absolute hidden group-hover:block bg-white shadow-lg mt-2 rounded-lg">
            {["Triatlon", "Akvatlon", "Svømming", "Løping"].map((race) => (
              <li
                key={race}
                className="px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
              >
                {race}
              </li>
            ))}
          </ul>
        </li>
        <li className="cursor-pointer hover:text-gray-500">Deltakermanual</li>
        <li className="cursor-pointer hover:text-gray-500">Løypeprofiler</li>
        <li className="cursor-pointer hover:text-gray-500">FAQ</li>
        <li className="cursor-pointer hover:text-gray-500">Om oss</li>
      </ul>
    </nav>
  );
}
