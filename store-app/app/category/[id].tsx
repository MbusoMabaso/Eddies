import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { productsByCategory } from '@/constants/data';
import React from 'react';
import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';


export default function CategoryScreen() {
  const router = useRouter();
  // expo-router provides a hook for the dynamic segment
  const { id } = useLocalSearchParams<{ id: string }>();
  const products = id ? productsByCategory[id] || [] : [];
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <>
      <Header onOpenMenu={() => setNavOpen(true)} />
      <NavMenu visible={navOpen} onClose={() => setNavOpen(false)} />
      <ScrollView contentContainerStyle={styles.container}>
        <ThemedText type="title" style={styles.header}>
          {id ? id.charAt(0).toUpperCase() + id.slice(1) : ''}
        </ThemedText>
        {products.length === 0 ? (
          <ThemedText>No products in this category yet.</ThemedText>
        ) : (
          products.map(p => (
            <TouchableOpacity
              key={p.id}
              style={styles.productCard}
              onPress={() => {
                /* placeholder: nothing to do yet */
              }}>
              <Image source={p.image} style={styles.productImage} />
              <ThemedText>{p.name}</ThemedText>
            </TouchableOpacity>
          ))
        )}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ThemedText type="link">Go back</ThemedText>
        </TouchableOpacity>
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
  productCard: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: 'rgba(128,0,255,0.1)',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    width: '100%',
    height: 80,
    borderRadius: 8,
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
});