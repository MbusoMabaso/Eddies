import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import React from 'react';
import { useFonts } from 'expo-font';
import { Pacifico_400Regular } from '@expo-google-fonts/pacifico';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { LightTheme, DarkTheme } from '@/constants/appThemes';
import { ThemeContext, ThemeMode } from '@/hooks/theme-context';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Pacifico_400Regular });
  const system = useColorScheme();
  const [override, setOverride] = React.useState<ThemeMode | null>(null);
  const colorScheme = override ?? system;

  const toggle = React.useCallback(() => {
    setOverride(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading indicator
  }

  return (
    <ThemeContext.Provider value={{ mode: colorScheme as ThemeMode, toggle }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
