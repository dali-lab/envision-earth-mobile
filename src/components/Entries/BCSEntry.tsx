import React from 'react';
import { View, Text, GestureResponderEvent } from 'react-native';
import Slider from '@react-native-community/slider';
import { GlobalStyle, Colors, FormsStyle, TextStyles } from '../../styles';
import EntryLabel from './EntryLabel';
import EntryNumberWatch from './EntryNumberWatch';

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
        minimumTrackTintColor={Colors.primary.vibrantGreen}
        thumbTintColor={Colors.primary.vibrantGreen}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text>1</Text>
        <Text>3</Text>
        <Text>5</Text>
        <Text>7</Text>
        <Text>9</Text>
      </View>

      <EntryNumberWatch val={bcs.toString()} />
    </View>
  );
};

export default BCSEntry;
