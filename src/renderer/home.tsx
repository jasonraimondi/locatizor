import React from "react";

import { useCurrentPath } from "@/renderer/providers/current_path";
import { Map } from "@/renderer/modules/photo/map";
import { FileList } from "@/renderer/file_list";
import { useMap } from "@/renderer/providers/map_provider";

export const Home = () => {
  const { currentPath, handleOpenDirectory } = useCurrentPath();

  const { position } = useMap();
  const [lat, lng] = position;

  return (
    <div className="bg-gray-100 h-full flex flex-col">
      <div className="h-6 bg-gray-900 draggable"/>
      <div className="h-half flex">
        <Map/>
      </div>
      <div className="flex-1 h-half grid grid-cols-2 px-2">
        <div>
          <p className="text-xs p-1 m-1 border border-blue-500 truncate" title={currentPath}>
            <span className="font-bold">&gt;</span> {currentPath ?? "Pick a Path"}
          </p>
          <div className="flex flex-col">
            <div>
              <a className="p-2 bg-blue-500 text-center inline-block" onClick={handleOpenDirectory}>
                Open New Directory
              </a>
            </div>
          </div>
          <p>
            Latitude: {lat.toFixed(3)}<br/>
            Longitude: {lng.toFixed(3)}
          </p>
        </div>
        <div className="overflow-y-scroll max-h-full w-full">
          <FileList path={currentPath}/>
        </div>
      </div>
    </div>
  );
};
