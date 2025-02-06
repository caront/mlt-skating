import { Colors } from "@rneui/themed";

const colorList = {
  lightBlue: "#A6E1FA",
  lightGrey: "#e0eaf5",
  darkGrey: "#a6afba",
  darkBlue: "#003D73",
  purple: "#bb64e4",
  cyan: "#43c7d6",
};

export const lightColors: Colors = {
  primary: colorList.lightBlue,
  secondary: colorList.cyan,
  background: colorList.lightGrey,
  white: "#FAFAFA",
  black: "#000000",
  grey0: "#F5F5F5",
  grey1: "#E1E1E1",
  grey2: "#C7C7C7",
  grey3: "#A1A1A1",
  grey4: "#7D7D7D",
  grey5: "#4D4D4D",
  greyOutline: "#D0D0D0",
  searchBg: colorList.lightGrey,
  success: "#28A745", // Green
  warning: "#FFC107", // Yellow
  error: "#DC3545", // Red
  disabled: "#E0E0E0",
  divider: "#E0E0E0",
  platform: {
    ios: {
      primary: colorList.lightBlue,
      secondary: colorList.purple,
      grey: "#E1E1E1",
      searchBg: "#E1E1E1",
      success: "#28A745",
      error: "#FFC107",
      warning: "#DC3545",
    },
    android: {
      primary: colorList.lightBlue,
      secondary: colorList.purple,
      grey: "#E1E1E1",
      searchBg: "#E1E1E1",
      success: "#28A745",
      error: "#FFC107",
      warning: "#DC3545",
    },
    web: {
      primary: colorList.lightBlue,
      secondary: colorList.purple,
      grey: "#E1E1E1",
      searchBg: "#E1E1E1",
      success: "#28A745",
      error: "#FFC107",
      warning: "#DC3545",
    },
    default: {
      primary: colorList.lightBlue,
      secondary: colorList.purple,
      grey: "#E1E1E1",
      searchBg: "#E1E1E1",
      success: "#28A745",
      error: "#FFC107",
      warning: "#DC3545",
    },
  },
};

export const darkColors: Colors = {
  primary: colorList.darkBlue,
  secondary: colorList.darkBlue,
  background: colorList.darkGrey,
  white: "#3C3C3C",
  black: "#000000",
  grey0: "#FFFFFF",
  grey1: "#2E2E2E",
  grey2: "#3C3C3C",
  grey3: "#4A4A4A",
  grey4: "#FFFFFF",
  grey5: "#FFFFFF",
  greyOutline: "#707070",
  searchBg: "#1F1F1F",
  success: "#28A745", // Green
  warning: "#FFC107", // Yellow
  error: "#DC3545", // Red
  disabled: "#424242",
  divider: "#383838",
  platform: {
    ios: {
      primary: colorList.darkBlue,
      secondary: colorList.cyan,
      grey: "#2E2E2E",
      searchBg: "#2E2E2E",
      success: "#28A745",
      error: "#FFC107",
      warning: "#DC3545",
    },
    android: {
      primary: colorList.darkBlue,
      secondary: colorList.cyan,
      grey: "#2E2E2E",
      searchBg: "#2E2E2E",
      success: "#28A745",
      error: "#FFC107",
      warning: "#DC3545",
    },
    web: {
      primary: colorList.darkBlue,
      secondary: colorList.cyan,
      grey: "#2E2E2E",
      searchBg: "#2E2E2E",
      success: "#28A745",
      error: "#FFC107",
      warning: "#DC3545",
    },
    default: {
      primary: colorList.darkBlue,
      secondary: colorList.cyan,
      grey: "#2E2E2E",
      searchBg: "#2E2E2E",
      success: "#28A745",
      error: "#FFC107",
      warning: "#DC3545",
    },
  },
};
