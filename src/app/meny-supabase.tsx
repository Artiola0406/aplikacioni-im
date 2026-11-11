import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import KartaProduktit from '../components/KartaProduktit';
import { supabase } from '../lib/supabase';

type ProduktDB = {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  category: string | null;
  is_available: boolean;
};

export default function SupabaseMenuScreen() {
  const dark = useColorScheme() === 'dark';
  const router = useRouter();
  const [produktet, setProduktet] = useState<ProduktDB[]>([]);
  const [dukeNgarkuar, setDukeNgarkuar] = useState(true);
  const [gabimi, setGabimi] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let aktiv = true;
      async function ngarko() {
        const { data, error } = await supabase
          .from('products')
          .select()
          .order('category', { ascending: true })
          .order('name', { ascending: true });
        if (!aktiv) return;
        if (error) {
          setGabimi(error.message);
        } else {
          setGabimi(null);
          setProduktet(data ?? []);
        }
        setDukeNgarkuar(false);
      }
      ngarko();
      return () => {
        aktiv = false;
      };
    }, [])
  );

  const tekst = dark ? '#ccc' : '#333';
  const background = dark ? '#000' : '#fff';

  if (dukeNgarkuar) {
    return (
      <View style={[styles.qendra, { backgroundColor: background }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (gabimi) {
    return (
      <View style={[styles.qendra, { backgroundColor: background }]}>
        <Text style={{ color: tekst }}>Gabim në ngarkim: {gabimi}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <FlatList
        data={produktet}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Menyja</Text>
            <Pressable onPress={() => router.push('/shto-produkt')} style={({ pressed }) => [styles.butoniShto, { opacity: pressed ? 0.7 : 1 }]}>
              <Text style={styles.butoniShtoTekst}>+ Shto produkt</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={<Text style={{ color: tekst }}>Nuk ka produkte në meny.</Text>}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: '/artikull/[id]', params: { id: item.id } })}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <KartaProduktit
              emri={item.name}
              pershkrimi={item.description ?? ''}
              cmimi={Number(item.price)}
              kategoria={item.category ?? ''}
              disponueshem={item.is_available}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  qendra: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  lista: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Georgia',
  },
  butoniShto: {
    backgroundColor: '#dc2626',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  butoniShtoTekst: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
