import { Path } from "@/renderer/providers/path";
import { getExifFromPath } from "@/main/listeners/exif_from_path";

export const getExifDataForPath = (path?: Path): any => {
  console.log(path?.toString(false))
  try {
    return getExifFromPath(path?.toString(false))
  } catch (e) {
    console.log(e)
    return {};
  }
};
