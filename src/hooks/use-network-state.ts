import NetInfo, { type NetInfoState } from '@react-native-community/netinfo';
import { useCallback, useEffect, useState } from 'react';

export function useNetworkState() {
  const [state, setState] = useState<NetInfoState | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(setState);
    void NetInfo.fetch().then(setState);
    return unsubscribe;
  }, []);

  const refresh = useCallback(async () => {
    const nextState = await NetInfo.fetch();
    setState(nextState);
  }, []);

  return {
    isConnected: state?.isConnected !== false,
    refresh,
  };
}
