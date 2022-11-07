import React from 'react';
import { View, Text, GestureResponderEvent } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import GlobalStyle from '../../utils/styles/GlobalStyle';
import TextStyles from '../../utils/styles/TextStyles';

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
      <Ionicons name='trash-outline' size={26} onPress={onDungDelete} />
      <Text style={[
        TextStyles.subHeading,
        { minWidth: 100, textAlign: 'center' }]}
      >
        Dung Entry: {rating.toFixed(1)}
      </Text>
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