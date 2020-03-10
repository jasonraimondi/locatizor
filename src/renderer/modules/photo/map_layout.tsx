import React from "react";

import { Map } from "@/renderer/modules/photo/map";
import { useExifData } from "@/renderer/modules/photo/use_exif_data";
import { Button } from "@/renderer/elements/button";

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
