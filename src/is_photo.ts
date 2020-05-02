export const allowedPhotoExtensions = [
  "\\.jpg",
  "\\.jpeg",
];
const photoRegex = new RegExp(allowedPhotoExtensions.join("|"), "i");
export const isPhoto = (file: string) => photoRegex.test(file);
