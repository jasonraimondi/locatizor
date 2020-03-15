import { ipcRenderer } from "electron";
import { Path } from "../../providers/path";
import { COMMANDS } from "../../constants";

export const getExifDataForPath = (path: Path): any => {
  const { success, data, message } = ipcRenderer.sendSync(COMMANDS.ExifFromPath, path.toString());
  if (!success) {
    console.error({ message });
    return {};
  }
  return data;
};
