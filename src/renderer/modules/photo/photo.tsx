import React from "react";
import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import { useCurrentPath } from "@/renderer/providers/current_path";
import { Image } from "@/renderer/elements/image";
import { ExifDataProvider, useExifData } from "@/renderer/modules/photo/use_exif_data";
import { MapLayout } from "@/renderer/modules/photo/map_layout";
import "@/renderer/modules/photo/photo.css";

export const Photo = () => {
  const { currentPath } = useCurrentPath();
  const match = useRouteMatch();
  const { photoId } = useParams();
  const path = `${currentPath}/${photoId!}`;

  return <ExifDataProvider currentPath={path}>
    <div id="photo-container">
      <div className="image">
        <Switch>
          <Route path={`${match.path}/map`}>
            <MapLayout/>
          </Route>
          <Route path={`${match.path}/`}>
            <Image src={path} className="contain-image"/>
          </Route>
        </Switch>
      </div>
      <div className="details">
        <ul className="flex">
          <li><Link to={`${match.url}/`} className="button">Data</Link></li>
          <li><Link to={`${match.url}/map`} className="button">Map</Link></li>
        </ul>
        <ExifData/>
      </div>
    </div>
  </ExifDataProvider>;
};

export const ExifData = () => {
  const { exifData }: any = useExifData();
  const datas = Object.keys(exifData);
  return <>
    {datas.map((f) => {
      return <p key={f}><strong>{f}</strong>: {exifData[f]}</p>;
    })}
  </>;
};
