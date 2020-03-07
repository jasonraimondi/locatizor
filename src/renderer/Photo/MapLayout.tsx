import React from "react";

import { Map } from "@/renderer/Photo/Map";
import { useExifData } from "./use_exif_data";

export const MapLayout = () => {
  const { exifData } = useExifData();
  return (
    <Map
      lat={Number(exifData.latitude.format()) ?? 0}
      lng={Number(exifData.longitude.format()) ?? 0}
    />
  )
};
