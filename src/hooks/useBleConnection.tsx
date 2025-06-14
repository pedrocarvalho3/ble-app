import { useState } from 'react';
import { Alert } from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Buffer } from 'buffer';

export const useBleConnection = () => {
  const [connectedDeviceId, setConnectedDeviceId] = useState<string | null>(null);
  const [serviceUUID, setServiceUUID] = useState<string>('f31ae6a6-bc53-4b56-b6dc-21bf6dacbfcd');
  const [characteristicUUID, setCharacteristicUUID] = useState<string>('1111');

  const connectToDevice = async (id: string) => {
    try {
      await BleManager.connect(id);
      const infoPeripheral = await BleManager.retrieveServices(id);

      console.log('Connected to Device:', infoPeripheral);
      setConnectedDeviceId(id);
    } catch (error) {
      console.error('Connect to Device Error:', error);
    }
  };

  const sendData = async (data: string) => {
    if (!serviceUUID || !characteristicUUID) {
      Alert.alert('Service or Characteristic UUID is not set.');
      return;
    }

    if (!connectedDeviceId) return;

    try {
      const buffer = Array.from(Buffer.from(data, 'utf-8'));
      await BleManager.write(
        connectedDeviceId,
        serviceUUID,
        characteristicUUID,
        buffer,
      );
    } catch (error) {
      console.error('Send Data Error:', error);
    }
  };

  const listenForData = async () => {
    if (!connectedDeviceId) return;
    try {
      await BleManager.startNotification(
        connectedDeviceId,
        serviceUUID,
        characteristicUUID
      );
    } catch (error) {
      console.error('Listen For Data Error:', error);
    }
  };

  return {
    connectedDeviceId,
    connectToDevice,
    sendData,
    listenForData,
  };
};
