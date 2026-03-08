import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Linking, View, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import { productsByCategory } from '@/constants/data';
import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';
import { ThemeContext } from '@/hooks/theme-context';

// generate random products (2-5 per category) and shuffle
const featuredProducts = Object.entries(productsByCategory).flatMap(([catId, list]) => {
  const count = Math.min(list.length, Math.floor(Math.random() * 4) + 2);
  return list
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .map(p => ({ ...p, category: catId }));
}).sort(() => Math.random() - 0.5);


export default function HomeScreen() {
  const router = useRouter();
  const theme = React.useContext(ThemeContext);
  const [navOpen, setNavOpen] = React.useState(false);
  const [showFooter, setShowFooter] = React.useState(true);
  const scrollOffset = React.useRef(0);

  const onScroll = (e: any) => {
    const offset = e.nativeEvent.contentOffset.y;
    if (offset > scrollOffset.current + 5) {
      setShowFooter(false);
    } else if (offset < scrollOffset.current - 5) {
      setShowFooter(true);
    }
    scrollOffset.current = offset;
  };

  return (
    <>
      <Header onOpenMenu={() => setNavOpen(true)} />
      <NavMenu visible={navOpen} onClose={() => setNavOpen(false)} />
      <ScrollView
        contentContainerStyle={[styles.container, { paddingBottom: 40 }]}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >

        {/* products grid */}
        <View style={styles.featureContainer}>
          {featuredProducts.map(p => (
            <TouchableOpacity
              key={p.id}
              style={styles.featuredCard}
              onPress={() => router.push(`/category/${p.category}`)}
            >
              <Image source={p.image} style={styles.featuredImage} resizeMode="cover" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
      {/* sticky footer */}
      {showFooter && (
        <View
          style={[
            styles.footerContainer,
            { backgroundColor: theme.mode === 'dark' ? '#000' : '#fff' },
          ]}
        >
          <TouchableOpacity onPress={() => Linking.openURL('https://mtechservice.vercel.app')}>
            <ThemedText
              style={[
                styles.footer,
                { color: theme.mode === 'dark' ? '#fff' : '#000' },
              ]}
            >
              2026 Mtech
              <ThemedText
                style={[
                  styles.footerSub,
                  { color: theme.mode === 'dark' ? '#fff' : '#000' },
                ]}
              >
                C
              </ThemedText>
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 12,
    textAlign: 'center',
  },
  featureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  featuredCard: {
    width: '48%',
    marginBottom: 12,
  },
  featuredImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  imagePlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    height: 120,
    borderRadius: 8,
  },

  footer: {
    marginTop: 40,
    textAlign: 'center',
    color: '#888',
    marginBottom: 20,
  },
  footerSub: {
    fontSize: 10,
    lineHeight: 10,
    textAlignVertical: 'top',
  },
});
