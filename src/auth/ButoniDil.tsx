// Ky komponent e mbyll sesionin aktual përmes Supabase Auth.
// Gjatë kërkesës çaktivizon butonin dhe shfaq gabimin në shqip.
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { dil } from './hyrja';

export default function ButoniDil({ style }: { style?: StyleProp<ViewStyle> }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSignOut() {
    setSubmitting(true);
    try {
      const result = await dil();
      if (!result.ok) {
        Alert.alert('Nuk u çkyçe', result.error);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Pressable
      onPress={handleSignOut}
      disabled={submitting}
      style={[styles.button, submitting && styles.disabled, style]}
    >
      <Text style={styles.label}>{submitting ? 'Duke dalë...' : 'Dil'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 'auto',
    backgroundColor: '#111827',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  label: { color: '#fff', fontWeight: '800' },
  disabled: { opacity: 0.6 },
});
