import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatMoney } from '@/data/restaurants';
import type { MenuItem } from '@/types';

type Props = {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
};

export default function MenuItemCard({ item, onAdd }: Props) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          {item.tag ? <Text style={styles.tag}>{item.tag}</Text> : null}
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.row}>
          <Text style={styles.price}>{formatMoney(item.priceCents)}</Text>
          <Pressable onPress={() => onAdd(item)} style={styles.addButton}>
            <Text style={styles.addText}>+ Shto</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  image: { width: 88, height: 88, borderRadius: 16 },
  info: { flex: 1 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 17, fontWeight: '700', color: '#111827', maxWidth: '65%' },
  tag: { backgroundColor: '#FFF1EA', color: '#EE6C3A', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, fontSize: 10, fontWeight: '700', overflow: 'hidden' },
  description: { color: '#6B7280', fontSize: 12, marginTop: 5, marginBottom: 10 },
  price: { fontSize: 18, fontWeight: '800', color: '#6f1d1b' },
  addButton: { backgroundColor: '#0f172a', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999 },
  addText: { color: '#fff', fontWeight: '700' },
});
