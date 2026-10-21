import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import { kuizet } from "../../data/kuizet";

export default function DetajetKuizit() {
  // id vjen nga adresa: /artikull/2 jep id = "2"
  const { id } = useLocalSearchParams<{ id: string }>();
  const dark = useColorScheme() === "dark";

  const tekst = dark ? "#fff" : "#000";
  const tekstDyte = dark ? "#ccc" : "#444";
  const sfondi = dark ? "#000" : "#fff";

  // Gjen kuizin me atë id (ose undefined nëse nuk ekziston)
  const kuizi = kuizet.find((k) => k.id === id);

  // Gjendja e gabimit: id që nuk ekziston, p.sh. /artikull/x99
  if (!kuizi) {
    return (
      <View style={[styles.container, { backgroundColor: sfondi }]}>
        <Stack.Screen options={{ title: "Gabim" }} />
        <Text style={[styles.titulli, { color: tekst }]}>Kuizi nuk u gjet</Text>
        <Text style={{ color: tekstDyte }}>
          Nuk ekziston asnjë kuiz me id "{id}".
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: sfondi }}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen options={{ title: kuizi.titulli }} />
      <Text style={[styles.titulli, { color: tekst }]}>{kuizi.titulli}</Text>
      <Text style={[styles.rresht, { color: tekstDyte }]}>
        Lënda: {kuizi.lenda}
      </Text>
      <Text style={[styles.rresht, { color: tekstDyte }]}>
        Pyetje: {kuizi.numriPyetjeve}
      </Text>
      <Text style={[styles.rresht, { color: tekstDyte }]}>
        Statusi: {kuizi.statusi}
      </Text>
      {/* Rezultati shfaqet vetëm kur ekziston (0 është vlerë e vlefshme) */}
      {kuizi.rezultati !== undefined && (
        <Text style={[styles.rresht, { color: tekstDyte }]}>
          Rezultati: {kuizi.rezultati}%
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulli: { fontSize: 26, fontWeight: "bold", marginBottom: 12 },
  rresht: { fontSize: 16, marginBottom: 6 },
});