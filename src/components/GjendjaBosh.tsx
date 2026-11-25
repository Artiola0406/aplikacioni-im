import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  icon?: ComponentProps<typeof Ionicons>['name'];
  title: string;
  description?: string;
  buttonText?: string;
  onPress?: () => void;
};

export default function GjendjaBosh({
  icon = 'cube-outline',
  title,
  description,
  buttonText,
  onPress,
}: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon} size={58} color="#9CA3AF" />
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
      {buttonText && onPress ? (
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 20, padding: 28, marginTop: 12 },
  title: { marginTop: 14, fontSize: 18, fontWeight: '800', color: '#111827', textAlign: 'center' },
  description: { marginTop: 8, color: '#6B7280', textAlign: 'center' },
  button: { marginTop: 18, backgroundColor: '#111827', borderRadius: 999, paddingHorizontal: 18, paddingVertical: 12 },
  buttonText: { color: '#fff', fontWeight: '800' },
});
