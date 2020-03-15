const photoExtensions = [
  ".jpg",
  ".jpeg",
  ".heic",
  ".nef",
  ".png",
  ".tiff",
];
const photoRegex = new RegExp(photoExtensions.join("|"), "i");
export const isPhoto = (file: string) => photoRegex.test(file);
