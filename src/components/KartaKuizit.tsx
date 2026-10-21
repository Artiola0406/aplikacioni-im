import { StyleSheet, Text, useColorScheme, View } from "react-native";

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
  // Ngjyrat varen nga modi (light ose dark)
  const dark = useColorScheme() === "dark";
  const tekst = dark ? "#f8fafc" : "#0f172a";
  const tekstDyte = dark ? "#cbd5e1" : "#334155";

  return (
    <View style={[styles.karta, { backgroundColor: dark ? "#1e293b" : "#f1f5f9" }]}>
      <Text style={[styles.titulli, { color: tekst }]}>{titulli}</Text>
      <Text style={{ color: tekstDyte }}>
        {lenda} · {numriPyetjeve} pyetje
      </Text>
      <Text style={[styles.statusi, { color: tekstDyte }]}>Statusi: {statusi}</Text>
      {/* Rezultati shfaqet vetëm kur ekziston (0 është vlerë e vlefshme) */}
      {rezultati !== undefined && (
        <Text style={{ color: tekst }}>Rezultati: {rezultati}%</Text>
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
  titulli: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  statusi: { marginTop: 4, fontStyle: "italic" },
});