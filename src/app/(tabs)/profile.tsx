import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButoniDil from '@/auth/ButoniDil';
import { useAuth } from '@/context/auth-context';

export default function ProfileScreen() {
  const { user, userEmail } = useAuth();
  const metadata = user?.user_metadata ?? {};
  const fullName =
    typeof metadata.full_name === 'string' && metadata.full_name.trim()
      ? metadata.full_name
      : typeof metadata.name === 'string' && metadata.name.trim()
        ? metadata.name
        : 'Përdorues';
  const phone =
    typeof metadata.phone === 'string' && metadata.phone.trim()
      ? metadata.phone
      : typeof user?.phone === 'string' && user.phone.trim()
        ? user.phone
        : 'Nuk është shtuar';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profili</Text>
        <View style={styles.card}>
          <View style={styles.profileRow}>
            <Ionicons name="person-circle-outline" size={28} color="#111827" />
            <View style={styles.profileInfo}>
              <Text style={styles.label}>Emri</Text>
              <Text style={styles.value}>{fullName}</Text>
            </View>
          </View>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userEmail ?? 'Përdorues'}</Text>
          <Text style={styles.label}>Telefoni</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>

        <Pressable
          style={styles.disabledAction}
          disabled
        >
          <Text style={styles.disabledActionText}>Ndrysho profilin</Text>
          <Text style={styles.soonText}>Së shpejti</Text>
        </Pressable>
        <Pressable style={styles.disabledAction} disabled>
          <Text style={styles.disabledActionText}>Porositë e mia</Text>
          <Text style={styles.soonText}>Së shpejti</Text>
        </Pressable>
        <View style={styles.logoutWrap}>
          <ButoniDil confirm style={styles.logoutButton} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F4F6' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 16, gap: 6 },
  profileRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 10 },
  profileInfo: { flex: 1 },
  label: { color: '#6B7280', marginTop: 6 },
  value: { fontSize: 20, fontWeight: '700', color: '#111827' },
  disabledAction: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  disabledActionText: { fontSize: 16, fontWeight: '700', color: '#9CA3AF' },
  soonText: { color: '#6B7280', fontSize: 12, fontWeight: '700' },
  logoutWrap: { marginTop: 'auto' },
  logoutButton: { marginTop: 0, backgroundColor: '#DC2626' },
});
