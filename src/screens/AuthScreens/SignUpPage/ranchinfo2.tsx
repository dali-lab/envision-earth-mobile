import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from '../../../components/AppTextInput';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
// import NumberSlider from 'react-native-number-slider';
// This external NumberSlider repo is super sketch

const RanchInfo2Page = () => {
  const [ranchAddr, setRanchAddr] = useState<string>('');
  const [cattleBreed, setCattleBreed] = useState<string>('');
  const [herdSize, setHerdSize] = useState<number>(0);

  const handleSubmit = () => {
    
  };

  return (
    <View>
      <AppTextInput
        onChangeText={(text) => setRanchAddr(ranchAddr)}
        value={ranchAddr}
        placeholder='ranch ID #'
      />
      <AppTextInput
        onChangeText={(text) => setCattleBreed(text)}
        value={cattleBreed}
        placeholder='ranch ID #'
      />
    </View>
  );
};

export default RanchInfo2Page;

/*
<NumberSlider
  onValueChange={(value: number) => setHerdSize(value)}
  value={herdSize}
/>
*/