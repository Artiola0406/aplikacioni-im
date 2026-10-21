import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import KartaKuizit from "../components/KartaKuizit";
import { kuizet } from "../data/kuizet";

export default function Index() {
  const dark = useColorScheme() === "dark";
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#000" : "#fff" }]}>
      <FlatList
        data={kuizet}
        keyExtractor={(k) => k.id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={<Text style={styles.title}>Enis & Artiola</Text>}
        // Gjendja bosh: shfaqet kur lista nuk ka asnjë artikull
        ListEmptyComponent={
          <Text style={{ color: dark ? "#ccc" : "#333" }}>Nuk ke ende kuize.</Text>
        }
        renderItem={({ item }) => (
          // Pressable e bën kartën të prekshme; onPress hap /artikull/<id>
          <Pressable
            onPress={() =>
              router.push({ pathname: "/artikull/[id]", params: { id: item.id } })
            }
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}
          >
            <KartaKuizit
              titulli={item.titulli}
              numriPyetjeve={item.numriPyetjeve}
              lenda={item.lenda}
              statusi={item.statusi}
              rezultati={item.rezultati}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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