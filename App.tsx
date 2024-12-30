import React, { StrictMode } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlaceListScreen } from './screens/PlaceListScreen';
import PlaceInformationScreen from './screens/PlaceInformationScreen';
import { RootStackParamList } from './screens/types';
import { createTheme, ThemeProvider } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { useColors } from './colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = createTheme({
  lightColors: {
    primary: 'red',
  },
  darkColors: {
    primary: 'blue',
  },
  components: {
    Button: {
      raised: true,
    },
  },
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const colors = useColors();

  return (
    <ThemeProvider theme={theme}>
      <StrictMode>
        <SafeAreaProvider>
          <SafeAreaView style={[styles.safeArea]}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={colors.neutral.charcoal}
            />
            <View style={styles.container}>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    name="PlaceList"
                    component={PlaceListScreen}
                    options={{ headerShown: false, title: 'Places' }}
                  />
                  <Stack.Screen
                    name="PlaceInformation"
                    component={PlaceInformationScreen}
                    options={({ route }) => ({
                      title: route.params?.place?.name,
                    })}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </StrictMode>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default App;