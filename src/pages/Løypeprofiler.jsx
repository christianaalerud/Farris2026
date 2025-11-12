import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import GPX from "react-leaflet-gpx";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Løypeprofiler() {
  return (
    <div className="p-10 bg-white text-black space-y-16">
      {/* Svømming */}
      <Løype
        tittel="Svømming – 1500 m"
        beskrivelse="Start og mål ved Ragnhildrødvannet. Svøm til enden av vannet, rund bøyen og svøm tilbake til der du startet."
        gpxFile="/routes/swim.gpx"
        farge="blue"
      />

      {/* Sykling */}
      <Løype
        tittel="Sykling – 40 km"
        beskrivelse="Kuppert asfalt gjennom Oklungen, Langangen og Bjørkedalen."
        gpxFile="/routes/bike.gpx"
        farge="green"
      />

      {/* Løping */}
      <Løype
        tittel="Løping – 10 km"
        beskrivelse="Løype på asfalt og grusveier i naturskjønne omgivelser forbi Stranda kapell og inn i skogen, før du snur og løper samme vei tilbake."
        gpxFile="/routes/run.gpx"
        farge="red"
      />
    </div>
  );
}

function Løype({ tittel, beskrivelse, gpxFile, farge }) {
  // Demo-data for høydeprofil – erstatt med ekte data fra GPX etterpå
  const elevationData = Array.from({ length: 50 }, (_, i) => ({
    km: i,
    høyde: 50 + Math.sin(i / 5) * 30,
  }));

  return (
    <div className="shadow-lg rounded-2xl p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-2">{tittel}</h2>
      <p className="mb-4 text-gray-700">{beskrivelse}</p>

      {/* Interaktivt kart */}
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
          <GPX file={gpxFile} color={farge} />
        </MapContainer>
      </div>

      {/* Høydeprofil */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={elevationData}>
            <XAxis dataKey="km" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
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

      {/* Nedlastningsknapp */}
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
