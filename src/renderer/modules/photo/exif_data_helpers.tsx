import { Path } from "@/renderer/providers/path";
import { getExifFromPath } from "@/main/listeners/exif_from_path";

export const getExifDataForPath = (path?: Path): any => {
  console.log(path?.toFullPath())
  try {
    return getExifFromPath(path?.toFullPath())
  } catch (e) {
    console.log(e)
    return {};
  }
};
