import { Slider } from '@miblanchard/react-native-slider';
import AppButton from '../../../components/AppButton';
import React, { useState } from 'react';
import { ScrollView, SafeAreaView, Text, View, Image } from 'react-native';
import GlobalStyle from '../../../utils/styles/GlobalStyle';

const ForageQualPage = () => {
  const [forageRate, setForageRate] = useState<number>(5);

  const onPressTakePhoto = () => {

  };

  const onPressAddNote = () => {

  };

  const onSubmit = () => {

  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text>Forage Quality</Text>
      <ScrollView>

        {/* TODO: Add the dropdown to select paddock */}
        <Text>paddock</Text>

        <Text>reference images</Text>
        <View>
          <View>
            <Image />
            <Text>1</Text>
          </View>
          <View>
            <Image />
            <Text>5</Text>
          </View>
          <View>
            <Image />
            <Text>9</Text>
          </View>
        </View>

        <Text>rate forage</Text>
        <Slider
          minimumValue={1}
          maximumValue={9}
          value={forageRate}
          onValueChange={val => setForageRate(val[1])}
          step={0.1}
          trackMarks={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        />

        <AppButton
          onPress={onPressTakePhoto}
          title='take photo'
        />
        <AppButton
          onPress={onPressAddNote}
          title='add note'
        />

        <AppButton
          onPress={onSubmit}
          title='submit'
        />

      </ScrollView>
    </SafeAreaView>
  );
};

export default ForageQualPage;
