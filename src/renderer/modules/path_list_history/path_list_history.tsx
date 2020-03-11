import React from "react";
import { useCurrentPath } from "@/renderer/providers/current_path";
import { SidebarLayout } from "../../sidebar_layout";

export const PathListHistory = () => {
  const { pathList, currentPath, setCurrentPath } = useCurrentPath();
  return <SidebarLayout>
    {pathList.map((path, idx) => <a key={idx} onClick={() => setCurrentPath(path)} className={currentPath === path ? "underline" : "" + " block"}>{path}</a>)}
  </SidebarLayout>;
};
