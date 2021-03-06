import React from "react";
import styled from "styled-components";
import { Image } from "../elements/image";
import { useCurrentPath } from "../providers/use_current_path";
import { useExifData } from "../providers/use_exif_data";

export const Details = () => {
  const { exifData } = useExifData();
  const { path } = useCurrentPath();

  if (path?.isDirectory()) {
    return <TipsSection/>;
  }

  const { latitude, longitude, captureDate } = exifData;

  return <DetailsWrapper>
    <ImageWrapper>
      <Image src={path.toFullPath()} style={{ height: "100%" }}/>
    </ImageWrapper>
    <Describe>
      {captureDate ? <ul><Label>Capture Date</Label> {captureDate}</ul> : undefined}
      <ul><Label>Longitude</Label> {longitude ?? "unset"}</ul>
      <ul><Label>Latitude</Label> {latitude ?? "unset"}</ul>
    </Describe>
  </DetailsWrapper>;
};

export const TipsSection = () => (
  <div style={{ height: "100%" }}>
    <p className="h4">Tips:</p>
    <Notes>
      <li>Search for a location on the map, or <i>painfully</i> click and drag the map to the desired spot.</li>
      <li>Select file to see some info about it.</li>
      <li>You can apply an update to an <strong>individual file</strong>, or an <strong>entire directory</strong>.</li>
      <li>We are only looking for <FileType>.jpg</FileType> and <FileType>.jpeg</FileType> files.</li>
      <li>Files that include <FileType>.original.</FileType> will be ignored, and omitted from the list.</li>
    </Notes>
  </div>
);

const Notes = styled.ul`
  list-style: disc;
  border-bottom: ${props => props.theme.insideBorder};
  //padding: 0.5rem 0.5rem 0;
  padding-left: 2rem;
`;

const FileType = styled.strong`
  background-color: ${props => props.theme.gray["300"]};
  //font-size: 0.8em;
  margin: 0 0.2rem;
  padding: 0.1rem 0.45rem;
  border-radius: 0.25rem;
`;

const Describe = styled.ul`
  padding-top: 0.75rem;
`;

const ImageWrapper = styled.div`
  // background-color: ${props => props.theme.gray["400"]};
  height: 150px;
  //text-align: center;
  padding: 0.25rem 0;

  & > img {
    //margin-left: auto;
    //margin-right: auto;
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
  border-bottom: ${props => props.theme.insideBorder};
  padding: 0.5rem 0.5rem 0;
`;
