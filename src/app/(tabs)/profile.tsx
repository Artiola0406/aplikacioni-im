import { Link, router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/context/auth-context';

export default function ProfileScreen() {
  const { isGuest, userEmail, signOut } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Profili</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Statusi</Text>
          <Text style={styles.value}>{isGuest ? 'Vizitor' : userEmail ?? 'Përdorues'}</Text>
        </View>

        <Pressable
          style={styles.action}
          onPress={() => {
            if (isGuest) {
              Alert.alert('Së shpejti', 'Regjistrimi për vizitor do të vjen në versionin e ardhshëm.');
              return;
            }
            Alert.alert('Së shpejti', 'Profili do të jetë i plotësuar më vonë.');
          }}
        >
          <Text style={styles.actionText}>Ndrysho profilin</Text>
        </Pressable>

        <Link href="/meny-supabase" style={styles.link}>Menyja me Supabase (version testimi)</Link>

        <Pressable
          onPress={() => {
            signOut();
            router.replace('/login');
          }}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutText}>Dil</Text>
        </Pressable>
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
  logoutButton: { marginTop: 'auto', backgroundColor: '#111827', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: '800' },
});
