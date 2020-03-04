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
  const path = `${currentPath}/${photoId!}`;
  const { data } = useMemo(() => getExifDataForPath(path), [path]);

  console.log(data);

  const list = () => {
    return Object.keys(exifParseList).map((displayValue, idx) => {
      // @ts-ignore
      const exifMatch = exifParseList[displayValue];
      const [prop] = exifMatch.fields.filter((res: string) => {
        return data.hasOwnProperty(res);
      });
      if (prop) {
        return <p key={idx}><strong>{displayValue}</strong>: {exifMatch.format(data[prop])}</p>;
      }
      return;
    });
  };

  return <div id="photo-container">
    <div className="image">
      <Switch>
        <Route path={`${match.path}/map`}>
          <Map/>
        </Route>
        <Route path={`${match.path}/`}>
          <Image src={path} className="contain-image" />
        </Route>
      </Switch>
    </div>
    <div className="details">
      <ul className="flex">
        <li><Link to={`${match.url}/`} className="button">Data</Link></li>
        <li><Link to={`${match.url}/map`} className="button">Map</Link></li>
      </ul>
      <div>
        {list()}
      </div>
    </div>
  </div>;
};

export type ExifDataType = ExifData.Tags | any

export const getExifDataForPath = (path: string): { success: boolean, data: ExifDataType } => {
  console.log({ path });
  return ipcRenderer.sendSync("exif-from-path", path);
};

export type ExifParser = {
  fields: string[];
  format(str: { value: any; description: string }): string | number;
}

export const exifParseList: { [displayValue: string]: ExifParser } = {
  Height: {
    fields: ["Image Height", "ImageHeight"],
    format: ({ value }) => value ? `${value}px` : "Unknown"
  },
  Width: {
    fields: ["Image Width", "ImageWidth"],
    format: ({ value }) => value ? `${value}px` : "Unknown"
  },
  "Latitude Ref": {
    fields: ["GPSLatitudeRef"],
    format: ({ description }) => description,
  },
  Latitude: {
    fields: ["GPSLatitude"],
    format: ({ description }) => description,
  },
  "Longitude Ref": {
    fields: ["GPSLongitudeRef"],
    format: ({ description }) => description,
  },
  Longitude: {
    fields: ["GPSLongitude"],
    format: ({ description }) => description,
  }
};
