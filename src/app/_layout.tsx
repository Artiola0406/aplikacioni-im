import { Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const dark = useColorScheme() === "dark";

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: dark ? "#000" : "#fff" },
        headerTintColor: dark ? "#fff" : "#000",
        headerBackTitle: "Kthehu",
      }}
    >
      {/* Ekrani kryesor ka titullin e vet, ndaj e fshehim kokën */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}