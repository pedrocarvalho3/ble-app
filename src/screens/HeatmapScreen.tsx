import React from 'react';
import { View, Text } from 'react-native';

export default function HeatmapScreen() {
  const data = [
    { x: 1, y: 1, value: 5 },
    { x: 1, y: 2, value: 10 },
    { x: 2, y: 1, value: 7 },
    { x: 2, y: 2, value: 3 },
    { x: 3, y: 1, value: 9 },
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Heatmap (Placeholder Data)</Text>

      {data.map((d, index) => (
        <View key={index} style={{
          width: 60,
          height: 60,
          backgroundColor: `rgba(255,0,0,${d.value / 10})`,
          margin: 2,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white' }}>{d.value}</Text>
        </View>
      ))}
    </View>
  );
}
