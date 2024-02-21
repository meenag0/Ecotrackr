import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider, useRoute } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import calc from './carboncalc/calc';
import Home from './(tabs)/home';
import AppIntroScreen from './welcome';
import { NavigationContainer } from '@react-navigation/native'; 

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'welcome',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const [showIntroSlider, setShowIntroSlider] = useState(true); // State to control showing the intro-slider

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const Stack = createStackNavigator(); // Create Stack Navigator
  return (
        <Stack.Navigator initialRouteName="welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name='welcome' component={AppIntroScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="calc" component={calc} />
        </Stack.Navigator>
  );
}

