import { useState } from 'react';
import BleManager, { Peripheral } from 'react-native-ble-manager';

export const useBleScanner = () => {
  const [devices, setDevices] = useState<Peripheral[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const scanDevices = async () => {
    setDevices([]);
    setIsScanning(true);
    try {
      await BleManager.scan([], 5, true);
      setTimeout(async () => {
        const found = await BleManager.getDiscoveredPeripherals();
        setDevices(found);
      }, 6000);
    } catch (error) {
      console.error('Scan Devices Error:', error);
      setIsScanning(false);
    } finally {
      setIsScanning(false);
    }
  };

  return {
    devices,
    isScanning,
    scanDevices,
  };
};
