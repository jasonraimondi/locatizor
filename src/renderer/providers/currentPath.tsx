import React, { createContext, useContext, useState, useEffect } from "react";

import { dialog } from "@/renderer/elements/clipboard";
import { ElectronSettingService } from "../../main/settings_service";

type CurrentPathType = {
  currentPath: string;
  setCurrentPath: any;
  handleOpenDirectory(): Promise<void>;
};

// @ts-ignore
const CurrentPathContext = createContext<CurrentPathType>();

export const CurrentPathProvider = (props: any) => {
  const [currentPath, _setCurrentPath] = useState<string>();

  const handleOpenDirectory = async () => {
    const directory = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    setCurrentPath(directory.filePaths[0]);
  };

  const setCurrentPath = (path: string) => {
    ElectronSettingService.set("currentPath", path);
    _setCurrentPath(path);
    // console.log("hi");
  };

  useEffect(() => {
    if (ElectronSettingService.has("currentPath")) {
      setCurrentPath(ElectronSettingService.get("currentPath"));
    }
  }, [ElectronSettingService.has("currentPath")]);

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