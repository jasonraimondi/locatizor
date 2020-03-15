import React from "react";

import { useCurrentPath } from "@/renderer/providers/current_path";
import { FileList } from "@/renderer/file_list";

export const FileSelect: React.FC = () => {
  const { path } = useCurrentPath();

  return (
    <FileList path={path.toDirectory()}/>
  );
};
