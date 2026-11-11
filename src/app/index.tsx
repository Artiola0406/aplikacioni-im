import { Redirect } from 'expo-router';

import { useSesioni } from '@/auth/sesioni';

export default function Index() {
  const { session } = useSesioni();
  return <Redirect href={session ? '/(tabs)/home' : '/login'} />;
}
