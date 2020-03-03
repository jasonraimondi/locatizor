import settings from "electron-settings";

interface JsonObject {
  [x: string]: JsonValue;
}

interface JsonArray extends Array<JsonValue> {}

type JsonValue = string | number | boolean | null | JsonArray | JsonObject;

export class ElectronSettingService {
  static has(keyPath: string): boolean {
    return settings.has(keyPath);
  }

  static set<T>(keyPath: string, value: JsonValue | T | any, options?: any): void {
    settings.set(keyPath, value, options);
  }

  static get<T>(keyPath: string, defaultValue?: any, options?: any): T | any {
    return settings.get(keyPath, defaultValue, options);
  }

  static delete(keyPath: string, options?: any): void {
    settings.delete(keyPath, options);
  }

  static deleteAll(options?: any): void {
    settings.deleteAll(options);
  }

  static file(): string {
    return settings.file();
  }
}
