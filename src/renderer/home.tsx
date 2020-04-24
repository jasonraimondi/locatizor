import React from "react";

import { FolderOpen } from "@/renderer/folder_open";
import { useCurrentPath } from "./providers/use_current_path";
import { FolderShow } from "./folder_show";

export const Home = () => {
  const { path } = useCurrentPath();

  let content = <FolderOpen/>;

  if (path?.toDirectory()) {
    content = <FolderShow/>;
  }

  return <>
    {content}
  </>;
};
