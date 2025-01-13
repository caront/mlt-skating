import {useColorScheme} from 'react-native';
import { darkColors, lightColors } from './theme';
import { Colors } from '@rneui/base';

export const useColors = (): Colors => {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? darkColors : lightColors;
};
