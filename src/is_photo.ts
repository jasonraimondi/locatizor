export const allowedPhotoExtensions = [
  ".jpg",
  ".jpeg",
  // ".heic",
  // ".nef",
  // ".png",
  // ".tiff",
];
const photoRegex = new RegExp(allowedPhotoExtensions.join("|"), "i");
export const isPhoto = (file: string) => photoRegex.test(file);
