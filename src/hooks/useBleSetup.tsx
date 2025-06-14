import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import BleManager, { BleManagerDidUpdateValueForCharacteristicEvent } from 'react-native-ble-manager';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

export const useBleSetup = (onReceive: (data: string) => void) => {
  useEffect(() => {
    BleManager.start({ showAlert: false });

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
    }

    const handler = BleManager.onDidUpdateValueForCharacteristic(
      (event: BleManagerDidUpdateValueForCharacteristicEvent) => {
        const received = Buffer.from(event.value).toString();
        onReceive(received);
      }
    );

    return () => {
      handler.remove();
    };
  }, [onReceive]);
};
