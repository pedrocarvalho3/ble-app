import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BleScreen from './src/screens/BleScreen';
import HeatmapScreen from './src/screens/HeatmapScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BLE">
        <Stack.Screen name="BLE" component={BleScreen} />
        <Stack.Screen name="Heatmap" component={HeatmapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
