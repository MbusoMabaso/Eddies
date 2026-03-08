import React from 'react';
import { View, Modal, Pressable, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { categories } from '@/constants/data';
import { ThemeContext } from '@/hooks/theme-context';

interface NavMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function NavMenu({ visible, onClose }: NavMenuProps) {
  const router = useRouter();

  const navItems = [
    { label: 'Contact', path: '/contact' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Clearance', path: '/clearance' },
  ];

  const theme = React.useContext(ThemeContext);
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={[styles.menu, { backgroundColor: theme.mode === 'dark' ? '#000' : '#fff' }] }>
          {categories.map(cat => (
            <Pressable
              key={cat.id}
              onPress={() => {
                router.push(`/category/${cat.id}`);
                onClose();
              }}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: 'rgba(128,0,255,0.2)' },
              ]}
            >
              <Text style={[styles.menuText, { color: theme.mode === 'dark' ? '#fff' : '#000' }]}>{cat.name}</Text>
            </Pressable>
          ))}

          {navItems.map(item => (
            <Pressable
              key={item.label}
              onPress={() => {
                router.push(item.path);
                onClose();
              }}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && { backgroundColor: 'rgba(128,0,255,0.2)' },
              ]}
            >
              <Text style={[styles.menuText, { color: theme.mode === 'dark' ? '#fff' : '#000' }]}>{item.label}</Text>
            </Pressable>
          ))}

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.menuItem,
              pressed && { backgroundColor: 'rgba(128,0,255,0.2)' },
            ]}
          >
            <Text style={[styles.menuText, { color: theme.mode === 'dark' ? '#f88' : 'red' }]}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  menu: {
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 40,
  },
  menuItem: {
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 18,
  },
});