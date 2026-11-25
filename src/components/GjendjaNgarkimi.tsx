import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function GjendjaNgarkimi({ label = 'Po ngarkohet...' }: { label?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#EE6C3A" />
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', paddingVertical: 28 },
  text: { marginTop: 10, color: '#6B7280', fontWeight: '600' },
});
