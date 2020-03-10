import React from "react";
import { useCurrentPath } from "@/renderer/providers/current_path";

export const Home = () => {
  const { pathList, currentPath, setCurrentPath } = useCurrentPath();
  return <>
    {pathList.map((path, idx) => <a key={idx} onClick={() => setCurrentPath(path)} className={currentPath === path ? "underline" : "" + " block"}>{path}</a>)}
  </>;
};
