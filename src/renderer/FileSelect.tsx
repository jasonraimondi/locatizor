import { useCurrentPath } from "@/renderer/providers/currentPath";
import { Button } from "@/renderer/elements/Button";
import { dialog, getClipboardText } from "@/renderer/elements/clipboard";

import { Gallery } from "@/renderer/Gallery";
import React, { useState } from "react";

const confirmation = () => confirm(`Do you want me to start with the link: ${getClipboardText()}`);

const osmLink = "https://www.openstreetmap.org/#map=";

if (getClipboardText().startsWith(osmLink) && confirmation()) {
  const [_, lat, lng] = getClipboardText().replace(osmLink, "").split("/");
  console.log({ lat, lng });
}

export const FileSelect: React.FC = () => {
  const { currentPath, setCurrentPath } = useCurrentPath();

  const handleClick = async () => {
    const directory = await dialog.showOpenDialog({properties: ["openDirectory"]});
    setCurrentPath(directory.filePaths[0]);
  };

  return (
    <div className="flex flex-col justify-center align-center">
      <Button onClick={handleClick}>Open path</Button>
      <Gallery path={currentPath}/>
    </div>
  );
};
