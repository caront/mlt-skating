import {useColorScheme} from 'react-native';

export const RED_DARK = '#780000';
export const RED_LIGHT = '#C1121F';
export const BEIGE = '#FDF0D5';
export const BLUE_DARK = '#003049';
export const BLUE_LIGHT = '#669BBC';

const colors = {
  lightTheme: {
    primary: {
      iceBlue: '#A6E1FA',
      snowWhite: '#F8F9FA',
      midnightBlue: '#003D73',
    },
    accent: {
      skatingRed: '#FF4D4D',
      emeraldGreen: '#4CAF50',
      goldenYellow: '#FFC107',
    },
    neutral: {
      steelGray: '#6C757D',
      charcoal: '#343A40',
    },
    gradients: {
      aurora: ['#A6E1FA', '#F8F9FA'],
      nightfall: ['#003D73', '#343A40'],
    },
  },
  darkTheme: {
    primary: {
      iceBlue: '#7FB8DA',
      snowWhite : '#E1E6E9',
      midnightBlue: '#002A4E',
    },
    accent: {
      skatingRed: '#D94040',
      emeraldGreen: '#3A8F3C',
      goldenYellow: '#D69E06',
    },
    neutral: {
      steelGray: '#565C62',
      charcoal: '#212529',
    },
    gradients: {
      aurora: ['#7FB8DA', '#E1E6E9'],
      nightfall: ['#002A4E', '#212529'],
    },
  },
};

interface Palette {
  primary: {
    iceBlue: string;
    snowWhite: string;
    midnightBlue: string;
  };
  accent: {
    skatingRed: string;
    emeraldGreen: string;
    goldenYellow: string;
  };
  neutral: {
    steelGray: string;
    charcoal: string;
  };
  gradients: {
    aurora: string[];
    nightfall: string[];
  };
}

export const useColors = (): Palette => {
  const isDarkMode = useColorScheme() === 'dark';
  return isDarkMode ? colors.darkTheme : colors.lightTheme;
};
