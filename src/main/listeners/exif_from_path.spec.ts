import { resolve } from "path";

import { getExifFromPath } from "@/main/listeners/exif_from_path";

describe("ExifFromPath", () => {
  const filePath = resolve("test/files/ios-photo1.jpg");

  it("reads and parses exif data", () => {
    const exifData = getExifFromPath(filePath);
    expect(exifData.latitude).toBe(34.001305555555554);
    expect(exifData.latitudeRef).toBe("N");
    expect(exifData.longitude).toBe(-118.46744444444445);
    expect(exifData.longitudeRef).toBe("W");
  });
});
