import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function GjendjaGabim({ message, onRetry }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="warning-outline" size={58} color="#DC2626" />
      <Text style={styles.title}>Diçka shkoi keq</Text>
      {message ? <Text style={styles.description}>{message}</Text> : null}
      {onRetry ? (
        <Pressable style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Provo përsëri</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 28 },
  title: { marginTop: 14, fontSize: 18, fontWeight: '800', color: '#111827', textAlign: 'center' },
  description: { marginTop: 8, color: '#6B7280', textAlign: 'center' },
  button: { marginTop: 18, backgroundColor: '#111827', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 12 },
  buttonText: { color: '#fff', fontWeight: '800' },
});
