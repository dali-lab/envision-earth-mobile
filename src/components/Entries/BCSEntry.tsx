import React from 'react';
import { View, Text, GestureResponderEvent } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyle, TextStyles, Colors } from '../../styles';

export interface IBCSEntry {
  bcs: number,
  onBCSEdit: ((value: number) => void)
  onBCSDelete: ((event: GestureResponderEvent) => void)
}

const BCSEntry = ({ bcs, onBCSEdit, onBCSDelete }: IBCSEntry) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ionicons name='trash-outline' size={26} onPress={onBCSDelete} />
      <Text style={[TextStyles.subHeading, { minWidth: 100, textAlign: 'center' }]}>BCS Entry: {bcs}</Text>
      <Slider
        style={GlobalStyle.slider}
        minimumValue={1}
        maximumValue={9}
        onValueChange={onBCSEdit}
        step={1}
        value={bcs}
      />
    </View>
  );
};

export default BCSEntry;
