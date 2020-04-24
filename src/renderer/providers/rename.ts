import path from "path";

export const renamePhoto = (file: string, suffix = ".original", prefix = "") => {
  const { dir, name, ext } = path.parse(file);
  return `${dir}/${prefix}${name}${suffix}${ext}`;
};
