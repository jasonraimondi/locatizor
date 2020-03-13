import "leaflet/dist/leaflet.css";

import React from "react";
import { Map as OpenStreetMap, Marker, Popup, TileLayer } from "react-leaflet";
import { useMap } from "../../providers/map_provider";
import { LeafletEvent } from "leaflet";

export const Map: React.FC = () => {
  const { position, setPosition, zoom, setZoom } = useMap();

  const handleMoveEnd = ({ target }: LeafletEvent) => {
    const { lat, lng } = target.getCenter();
    setPosition([lat, lng]);
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
