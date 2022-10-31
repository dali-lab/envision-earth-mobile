import { Slider } from '@miblanchard/react-native-slider';
import AppButton from 'components/AppButton';
import React, { useState } from 'react';
import { View, Image, ScrollView, SafeAreaView, Text } from 'react-native';
import GlobalStyle from '../../../utils/styles/GlobalStyle';

const DungPage = () => {
  const [pieData, setPieData] = useState<number[]>([0]);
  const [numPies, setNumPies] = useState<number>(1);

  const addPie = () => {
    setNumPies(num => num + 1);
    setPieData((data: number[]) => {
      const ret = data;
      ret.push(0);
      return ret;
    });
  };

  const removePie = (index: number) => {
    setPieData((data: number[]) => {
      const ret = data;
      ret.splice(index, 1);
      return ret;
    });
    setNumPies(num => num - 1);
  };

  const PieView = (index) => {
    return <View>
      <Text>Pie {index}</Text>
      <AppButton
        onPress={() => removePie(index)}
        title='trash icon'
      />

      <Slider
        minimumValue={-1}
        maximumValue={1}
        value={pieData[index]}
        step={0.05}
        trackMarks={[-1, 0, 1]}
      />

      <Text>{pieData[index]}</Text>
    </View>;
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>

        <Text>paddock</Text>

        <View>
          <View>
            <Image />
            <Text> -1</Text>
          </View>
          <View>
            <Image />
            <Text>0</Text>
          </View>
          <View>
            <Image />
            <Text>1</Text>
          </View>
        </View>

        <View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default DungPage;
