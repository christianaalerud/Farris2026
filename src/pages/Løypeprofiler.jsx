import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import GPXParser from "gpxparser";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Hjelpekomponent: laster og viser GPX-rute på Leaflet-kart
function GPXTrack({ file, color }) {
  const map = useMap();

  useEffect(() => {
    fetch(file)
      .then((res) => res.text())
      .then((gpxText) => {
        // Leaflet-GPX lastes fra CDN (må være inkludert i index.html)
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

function Løype({ tittel, beskrivelse, gpxFile, farge }) {
  const [elevationData, setElevationData] = useState([]);

  useEffect(() => {
    fetch(gpxFile)
      .then((res) => res.text())
      .then((xmlText) => {
        const parser = new GPXParser();
        parser.parse(xmlText);
        const track = parser.tracks[0];
        if (!track) return;

        // Beregn høydeprofil (høyde + distanse)
        const points = track.points.map((p, i) => ({
          km: (i / track.points.length) * (track.distance.total / 1000),
          høyde: p.ele,
        }));
        setElevationData(points);
      });
  }, [gpxFile]);

  return (
    <div className="shadow-lg rounded-2xl p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-2">{tittel}</h2>
      <p className="mb-4 text-gray-700">{beskrivelse}</p>

      {/* Kartvisning */}
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

      {/* Nedlastning */}
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
