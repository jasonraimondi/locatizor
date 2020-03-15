import React from "react";
import { useCurrentPath } from "@/renderer/providers/current_path";
import { SidebarLayout } from "../../sidebar_layout";
import { Path } from "../../providers/path";

export const PathListHistory = () => {
  const { pathHistory, path, setPath } = useCurrentPath();
  return <SidebarLayout>
    {pathHistory.map((p, idx) =>
      <a key={idx} onClick={() => setPath(Path.fromObject(p))}
         className={path.toObject() === p ? "underline" : "" + " block"}>{p}</a>)}
  </SidebarLayout>;
};
