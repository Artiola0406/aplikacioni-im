import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function GjendjaPaRrjet({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={64} color="#9CA3AF" />
      <Text style={styles.title}>Nuk ka lidhje me internetin</Text>
      <Text style={styles.description}>Kontrollo rrjetin dhe provo përsëri</Text>
      <Pressable style={styles.button} onPress={onRetry}>
        <Text style={styles.buttonText}>Provo përsëri</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 28, marginTop: 12 },
  title: { marginTop: 16, fontSize: 18, fontWeight: '800', color: '#111827', textAlign: 'center' },
  description: { marginTop: 8, color: '#6B7280', textAlign: 'center' },
  button: { marginTop: 18, backgroundColor: '#111827', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 12 },
  buttonText: { color: '#fff', fontWeight: '800' },
});
