import { StyleSheet, Text, View } from "react-native";

type Props = {
  titulli: string;
  numriPyetjeve: number;
  lenda: string;
  statusi: "i pa filluar" | "në progres" | "përfunduar";
  rezultati?: number; // fushë opsionale me ?
};

export default function KartaKuizit({
  titulli,
  numriPyetjeve,
  lenda,
  statusi,
  rezultati,
}: Props) {
  return (
    <View style={styles.karta}>
      <Text style={styles.titulli}>{titulli}</Text>
      <Text>{lenda} · {numriPyetjeve} pyetje</Text>
      <Text style={styles.statusi}>Statusi: {statusi}</Text>
      {rezultati !== undefined && <Text>Rezultati: {rezultati}%</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  karta: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  titulli: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  statusi: { marginTop: 4, fontStyle: "italic" },
});