// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    white: string;
    black: string;
    gray: { [key in ColorScale]: string };
    main: string;
    topbar: string;
    transparent: string;
  }
}

export type ColorScale = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
