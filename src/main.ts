declare var env: {};

import { app, Menu } from "electron";

import { installExtensions, IS_DEV_ENV, IS_MAC_OS } from "@/environment";
import { WindowManager } from "@/main/window_manager";

import "@/main/listeners/exif_from_path";

const windowManager: WindowManager = new WindowManager();

export function openMainWindow() {
  windowManager.createMainWindow();
}

export function reloadAllWindows() {
  windowManager.reloadAll();
}

app.on("ready", async () => {
  const { fileMenuTemplate } = await import("@/main/main_menu");
  Menu.setApplicationMenu(Menu.buildFromTemplate(fileMenuTemplate));
  openMainWindow();
  if (IS_DEV_ENV) {
    await installExtensions();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (IS_MAC_OS) {
    windowManager.focusOrCreate();
  }
});

app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!IS_MAC_OS) {
    app.quit();
  }
});
