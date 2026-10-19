import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import KartaKuizit from "../components/KartaKuizit";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Enis & Artiola</Text>
      <Text style={styles.text}>Platforma: {Platform.OS}</Text>

      <View style={styles.lista}>
        <KartaKuizit
          titulli="Bazat e React Native"
          numriPyetjeve={10}
          lenda="Zhvillimi i aplikacioneve mobile"
          statusi="përfunduar"
          rezultati={80}
        />
        <KartaKuizit
          titulli="Hyrje në TypeScript"
          numriPyetjeve={8}
          lenda="Programim"
          statusi="në progres"
        />
        <KartaKuizit
          titulli="Bazat e të dhënave"
          numriPyetjeve={15}
          lenda="Databaza"
          statusi="i pa filluar"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  text: { color: "#333", marginBottom: 24 },
  lista: { width: "100%" },
});