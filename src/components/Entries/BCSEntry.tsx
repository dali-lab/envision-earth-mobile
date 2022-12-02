import React from 'react';
import { View, Text, GestureResponderEvent } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyle, Colors, FormsStyle } from '../../styles';
import EntryLabel from './EntryLabel';

export interface IBCSEntry {
  bcs: number,
  onBCSEdit: ((value: number) => void)
  onBCSDelete: ((event: GestureResponderEvent) => void)
}

const BCSEntry = ({ bcs, onBCSEdit, onBCSDelete }: IBCSEntry) => {
  return (
    <View
    >
      <EntryLabel
        title={'BCS: ' + bcs}
        deleteCallback={onBCSDelete}
      />
      <Slider
        style={GlobalStyle.slider}
        minimumValue={1}
        maximumValue={9}
        onValueChange={onBCSEdit}
        step={1}
        value={bcs}
        thumbTintColor={Colors.secondary.mediumGreen}
      />
    </View>
  );
};

export default BCSEntry;
