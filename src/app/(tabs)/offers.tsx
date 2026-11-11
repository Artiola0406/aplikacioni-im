import { StyleSheet, Text, View } from 'react-native';

export default function OffersScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Oferta</Text>
      <Text style={styles.subtitle}>Së shpejti do të shfaqen ofertat e ditës.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F4F6' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#6B7280' },
});
