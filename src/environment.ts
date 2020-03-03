import installExtension, { REACT_DEVELOPER_TOOLS } from "electron-devtools-installer";

export const IS_MAC_OS = process.platform === "darwin";

export const IS_DEV_ENV = process.env.NODE_ENV !== "production";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

export async function installExtensions() {
  try {
    const reactDevTools = await installExtension(REACT_DEVELOPER_TOOLS);
    console.log(`installed ${reactDevTools}`);
  } catch (err) {
    console.log("An error occurred: ", err);
  }
}
