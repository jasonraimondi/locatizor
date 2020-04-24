import { getFiles } from "@/main/listeners/files_from_path";

export const getFilesForPath = (path?: string): string[] => {
  console.log({ path });
  try {
    return getFiles(path ?? "");
  } catch (_) {
    return [];
  }
};
