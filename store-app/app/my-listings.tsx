import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { productsByCategory } from '@/constants/data';

export default function MyListingsScreen() {
  const router = useRouter();

  // Get all products from all categories
  const allProducts = Object.values(productsByCategory).flat();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>My Listings</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {allProducts.map(product => (
          <View key={product.id} style={styles.productItem}>
            <ThemedText type="defaultSemiBold">{product.name}</ThemedText>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { marginRight: 16 },
  title: { flex: 1 },
  content: { padding: 16 },
  productItem: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
});