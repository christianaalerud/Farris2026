import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Viser GPX-spor på Leaflet-kart
function GPXTrack({ file, color }) {
  const map = useMap();

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((gpxText) => {
        // Leser GPX via leaflet-gpx (som lastes fra CDN i index.html)
        const gpxLayer = new L.GPX(gpxText, {
          async: true,
          polyline_options: {
            color: color,
            weight: 4,
            opacity: 0.9,
          },
        })
          .on("loaded", (e) => {
            map.fitBounds(e.target.getBounds());
          })
          .addTo(map);

        return () => map.removeLayer(gpxLayer);
      });
  }, [file, color, map]);

  return null;
}

// Hovedside med alle løypene
export default function Løypeprofiler() {
  return (
    <div className="p-10 bg-white text-black space-y-16">
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
        beskrivelse="Løype på asfalt og grusveier i naturskjønne omgivelser rundt Farris."
        gpxFile="/routes/run.gpx"
        farge="red"
      />
    </div>
  );
}

// Komponent for én løype
function Løype({ tittel, beskrivelse, gpxFile, farge }) {
  const [elevationData, setElevationData] = useState([]);
  const [stats, setStats] = useState({ dist: 0, climb: 0, max: 0 });

  useEffect(() => {
    fetch(gpxFile)
      .then((res) => res.text())
      .then((xmlText) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");
        const pts = xml.getElementsByTagName("trkpt");

        const points = [];
        let totalDistance = 0;
        let totalClimb = 0;
        let lastLat = null;
        let lastLon = null;
        let lastEle = null;
        let maxEle = 0;

        for (let i = 0; i < pts.length; i++) {
          const lat = parseFloat(pts[i].getAttribute("lat"));
          const lon = parseFloat(pts[i].getAttribute("lon"));
          const ele = parseFloat(pts[i].getElementsByTagName("ele")[0]?.textContent || 0);

          if (lastLat !== null && lastLon !== null) {
            const R = 6371; // Jordens radius i km
            const dLat = ((lat - lastLat) * Math.PI) / 180;
            const dLon = ((lon - lastLon) * Math.PI) / 180;
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos((lastLat * Math.PI) / 180) *
                Math.cos((lat * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const dist = R * c;
            totalDistance += dist;

            if (lastEle !== null && ele > lastEle) {
              totalClimb += ele - lastEle;
            }
          }

          if (ele > maxEle) maxEle = ele;
          points.push({ km: totalDistance, høyde: ele });
          lastLat = lat;
          lastLon = lon;
          lastEle = ele;
        }

        setElevationData(points);
        setStats({
          dist: totalDistance,
          climb: totalClimb,
          max: maxEle,
        });
      });
  }, [gpxFile]);

  return (
    <div className="shadow-lg rounded-2xl p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-2">{tittel}</h2>
      <p className="mb-4 text-gray-700">{beskrivelse}</p>

      {/* Kart */}
      <div className="rounded-lg overflow-hidden shadow-sm mb-6">
        <MapContainer
          style={{ height: "350px", width: "100%" }}
          center={[59.1, 10.0]}
          zoom={12}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GPXTrack file={gpxFile} color={farge} />
        </MapContainer>
      </div>

      {/* Høydeprofil */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={elevationData}>
            <XAxis
              dataKey="km"
              tick={{ fontSize: 12 }}
              label={{ value: "km", position: "insideBottomRight", offset: -5 }}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              label={{
                value: "høyde (m)",
                angle: -90,
                position: "insideLeft",
                offset: 5,
              }}
            />
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

      {/* Stats under grafen */}
      <div className="flex justify-between text-sm text-gray-600 mt-2">
        <span>Distanse: {stats.dist.toFixed(1)} km</span>
        <span>Stigning: {Math.round(stats.climb)} m</span>
        <span>Maks høyde: {Math.round(stats.max)} m</span>
      </div>

      {/* Last ned-knapp */}
      <div className="mt-4">
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
