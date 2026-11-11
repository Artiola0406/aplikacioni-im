import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Restaurant } from '@/types';
import { formatMoney } from '@/data/restaurants';

type Props = {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
};

export default function RestaurantCard({ restaurant, onPress }: Props) {
  return (
    <Pressable onPress={() => onPress(restaurant)} style={styles.card}>
      <Image source={{ uri: restaurant.image }} style={styles.image} contentFit="cover" />
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>{restaurant.badge}</Text></View>
        </View>
        <Text style={styles.meta}>{restaurant.cuisine.join(' · ')}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.offer}>-{restaurant.discount}% OFF</Text>
          <Text style={styles.rating}>★ {restaurant.rating} ({restaurant.reviews})</Text>
        </View>
        <View style={styles.bottomRow}>
          <Text style={styles.metaText}>{restaurant.etaMinutes}</Text>
          <Text style={styles.metaText}>{restaurant.distanceKm.toFixed(1)} km</Text>
        </View>
        <Text style={styles.delivery}>Dërgesë {formatMoney(restaurant.deliveryFeeCents)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  image: { width: 92, height: 92, borderRadius: 18 },
  content: { flex: 1, justifyContent: 'space-between' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  name: { fontSize: 18, fontWeight: '700', color: '#111827' },
  badge: { backgroundColor: '#FFF1EA', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeText: { color: '#EE6C3A', fontSize: 11, fontWeight: '700' },
  meta: { color: '#6B7280', fontSize: 12, marginTop: 4 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  offer: { fontSize: 15, color: '#B45309', fontWeight: '800' },
  rating: { color: '#111827', fontWeight: '600' },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  metaText: { color: '#6B7280', fontSize: 12 },
  delivery: { color: '#6B7280', fontSize: 12, marginTop: 8 },
});
