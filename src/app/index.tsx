import { Platform, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Artiola & Enis</Text>
      <Text style={styles.text}>Platforma: {Platform.OS}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "red",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
  },
  text: { color: "#333" },
});