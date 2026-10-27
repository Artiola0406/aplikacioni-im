import { StyleSheet, Text, useColorScheme, View } from "react-native";

type Props = {
  emri: string;
  pershkrimi: string;
  cmimi: number;
  kategoria: string;
  disponueshem: boolean;
};

export default function KartaProduktit({
  emri,
  pershkrimi,
  cmimi,
  kategoria,
  disponueshem,
}: Props) {
  const dark = useColorScheme() === "dark";
  const tekst = dark ? "#f8fafc" : "#0f172a";
  const tekstDyte = dark ? "#cbd5e1" : "#334155";

  return (
    <View
      style={[
        styles.karta,
        {
          backgroundColor: dark ? "#1e293b" : "#f1f5f9",
          opacity: disponueshem ? 1 : 0.5,
        },
      ]}
    >
      <Text style={[styles.emri, { color: tekst }]}>{emri}</Text>
      <Text style={{ color: tekstDyte }}>{pershkrimi}</Text>
      <View style={styles.rreshti}>
        <Text style={{ color: tekstDyte }}>{kategoria}</Text>
        <Text style={[styles.cmimi, { color: tekst }]}>{cmimi.toFixed(2)} €</Text>
      </View>
      {!disponueshem && (
        <Text style={styles.padisponueshem}>Nuk është i disponueshëm</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  karta: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  emri: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  rreshti: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  cmimi: { fontWeight: "bold" },
  padisponueshem: { marginTop: 6, color: "#dc2626", fontStyle: "italic" },
});