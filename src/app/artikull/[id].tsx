import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, useColorScheme } from "react-native";
import { supabase } from "../../lib/supabase";

type ProduktDB = {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  category: string | null;
  is_available: boolean;
};

export default function DetajetProduktit() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dark = useColorScheme() === "dark";
  const tekst = dark ? "#f8fafc" : "#0f172a";
  const tekstDyte = dark ? "#cbd5e1" : "#334155";
  const background = dark ? "#000" : "#fff";

  const [produkt, setProdukt] = useState<ProduktDB | null>(null);
  const [duke_ngarkuar, setDukeNgarkuar] = useState(true);
  const [gabimi, setGabimi] = useState<string | null>(null);

  useEffect(() => {
    async function ngarko() {
      const { data, error } = await supabase
        .from("products")
        .select()
        .eq("id", id)
        .maybeSingle();
      if (error) setGabimi(error.message);
      else setProdukt(data);
      setDukeNgarkuar(false);
    }
    ngarko();
  }, [id]);

  if (duke_ngarkuar) {
    return (
      <ScrollView style={{ backgroundColor: background }} contentContainerStyle={styles.permbajtja}>
        <ActivityIndicator size="large" />
      </ScrollView>
    );
  }

  if (gabimi || !produkt) {
    return (
      <ScrollView style={{ backgroundColor: background }} contentContainerStyle={styles.permbajtja}>
        <Stack.Screen options={{ title: "Produkti" }} />
        <Text style={{ color: tekst, fontSize: 18 }}>
          {gabimi ? `Gabim: ${gabimi}` : "Produkti nuk u gjet."}
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: background }} contentContainerStyle={styles.permbajtja}>
      <Stack.Screen options={{ title: produkt.name }} />
      <Text style={[styles.emri, { color: tekst }]}>{produkt.name}</Text>
      <Text style={[styles.kategoria, { color: tekstDyte }]}>{produkt.category ?? ""}</Text>
      <Text style={[styles.pershkrimi, { color: tekstDyte }]}>{produkt.description ?? ""}</Text>
      <Text style={[styles.cmimi, { color: tekst }]}>{Number(produkt.price).toFixed(2)} €</Text>
      {!produkt.is_available && (
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