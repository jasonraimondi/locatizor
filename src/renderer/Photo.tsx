import React from "react";
import { useParams } from "react-router-dom";

import { Map } from "@/renderer/Map";

export const Photo = () => {
  const {photoId} = useParams();
  return <>
    <Map />
    <h3>Requested topic ID: {photoId}</h3>
  </>;
};
