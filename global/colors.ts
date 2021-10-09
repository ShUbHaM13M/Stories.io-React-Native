const gray6 = "#12181b";
const blue = "#0084a5";
const purple = "#d8a4eb";
const gray0 = "#f8f8f8";
const gray5 = "#24282f";
export const error = "#ff3e3e";
export const secondary = "#4368b3";

export const dark = {
  background: gray5,
  text: gray0,
  borderColor: purple,
  navColor: gray6,
  name: "dark",
};

export const light = {
  background: gray0,
  text: gray6,
  borderColor: blue,
  navColor: "#FFFFFF",
  name: "light",
};

export type Theme = {
  background: typeof dark.background | typeof light.background;
  text: typeof dark.text | typeof light.text;
  borderColor: typeof dark.borderColor | typeof light.borderColor;
  navColor: typeof dark.navColor | typeof light.navColor;
  name: string;
};

export interface CustomThemeProps {
  theme?: Theme;
}
