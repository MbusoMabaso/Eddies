import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';

export default function ContactScreen() {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <>
      <Header onOpenMenu={() => setNavOpen(true)} />
      <NavMenu visible={navOpen} onClose={() => setNavOpen(false)} />
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title">Contact Us</ThemedText>
        <ThemedText style={styles.text}>This is a placeholder contact page.</ThemedText>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  text: { marginTop: 8 },
});