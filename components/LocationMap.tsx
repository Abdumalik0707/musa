"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  onSelect: (lat: number, lng: number, address: string) => void;
  selected?: { lat: number; lng: number } | null;
}

const DEFAULT_CENTER: [number, number] = [41.2995, 69.2401]; // Toshkent

export function LocationMap({ onSelect, selected }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamically import leaflet (SSR safe)
    import("leaflet").then((L) => {
      // Fix leaflet default icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: selected ? [selected.lat, selected.lng] : DEFAULT_CENTER,
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // If already selected, add marker
      if (selected) {
        markerRef.current = L.marker([selected.lat, selected.lng]).addTo(map);
      }

      map.on("click", async (e: any) => {
        const { lat, lng } = e.latlng;

        // Remove old marker
        if (markerRef.current) {
          markerRef.current.remove();
        }

        // Add new marker
        markerRef.current = L.marker([lat, lng]).addTo(map);

        // Reverse geocode (nominatim)
        try {
          const resp = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await resp.json();
          const address = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
          onSelect(lat, lng, address);
        } catch {
          onSelect(lat, lng, `${lat.toFixed(5)}, ${lng.toFixed(5)}`);
        }
      });

      setLoading(false);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--border)" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            background: "var(--surface-2)",
            zIndex: 10,
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          Xarita yuklanmoqda...
        </div>
      )}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div ref={mapRef} style={{ height: 280, width: "100%" }} />
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.65)",
          color: "#fff",
          fontSize: 12,
          padding: "4px 12px",
          borderRadius: 20,
          pointerEvents: "none",
          zIndex: 999,
          whiteSpace: "nowrap",
        }}
      >
        Manzilni tanlash uchun xaritaga bosing
      </div>
    </div>
  );
}
