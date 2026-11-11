import { Link } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ButoniDil from '@/auth/ButoniDil';
import { useAuth } from '@/context/auth-context';

export default function ProfileScreen() {
  const { userEmail } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profili</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Statusi</Text>
          <Text style={styles.value}>{userEmail ?? 'Përdorues'}</Text>
        </View>

        <Pressable
          style={styles.action}
          onPress={() => Alert.alert('Së shpejti', 'Profili do të jetë i plotësuar më vonë.')}
        >
          <Text style={styles.actionText}>Ndrysho profilin</Text>
        </Pressable>

        <Link href="/meny-supabase" style={styles.link}>Menyja me Supabase (version testimi)</Link>

        <ButoniDil />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F4F4F6' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 16 },
  card: { backgroundColor: '#fff', borderRadius: 20, padding: 20, marginBottom: 16 },
  label: { color: '#6B7280', marginBottom: 6 },
  value: { fontSize: 20, fontWeight: '700', color: '#111827' },
  action: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12 },
  actionText: { fontSize: 16, fontWeight: '700', color: '#111827' },
  link: { color: '#EE6C3A', fontWeight: '700', marginTop: 8, marginBottom: 20 },
});
