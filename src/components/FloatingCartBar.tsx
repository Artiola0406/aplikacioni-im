import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatMoney } from '@/data/restaurants';

type Props = {
  itemCount: number;
  totalCents: number;
  onPress: () => void;
};

export default function FloatingCartBar({ itemCount, totalCents, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.countWrap}>
        <Text style={styles.count}>{itemCount}</Text>
      </View>
      <Text style={styles.label}>Shiko shportën</Text>
      <Text style={styles.total}>{formatMoney(totalCents)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
    backgroundColor: '#0f172a',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  countWrap: { backgroundColor: '#fff', borderRadius: 999, width: 26, height: 26, alignItems: 'center', justifyContent: 'center' },
  count: { color: '#0f172a', fontWeight: '800' },
  label: { color: '#fff', fontWeight: '700', fontSize: 16 },
  total: { color: '#fff', fontWeight: '800', fontSize: 16 },
});
