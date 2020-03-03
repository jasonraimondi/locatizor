import { ipcRenderer } from "electron";
import ExifData from "exifreader";
import React, { useMemo } from "react";
import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import { Map } from "@/renderer/Map";
import { useCurrentPath } from "@/renderer/providers/currentPath";
import { Image } from "@/renderer/elements/Image";
import "./Photo.css";

export const Photo = () => {
  const { currentPath } = useCurrentPath();
  const match = useRouteMatch();
  const { photoId } = useParams();
  const path = `${currentPath}/${encodeURI(photoId!)}`;
  const exifData = useMemo(() => getExifDataForPath(path), [path]);

  console.log(exifData.data);

  return <div id="photo-container">
    <div className="image">
      <Switch>
        <Route path={`${match.path}/map`}>
          <Map/>
        </Route>
        <Route path={`${match.path}/`}>
          <Image src={path}/>
        </Route>
      </Switch>
    </div>
    <div className="details">
      <ul className="flex">
        <li><Link to={`${match.url}/`} className="button">Data</Link></li>
        <li><Link to={`${match.url}/map`} className="button">Map</Link></li>
      </ul>
      <div>
        <p><strong>Filename:</strong> {photoId}</p>
        {exifData.data.ImageWidth ??
        <p><strong>ImageWidth:</strong> {JSON.stringify(exifData.data.ImageWidth)}</p>}
        {exifData.data.ImageLength ??
        <p><strong>ImageHeight:</strong> {JSON.stringify(exifData.data.ImageLength)}</p>}
      </div>
    </div>
  </div>;
};

export const getExifDataForPath = (path: string): { success: boolean, data: ExifData.Tags } => {
  console.log({ path });
  return ipcRenderer.sendSync("exif-from-path", path);
};
