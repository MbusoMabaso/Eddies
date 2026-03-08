import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme, Theme } from '@react-navigation/native';

// Custom themes with black/white backgrounds and purple accent
const purpleAccent = '#8000ff';

export const LightTheme: Theme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
    primary: purpleAccent,
    card: '#ffffff',
    border: '#e0e0e0',
  },
};

export const DarkTheme: Theme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    background: '#000000',
    text: '#ffffff',
    primary: purpleAccent,
    card: '#000000',
    border: '#333333',
  },
};