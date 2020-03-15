import path from "path";

import { setGpsForPhoto } from "@/main/listeners/set_gps";
import { getExifFromPath } from "@/main/listeners/exif_from_path";
import { unlinkSync, copyFileSync, existsSync } from "fs";
import { renamePhoto } from "@/renderer/rename";

describe("Set Gps", () => {
  it("throws when file is missing", () => {
    // arrange
    const callable = () => setGpsForPhoto("/tmp/foo", { lat: 50, lng: 50 });

    // assert
    expect(callable).toThrow(/file not found/);
  });

  describe("successfully setting gps data", () => {
    const imgSrc = path.resolve("test/files/ios-photo1.jpg");
    const workingPath = "/tmp/ios-photo1.jpg";

    beforeEach(() => {
      if (existsSync(workingPath)) unlinkSync(workingPath);
      if (existsSync(renamePhoto(workingPath))) unlinkSync(renamePhoto(workingPath));
      copyFileSync(imgSrc, workingPath);
    });

    it("updates gps data successfully", () => {
      // act
      const success = setGpsForPhoto(workingPath, { lat: 50, lng: 50 });

      // assert
      const originalExifData = getExifFromPath(renamePhoto(workingPath));
      const updatedExifData = getExifFromPath(workingPath);
      expect(success).toBeTruthy();
      expect(originalExifData.latitude).toBe(34.001305555555554);
      expect(originalExifData.longitude).toBe(-118.46744444444445);
      expect(updatedExifData.latitude).toBe(50);
      expect(updatedExifData.longitude).toBe(50);
    });

    it("can update gps TWICE", () => {
      // arrange
      const originalName = renamePhoto(workingPath);

      // act
      const run1 = setGpsForPhoto(workingPath, { lat: 50, lng: 50 });
      const run2 = setGpsForPhoto(workingPath, { lat: 40, lng: 40 });
      const run3 = setGpsForPhoto(workingPath, { lat: 30, lng: 30 });
      const run4 = setGpsForPhoto(workingPath, { lat: 20, lng: 20 });

      // assert
      const originalExifData1 = getExifFromPath(originalName);
      const updatedExifData1 = getExifFromPath(workingPath);
      expect(run1).toBe(true);
      expect(run2).toBe(true);
      expect(run3).toBe(true);
      expect(run4).toBe(true);
      expect(originalExifData1.latitude).toBe(34.001305555555554);
      expect(originalExifData1.longitude).toBe(-118.46744444444445);
      expect(updatedExifData1.latitude).toBe(20);
      expect(updatedExifData1.longitude).toBe(20);
    });
  });
});
