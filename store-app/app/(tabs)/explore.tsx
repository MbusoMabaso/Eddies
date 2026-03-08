import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';

export default function ExploreScreen() {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <>
      <Header onOpenMenu={() => setNavOpen(true)} />
      <NavMenu visible={navOpen} onClose={() => setNavOpen(false)} />
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.header}>
          Explore
        </ThemedText>
        <ThemedText>Tap the Home tab to browse categories of essentials.</ThemedText>
        <ThemedText style={styles.note}>
          This area could become a search page, deals, or any secondary feature.
        </ThemedText>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  note: {
    marginTop: 8,
    fontStyle: 'italic',
  },
});
