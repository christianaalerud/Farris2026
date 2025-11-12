import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function GPXTrack({ file, color, onLoaded }) {
  const map = useMap();

  useEffect(() => {
    let gpxLayer;

    async function init() {
      // 1. Vent til leaflet-gpx er lastet
      if (!L.GPX) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet-gpx@1.7.0/gpx.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      // 2. Hent selve GPX-fila
      const res = await fetch(file);
      const text = await res.text();

      // 3. Tegn ruten i kartet
      gpxLayer = new L.GPX(text, {
        async: true,
        marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null },
        polyline_options: { color, weight: 4, opacity: 0.9 },
      })
        .on("loaded", (e) => {
          map.fitBounds(e.target.getBounds());
          if (onLoaded) onLoaded(e.target);
        })
        .addTo(map);
    }

    init().catch((err) => console.error("Feil ved lasting av GPX:", err));
    return () => {
      if (gpxLayer) map.removeLayer(gpxLayer);
    };
  }, [file, color, map]);

  return null;
}

export default function Løypeprofiler() {
  return (
    <div className="p-10 bg-white text-black space-y-20">
      <Løype
        tittel="Svømming – 1500 m"
        beskrivelse="Start og mål ved Ragnhildrødvannet. En runde på 750 m svømmes to ganger."
        gpxFile="/routes/swim.gpx"
        farge="blue"
      />

      <Løype
        tittel="Sykling – 40 km"
        beskrivelse="Asfalt og kupert terreng gjennom Oklungen, Langangen og Bjørkedalen."
        gpxFile="/routes/bike.gpx"
        farge="green"
      />

      <Løype
        tittel="Løping – 10 km"
        beskrivelse="Asfalt og grusveier i naturskjønne omgivelser rundt Farris."
        gpxFile="/routes/run.gpx"
        farge="red"
      />
    </div>
  );
}

function Løype({ tittel, beskrivelse, gpxFile, farge }) {
  const [elevationData, setElevationData] = useState([]);
  const [stats, setStats] = useState({ dist: 0, climb: 0, max: 0 });
  const [loading, setLoading] = useState(true);
  const [interactive, setInteractive] = useState(false);

  function handleLoaded(layer) {
    setLoading(false);
  }

  useEffect(() => {
    // Les høydeprofil og beregn statistikk
    fetch(gpxFile)
      .then((res) => res.text())
      .then((xmlText) => {
        const xml = new DOMParser().parseFromString(xmlText, "text/xml");
        const pts = xml.getElementsByTagName("trkpt");
        if (!pts.length) return;

        const data = [];
        let totalDist = 0,
          totalClimb = 0,
          maxEle = 0;
        let lastLat, lastLon, lastEle;

        for (let i = 0; i < pts.length; i++) {
          const lat = parseFloat(pts[i].getAttribute("lat"));
          const lon = parseFloat(pts[i].getAttribute("lon"));
          const ele = parseFloat(
            pts[i].getElementsByTagName("ele")[0]?.textContent || 0
          );

          if (lastLat != null) {
            const R = 6371;
            const dLat = ((lat - lastLat) * Math.PI) / 180;
            const dLon = ((lon - lastLon) * Math.PI) / 180;
            const a =
              Math.sin(dLat / 2) ** 2 +
              Math.cos((lastLat * Math.PI) / 180) *
                Math.cos((lat * Math.PI) / 180) *
                Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const dist = R * c;
            totalDist += dist;
            if (ele > lastEle) totalClimb += ele - lastEle;
          }

          maxEle = Math.max(maxEle, ele);
          data.push({ km: totalDist, høyde: ele });
          lastLat = lat;
          lastLon = lon;
          lastEle = ele;
        }

        setElevationData(data);
        setStats({
          dist: totalDist,
          climb: totalClimb,
          max: maxEle,
        });
      });
  }, [gpxFile]);

  return (
    <div className="shadow-lg rounded-2xl p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-2">{tittel}</h2>
      <p className="mb-4 text-gray-700">{beskrivelse}</p>

      <div
        className="rounded-lg overflow-hidden shadow-sm mb-6 relative"
        onMouseLeave={() => setInteractive(false)}
      >
        {!interactive && (
          <div
            onClick={() => setInteractive(true)}
            className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center cursor-pointer text-sm text-gray-700 z-[1000]"
          >
            Klikk for å aktivere kart
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-[999] text-gray-600 text-sm">
            Laster løype…
          </div>
        )}

        <MapContainer
          style={{ height: "450px", width: "100%" }}
          center={[59.1, 10.0]}
          zoom={12}
          dragging={interactive}
          scrollWheelZoom={interactive}
          doubleClickZoom={interactive}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GPXTrack file={gpxFile} color={farge} onLoaded={handleLoaded} />
        </MapContainer>
      </div>

      <div className="flex justify-between text-sm text-gray-600 mt-2 mb-4">
        <span>Distanse: {stats.dist.toFixed(1)} km</span>
        <span>Stigning: {Math.round(stats.climb)} m</span>
        <span>Maks høyde: {Math.round(stats.max)} m</span>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={elevationData}>
            <XAxis dataKey="km" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                fontSize: "12px",
                background: "white",
                border: "1px solid #ccc",
              }}
            />
            <Line
              type="monotone"
              dataKey="høyde"
              stroke={farge}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-5">
        <a
          href={gpxFile}
          download
          className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Last ned GPX-fil
        </a>
      </div>
    </div>
  );
}
