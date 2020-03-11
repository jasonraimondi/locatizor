import React from "react";
import { useCurrentPath } from "./providers/current_path";
import { Map } from "@/renderer/modules/photo/map";
import { LeafletEvent } from "leaflet";
import { FileList } from "./file_list";

export const Home = () => {
  const { currentPath, handleOpenDirectory } = useCurrentPath();
  const onMoveEnd = (event: LeafletEvent) => {
    console.log(event.target.getCenter());
  };
  return <div className="h-full flex flex-col">
    <div className="h-6 bg-gray-900 draggable"/>
    <div className="h-half">
      <Map
        lat={36.167}
        lng={-115.139}
        onMoveEnd={onMoveEnd}
      />
    </div>
    <div className="bg-gray-200 flex-1 h-half grid grid-cols-2">
      <div>
        <p className="text-xs">{currentPath ?? "Pick a Path"}</p>
        <a className="" onClick={handleOpenDirectory}>Open New Directory</a>
      </div>
      <div className="overflow-y-scroll max-h-full">
        <FileList path={currentPath}/>
      </div>
    </div>
  </div>;
};
