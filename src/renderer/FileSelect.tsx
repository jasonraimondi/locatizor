import { useCurrentPath } from "@/renderer/providers/currentPath";

import { Gallery } from "@/renderer/Gallery";
import React from "react";

// const confirmation = () => confirm(`Do you want me to start with the link: ${getClipboardText()}`);
// const osmLink = "https://www.openstreetmap.org/#map=";
// if (getClipboardText().startsWith(osmLink) && confirmation()) {
//   const [, lat, lng] = getClipboardText().replace(osmLink, "").split("/");
//   console.log({ lat, lng });
// }

export const FileSelect: React.FC = () => {
  const { currentPath } = useCurrentPath();

  return (
    <div className="flex flex-col justify-center align-center">
      <Gallery path={currentPath}/>
    </div>
  );
};
