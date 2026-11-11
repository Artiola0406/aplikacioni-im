import { Stack } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { SesioniProvider, useSesioni } from '@/auth/sesioni';
import { CartProvider } from '@/context/cart-context';

function RootStack() {
  const { session, loading, error, riprovo } = useSesioni();

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#EE6C3A" />
        <Text style={styles.loadingText}>Po verifikohet sesioni...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable onPress={riprovo} style={styles.retryButton}>
          <Text style={styles.retryText}>Provo përsëri</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Protected guard={!session}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack.Protected>
      <Stack.Protected guard={session !== null}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="restaurant/[id]" />
        <Stack.Screen name="meny-supabase" />
        <Stack.Screen name="artikull/[id]" />
        <Stack.Screen name="shto-produkt" />
        <Stack.Screen name="explore" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SesioniProvider>
        <CartProvider>
          <RootStack />
        </CartProvider>
      </SesioniProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  loadingText: { marginTop: 12, color: '#374151', fontSize: 16 },
  errorText: { color: '#b91c1c', fontSize: 16, textAlign: 'center', marginBottom: 16 },
  retryButton: { backgroundColor: '#EE6C3A', borderRadius: 12, padding: 12 },
  retryText: { color: '#fff', fontWeight: '700' },
});