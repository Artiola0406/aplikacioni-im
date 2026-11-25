import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GjendjaBosh from '@/components/GjendjaBosh';
import GjendjaPaRrjet from '@/components/GjendjaPaRrjet';
import RestaurantCard from '@/components/RestaurantCard';
import { restaurants } from '@/data/restaurants';
import { useNetworkState } from '@/hooks/use-network-state';

export default function OffersScreen() {
  const { isConnected, refresh } = useNetworkState();
  const offers = restaurants.filter(restaurant => restaurant.discount > 0);

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Oferta</Text>
        {!isConnected ? (
          <GjendjaPaRrjet onRetry={refresh} />
        ) : offers.length === 0 ? (
          <GjendjaBosh
            icon="pricetag-outline"
            title="Nuk ka oferta"
            description="Aktualisht nuk ka restorante me zbritje."
          />
        ) : (
          offers.map(restaurant => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onPress={item => router.push({ pathname: '/restaurant/[id]', params: { id: item.id } })}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F4F6' },
  content: { paddingHorizontal: 18, paddingTop: 24, paddingBottom: 110 },
  title: { fontSize: 28, fontWeight: '800', color: '#111827', marginBottom: 16 },
});
