import { IS_DEV_ENV, IS_MAC_OS } from "@/environment";
import { openMainWindow, reloadAllWindows } from "@/main";
import { ElectronSettingService } from "@/main/settings_service";
import { app, Menu, MenuItemConstructorOptions } from "electron";
import findKey from "lodash.findkey";

const editMenu: MenuItemConstructorOptions = {
  label: "Edit",
  submenu: [
    {role: "undo"},
    {role: "redo"},
    {type: "separator"},
    {role: "cut"},
    {role: "copy"},
    {role: "paste"},
    {role: "delete"},
    {role: "selectAll"},
  ],
};

const windowMenu: MenuItemConstructorOptions = {
  role: "window",
  submenu: [
    {role: "minimize"},
    {role: "close"},
  ],
};

const windowMenuMacSubmenu: Menu | MenuItemConstructorOptions[] = [
  {role: "minimize"},
  {role: "zoom"},
  {type: "separator"},
  {role: "front"},
];

const helpMenu: MenuItemConstructorOptions = {
  role: "help",
  submenu: [
    {
      label: "Reset Settings",
      click() {
        const userId = ElectronSettingService.get("userId");
        ElectronSettingService.deleteAll();
        if (userId) {
          ElectronSettingService.set("userId", userId);
        }
        reloadAllWindows();
      },
    },
  ],
};

const fileMenu: MenuItemConstructorOptions = {
  label: "File",
  submenu: [
    {
      label: "New Window",
      accelerator: "CmdOrCtrl+N",
      click() {
        openMainWindow();
      },
    },
    {
      label: "Reload",
      accelerator: "CmdOrCtrl+R",
      click() {
        reloadAllWindows();
      },
    },
    {type: "separator"},
    {role: "close"},
  ],
};

const macTraverseAppMenu: MenuItemConstructorOptions = {
  label: app.name,
  submenu: [
    {role: "about"},
    // { type: 'separator' },
    // { role: 'api', submenu: [] },
    {type: "separator"},
    {role: "hide"},
    {role: "hideOthers"},
    // { role: "show" },
    {type: "separator"},
    {role: "quit"},
  ],
};

const template: MenuItemConstructorOptions[] = [
  editMenu,
  windowMenu,
  helpMenu,
];

if (IS_MAC_OS) {
  template.unshift(fileMenu);
  template.unshift(macTraverseAppMenu);
  const windowMenuKey = findKey(template, (menuItem: MenuItemConstructorOptions) => menuItem.role === "window");
  template[windowMenuKey as any].submenu = windowMenuMacSubmenu;
}

if (IS_DEV_ENV) {
  const developerMenu = {
    label: "Developer",
    submenu: [
      {role: "toggleDevTools"},
    ],
  };
  // @ts-ignore
  template.push(developerMenu);
}

export const fileMenuTemplate = template;
