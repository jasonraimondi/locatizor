import settings from "electron-settings";

interface JsonObject {
  [x: string]: JsonValue;
}

interface JsonArray extends Array<JsonValue> {}

type JsonValue = string | number | boolean | null | JsonArray | JsonObject;

export class ElectronSettingService {
  static has(keyPath: string): boolean {
    return settings.hasSync(keyPath);
  }

  static set<T>(keyPath: string, value: JsonValue | T | any): void {
    settings.setSync(keyPath, value);
  }

  static get<T>(keyPath: string, defaultValue?: any): T | any {
    return settings.getSync(keyPath) ?? defaultValue;
  }

  static delete(keyPath: string): void {
    settings.unsetSync(keyPath);
  }

  static deleteAll(): void {
    settings.reset();
  }

  static file(): string {
    return settings.file();
  }
}
