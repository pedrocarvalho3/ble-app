import React, { useEffect, useState } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import BleManager, { Peripheral, BleManagerDidUpdateValueForCharacteristicEvent } from 'react-native-ble-manager';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

const BleScreen: React.FC = () => {
  const [devices, setDevices] = useState<Peripheral[]>([]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [connectedDeviceId, setConnectedDeviceId] = useState<string | null>(null);
  const [serviceUUID, setServiceUUID] = useState<string>('');
  const [characteristicUUID, setCharacteristicUUID] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [receivedData, setReceivedData] = useState<string>('');

  useEffect(() => {
    BleManager.start({ showAlert: false });
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
    }

    const handler = BleManager.onDidUpdateValueForCharacteristic((event: BleManagerDidUpdateValueForCharacteristicEvent) => {
      const received = Buffer.from(event.value).toString();
      setReceivedData(received);
    });

    return () => {
      handler.remove();
    };
  }, []);

  const scanDevices = async () => {
    setDevices([]);
    setIsScanning(true);
    try {
      await BleManager.scan([], 5, true);
      setTimeout(async () => {
        const found = await BleManager.getDiscoveredPeripherals();
        setDevices(found);
      }, 6000);
      devices.length > 0 && setIsScanning(false);
    } catch (error) {
      console.error('Scan Devices Error:', error);
      setIsScanning(false)
    } finally {
      setIsScanning(false);
    }
  };

  const connectToDevice = async (id: string) => {
    try {
      await BleManager.connect(id);
      const peripheralInfo = await BleManager.retrieveServices(id);

      const characteristics = peripheralInfo.characteristics;

      if (characteristics && characteristics.length > 0) {
        const lastCharacteristic = characteristics[characteristics.length - 1];
        setServiceUUID(lastCharacteristic.service);
        setCharacteristicUUID(lastCharacteristic.characteristic);
      } else {
        Alert.alert('No characteristics found for this device.');
        return;
      }

      setConnectedDeviceId(id);
    } catch (error) {
      console.error('Connect to Device Error:', error);
    }
  };

  const sendData = async () => {
    if (!connectedDeviceId) {
      console.warn('No device connected.');
      return;
    }

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


  const listenForData = () => {
    if (!connectedDeviceId) {
      console.warn('No device connected.');
      return;
    }
    try {
      BleManager.startNotification(
        connectedDeviceId,
        serviceUUID,
        characteristicUUID,
      );
    } catch (error) {
      console.error('Listen For Data Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {isScanning && (
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Scanning for devices...
        </Text>
      )}

      <TouchableOpacity onPress={scanDevices}>
        <Text style={{ fontSize: 16, padding: 10, backgroundColor: '#ccc' }}>
          Scan Devices
        </Text>
      </TouchableOpacity>

      {devices.map(device => (
        <Button
          key={device.id}
          title={device.name || device.id}
          onPress={() => connectToDevice(device.id)}
        />
      ))}

      {connectedDeviceId && (
        <>
          <Text>Connected to: {connectedDeviceId}</Text>
          <TextInput
            placeholder="Message to Send"
            value={data}
            onChangeText={setData}
            style={{ borderWidth: 1, marginVertical: 10, padding: 10 }}
          />
          <Button title="Send Data" onPress={sendData} />
          <Button title="Start Listening" onPress={listenForData} />
          <Text>Received: {receivedData}</Text>
        </>
      )}
    </ScrollView>
  );
};

export default BleScreen;