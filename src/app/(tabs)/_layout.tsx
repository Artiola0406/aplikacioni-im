import { Tabs } from 'expo-router';
import { Text } from 'react-native';

import { useCart } from '@/context/cart-context';

export default function TabsLayout() {
  const { itemCount } = useCart();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: 86,
          paddingTop: 10,
          paddingBottom: 18,
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 12,
          elevation: 8,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 12,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#111827',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>{color === '#111827' ? '🏠' : '🏠'}</Text>,
          tabBarAccessibilityLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>{color === '#111827' ? '🎁' : '🎁'}</Text>,
          tabBarAccessibilityLabel: 'Oferta',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>{color === '#111827' ? '🛒' : '🛒'}</Text>,
          tabBarBadge: itemCount > 0 ? itemCount : undefined,
          tabBarBadgeStyle: { backgroundColor: '#EE6C3A', color: '#fff' },
          tabBarAccessibilityLabel: 'Shporta',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>{color === '#111827' ? '👤' : '👤'}</Text>,
          tabBarAccessibilityLabel: 'Profili',
        }}
      />
    </Tabs>
  );
}
