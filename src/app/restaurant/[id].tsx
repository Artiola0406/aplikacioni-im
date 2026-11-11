import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import MenuItemCard from '@/components/MenuItemCard';
import FloatingCartBar from '@/components/FloatingCartBar';
import { restaurants } from '@/data/restaurants';
import { useCart } from '@/context/cart-context';
import type { MenuItem } from '@/types';

type CategoryChip = 'Të gjitha' | 'Pica klasike' | 'Pica speciale' | 'Pije' | 'Sallata' | 'Burger' | 'Sidet' | 'Pasta' | 'Roll' | 'Nigiri' | 'Supa';

export default function RestaurantMenuScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const restaurant = restaurants.find(item => item.id === id) ?? restaurants[0];
  const [selectedCategory, setSelectedCategory] = useState<CategoryChip>('Të gjitha');
  const [liked, setLiked] = useState(false);
  const { addItem, items, subtotalCents, itemCount } = useCart();

  const categories = useMemo(() => {
    const unique = new Set<string>(['Të gjitha']);
    restaurant.menu.forEach(item => unique.add(item.category));
    return Array.from(unique) as CategoryChip[];
  }, [restaurant.menu]);

  const visibleItems = useMemo(() => {
    return selectedCategory === 'Të gjitha'
      ? restaurant.menu
      : restaurant.menu.filter(item => item.category === selectedCategory);
  }, [restaurant.menu, selectedCategory]);

  const handleAddItem = (item: MenuItem) => {
    const currentRestaurantId = items.length > 0 ? items[0].restaurantId : restaurant.id;
    if (items.length > 0 && currentRestaurantId !== restaurant.id) {
      Alert.alert(
        'Shporta ka artikuj nga një restorant tjetër.',
        'Do ta zbrasësh?',
        [
          { text: 'Anulo', style: 'cancel' },
          { text: 'Zbraz dhe shto', onPress: () => { const next = { ...item }; addItem(next, restaurant.id); } },
        ]
      );
      return;
    }
    addItem(item, restaurant.id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: restaurant.image }} style={styles.heroImage} contentFit="cover" />
          <View style={styles.heroOverlay} />
          <View style={styles.topActions}>
            <Pressable onPress={() => router.back()} style={styles.circleButton}><Text style={styles.circleText}>←</Text></Pressable>
            <Pressable onPress={() => setLiked(v => !v)} style={styles.circleButton}><Text style={styles.circleText}>{liked ? '♥' : '♡'}</Text></Pressable>
          </View>
          <View style={styles.heroBadge}><Text style={styles.heroBadgeText}>-{restaurant.discount}% OFF</Text></View>
          <View style={styles.heroTextWrap}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.tags}>{restaurant.cuisine.join(' · ')}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaPill}>⏱ {restaurant.etaMinutes}</Text>
              <Text style={styles.metaPill}>★ {restaurant.rating}</Text>
              <Text style={styles.metaPill}>{restaurant.distanceKm.toFixed(1)} km</Text>
            </View>
          </View>
        </View>

        <View style={styles.whiteCard}>
          <Text style={styles.descriptionTitle}>Përshkruaj</Text>
          <Text style={styles.description}>Kuzhina tonë sjell një përvojë të shpejtë dhe të shijshme, me përbërës të freskët dhe porosi të shpejta sad.</Text>
          <View style={styles.openRow}><Text style={styles.openHour}>🕒 Hapur tani · {restaurant.openHours}</Text></View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {categories.map(category => (
              <Pressable
                key={category}
                style={[styles.categoryChip, selectedCategory === category && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[styles.categoryText, selectedCategory === category && styles.categoryTextActive]}>{category}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.menuList}>
            {visibleItems.map(item => (
              <MenuItemCard key={item.id} item={item} onAdd={handleAddItem} />
            ))}
          </View>
        </View>
      </ScrollView>

      {itemCount > 0 ? (
        <FloatingCartBar itemCount={itemCount} totalCents={subtotalCents} onPress={() => router.push('/(tabs)/cart')} />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F4F6' },
  content: { paddingBottom: 120 },
  heroWrap: { position: 'relative', height: 260 },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.26)',
  },
  topActions: {
    position: 'absolute',
    top: 26,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.26)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  circleText: { color: '#fff', fontSize: 24, fontWeight: '700' },
  heroBadge: { position: 'absolute', top: 26, right: 64, zIndex: 2, backgroundColor: '#EE6C3A', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  heroBadgeText: { color: '#fff', fontWeight: '800' },
  heroTextWrap: { position: 'absolute', left: 18, right: 18, bottom: 18, zIndex: 2 },
  name: { fontSize: 32, fontWeight: '800', color: '#fff', marginBottom: 6 },
  tags: { color: '#fff', opacity: 0.9, marginBottom: 10 },
  metaRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  metaPill: { backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999, overflow: 'hidden', fontSize: 12 },
  whiteCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -22,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 18,
    paddingBottom: 28,
  },
  descriptionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 6 },
  description: { color: '#6B7280', fontSize: 13, lineHeight: 20 },
  openRow: { marginTop: 12 },
  openHour: { color: '#111827', fontWeight: '600' },
  chipsRow: { marginTop: 18, paddingBottom: 8, gap: 8 },
  categoryChip: { backgroundColor: '#F3F4F6', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10 },
  categoryChipActive: { backgroundColor: '#111827' },
  categoryText: { color: '#374151', fontWeight: '700' },
  categoryTextActive: { color: '#fff' },
  menuList: { marginTop: 18 },
});
