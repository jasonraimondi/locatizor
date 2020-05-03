import { Path } from "@/renderer/providers/path";
import { getExifFromPath } from "@/main/listeners/exif_from_path";

export const getExifDataForPath = (path?: Path): any => {
  try {
    return getExifFromPath(path?.toFullPath())
  } catch (e) {
    console.log(e.message)
    return {};
  }
};
