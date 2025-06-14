import React from 'react';
import { View, Text } from 'react-native';
import mockedData from './mocked_heatmap_data.json';

const CELL_SIZE = 30;
const NUM_COLS = 10;

export default function HeatmapScreen() {
  const maxValue = Math.max(...mockedData.map(d => d.value));

  return (
    <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 15, fontWeight: 'bold' }}>Heatmap Visualization</Text>

      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: CELL_SIZE * NUM_COLS,
        borderWidth: 1,
        borderColor: '#ccc',
      }}>
        {mockedData.map((d, index) => {
          const normalizedValue = d.value / maxValue;
          const red = normalizedValue * 255;
          const blue = (1 - normalizedValue) * 255;
          const backgroundColor = `rgb(${red}, 0, ${blue})`;

          return (
            <View
              key={index}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 0.5,
                borderColor: '#eee',
              }}
            >
              <Text style={{ color: 'white', fontSize: 10 }}>{d.value}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}


