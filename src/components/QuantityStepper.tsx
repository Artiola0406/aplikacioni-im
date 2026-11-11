import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

export default function QuantityStepper({ value, onDecrement, onIncrement }: Props) {
  return (
    <View style={styles.container}>
      <Pressable onPress={onDecrement} style={styles.button}>
        <Text style={styles.buttonText}>−</Text>
      </Pressable>
      <Text style={styles.value}>{value}</Text>
      <Pressable onPress={onIncrement} style={styles.button}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 999,
    paddingHorizontal: 8,
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: { fontSize: 22, color: '#111827', fontWeight: '700' },
  value: { minWidth: 28, textAlign: 'center', fontSize: 16, fontWeight: '700', color: '#111827' },
});
