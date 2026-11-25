import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import RestaurantCard from '@/components/RestaurantCard';
import GjendjaPaRrjet from '@/components/GjendjaPaRrjet';
import GjendjaBosh from '@/components/GjendjaBosh';
import { useNetworkState } from '@/hooks/use-network-state';
import { restaurants } from '@/data/restaurants';

const filters = ['Të gjitha', 'Popullore', 'Oferta', 'Të reja', 'Shëndetshme'];

export default function RestaurantsScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Të gjitha');
  const { isConnected, refresh } = useNetworkState();

  const filteredRestaurants = useMemo(() => {
    const query = search.toLowerCase().trim();
    return restaurants.filter(restaurant => {
      const matchesSearch =
        !query ||
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.cuisine.some(item => item.toLowerCase().includes(query));

      const matchesFilter =
        filter === 'Të gjitha' ||
        (filter === 'Popullore' && restaurant.badge === 'Popullore') ||
        (filter === 'Oferta' && restaurant.discount > 0) ||
        (filter === 'Të reja' && restaurant.reviews < 1000) ||
        (filter === 'Shëndetshme' && restaurant.badge === 'Shëndetshme');

      return matchesSearch && matchesFilter;
    });
  }, [filter, search]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        {!isConnected ? (
          <View style={styles.offlineBanner}>
            <Ionicons name="cloud-offline-outline" size={18} color="#fff" />
            <Text style={styles.offlineBannerText}>Pa lidhje interneti</Text>
          </View>
        ) : null}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Restorantet pranë teje</Text>
          <Pressable style={styles.menuButton}><Text style={styles.menuButtonText}>⋯</Text></Pressable>
        </View>

        <View style={styles.searchWrap}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Kërko restorante, ushqim ose kuzhinë..."
            placeholderTextColor="#4B5563"
            style={styles.searchInput}
          />
          <Pressable style={styles.filterButton} accessibilityLabel="Opsionet e filtrimit">
            <Ionicons name="options-outline" size={22} color="#fff" />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {filters.map(item => (
            <Pressable key={item} onPress={() => setFilter(item)} style={[styles.chip, filter === item && styles.chipActive]}>
              <Text style={[styles.chipText, filter === item && styles.chipTextActive]}>{item}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {!isConnected ? (
          <GjendjaPaRrjet onRetry={refresh} />
        ) : filteredRestaurants.length === 0 ? (
          <GjendjaBosh
            icon="search-outline"
            title="Nuk u gjet asnjë restorant"
            description="Provoni një kërkim ose filtër tjetër."
          />
        ) : (
          filteredRestaurants.map(restaurant => (
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
  safeArea: { flex: 1, backgroundColor: '#F4F4F6' },
  content: { paddingHorizontal: 18, paddingTop: 24, paddingBottom: 110 },
  offlineBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DC2626',
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 12,
  },
  offlineBannerText: { color: '#fff', fontWeight: '800' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 30, fontWeight: '800', color: '#111827', flex: 1 },
  menuButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  menuButtonText: { fontSize: 20 },
  searchWrap: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  searchInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 15,
    color: '#111827',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 12,
    elevation: 2,
  },
  filterButton: { width: 46, height: 46, borderRadius: 23, backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center', marginLeft: 12 },
  filterButtonText: { fontSize: 18 },
  chipsRow: { paddingBottom: 18, gap: 10 },
  chip: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 14, paddingVertical: 10 },
  chipActive: { backgroundColor: '#111827' },
  chipText: { color: '#374151', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  emptyState: { backgroundColor: '#fff', borderRadius: 18, padding: 20, marginTop: 12 },
  emptyText: { color: '#6B7280', textAlign: 'center', fontWeight: '600' },
});
