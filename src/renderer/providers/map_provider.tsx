import React, { createContext, useContext, useState } from "react";

import { LatLngTuple } from "leaflet";

type MapType = {
  position: LatLngTuple;
  setPosition: (p: LatLngTuple) => void;
  zoom: number,
  setZoom: (z: number) => void;
};

const START_POSITION: LatLngTuple = [36.167, -115.139];
const START_ZOOM = 12;

const MapContext = createContext<MapType>({
  position: START_POSITION,
  setPosition: (_p: LatLngTuple) => undefined,
  zoom: START_ZOOM,
  setZoom: (_z: number) => undefined,
});

export const MapProvider = (props: any) => {
  const [position, setPosition] = useState<LatLngTuple>(START_POSITION);
  const [zoom, setZoom] = useState<number>(12);

  return <MapContext.Provider
    value={{
      position,
      setPosition,
      zoom,
      setZoom,
    }}
    {...props}
  />;
};

export const useMap = () => useContext<MapType>(MapContext);
