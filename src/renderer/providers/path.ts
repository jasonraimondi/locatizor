import { format, parse, ParsedPath } from "path";

const homedir = process.env.HOME;
const rxp = new RegExp(homedir ?? "");

export class Path {
  private constructor(private readonly src: ParsedPath) {
  }

  static fromObject(src: ParsedPath) {
    return new Path(src);
  }

  static fromString(src: string) {
    return new Path(parse(src));
  }

  private shorten(str: string) {
    let result = str;
    if (homedir && rxp.test(result)) result = result.replace(homedir, "~")
    return result;
  }

  toString() {
    return this.shorten(format(this.src));
  }

  toObject() {
    return this.src;
  }

  isDirectory() {
    return this.src.ext === "";
  }

  toFullPath() {
    return format(this.src);
  }

  getFullDirectory() {
    if (!this.isDirectory()) {
      return this.src.dir;
    }
    return this.toFullPath();
  }

  getDirectory() {
    if (!this.isDirectory()) {
      return this.shorten(this.src.dir);
    }
    return this.toString();
  }
}
