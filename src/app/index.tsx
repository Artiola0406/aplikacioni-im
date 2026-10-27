import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";
import KartaProduktit from "../components/KartaProduktit";
import { produktet } from "../data/produktet";

export default function Index() {
  const dark = useColorScheme() === "dark";
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: dark ? "#000" : "#fff" }]}>
      <FlatList
        data={produktet}
        keyExtractor={(p) => p.id}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={<Text style={styles.title}>Menyja</Text>}
        ListEmptyComponent={
          <Text style={{ color: dark ? "#ccc" : "#333" }}>
            Nuk ka produkte në meny.
          </Text>
        }
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
              emri={item.emri}
              pershkrimi={item.pershkrimi}
              cmimi={item.cmimi}
              kategoria={item.kategoria}
              disponueshem={item.disponueshem}
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