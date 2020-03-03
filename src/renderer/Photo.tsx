import { Map } from "@/renderer/Map";
import { ipcRenderer } from "electron";

import ExifData from "exifreader";
import React from "react";
import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import { useCurrentPath } from "./providers/currentPath";

export const Photo = () => {
  const { currentPath } = useCurrentPath();
  const match = useRouteMatch();
  const { photoId } = useParams();
  const path = `${currentPath}/${encodeURI(photoId!)}`;
  console.log(path);
  const exifData = getExifDataForPath(path);
  // const {
  //   GPSLatitude,
  //   GPSLatitudeRef,
  //   GPSLongitude,
  //   GPSLongitudeRef,
  // } = exifData;
  // console.log(GPSLatitude.description, GPSLatitudeRef.description);
  // console.log(GPSLongitude.description, GPSLongitudeRef.description);

  return <div>
    <Switch>
      <Route path={`${match.path}/maps`}>
        <Map/>
      </Route>
      <Route path={`${match.path}/`}>
        <img src={path} alt=""/>
      </Route>
    </Switch>
    <Link to={`${match.path}/maps`} className="button">Map</Link>
    <h3>Requested topic ID: {photoId}</h3>
    <div>{JSON.stringify(exifData, null, 2)}</div>
  </div>;
};

export const getExifDataForPath = (path: string): ExifData.Tags => {
  return ipcRenderer.sendSync("exif-from-path", path);
};
