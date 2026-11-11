// Ky komponent paraqet formularin e hyrjes me email dhe fjalëkalim.
// Kontrollon të dhënat dhe shfaq gabimet pa përsëritur logjikën te ekrani.
import { useState, type ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { kyçu } from './hyrja';

const emailValide = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function HyrjaForm({ beforeSubmit }: { beforeSubmit?: ReactNode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    const emailTrimmed = email.trim();
    if (!emailValide.test(emailTrimmed)) {
      setError('Shkruaj një adresë emaili të vlefshme.');
      return;
    }
    if (password.length < 6) {
      setError('Fjalëkalimi duhet të jetë të paktën 6 karaktere.');
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const result = await kyçu(emailTrimmed, password);
      if (!result.ok) setError(result.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View>
      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.icon}>✉️</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Fjalëkalimi</Text>
        <View style={styles.inputWrap}>
          <Text style={styles.icon}>🔒</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            style={styles.input}
          />
          <Pressable
            onPress={() => setShowPassword(value => !value)}
            style={styles.eyeButton}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? 'Fsheh fjalëkalimin' : 'Shfaq fjalëkalimin'}
          >
            <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
          </Pressable>
        </View>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
      {beforeSubmit}

      <Pressable
        onPress={handleLogin}
        disabled={submitting}
        style={[styles.primaryButton, submitting && styles.disabledButton]}
      >
        {submitting ? (
          <View style={styles.loadingContent}>
            <ActivityIndicator color="#fff" />
            <Text style={styles.primaryButtonText}>Duke hyrë...</Text>
          </View>
        ) : (
          <Text style={styles.primaryButtonText}>Hyr</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { marginBottom: 18 },
  label: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 8 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  icon: { fontSize: 18, marginRight: 8 },
  input: { flex: 1, fontSize: 16, paddingVertical: 14, color: '#111827' },
  eyeButton: { padding: 6 },
  eyeText: { fontSize: 18 },
  error: { color: '#b91c1c', fontSize: 14, marginBottom: 14 },
  loadingContent: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  primaryButton: {
    backgroundColor: '#EE6C3A',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 18,
  },
  primaryButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  disabledButton: { opacity: 0.6 },
});
