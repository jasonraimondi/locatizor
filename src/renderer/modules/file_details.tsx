import React from "react";
import styled from "styled-components";
import { Image } from "../elements/image";
import { useCurrentPath } from "../providers/use_current_path";
import { useExifData } from "../providers/use_exif_data";

export const Details = () => {
  const { exifData } = useExifData();
  const { path } = useCurrentPath();

  if (path?.isDirectory()) {
    return <div>
      <p>Pick a file to see some info about it.</p>
      <p>Select a location on the map to the left.</p>
      <p>Note: If you </p>
    </div>;
  }

  return <DetailsWrapper>
    <ImageWrapper>
      <Image src={path.toFullPath()} style={{ height: "100%" }}/>
    </ImageWrapper>
    <p>Longitude: {exifData.longitude ?? "?"}</p>
    <p>Latitude: {exifData.latitude ?? "?"}</p>
    <p>Width: {exifData.width ?? "?"}</p>
    <p>Height: {exifData.height ?? "?"}</p>
    <p>Capture Date: {exifData.captureDate ?? "?"}</p>
  </DetailsWrapper>;
};

const ImageWrapper = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
`;

const DetailsWrapper = styled.div`
  grid-area: details;
  background-color: ${props => props.theme.gray["400"]};
  overflow-y: auto;
  padding: 0.5rem;
`;
