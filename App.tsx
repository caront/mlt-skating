import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RinkListScreen } from './screens/RinkListScreen';
import RinkInformationScreen from './screens/RinkInformationScreen';
import { RootStackParamList } from './screens/types';
import { createTheme, ThemeProvider, useTheme } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColors } from './colors';
import GraphqlProvider from './graphql/GraphqlProvider';
import { DistrictProvider } from './contexts/DistrictContext';
import { RinkProvider } from './contexts/RinkContext';
import { lightColors, darkColors } from './theme';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LogProvider from './utils/logs';
import { LocateProvider } from './contexts/LocateContext';
import { I18NProvider } from './lang/i18n';
import { CityProvider } from './contexts/CityContext';
import { RinkGroupProvider } from './contexts/RinkGroupContext';
import AdsProvider from './utils/AdsProvider';

const Stack = createNativeStackNavigator<RootStackParamList>();

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // Reanimated runs in strict mode by default
});

const buildTheme = () => {
  return createTheme({
    lightColors,
    darkColors,
  })
}


const Navigation: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { theme } = useTheme();
  const colors = useColors();
  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: colors.primary,
          background: colors.background,
          card: colors.white,
          text: colors.grey5,
          border: '',
          notification: ''
        },
        fonts: {
          regular: { fontFamily: 'Mulish-Regular', fontWeight: 'normal' },
          bold: { fontFamily: 'System', fontWeight: 'normal' },
          medium: { fontFamily: 'System', fontWeight: 'normal' },
          heavy: { fontFamily: 'System', fontWeight: 'normal' },
        },

        dark: theme.mode === 'dark',
      }}
    >
      {children}
    </NavigationContainer>
  );
};

const useStyle = () => {
  const colors = useColors();
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
  });
}

function App(): React.JSX.Element {
  const theme = buildTheme();
  return (
    <LogProvider>
      <I18NProvider>
        <AdsProvider>

          <GraphqlProvider>
            <ThemeProvider theme={theme}>
              <SafeAreaProvider>
                <GestureHandlerRootView>
                  <LocateProvider>
                    <DistrictProvider>
                      <RinkProvider>
                        <Navigation>
                          <Stack.Navigator>
                            <Stack.Screen
                              name="RinkList"
                              component={RinkListScreen}
                              options={{ headerShown: false, title: 'Rinks' }}
                            />
                            <Stack.Screen
                              name="RinkInformation"
                              component={RinkInformationScreen}
                              options={{ headerShown: false, title: 'RinkInformation' }}
                            />
                          </Stack.Navigator>
                        </Navigation>
                      </RinkProvider>
                    </DistrictProvider>
                  </LocateProvider>
                </GestureHandlerRootView>
              </SafeAreaProvider>
            </ThemeProvider>
          </GraphqlProvider>
        </AdsProvider>
      </I18NProvider>
    </LogProvider >
  );
}


export default App;