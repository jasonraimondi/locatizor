import React, { createContext, useContext, useState } from "react";

import { dialog } from "@/renderer/elements/clipboard";

type CurrentPathType = {
  currentPath: string;
  setCurrentPath: any;
  handleOpenDirectory(): Promise<void>;
};

// @ts-ignore
const CurrentPathContext = createContext<CurrentPathType>();

export const CurrentPathProvider = (props: any) => {
  const [currentPath, setCurrentPath] = useState();

  const handleOpenDirectory = async () => {
    const directory = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    setCurrentPath(directory.filePaths[0]);
  };

  return <CurrentPathContext.Provider
    value={{
      currentPath,
      setCurrentPath,
      handleOpenDirectory,
    }}
    {...props}
  />;
};

export const useCurrentPath = () => useContext<CurrentPathType>(CurrentPathContext);