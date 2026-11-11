import { Link, router } from 'expo-router';
import { useState } from 'react';
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

import { useAuth } from '@/context/auth-context';

export default function LoginScreen() {
  const { signIn, continueAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert('Gabim', 'Email ose telefon është i detyrueshëm.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Gabim', 'Fjalëkalimi duhet të jetë të paktën 6 karaktere.');
      return;
    }

    setSubmitting(true);
    const ok = signIn(email, password);
    setTimeout(() => {
      if (ok) {
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Gabim', 'Të dhënat nuk janë valide.');
      }
      setSubmitting(false);
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <View style={styles.heroBubble}><Text style={styles.heroEmoji}>🍕</Text></View>
            <Text style={styles.title}>Mirë se u ktheve</Text>
            <Text style={styles.subtitle}>Hyr dhe vazhdo aty ku e le.</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.field}>
              <Text style={styles.label}>Email ose telefon</Text>
              <View style={styles.inputWrap}>
                <Text style={styles.icon}>✉️</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="example@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
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
                  style={styles.input}
                />
                <Pressable onPress={() => setShowPassword(v => !v)} style={styles.eyeButton}>
                  <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.rowBetween}>
              <Pressable onPress={() => setRememberMe(v => !v)} style={styles.checkboxRow}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]} />
                <Text style={styles.checkText}>Më mbaj të kyçur</Text>
              </Pressable>
              <Link href="/register" style={styles.linkText}>Harrove fjalëkalimin?</Link>
            </View>

            <Pressable onPress={handleLogin} disabled={submitting} style={[styles.primaryButton, submitting && styles.disabledButton]}>
              <Text style={styles.primaryButtonText}>{submitting ? 'Duke hyrë...' : 'Hyr'}</Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.line} />
              <Text style={styles.orText}>Ose vazhdo me</Text>
              <View style={styles.line} />
            </View>

            <View style={styles.socialRow}>
              <Pressable style={styles.socialButton} onPress={() => Alert.alert('Së shpejti', 'Google do të jetë i disponueshëm së shpejti.')}>
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
              <Pressable style={styles.socialButton} onPress={() => Alert.alert('Së shpejti', 'Apple do të jetë i disponueshëm së shpejti.')}>
                <Text style={styles.socialText}>Apple</Text>
              </Pressable>
            </View>

            <Text style={styles.signupText}>
              Nuk ke llogari?{' '}
              <Link href="/register" style={styles.highlightText}>Regjistrohu</Link>
            </Text>

            <Pressable
              onPress={() => {
                continueAsGuest();
                router.replace('/(tabs)/home');
              }}
              style={styles.visitorLink}
            >
              <Text style={styles.linkText}>Shfleto si vizitor →</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7E6D4' },
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, justifyContent: 'flex-end' },
  hero: { paddingTop: 30, paddingBottom: 20, alignItems: 'center' },
  heroBubble: {
    width: 120,
    height: 120,
    backgroundColor: '#F4D6B8',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  heroEmoji: { fontSize: 52 },
  title: { fontSize: 30, fontWeight: '800', color: '#141414', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#6b7280' },
  card: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 8,
  },
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
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#EE6C3A',
    marginRight: 8,
  },
  checkboxChecked: { backgroundColor: '#EE6C3A', borderColor: '#EE6C3A' },
  checkText: { color: '#374151', fontSize: 13 },
  linkText: { color: '#EE6C3A', fontSize: 13, fontWeight: '700' },
  primaryButton: {
    backgroundColor: '#EE6C3A',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 18,
  },
  primaryButtonText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  line: { flex: 1, height: 1, backgroundColor: '#E5E7EB' },
  orText: { color: '#6B7280', paddingHorizontal: 12, fontSize: 12 },
  socialRow: { flexDirection: 'row', gap: 12 },
  socialButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F2F2F2',
    alignItems: 'center',
  },
  socialText: { color: '#1F2937', fontWeight: '700' },
  signupText: { textAlign: 'center', marginTop: 22, color: '#374151' },
  highlightText: { color: '#EE6C3A', fontWeight: '800' },
  visitorLink: { marginTop: 12, alignItems: 'center' },
  disabledButton: { opacity: 0.6 },
});
