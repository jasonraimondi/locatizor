import React from "react";
import { Map as OpenStreetMap, Marker, Popup, TileLayer } from "react-leaflet";
import { LeafletEvent } from "leaflet";

import { useMap } from "@/renderer/providers/use_map_provider";
import { YellowMarker, RedMarker } from "../../../leaflet_hackfix";

type Props = { showCrosshairs?: boolean; enabled?: boolean };

export const Map: React.FC<Props> = ({ showCrosshairs = false, enabled = true }) => {
  const { exifPosition, userPosition, setUserPosition, zoom, setZoom } = useMap();

  const handleMoveEnd = ({ target }: LeafletEvent) => {
    const { lat, lng } = target.getCenter();
    setUserPosition([lat, lng]);
  };

  const handleZoomEnd = ({ target }: LeafletEvent) => {
    setZoom(target.getZoom());
  };

  const map = <OpenStreetMap
    center={userPosition ?? exifPosition}
    zoom={zoom}
    className="h-full w-full"
    onMoveEnd={handleMoveEnd}
    onZoomEnd={handleZoomEnd}
    dragging={enabled === false}
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

  if (showCrosshairs) {
    return (
      <div className="h-full w-full crosshairs-container">
        {map}
        <div className="crosshairs">CROSSHAIRS</div>
      </div>
    );
  }

  return <>{map}</>;
};
