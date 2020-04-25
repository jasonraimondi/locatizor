import React from "react";

import { FolderOpen } from "@/renderer/folder_open";
import { useCurrentPath } from "./providers/use_current_path";
import { FolderShow } from "./folder_show";

export const Home = () => {
  const { path } = useCurrentPath();

  if (path?.getDirectory()) {
    return <FolderShow/>;
  }

  return <FolderOpen/>;
};
