import React from 'react';
import { View, GestureResponderEvent } from 'react-native';
import Slider from '@react-native-community/slider';
import { GlobalStyle } from '../../styles';
import EntryLabel from './EntryLabel';

export interface IDungEntry {
  rating: number,
  onDungEdit: ((value: number) => void)
  onDungDelete: ((event: GestureResponderEvent) => void)
}

const DungEntry = ({ rating, onDungEdit, onDungDelete }: IDungEntry) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <EntryLabel
        title={'Dung Entry: ' + rating.toFixed(1)}
        deleteCallback={onDungDelete}
      />
      <Slider
        style={GlobalStyle.slider}
        minimumValue={-1}
        maximumValue={1}
        onValueChange={onDungEdit}
        step={0.1}
        value={rating}
      />
    </View>
  );
};

export default DungEntry;
