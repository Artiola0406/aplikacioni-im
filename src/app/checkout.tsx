import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { formatMoney, restaurants } from '@/data/restaurants';
import { useAuth } from '@/context/auth-context';
import { useCart } from '@/context/cart-context';

export default function CheckoutScreen() {
  const { isAuthenticated, isGuest } = useAuth();
  const { items, clearCart, subtotalCents } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'card' | 'paypal' | 'apple'>('cash');
  const [editingAddress, setEditingAddress] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const restaurantFee = useMemo(
    () => restaurants[0]?.deliveryFeeCents ?? 300,
    []
  );
  const totalCents = subtotalCents + restaurantFee;

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert('Gabim', 'Emri është i detyrueshëm.');
      return false;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 8) {
      Alert.alert('Gabim', 'Telefoni duhet të jetë i saktë.');
      return false;
    }
    if (!address.trim()) {
      Alert.alert('Gabim', 'Adresa është e detyrueshme.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!isAuthenticated && !isGuest) {
      Alert.alert('Kërkohet hyrja', 'Hyr për të vazhduar me porosinë.', [
        { text: 'Hyr', onPress: () => router.replace('/login') },
      ]);
      return;
    }
    if (!validateForm()) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      clearCart();
      setSubmitting(false);
      Alert.alert('Porosia u dërgua (demo)', 'Porosia juaj është konfirmuar.');
      router.replace('/(tabs)/home');
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}><Text style={styles.backText}>←</Text></Pressable>
          <Text style={styles.title}>Pagesa</Text>
          <Pressable style={styles.dotButton}><Text style={styles.dotText}>⋯</Text></Pressable>
        </View>

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Mënyra e pagesës</Text>
            {[
              { key: 'cash', label: 'Para në dorë gjatë dorëzimit' },
              { key: 'card', label: 'Kartelë' },
              { key: 'paypal', label: 'PayPal' },
              { key: 'apple', label: 'Apple Pay' },
            ].map(option => {
              const active = selectedPayment === option.key;
              return (
                <Pressable
                  key={option.key}
                  style={[styles.paymentOption, active && styles.paymentOptionActive]}
                  onPress={() => option.key === 'cash' && setSelectedPayment(option.key)}
                >
                  <View style={[styles.radio, active && styles.radioActive]} />
                  <Text style={[styles.paymentText, !active && styles.paymentTextMuted]}>{option.label}</Text>
                  {option.key !== 'cash' ? <Text style={styles.comingSoon}>Së shpejti</Text> : null}
                </Pressable>
              );
            })}
          </View>

          <View style={styles.sectionCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Dorëzimi</Text>
              <Pressable onPress={() => setEditingAddress(v => !v)} style={styles.changeButton}>
                <Text style={styles.changeText}>Ndrysho</Text>
              </Pressable>
            </View>

            {editingAddress ? (
              <View style={styles.addressBox}>
                <TextInput value={name} onChangeText={setName} placeholder="Emri" style={styles.input} />
                <TextInput value={phone} onChangeText={setPhone} placeholder="Telefoni" keyboardType="phone-pad" style={styles.input} />
                <TextInput value={address} onChangeText={setAddress} placeholder="Adresa" style={styles.input} />
                <TextInput value={notes} onChangeText={setNotes} placeholder="Udhëzime shtesë (opsionale)" style={styles.input} />
              </View>
            ) : (
              <View style={styles.summaryBox}>
                <Text style={styles.summaryTitle}>Dërgesë standarde</Text>
                <Text style={styles.summaryText}>mbërrin për 15–20 min</Text>
                <Text style={styles.fastBadge}>Më e shpejta</Text>
              </View>
            )}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Përmbledhja e porosisë</Text>
            {items.map(item => (
              <View key={item.id} style={styles.orderRow}>
                <Text style={styles.orderLabel}>{item.name} × {item.quantity}</Text>
                <Text style={styles.orderValue}>{formatMoney(item.priceCents * item.quantity)}</Text>
              </View>
            ))}
            <View style={styles.totalLine}><Text style={styles.label}>Nëntotali</Text><Text>{formatMoney(subtotalCents)}</Text></View>
            <View style={styles.totalLine}><Text style={styles.label}>Dërgesa</Text><Text>{formatMoney(restaurantFee)}</Text></View>
            <View style={[styles.totalLine, styles.totalLineStrong]}>
              <Text style={styles.labelStrong}>Totali</Text>
              <Text style={styles.totalStrong}>{formatMoney(totalCents)}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <Text style={styles.bottomTotal}>{formatMoney(totalCents)}</Text>
          <Pressable onPress={handleSubmit} disabled={submitting} style={[styles.confirmButton, submitting && styles.confirmButtonDisabled]}>
            <Text style={styles.confirmText}>{submitting ? 'Duke dërguar...' : 'Konfirmo porosinë →'}</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F4F6' },
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#F4F4F6',
  },
  backButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 24, color: '#111827' },
  title: { fontSize: 22, fontWeight: '800', color: '#111827' },
  dotButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  dotText: { fontSize: 20, color: '#111827' },
  content: { padding: 20, paddingBottom: 120 },
  sectionCard: { backgroundColor: '#fff', borderRadius: 22, padding: 18, marginBottom: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 12 },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },
  paymentOptionActive: { backgroundColor: '#fff5ef', borderColor: '#EE6C3A', borderWidth: 1 },
  radio: { width: 18, height: 18, borderRadius: 9, borderWidth: 1.5, borderColor: '#9ca3af' },
  radioActive: { borderColor: '#111827', backgroundColor: '#111827' },
  paymentText: { flex: 1, fontWeight: '700', color: '#111827' },
  paymentTextMuted: { color: '#9ca3af' },
  comingSoon: { color: '#9ca3af', fontSize: 11, fontWeight: '700' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  changeButton: { backgroundColor: '#FFF1EA', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  changeText: { color: '#EE6C3A', fontWeight: '700' },
  addressBox: { marginTop: 12, gap: 12 },
  input: { backgroundColor: '#F5F5F5', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12, color: '#111827' },
  summaryBox: { marginTop: 12, backgroundColor: '#F9FAFB', borderRadius: 14, padding: 14 },
  summaryTitle: { fontWeight: '700', fontSize: 16, color: '#111827' },
  summaryText: { color: '#6B7280', marginTop: 4 },
  fastBadge: { marginTop: 10, alignSelf: 'flex-start', backgroundColor: '#FFF1EA', color: '#EE6C3A', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4, overflow: 'hidden', fontWeight: '700', fontSize: 11 },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  orderLabel: { color: '#374151' },
  orderValue: { color: '#111827', fontWeight: '700' },
  totalLine: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  totalLineStrong: { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 12 },
  label: { color: '#4b5563' },
  labelStrong: { color: '#111827', fontWeight: '800' },
  totalStrong: { color: '#111827', fontWeight: '800' },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomTotal: { color: '#fff', fontSize: 18, fontWeight: '800' },
  confirmButton: { backgroundColor: '#fff', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 12 },
  confirmButtonDisabled: { opacity: 0.7 },
  confirmText: { color: '#0f172a', fontWeight: '800' },
});
