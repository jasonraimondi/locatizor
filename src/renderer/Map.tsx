import React, { useState } from "react";
import { Map as OpenStreetMap, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Map = () => {
  const state = {
    lat: 52,
    lng: -10,
    zoom: 12,
  };
  const [position, setPosition] = useState([state.lat, state.lng]);

  const handleMoveEnd = ({target}) => {
    const {lat, lng} = target.getCenter();
    setPosition([lat, lng]);
  };

  return (
    <OpenStreetMap center={[state.lat, state.lng]}
                   zoom={state.zoom}
                   style={{height: 500, width: "100%"}}
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
