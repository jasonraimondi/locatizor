import React from "react";
import styled from "styled-components";
import { Image } from "../elements/image";
import { useCurrentPath } from "../providers/use_current_path";
import { useExifData } from "../providers/use_exif_data";

export const Details = () => {
  const { exifData } = useExifData();
  const { path } = useCurrentPath();

  if (path?.isDirectory()) {
    return <Notes>
      <p>Pick a file to see some info about it.</p>
      <p>Select a location on the map to the left.</p>
      <p>We are only looking for <FileType>.jpg</FileType> and <FileType>.jpeg</FileType> files at this time.</p>
    </Notes>;
  }

  const { latitude, longitude, width, height, captureDate } = exifData;

  return <DetailsWrapper>
    <ImageWrapper>
      <Image src={path.toFullPath()} style={{ height: "100%" }}/>
    </ImageWrapper>
    <Describe>
      <p><Label>Longitude</Label> {longitude ?? "unset"}</p>
      <p><Label>Latitude</Label> {latitude ?? "unset"}</p>
      {width ? <p><Label>Width</Label> {width}</p> : undefined}
      {height ? <p><Label>Height</Label> {height}</p> : undefined}
      {captureDate ? <p><Label>Capture Date</Label> {captureDate}</p> : undefined}
    </Describe>
  </DetailsWrapper>;
};

const Notes = styled.div`
  text-align: center;
  margin: 1rem 0;
`;

const FileType = styled.strong`
  background-color: ${props => props.theme.gray["300"]};
  margin: 0 0.2rem;
  padding: 0.1rem 0.45rem;
`;

const Describe = styled.div`
  padding: 0.75rem 0.5rem 0;
`;

const ImageWrapper = styled.div`
  background-color: ${props => props.theme.gray["400"]};
  height: 150px;
  text-align: center;
  padding: 0.25rem 0;
  border-bottom: 1px solid ${props => props.theme.gray["800"]};

  & > img {
    margin-left: auto;
    margin-right: auto;
  }
`;

const Label = styled.span`
  padding: 3px 5px;
  background-color: ${props => props.theme.gray["400"]};
  border-radius: 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
`;

const DetailsWrapper = styled.div`
  grid-area: details;
  background-color: ${props => props.theme.gray["200"]};
  overflow-y: auto;
`;
