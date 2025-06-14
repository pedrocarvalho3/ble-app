# React Native BLE + Heatmap Demo

This project is a React Native application demonstrating:

- BLE (Bluetooth Low Energy) scanning, connection, and 2-way communication using `react-native-ble-manager`
- A simple heatmap display using placeholder data
- Navigation between BLE screen and Heatmap screen

---

## 📦 Installation

Make sure you have the React Native CLI and Android/iOS environment properly configured.

1. Clone the repository and navigate to the project folder:

```bash
git clone https://github.com/pedrocarvalho3/ble-app
cd ble-app
```

2. Install the dependencies:

```bash
npm install
```

---

## 🚀 Running the App

### Android

```bash
npx react-native run-android
```

### iOS

```bash
npx pod-install
npx react-native run-ios
```

> ℹ️ On iOS, ensure you are using a physical device if testing BLE features.

---

## 🧪 Start Development

To start the development server:

```bash
npm start
```

---

## ⚠️ Important Note

Inside `src/hooks/useBleConnection.ts`, make sure to set your **BLE service UUID** and **characteristic UUID** manually with fixed values before running the app:

```ts
const [serviceUUID, setServiceUUID] = useState<string>('your-service-uuid');
const [characteristicUUID, setCharacteristicUUID] = useState<string>(
  'your-characteristic-uuid',
);
```

> Replace `'your-service-uuid'` and `'your-characteristic-uuid'` with the actual values provided by your BLE device.

---

## 📂 Screens

- `BleScreen`: Handles Bluetooth scanning, device connection, data send/receive
- `HeatmapScreen`: Displays a static heatmap chart

---

## 📱 Tested Devices

- Android (Samsung, Xiaomi)
- iOS (iPhone via Mac - physical device required)

---

## 📄 License

MIT
