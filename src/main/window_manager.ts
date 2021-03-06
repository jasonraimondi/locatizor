import { IS_DEV_ENV, IS_MAC_OS } from "@/environment";
import { ElectronSettingService } from "@/main/settings_service";
import { BrowserWindow, BrowserWindowConstructorOptions, screen } from "electron";
import { autoUpdater } from "electron-updater";
import merge from "lodash.merge";

console.log("NODE ENV", process.env.NODE_ENV);

console.log(process.platform === "darwin" ? "hidden" : "default");


export class WindowManager {
  private readonly DEFAULT_OPTIONS: BrowserWindowConstructorOptions = {
    title: "photo Life",
    width: 1440,
    height: 900,
    frame: !IS_MAC_OS,
    titleBarStyle: "hidden",
    resizable: true,
    backgroundColor: "#FFF",
    minHeight: 400,
    minWidth: 500,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true // <-- Add me
    },
  };
  private windows: Map<string, BrowserWindow> = new Map();

  constructor(private mainWindowUrl: string) {
    autoUpdater.checkForUpdatesAndNotify();
  }

  reload(): void {
    const window = BrowserWindow.getFocusedWindow();
    if (window) {
      window.loadURL(this.mainWindowUrl);
    }
  }

  reloadAll() {
    this.windows.forEach((window: BrowserWindow, _id: string) => {
      window.loadURL(this.mainWindowUrl);
    });
  }

  focusOrCreate(): void {
    const window = this.lastWindow;
    if (window) {
      window.focus();
    } else {
      this.createMainWindow();
    }
  }

  createMainWindow(options: BrowserWindowConstructorOptions = {}): BrowserWindow {
    const baseOptions = this.DEFAULT_OPTIONS;
    const { height } = screen.getPrimaryDisplay().workAreaSize;

    if (this.lastWindow) {
      baseOptions.x = this.lastWindow.getBounds().x + 20;
      baseOptions.y = this.lastWindow.getBounds().y;
    }

    if (height < (baseOptions.height ?? 0)) {
      baseOptions.height = 900;
      baseOptions.width = 700;
    }

    const windowOptions = merge(baseOptions, this.DEFAULT_OPTIONS, options);
    const window = new BrowserWindow(windowOptions);

    if (IS_DEV_ENV) {
      window.webContents.openDevTools();
    }

    const id = `window-${window.id}`;
    const settingsId = `windows.${id}`;
    const existingSettings = ElectronSettingService.get(settingsId);
    if (existingSettings) {
      window.setSize(existingSettings.size[0], existingSettings.size[1]);
      window.setPosition(existingSettings.position[0], existingSettings.position[1]);
    }

    window.on("closed", () => {
      this.windows.delete(id);
      ElectronSettingService.delete(settingsId);
    });

    window.on("moved", () => {
      ElectronSettingService.set(settingsId, {
        size: window.getSize(),
        position: window.getPosition(),
      });
    });

    window.loadURL(this.mainWindowUrl);

    this.windows.set(id, window);

    return window;
  }

  private get windowKeys(): string[] {
    const ids = [];
    for (const id of Array.from(this.windows.keys())) {
      ids.push(id);
    }
    return ids;
  }

  private get lastWindow(): BrowserWindow | undefined {
    return this.windows.get(this.windowKeys[this.windowKeys.length - 1]);
  }
}
