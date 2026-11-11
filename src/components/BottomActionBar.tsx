import { Pressable, StyleSheet, Text, View } from 'react-native';

import { formatMoney } from '@/data/restaurants';

type Props = {
  totalCents: number;
  label: string;
  onPress: () => void;
};

export default function BottomActionBar({ totalCents, label, onPress }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.total}>{formatMoney(totalCents)}</Text>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: { color: '#fff', fontSize: 20, fontWeight: '800' },
  button: { backgroundColor: '#111827', paddingHorizontal: 18, paddingVertical: 12, borderRadius: 999 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
