import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "./theme";
import { Colors } from "@rneui/base";
import { ECondition } from "./models/Rink";

export const useColors = (): Colors => {
  return lightColors;
  //const isDarkMode = useColorScheme() === "dark";
  // return isDarkMode ? darkColors : lightColors;
};

export const conditionColor = (condition: ECondition) => {
  const colors = useColors();

  switch (condition) {
    case ECondition.Excellente:
      return colors.success;
    case ECondition.Good:
      return colors.warning;
    case ECondition.Bad:
      return colors.error;
    default:
      return colors.grey3;
  }
};

export const cleanColor = (clean: boolean) => {
  const colors = useColors();

  return clean ? colors.primary : colors.grey3;
};

export const openColor = (open: boolean) => {
  const colors = useColors();

  return open ? colors.success : colors.grey3;
};

export const waterColor = (water: boolean) => {
  const colors = useColors();

  return water ? colors.primary : colors.grey3;
};

export const resurfacedColor = (resurfaced: boolean) => {
  const colors = useColors();

  return resurfaced ? colors.primary : colors.grey3;
};
