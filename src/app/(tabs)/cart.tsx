import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import QuantityStepper from '@/components/QuantityStepper';
import { formatMoney } from '@/data/restaurants';
import { useCart } from '@/context/cart-context';

export default function CartScreen() {
  const { items, updateQuantity, removeItem, subtotalCents } = useCart();
  const deliveryFeeCents = 300;
  const totalCents = subtotalCents + deliveryFeeCents;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}><Text style={styles.backText}>←</Text></Pressable>
        <Text style={styles.title}>Shporta</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Shporta është bosh.</Text>
            <Pressable style={styles.emptyButton} onPress={() => router.push('/(tabs)/home')}>
              <Text style={styles.emptyButtonText}>Shfleto restorantet</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {items.map(item => (
              <View key={item.id} style={styles.itemRow}>
                <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
                <View style={styles.itemBody}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{formatMoney(item.priceCents)}</Text>
                  <View style={styles.itemFooter}>
                    <QuantityStepper
                      value={item.quantity}
                      onDecrement={() => updateQuantity(item.id, -1)}
                      onIncrement={() => updateQuantity(item.id, 1)}
                    />
                    <Pressable onPress={() => removeItem(item.id)}>
                      <Text style={styles.remove}>Hiqe</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}><Text style={styles.label}>Nëntotali</Text><Text>{formatMoney(subtotalCents)}</Text></View>
              <View style={styles.summaryRow}><Text style={styles.label}>Dërgesa</Text><Text>{formatMoney(deliveryFeeCents)}</Text></View>
              <View style={[styles.summaryRow, styles.totalRow]}><Text style={styles.totalLabel}>Totali</Text><Text style={styles.totalValue}>{formatMoney(totalCents)}</Text></View>
            </View>
          </>
        )}
      </ScrollView>

      {items.length > 0 ? (
        <View style={styles.bottomBar}>
          <Text style={styles.bottomTotal}>{formatMoney(totalCents)}</Text>
          <Pressable onPress={() => router.push('/checkout')} style={styles.button}>
            <Text style={styles.buttonText}>Vazhdo →</Text>
          </Pressable>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F4F6' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 24 },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  spacer: { width: 36 },
  content: { padding: 18, paddingBottom: 120 },
  emptyState: { backgroundColor: '#fff', borderRadius: 20, padding: 28, alignItems: 'center', marginTop: 80 },
  emptyText: { color: '#111827', fontSize: 18, marginBottom: 16 },
  emptyButton: { backgroundColor: '#111827', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 12 },
  emptyButtonText: { color: '#fff', fontWeight: '700' },
  itemRow: { backgroundColor: '#fff', borderRadius: 18, padding: 12, flexDirection: 'row', gap: 12, marginBottom: 12 },
  image: { width: 76, height: 76, borderRadius: 16 },
  itemBody: { flex: 1 },
  name: { fontSize: 17, fontWeight: '700', color: '#111827' },
  price: { color: '#6B7280', marginTop: 4 },
  itemFooter: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  remove: { color: '#dc2626', fontWeight: '700' },
  summaryCard: { backgroundColor: '#fff', borderRadius: 18, padding: 18, marginTop: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { color: '#4b5563' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 12, marginTop: 6 },
  totalLabel: { fontWeight: '800', color: '#111827' },
  totalValue: { fontWeight: '800', color: '#111827' },
  bottomBar: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#0f172a', paddingHorizontal: 20, paddingVertical: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bottomTotal: { color: '#fff', fontSize: 18, fontWeight: '800' },
  button: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 10 },
  buttonText: { color: '#111827', fontWeight: '800' },
});
