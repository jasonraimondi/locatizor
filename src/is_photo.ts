const photoExtensions = [
  ".png",
  ".tiff",
  ".jpg",
  ".jpeg",
  ".nef",
];
const photoRegex = new RegExp(photoExtensions.join("|"), "i");
export const isPhoto = (file: string) => photoRegex.test(file);
