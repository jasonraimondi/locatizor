import React from "react";
import { Link, Route, Switch, useParams, useRouteMatch } from "react-router-dom";

import { useCurrentPath } from "@/renderer/providers/currentPath";
import { Image } from "@/renderer/elements/Image";
import "./Photo.css";
import { ExifDataProvider, useExifData } from "./use_exif_data";
import { MapLayout } from "./MapLayout";

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
  console.log(exifData.longitude?.format());

  return <>
    {datas.map((f) => {
      return <p key={f}><strong>{exifData[f]?.title}</strong>: {exifData[f]?.format()}</p>;
    })}
  </>;
};
