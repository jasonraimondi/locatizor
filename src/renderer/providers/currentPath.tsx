import React, { createContext, useContext, useState } from "react";

// @ts-ignore
const CurrentPathContext = createContext<{ currentPath: string, setCurrentPath: any }>();

export const CurrentPathProvider = (props: any) => {
  const [currentPath, setCurrentPath] = useState();
  return <CurrentPathContext.Provider
    value={{
      currentPath,
      setCurrentPath,
    }}
    {...props}
  />;
};

export const useCurrentPath = () => useContext<{ currentPath: string, setCurrentPath: any }>(CurrentPathContext);