import React from 'react';
import { View, GestureResponderEvent, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { GlobalStyle, Colors, TextStyles } from '../../styles';
import EntryLabel from './EntryLabel';
import EntryNumberWatch from './EntryNumberWatch';

export interface IDungEntry {
  num: number,
  rating: number,
  onDungEdit: ((value: number) => void)
  onDungDelete: ((event: GestureResponderEvent) => void)
}

const DungEntry = ({ num, rating, onDungEdit, onDungDelete }: IDungEntry) => {
  return <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      paddingBottom: 20,
    }}
  >
    <EntryLabel
      title={'Dung Entry ' + (num + 1).toString()}
      deleteCallback={onDungDelete}
    />

    <Slider
      style={GlobalStyle.slider}
      minimumValue={-1}
      maximumValue={1}
      onValueChange={onDungEdit}
      step={0.1}
      value={rating}
      minimumTrackTintColor={Colors.primary.vibrantGreen}
      thumbTintColor={Colors.primary.vibrantGreen}
    />

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
      }}
    >
      <Text>-1</Text>
      <Text>0</Text>
      <Text>1</Text>
    </View>

    <EntryNumberWatch val={rating.toFixed(1)} />
  </View>;
};

export default DungEntry;
