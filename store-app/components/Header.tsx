import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemeContext } from '@/hooks/theme-context';
import { ThemedText } from './themed-text';

interface HeaderProps {
  onOpenMenu?: () => void;
}

export function Header({ onOpenMenu }: HeaderProps) {
  const router = useRouter();
  const theme = React.useContext(ThemeContext);
  const iconColor = theme.mode === 'dark' ? '#fff' : '#000';

  const openSearch = () => {
    router.push('/search');
  };

  return (
    <View style={[styles.container]}>       
      <Pressable
        onPress={onOpenMenu}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && { backgroundColor: 'rgba(128,0,255,0.2)' },
        ]}
      >
        <Ionicons name="menu" size={24} color={iconColor} />
      </Pressable>
      <Pressable
        onPress={openSearch}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && { backgroundColor: 'rgba(128,0,255,0.2)' },
        ]}
      >
        <Ionicons name="search" size={24} color={iconColor} />
      </Pressable>
      {/* centered title using absolute positioning */}
      <View style={styles.titleContainer} pointerEvents="none">
        <ThemedText
          type="title"
          style={{
            fontFamily: 'Pacifico_400Regular',
            fontSize: 20,
            color: theme.mode === 'dark' ? '#8000ff' : '#8000ff',
          }}
        >
          EDDIES
        </ThemedText>
      </View>
      <View style={styles.flex} />
      <Pressable
        onPress={theme.toggle}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && { backgroundColor: 'rgba(128,0,255,0.2)' },
        ]}
      >
        <Ionicons name={theme.mode === 'dark' ? 'sunny' : 'moon'} size={24} color={iconColor} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  iconButton: {
    padding: 8,
  },
  flex: {
    flex: 1,
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});