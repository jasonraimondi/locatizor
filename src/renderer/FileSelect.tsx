import { useCurrentPath } from "@/renderer/providers/currentPath";

import { Gallery } from "@/renderer/Gallery";
import React from "react";

export const FileSelect: React.FC = () => {
  const { currentPath } = useCurrentPath();

  return (
    <Gallery path={currentPath}/>
  );
};
