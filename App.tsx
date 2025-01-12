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

const Stack = createNativeStackNavigator<RootStackParamList>();


const buildTheme = () => {
  const colors = useColors();

  return createTheme({
    lightColors: {
      primary: colors.primary.midnightBlue,
      secondary: colors.primary.iceBlue,
      background: colors.primary.snowWhite,
    },
    darkColors: {
      primary: colors.primary.snowWhite,
      secondary: colors.primary.iceBlue,
      background: colors.primary.midnightBlue,
    }
  })
}


const Navigation: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <NavigationContainer
      theme={{
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.white,
          text: theme.colors.black,
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
    container: {
      flex: 1,
      backgroundColor: colors.primary.snowWhite,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.primary.snowWhite,
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
                <View style={styles.container}>
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
                </View>
              </RinkProvider>
            </DistrictProvider>
          </SafeAreaView>
        </SafeAreaProvider>
      </ThemeProvider>
    </GraphqlProvider>
  );
}


export default App;