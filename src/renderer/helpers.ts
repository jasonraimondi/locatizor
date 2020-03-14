import { ipcRenderer } from "electron";

export type IPCResponseType<T = any> = {
  success: boolean;
  data: T;
}

export const getFilesForPath = (path: string): IPCResponseType<string[]> => {
  return ipcRenderer.sendSync("files-from-path", { path });
};
