import React from "react";

import { Map } from "@/renderer/Photo/Map";
import { useExifData } from "./use_exif_data";
import { Button } from "../elements/Button";

export const MapLayout = () => {
  const { exifData, updateLocationDataForPhoto } = useExifData();
  return (
    <>
      <Map
        lat={exifData.latitude ?? 0}
        lng={exifData.longitude ?? 0}
      />
      <Button onClick={() => updateLocationDataForPhoto({ lat: 50, lng: 50 })}>Update</Button>
    </>
  )
};
