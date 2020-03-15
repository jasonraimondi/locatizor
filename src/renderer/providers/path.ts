import { format, parse, ParsedPath } from "path";

export class Path {
  private constructor(private readonly src: ParsedPath) {
  }

  static fromObject(src: ParsedPath) {
    return new Path(src);
  }

  static fromString(src: string) {
    return new Path(parse(src));
  }

  toString() {
    return format(this.src);
  }

  toObject() {
    return this.src;
  }

  isDirectory() {
    return this.src.ext === "";
  }

  toDirectory() {
    if (!this.isDirectory()) {
      return this.src.dir;
    }
    return this.toString();
  }
}
