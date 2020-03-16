import React from "react";
import { Map as OpenStreetMap, Marker, Popup, TileLayer } from "react-leaflet";
import { LeafletEvent } from "leaflet";

import { useMap } from "@/renderer/providers/map_provider";

export const Map: React.FC = () => {
  const { position, setUserPosition, zoom, setZoom } = useMap();

  const handleMoveEnd = ({ target }: LeafletEvent) => {
    const { lat, lng } = target.getCenter();
    setUserPosition([lat, lng]);
  };

  const handleZoomEnd = ({ target }: LeafletEvent) => {
    setZoom(target.getZoom());
  };

  return (
    <OpenStreetMap
      center={position}
      zoom={zoom}
      className="h-full w-full"
      onMoveEnd={handleMoveEnd}
      onZoomEnd={handleZoomEnd}
    >
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br/> Easily customizable.
        </Popup>
      </Marker>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
    </OpenStreetMap>
  );
};
