import React from "react";

import { useCurrentPath } from "@/renderer/providers/current_path";
import { FileList } from "@/renderer/file_list";

export const FileSelect: React.FC = () => {
  const { currentPath } = useCurrentPath();

  return (
    <FileList path={currentPath}/>
  );
};
