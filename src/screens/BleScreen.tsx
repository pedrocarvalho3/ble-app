import React, { useState } from 'react';
import {
  Text,
  Button,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { Buffer } from 'buffer';
import { useBleSetup } from '../hooks/useBleSetup';
import { useBleScanner } from '../hooks/useBleScanner';
import { useBleConnection } from '../hooks/useBleConnection';
import { useNavigation } from '@react-navigation/native';

global.Buffer = Buffer;

const BleScreen: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [receivedData, setReceivedData] = useState<string>('');
  const navigation = useNavigation();

  const { devices, isScanning, scanDevices } = useBleScanner();
  const {
    connectedDeviceId,
    connectToDevice,
    sendData,
    listenForData,
  } = useBleConnection();

  useBleSetup(setReceivedData);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 10 }}>
      <View style={{ marginBottom: 10 }}>
        <Button title="Ver Heatmap" onPress={() => navigation.navigate('Heatmap')} />
      </View>

      {isScanning && (
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Scanning for devices...
        </Text>
      )}

      <Button title="Scan Devices" onPress={scanDevices} />

      <Text style={{ fontSize: 18, marginVertical: 10 }}>Available Devices:</Text>
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
          <Button title="Send Data" onPress={() => sendData(data)} />
          <Button title="Start Listening" onPress={listenForData} />
          <Text>Received: {receivedData}</Text>
        </>
      )}
    </ScrollView>
  );
};

export default BleScreen;