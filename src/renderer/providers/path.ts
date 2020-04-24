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

  toString(short = true) {
    const result = format(this.src);
    if (short) return this.shorten(result);
    return result;
  }

  toObject() {
    return this.src;
  }

  isDirectory() {
    return this.src.ext === "";
  }

  toDirectory(short = true) {
    if (!this.isDirectory()) {
      if (short) return this.shorten(this.src.dir);
      return this.src.dir;
    }
    return this.toString(short);
  }
}
