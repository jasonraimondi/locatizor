import "leaflet/dist/leaflet.css";
import { LatLngTuple, LeafletEvent } from "leaflet";
import React, { useState } from "react";
import { Map as OpenStreetMap, Marker, Popup, TileLayer } from "react-leaflet";

type Prop = {
  lat: number;
  lng: number;
  zoom?: number;
  onMoveEnd?: (event: LeafletEvent) => void;
};

export const Map: React.FC<Prop> = ({ lat, lng, zoom = 12, onMoveEnd }) => {
  const [position, setPosition] = useState<LatLngTuple>([lat, lng]);

  const handleMoveEnd = (event: LeafletEvent) => {
    const { target } = event;
    if (onMoveEnd) onMoveEnd(event);
    const center = target.getCenter();
    setPosition([center.lat, center.lng]);
  };

  return (
    <OpenStreetMap
      center={[lat, lng]}
      zoom={zoom}
      className="h-full w-full"
      onMoveEnd={handleMoveEnd}
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
