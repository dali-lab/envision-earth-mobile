import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from '../../../components/AppTextInput';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import NumberSlider from 'react-native-number-slider';

const RanchInfo2Page = () => {
  const [ranchAddr, setRanchAddr] = useState<string>('');
  const [cattleBreed, setCattleBreed] = useState<string>('');
  const [herdSize, setHerdSize] = useState<number>(0);

  const handleSubmit = () => {
    
  };

  return (
    <View>
      <AppTextInput
        onChangeText={(text) => setRanchId(ranchAddr)}
        value={ranchAddr}
        placeholder='ranch ID #'
      />
      <AppTextInput
        onChangeText={(text) => setCattleBreed(text)}
        value={cattleBreed}
        placeholder='ranch ID #'
      />
      <NumberSlider
        onValueChange={(value: number) => setHerdSize(value)}
        value={herdSize}
      />
    </View>
  );
};

export default RanchInfo2Page;
