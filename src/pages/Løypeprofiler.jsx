import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function GPXTrack({ file, color }) {
  const map = useMap();

  useEffect(() => {
    let gpxLayer;

    if (!L.GPX) {
      console.warn("Leaflet-GPX mangler – sjekk index.html import");
      return;
    }

    fetch(file)
      .then((res) => res.text())
      .then((gpxText) => {
        gpxLayer = new L.GPX(gpxText, {
          async: true,
          marker_options: { startIconUrl: null, endIconUrl: null, shadowUrl: null },
          polyline_options: { color, weight: 4, opacity: 0.9 },
        })
          .on("loaded", (e) => map.fitBounds(e.target.getBounds()))
          .addTo(map);
      });

    return () => gpxLayer && map.removeLayer(gpxLayer);
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
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    fetch(gpxFile)
      .then((res) => res.text())
      .then((xmlText) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "text/xml");
        const pts = xml.getElementsByTagName("trkpt");
        if (!pts.length) {
          console.warn("Ingen trkpt i", gpxFile);
          return;
        }

        const points = [];
        let dist = 0, climb = 0, lastLat = null, lastLon = null, lastEle = null, maxEle = 0;

        for (let i = 0; i < pts.length; i++) {
          const lat = parseFloat(pts[i].getAttribute("lat"));
          const lon = parseFloat(pts[i].getAttribute("lon"));
          const ele = parseFloat(pts[i].getElementsByTagName("ele")[0]?.textContent || 0);

          if (lastLat !== null) {
            const R = 6371;
            const dLat = ((lat - lastLat) * Math.PI) / 180;
            const dLon = ((lon - lastLon) * Math.PI) / 180;
            const a =
              Math.sin(dLat / 2) ** 2 +
              Math.cos((lastLat * Math.PI) / 180) *
                Math.cos((lat * Math.PI) / 180) *
                Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            dist += R * c;
            if (lastEle && ele > lastEle) climb += ele - lastEle;
          }

          if (ele > maxEle) maxEle = ele;
          points.push({ km: dist, høyde: ele });
          lastLat = lat;
          lastLon = lon;
          lastEle = ele;
        }

        setElevationData(points);
        setStats({ dist, climb, max: maxEle });
      });
  }, [gpxFile]);

  const enableInteraction = () => setInteractive(true);
  const disableInteraction = () => setInteractive(false);

  return (
    <div className="shadow-lg rounded-2xl p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-2">{tittel}</h2>
      <p className="mb-4 text-gray-700">{beskrivelse}</p>

      <div
        className="rounded-lg overflow-hidden shadow-sm mb-6 relative"
        onMouseLeave={disableInteraction}
      >
        {!interactive && (
          <div
            onClick={enableInteraction}
            className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center cursor-pointer text-sm text-gray-700 z-[1000]"
          >
            Klikk for å aktivere kart
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
          <GPXTrack file={gpxFile} color={farge} />
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
