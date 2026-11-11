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

export default function RegisterScreen() {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = () => {
    if (!fullName.trim()) {
      Alert.alert('Gabim', 'Shkruaj emrin e plotë.');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Gabim', 'Email-i është i detyrueshëm.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Gabim', 'Fjalëkalimi duhet të jetë të paktën 6 karaktere.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Gabim', 'Fjalëkalimet nuk përputhen.');
      return;
    }

    setSubmitting(true);
    const ok = signUp(email, password);
    setTimeout(() => {
      if (ok) {
        Alert.alert('Sukses', 'Regjistrimi u krye me sukses.');
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Gabim', 'Regjistrimi nuk u krye. Provo përsëri.');
      }
      setSubmitting(false);
    }, 400);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.hero}>
            <View style={styles.heroBubble}><Text style={styles.heroEmoji}>🍽️</Text></View>
            <Text style={styles.title}>Krijo llogari</Text>
            <Text style={styles.subtitle}>Regjistrohu për të porositur me shpejtësi.</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.field}>
              <Text style={styles.label}>Emri i plotë</Text>
              <TextInput
                value={fullName}
                onChangeText={setFullName}
                placeholder="Shef i parë"
                autoCapitalize="words"
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Fjalëkalimi</Text>
              <View style={styles.inputWrap}>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  style={[styles.input, styles.inputWithIcon]}
                />
                <Pressable onPress={() => setShowPassword(v => !v)} style={styles.eyeButton}>
                  <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Konfirmo fjalëkalimin</Text>
              <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secureTextEntry={!showPassword}
                style={styles.input}
              />
            </View>

            <Pressable
              onPress={handleRegister}
              disabled={submitting}
              style={[styles.primaryButton, submitting && styles.disabledButton]}
            >
              <Text style={styles.primaryButtonText}>{submitting ? 'Duke regjistruar...' : 'Regjistrohu'}</Text>
            </Pressable>

            <Text style={styles.signupText}>
              Ke llogari tashmë?{' '}
              <Link href="/login" style={styles.highlightText}>Hyr</Link>
            </Text>
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
  hero: { alignItems: 'center', paddingTop: 30, paddingBottom: 18 },
  heroBubble: {
    width: 110,
    height: 110,
    borderRadius: 30,
    backgroundColor: '#F4D6B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroEmoji: { fontSize: 48 },
  title: { fontSize: 30, fontWeight: '800', color: '#111827', marginBottom: 6 },
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
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111827',
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    paddingRight: 8,
  },
  inputWithIcon: { flex: 1, borderWidth: 0, backgroundColor: 'transparent', paddingRight: 8 },
  eyeButton: { padding: 8 },
  eyeText: { fontSize: 18 },
  primaryButton: {
    backgroundColor: '#EE6C3A',
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  signupText: { textAlign: 'center', marginTop: 20, color: '#374151' },
  highlightText: { color: '#EE6C3A', fontWeight: '800' },
  disabledButton: { opacity: 0.6 },
});
