import { useMap } from "@/renderer/providers/use_map_provider";
import { LeafletEvent } from "leaflet";
import React from "react";
import { Map as OpenStreetMap, Marker, Popup, TileLayer } from "react-leaflet";
import { RedMarker, YellowMarker } from "../../../leaflet_hackfix";

type Props = { enabled?: boolean };

export const Map: React.FC<Props> = ({ enabled = true }) => {
  const { exifPosition, userPosition, setUserPosition, zoom, setZoom } = useMap();

  const handleMoveEnd = ({ target }: LeafletEvent) => {
    const { lat, lng } = target.getCenter();
    setUserPosition([lat, lng]);
  };

  const handleZoomEnd = ({ target }: LeafletEvent) => {
    setZoom(target.getZoom());
  };

  return <OpenStreetMap
    center={userPosition ?? exifPosition}
    zoom={zoom}
    style={{ height: "100%", width: "100%" }}
    onMoveEnd={handleMoveEnd}
    onZoomEnd={handleZoomEnd}
    dragging={enabled}
  >
    {exifPosition ? <Marker position={exifPosition} icon={YellowMarker}>
      <Popup>
        EXIF DATA POSITION
      </Popup>
    </Marker> : undefined}
    {userPosition ? <Marker position={userPosition} icon={RedMarker}>
      <Popup>
        USER POSITION
      </Popup>
    </Marker> : undefined}

    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
  </OpenStreetMap>;
};
