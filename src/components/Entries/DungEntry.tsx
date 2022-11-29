import React from 'react';
import { View, Text, GestureResponderEvent } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { AppTextInput } from '../../components';
import { GlobalStyle, TextStyles, Colors } from '../../styles';

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
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
        }}
      >
        <AppTextInput
          onChangeText={() => { }}  // TODO
          value={''}
          placeholder='Type tag'
          width={120}
        />
        <Ionicons name='trash-outline' size={40} onPress={onDungDelete} />
      </View>
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
            -1
          </Text>
        </View>
        <View>
          <Text>
            0
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
            1
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
            {rating.toFixed(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DungEntry;
