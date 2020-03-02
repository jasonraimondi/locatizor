import { dialog, getClipboardText } from "@/renderer/clipboard";

import { Gallery } from "@/renderer/Gallery";
import React, { useState } from "react";

const confirmation = () => confirm(`Do you want me to start with the link: ${getClipboardText()}`);

const osmLink = "https://www.openstreetmap.org/#map=";

if (getClipboardText().startsWith(osmLink) && confirmation()) {
  const [_, lat, lng] = getClipboardText().replace(osmLink, "").split("/");
  console.log({ lat, lng });
}

export const FileSelect = () => {
  const [path, setPath] = useState();
  const handleClick = async () => {
    const directory = await dialog.showOpenDialog({properties: ["openDirectory"]});
    setPath(directory.filePaths[0]);
  };

  return (
    <div className="flex flex-col justify-center align-center">
      <button onClick={handleClick}>Open path</button>
      <Gallery path={path}/>
    </div>
  );
};
