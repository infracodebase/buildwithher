import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Country → coordinates lookup
const countryCoords: Record<string, [number, number]> = {
  "Nigeria": [9.082, 8.675],
  "Kenya": [-1.292, 36.822],
  "United States": [37.09, -95.713],
  "India": [20.594, 78.963],
  "Germany": [51.166, 10.452],
  "South Africa": [-30.56, 22.938],
  "United Kingdom": [55.378, -3.436],
  "Canada": [56.13, -106.347],
  "Ghana": [7.947, -1.023],
  "DR Congo": [-4.038, 21.759],
  "Australia": [-25.274, 133.775],
  "Singapore": [1.352, 103.82],
  "Portugal": [39.399, -8.225],
  "Ethiopia": [9.145, 40.49],
  "Cameroon": [7.37, 12.354],
};

interface GlobalMapProps {
  builders?: { country: string; name: string }[];
}

const GlobalMap = ({ builders }: GlobalMapProps) => {
  // Cluster builders by country
  const clusters = useMemo(() => {
    const map = new Map<string, string[]>();
    const source = builders || [];
    for (const b of source) {
      if (!b.country) continue;
      const list = map.get(b.country) || [];
      list.push(b.name);
      map.set(b.country, list);
    }
    return Array.from(map.entries())
      .map(([country, names]) => {
        const coords = countryCoords[country];
        if (!coords) return null;
        return { country, names, lat: coords[0], lng: coords[1], count: names.length };
      })
      .filter(Boolean) as { country: string; names: string[]; lat: number; lng: number; count: number }[];
  }, [builders]);

  const totalMembers = clusters.reduce((s, c) => s + c.count, 0) || 78;
  const totalCountries = clusters.length || 12;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div
        className="relative w-full rounded-2xl overflow-hidden border border-border/30"
        style={{ aspectRatio: "2 / 1" }}
      >
        <MapContainer
          center={[20, 10]}
          zoom={2}
          minZoom={2}
          maxZoom={6}
          scrollWheelZoom={false}
          zoomControl={true}
          attributionControl={false}
          className="w-full h-full z-0"
          style={{ background: "#aad3df" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {clusters.map((c) => (
            <CircleMarker
              key={c.country}
              center={[c.lat, c.lng]}
              radius={Math.min(6 + c.count * 1.5, 16)}
              pathOptions={{
                color: "rgba(220,38,38,0.6)",
                fillColor: "#dc2626",
                fillOpacity: 0.75,
                weight: 1.5,
              }}
            >
              <Tooltip direction="top" offset={[0, -8]}>
                <span className="font-semibold">{c.country}</span>
                <span className="text-muted-foreground ml-1.5">
                  · {c.count} {c.count === 1 ? "builder" : "builders"}
                </span>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      {/* Bottom stats */}
      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="text-center">
          <span className="font-display font-bold text-2xl text-foreground">{totalMembers}</span>
          <span className="text-sm text-muted-foreground ml-2">Members</span>
        </div>
        <div className="text-center">
          <span className="font-display font-bold text-2xl text-foreground">{totalCountries}</span>
          <span className="text-sm text-muted-foreground ml-2">Countries</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
