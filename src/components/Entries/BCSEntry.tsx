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
        minimumTrackTintColor={Colors.primary.vibrantGreen}
        thumbTintColor={Colors.primary.vibrantGreen}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          }}
        >
          <Text>
            1
          </Text>
        </View>
        <View>
          <Text>
            5
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Text>
            9
          </Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <View
          style={{
            backgroundColor: Colors.secondary.white,
            borderRadius: 10,
          }}
        >
          <Text style={[
            TextStyles.subHeading,
            { minWidth: 100, textAlign: 'center', color: Colors.primary.vibrantGreen }]}
          >
            {bcs}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default BCSEntry;
