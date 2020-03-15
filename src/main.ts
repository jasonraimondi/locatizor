import { app, Menu, ipcMain } from "electron";

import { installExtensions, IS_DEV_ENV, IS_MAC_OS } from "@/environment";
import { WindowManager } from "@/main/window_manager";
import { getFiles } from "@/main/listeners/files_from_path";
import { setGpsForPhoto, SetGpsArgs } from "@/main/listeners/set_gps";
import { getExifFromPath } from "@/main/listeners/exif_from_path";
import { COMMANDS } from "@/renderer/constants";
import { Path } from "@/renderer/providers/path";

const windowManager: WindowManager = new WindowManager();

export function openMainWindow() {
  windowManager.createMainWindow();
}

export function reloadAllWindows() {
  windowManager.reloadAll();
}

// https://github.com/electron/electron/issues/18397
// remove this when upgrading to electron 9
app.allowRendererProcessReuse = true;

app.on("ready", async () => {
  await import("@/main/listeners/files_from_path");

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

ipcMain.on(COMMANDS.SetGPS, (event, { path, lat, lng }: SetGpsArgs) => {
  const p = Path.fromObject(path);

  if (!p.isDirectory()) {
    setGpsForPhoto(p.toString(), { lat, lng });
  } else {
    const files = getFiles(p.toDirectory());
    for (const file of files) {
      setGpsForPhoto(file, { lat, lng });
    }
  }

  event.returnValue = {
    success: true,
  };
});

ipcMain.on(COMMANDS.ExifFromPath, (event, path) => {
  try {
    event.returnValue = {
      success: true,
      data: getExifFromPath(path),
    };
  } catch (e) {
    console.log(e);
    event.returnValue = {
      success: false,
      data: {},
    };
  }
});
