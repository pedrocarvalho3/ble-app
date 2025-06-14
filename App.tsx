import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BleScreen from './src/screens/BleScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BLE" component={BleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
