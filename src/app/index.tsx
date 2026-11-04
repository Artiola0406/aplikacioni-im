import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import KartaProduktit from "../components/KartaProduktit";
import { supabase } from "../lib/supabase";

type ProduktDB = {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  category: string | null;
  is_available: boolean;
};

export default function Index() {
  const dark = useColorScheme() === "dark";
  const router = useRouter();
  const [produktet, setProduktet] = useState<ProduktDB[]>([]);
  const [duke_ngarkuar, setDukeNgarkuar] = useState(true);
  const [gabimi, setGabimi] = useState<string | null>(null);

  useEffect(() => {
    async function ngarko() {
      const { data, error } = await supabase.from("products").select();
      if (error) {
        setGabimi(error.message);
      } else {
        setProduktet(data ?? []);
      }
      setDukeNgarkuar(false);
    }
    ngarko();
  }, []);

  const tekst = dark ? "#ccc" : "#333";

  if (duke_ngarkuar) {
    return (
      <View style={[styles.qendra, { backgroundColor: dark ? "#000" : "#fff" }]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (gabimi) {
    return (
      <View style={[styles.qendra, { backgroundColor: dark ? "#000" : "#fff" }]}>
        <Text style={{ color: tekst }}>Gabim në ngarkim: {gabimi}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#000" : "#fff" }]}>
      <FlatList
        data={produktet}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={<Text style={styles.title}>Menyja</Text>}
        ListEmptyComponent={<Text style={{ color: tekst }}>Nuk ka produkte në meny.</Text>}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({ pathname: "/artikull/[id]", params: { id: item.id } })
            }
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <KartaProduktit
              emri={item.name}
              pershkrimi={item.description ?? ""}
              cmimi={Number(item.price)}
              kategoria={item.category ?? ""}
              disponueshem={item.is_available}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  qendra: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  lista: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginBottom: 24,
    fontFamily: "Georgia",
  },
});