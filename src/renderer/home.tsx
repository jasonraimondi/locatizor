import React from "react";
import { ipcRenderer } from "electron";

import { useCurrentPath } from "@/renderer/providers/current_path";
import { Map } from "@/renderer/modules/photo/map";
import { FileList } from "@/renderer/file_list";
import { useMap } from "@/renderer/providers/map_provider";

export const Home = () => {
  const { currentPath, setCurrentPath, handleOpenDirectory } = useCurrentPath();

  const { position } = useMap();
  const [lat, lng] = position;

  const setGPS = (): void => {
    ipcRenderer.sendSync("set-gps", {
      path: currentPath,
      lat,
      lng,
    });
    setCurrentPath(currentPath);
  };

  return (
    <div className="bg-gray-100 h-full flex flex-col">
      <div className="h-6 bg-gray-900 draggable"/>
      <div className="h-half flex">
        <Map/>
      </div>
      <div className="flex-1 h-half grid grid-cols-2 gap-2 p-2">
        <div className="flex flex-col">
          <div className="flex">
            <span className="inline-block text-center mr-2">
              <a className="inline-block bg-gray-500 px-2 py-1" onClick={handleOpenDirectory}>Open New Directory</a>
            </span>
            <span className="inline-block border flex-1 border-blue-500 truncate" title={currentPath}>
              <span className="font-bold">&gt;</span> {currentPath ?? "Pick a Path"}
            </span>
          </div>
          <div className="flex flex-col flex-1">
            <p className="flex-1">
              Latitude: {lat.toFixed(3)}<br/>
              Longitude: {lng.toFixed(3)}
            </p>
            <button className="button" onClick={setGPS}>update all gps</button>
          </div>
        </div>
        <div className="overflow-y-scroll max-h-full w-full">
          <FileList path={currentPath}/>
        </div>
      </div>
    </div>
  );
};
