import path from "path";

export const renamePhoto = (foo: string) => {
  const { dir, name, ext } = path.parse(foo);
  return `${dir}/${name}.original${ext}`;
};
