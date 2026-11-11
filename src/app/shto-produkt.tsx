import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
} from "react-native";
import { supabase } from "../lib/supabase";
import { shpjegoGabiminSupabase } from "../auth/hyrja";

export default function ShtoProdukt() {
  const dark = useColorScheme() === "dark";
  const router = useRouter();

  const tekst = dark ? "#f8fafc" : "#0f172a";
  const tekstDyte = dark ? "#cbd5e1" : "#334155";
  const background = dark ? "#000" : "#fff";
  const inputBg = dark ? "#1e293b" : "#f1f5f9";

  const [emri, setEmri] = useState("");
  const [pershkrimi, setPershkrimi] = useState("");
  const [cmimi, setCmimi] = useState("");
  const [kategoria, setKategoria] = useState("");
  const [duke_ruajtur, setDukeRuajtur] = useState(false);

  async function ruaj() {
    const cmimiNumer = Number(cmimi.replace(",", "."));

    if (emri.trim() === "") {
      Alert.alert("Gabim", "Shkruaj emrin e produktit.");
      return;
    }
    if (!isFinite(cmimiNumer) || cmimiNumer <= 0) {
      Alert.alert("Gabim", "Çmimi duhet të jetë numër më i madh se 0.");
      return;
    }

    setDukeRuajtur(true);
    const { error } = await supabase.from("products").insert({
      name: emri.trim(),
      description: pershkrimi.trim() || null,
      price: cmimiNumer,
      category: kategoria.trim() || null,
      is_available: true,
    });
    setDukeRuajtur(false);

    if (error) {
      Alert.alert("Nuk u ruajt", shpjegoGabiminSupabase(error.message));
      return;
    }

    Alert.alert("U ruajt", "Produkti u shtua në Supabase.");
    router.back();
  }

  return (
    <ScrollView
      style={{ backgroundColor: background }}
      contentContainerStyle={styles.permbajtja}
      keyboardShouldPersistTaps="handled"
    >
      <Stack.Screen options={{ title: "Shto produkt" }} />

      <Text style={[styles.etiketa, { color: tekstDyte }]}>Emri</Text>
      <TextInput
        value={emri}
        onChangeText={setEmri}
        placeholder="p.sh. Burger Special"
        placeholderTextColor="#94a3b8"
        style={[styles.input, { backgroundColor: inputBg, color: tekst }]}
      />

      <Text style={[styles.etiketa, { color: tekstDyte }]}>Përshkrimi</Text>
      <TextInput
        value={pershkrimi}
        onChangeText={setPershkrimi}
        placeholder="Çfarë përmban"
        placeholderTextColor="#94a3b8"
        multiline
        style={[styles.input, styles.inputGjate, { backgroundColor: inputBg, color: tekst }]}
      />

      <Text style={[styles.etiketa, { color: tekstDyte }]}>Çmimi (€)</Text>
      <TextInput
        value={cmimi}
        onChangeText={setCmimi}
        placeholder="p.sh. 4.50"
        placeholderTextColor="#94a3b8"
        keyboardType="decimal-pad"
        style={[styles.input, { backgroundColor: inputBg, color: tekst }]}
      />

      <Text style={[styles.etiketa, { color: tekstDyte }]}>Kategoria</Text>
      <TextInput
        value={kategoria}
        onChangeText={setKategoria}
        placeholder="p.sh. Burgerë"
        placeholderTextColor="#94a3b8"
        style={[styles.input, { backgroundColor: inputBg, color: tekst }]}
      />

      <Pressable
        onPress={ruaj}
        disabled={duke_ruajtur}
        style={({ pressed }) => [
          styles.butoni,
          { opacity: duke_ruajtur ? 0.5 : pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.butoniTekst}>{duke_ruajtur ? "Duke ruajtur..." : "Ruaj"}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  permbajtja: { padding: 20 },
  etiketa: { fontSize: 14, marginTop: 12, marginBottom: 6 },
  input: { borderRadius: 10, padding: 12, fontSize: 16 },
  inputGjate: { minHeight: 80, textAlignVertical: "top" },
  butoni: {
    marginTop: 24,
    backgroundColor: "#dc2626",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  butoniTekst: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});