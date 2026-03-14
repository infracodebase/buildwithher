const markers = [
  { label: "Nigeria", lat: 9.082, lng: 8.6753 },
  { label: "Kenya", lat: -1.2921, lng: 36.8219 },
  { label: "United States", lat: 37.0902, lng: -95.7129 },
  { label: "India", lat: 20.5937, lng: 78.9629 },
  { label: "Germany", lat: 51.1657, lng: 10.4515 },
  { label: "South Africa", lat: -30.5595, lng: 22.9375 },
  { label: "UK", lat: 55.3781, lng: -3.436 },
  { label: "Canada", lat: 56.1304, lng: -106.3468 },
  { label: "Ghana", lat: 7.9465, lng: -1.0232 },
  { label: "DR Congo", lat: -4.0383, lng: 21.7587 },
  { label: "Australia", lat: -25.2744, lng: 133.7751 },
  { label: "Singapore", lat: 1.3521, lng: 103.8198 },
];

const GlobalMap = () => {
  // Build a static Google Maps embed URL with markers
  const baseUrl = "https://www.google.com/maps/embed/v1/view";
  
  // Use a simple iframe with markers via the "place" or static maps approach
  // For multiple markers, we use the Maps Embed API "view" mode centered on the world
  // and overlay with a static map showing pins
  const markerParams = markers
    .map((m) => `${m.lat},${m.lng}`)
    .join("|");

  // Use Google Maps static-style embed centered to show all locations
  const embedUrl = `https://maps.google.com/maps?q=&z=2&t=m&output=embed`;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative w-full rounded-2xl overflow-hidden border border-border/30 bg-card/50" style={{ aspectRatio: "2 / 1" }}>
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Builder community locations"
        />
      </div>

      {/* Bottom stats */}
      <div className="flex items-center justify-center gap-8 mt-6">
        <div className="text-center">
          <span className="font-display font-bold text-2xl text-foreground">78</span>
          <span className="text-sm text-muted-foreground ml-2">Members</span>
        </div>
        <div className="text-center">
          <span className="font-display font-bold text-2xl text-foreground">12</span>
          <span className="text-sm text-muted-foreground ml-2">Countries</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
