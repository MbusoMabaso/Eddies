import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Linking, View, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { Header } from '@/components/Header';
import { NavMenu } from '@/components/NavMenu';
import { ThemeContext } from '@/hooks/theme-context';

interface GumtreeListing {
  id: string;
  title: string;
  price?: string;
  image?: string;
}

export default function HomeScreen() {
  const theme = React.useContext(ThemeContext);
  const [navOpen, setNavOpen] = React.useState(false);
  const [showFooter, setShowFooter] = React.useState(true);
  const [gumtreeListings, setGumtreeListings] = useState<GumtreeListing[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollOffset = React.useRef(0);

  useEffect(() => {
    fetchGumtreeListings();
  }, []);

  const fetchGumtreeListings = async () => {
    try {
      console.log('Starting Gumtree fetch...');
      // Use a CORS proxy to fetch Gumtree data
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const targetUrl = 'https://www.gumtree.co.za/u-seller-listings/ruimsig-mobiles/v1u134061598p1';
      console.log('Fetching:', proxyUrl + encodeURIComponent(targetUrl));
      const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const html = await response.text();
      console.log('HTML length:', html.length);
      
      // Extract listing IDs from dataLayer
      const idMatches = html.match(/"id":"(\d+)"/g);
      console.log('ID matches found:', idMatches?.length || 0);
      
      if (idMatches) {
        const ids = idMatches.map(match => match.match(/"id":"(\d+)"/)?.[1]).filter(Boolean).slice(0, 8);
        console.log('Extracted IDs:', ids);
        
        // Fetch details for each listing
        const listingsPromises = ids.map(async (id, index) => {
          try {
            const listingResponse = await fetch(proxyUrl + encodeURIComponent(`https://www.gumtree.co.za/a-mobile-phones/ruimsig-mobiles/${id}`));
            const listingHtml = await listingResponse.text();
            
            // Extract title from <title> tag
            const titleMatch = listingHtml.match(/<title>([^<]+)<\/title>/);
            const title = titleMatch ? titleMatch[1].replace(' | Gumtree Classifieds South Africa', '').trim() : `Listing ${index + 1}`;
            
            // Extract image from meta og:image or first image
            const imageMatch = listingHtml.match(/property="og:image" content="([^"]+)"/) || 
                              listingHtml.match(/<img[^>]+src="([^"]+)"[^>]*class="[^"]*image[^"]*"/);
            const image = imageMatch ? imageMatch[1] : `https://source.unsplash.com/featured/200x200?mobile-phone-${index}`;
            
            // Extract price if available
            const priceMatch = listingHtml.match(/R\s*[\d,]+/);
            const price = priceMatch ? priceMatch[0] : undefined;
            
            return {
              id: id || `listing-${index}`,
              title,
              price,
              image
            };
          } catch (error) {
            console.error(`Error fetching listing ${id}:`, error);
            return {
              id: id || `listing-${index}`,
              title: `Mobile Phone Listing ${index + 1}`,
              price: `R${Math.floor(Math.random() * 5000) + 1000}`,
              image: `https://source.unsplash.com/featured/200x200?mobile-phone-${index}`
            };
          }
        });
        
        const listings = await Promise.all(listingsPromises);
        setGumtreeListings(listings);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Gumtree listings:', error);
      // Fallback to sample data
      const sampleListings: GumtreeListing[] = [
        {
          id: 'sample-1',
          title: 'iPhone 13 Pro Max - 256GB',
          price: 'R8500',
          image: 'https://source.unsplash.com/featured/200x200?iphone'
        },
        {
          id: 'sample-2', 
          title: 'Samsung Galaxy S23 Ultra',
          price: 'R12000',
          image: 'https://source.unsplash.com/featured/200x200?samsung'
        },
        {
          id: 'sample-3',
          title: 'Google Pixel 7 Pro',
          price: 'R9500', 
          image: 'https://source.unsplash.com/featured/200x200?pixel'
        },
        {
          id: 'sample-4',
          title: 'OnePlus 11 - 256GB',
          price: 'R7800',
          image: 'https://source.unsplash.com/featured/200x200?oneplus'
        }
      ];
      setGumtreeListings(sampleListings);
      setLoading(false);
    }
  };

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
        {/* Debug message */}
        <ThemedText type="defaultSemiBold" style={{ textAlign: 'center', marginBottom: 20, fontSize: 18 }}>
          E⚡ECTRO - Mobile Phone Store
        </ThemedText>

        {/* products grid */}
        <View style={styles.featureContainer}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ThemedText type="defaultSemiBold">Loading Gumtree listings...</ThemedText>
            </View>
          ) : (
            gumtreeListings.map(listing => (
              <TouchableOpacity
                key={listing.id}
                style={styles.featuredCard}
                onPress={() => Linking.openURL(`https://www.gumtree.co.za/a-mobile-phones/ruimsig-mobiles/${listing.id}`)}
              >
                <Image source={{ uri: listing.image }} style={styles.featuredImage} resizeMode="cover" />
                <View style={styles.listingInfo}>
                  <ThemedText type="defaultSemiBold" numberOfLines={2}>{listing.title}</ThemedText>
                  {listing.price && <ThemedText style={styles.price}>{listing.price}</ThemedText>}
                </View>
              </TouchableOpacity>
            ))
          )}
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
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
  listingInfo: {
    padding: 8,
  },
  price: {
    color: '#8000ff',
    fontWeight: 'bold',
    marginTop: 4,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
});
