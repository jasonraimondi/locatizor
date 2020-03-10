import { useCurrentPath } from "@/renderer/providers/current_path";

import { Gallery } from "@/renderer/gallery";
import React from "react";

export const FileSelect: React.FC = () => {
  const { currentPath } = useCurrentPath();

  return (
    <Gallery path={currentPath}/>
  );
};
