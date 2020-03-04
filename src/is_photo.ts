const photoExtensions = [
  ".PNG",
  ".TIFF",
  ".JPG",
  ".JPEG",
  ".NEF",
];
const photoRegex = new RegExp(photoExtensions.join("|"), "i");
export const isPhoto = (file: string) => photoRegex.test(file);
