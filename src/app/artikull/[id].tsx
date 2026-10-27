import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, useColorScheme } from "react-native";
import { produktet } from "../../data/produktet";

export default function DetajetProduktit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dark = useColorScheme() === "dark";
  const tekst = dark ? "#f8fafc" : "#0f172a";
  const tekstDyte = dark ? "#cbd5e1" : "#334155";
  const background = dark ? "#000" : "#fff";

  const produkt = produktet.find((p) => p.id === id);

  if (!produkt) {
    return (
      <ScrollView style={{ backgroundColor: background }} contentContainerStyle={styles.permbajtja}>
        <Stack.Screen options={{ title: "Produkti" }} />
        <Text style={{ color: tekst, fontSize: 18 }}>Produkti nuk u gjet.</Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: background }} contentContainerStyle={styles.permbajtja}>
      <Stack.Screen options={{ title: produkt.emri }} />
      <Text style={[styles.emri, { color: tekst }]}>{produkt.emri}</Text>
      <Text style={[styles.kategoria, { color: tekstDyte }]}>{produkt.kategoria}</Text>
      <Text style={[styles.pershkrimi, { color: tekstDyte }]}>{produkt.pershkrimi}</Text>
      <Text style={[styles.cmimi, { color: tekst }]}>{produkt.cmimi.toFixed(2)} €</Text>
      {!produkt.disponueshem && (
        <Text style={styles.padisponueshem}>Ky produkt nuk është i disponueshëm tani.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  permbajtja: { padding: 20 },
  emri: { fontSize: 28, fontWeight: "bold", marginBottom: 4 },
  kategoria: { fontSize: 16, marginBottom: 16 },
  pershkrimi: { fontSize: 16, lineHeight: 24, marginBottom: 20 },
  cmimi: { fontSize: 24, fontWeight: "bold" },
  padisponueshem: { marginTop: 16, color: "#dc2626", fontStyle: "italic" },
});