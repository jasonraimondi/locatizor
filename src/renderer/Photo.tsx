import { ipcRenderer } from "electron";
import ExifData from "exifreader";
import React, { useMemo } from "react";
import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import { Map } from "@/renderer/Map";
import { useCurrentPath } from "@/renderer/providers/currentPath";

export const Photo = () => {
  const { currentPath } = useCurrentPath();
  const match = useRouteMatch();
  const { photoId } = useParams();
  const path = `${currentPath}/${encodeURI(photoId!)}`;
  const exifData = useMemo(() => getExifDataForPath(path), [path])
  const {
    GPSLatitude,
    GPSLatitudeRef,
    GPSLongitude,
    GPSLongitudeRef,
  } = exifData.data;
  console.log(GPSLatitude?.description, GPSLatitudeRef?.description);
  console.log(GPSLongitude?.description, GPSLongitudeRef?.description);
  return <div>
    <Switch>
      <Route path={`${match.path}/map`}>
        <Map/>
      </Route>
      <Route path={`${match.path}/`}>
        <img src={path} alt=""/>
      </Route>
    </Switch>
    <Link to={`${match.url}/`} className="button">Data</Link>
    <Link to={`${match.url}/map`} className="button">Map</Link>
    <h3>Requested topic ID: {photoId}</h3>
    <div>{JSON.stringify(exifData, null, 2)}</div>
  </div>;
};

export const getExifDataForPath = (path: string): { success: boolean, data: ExifData.Tags } => {
  console.log({path});
  return ipcRenderer.sendSync("exif-from-path", path);
};
