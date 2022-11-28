import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { PaddocksDetailsData } from '../pageData';
import { Colors, SignupStyle, signupPages } from '../../../../styles';
import { ScrollView } from 'react-native-gesture-handler';

const PaddocksDetailsPage = (props: {
  onSubmit: (data: PaddocksDetailsData) => void,
}) => {
  const [paddocks, setPaddocks] = useState<string[]>([]);
  const addPaddock = () => {
    console.log(paddocks);
    setPaddocks(old => [...old, '']);
  };
  const removePaddock = (idx: number) => {
    setPaddocks(prev => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
    console.log('removing paddock ' + idx.toString());
  };
  const editPaddock = (value: string, idx: number) => {
    setPaddocks(prev => {
      const ret = prev;
      ret[idx] = value;
      return ret;
    });
    console.log('editing paddock ' + idx.toString());
  };

  const onPressSubmit = () => {
    if (paddocks.length === 0) {
      alert('Please enter at least one paddock');
      return;
    }
    props.onSubmit({ paddocks });
  };

  return <View style={[SignupStyle.pageContainer, SignupStyle.pageContainerFlex]}>
    <Text style={SignupStyle.pageText}>How many paddocks do you have?</Text>

    <View style={SignupStyle.pageContentContainer}>
      <ScrollView style={signupPages.paddocks.allPaddocksContainer}>
        {paddocks.map((paddock, idx) => <View style={signupPages.paddocks.paddockContainer}>
          <Text>{idx + 1}.</Text>
          <AppTextInput
            onChangeText={(value) => editPaddock(value, idx)}
            value={paddock}
            placeholder={'Paddock ' + (idx + 1).toString()}
            height={50}
            width={Dimensions.get('window').width * 0.5}
          />
          <AppButton
            onPress={() => removePaddock(idx)}
            title='-'
            backgroundColor={Colors.primary.lightOrange}
            textColor={Colors.primary.mainOrange}
            height={40}
          />
        </View>)}
      </ScrollView>

      <AppButton
        onPress={addPaddock}
        title='+'
        height={40}
        backgroundColor={Colors.secondary.mediumGreen}
        textColor={Colors.secondary.white}
        width={Dimensions.get('window').width * 0.2}
      />
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='next →'
      textColor={Colors.secondary.white}
      backgroundColor={Colors.primary.vibrantGreen}
      width={Dimensions.get('window').width * 0.35}
    />
  </View>;
};

export default PaddocksDetailsPage;
