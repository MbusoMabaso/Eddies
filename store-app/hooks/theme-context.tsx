import React from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  mode: 'light',
  toggle: () => {},
});
