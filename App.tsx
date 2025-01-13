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
import {lightColors, darkColors} from './theme';

const Stack = createNativeStackNavigator<RootStackParamList>();


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
          regular: { fontFamily: 'System', fontWeight: 'normal' },
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
  const styles = useStyle();
  return (
    <GraphqlProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <SafeAreaView style={[styles.safeArea]}>
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
                        options={({ route }) => ({
                          title: route.params?.rink?.name,
                        })}
                      />
                    </Stack.Navigator>
                  </Navigation>
              </RinkProvider>
            </DistrictProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </GraphqlProvider>
  );
}


export default App;