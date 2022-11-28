import { AppButton } from '../../../../components';
import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RanchDetailsData } from '../pageData';
import { Colors, SignupStyle, signupPages } from '../../../../styles';

const dropdownData = Array.from(
  { length: 50 },
  (_, i) => i)
  .map((val) => {
    return { label: val.toString(), value: val };
  });

const RanchDetailsPage = (props: {
  onSubmit: (data: RanchDetailsData) => void,
}) => {
  const [yrsRanching, setYrsRanching] = useState<number>(-1);
  const [yrsHolistic, setYrsHolistic] = useState<number>(-1);

  const onPressSubmit = () => {
    if (yrsRanching === -1) {
      alert('Please enter the numbers of years you have been ranching');
      return;
    } else if (yrsHolistic === -1) {
      alert('Please enter the number of years you have been holistic ranching');
      return;
    }
    props.onSubmit({ yrsRanching, yrsHolistic });
  };

  return <View style={[SignupStyle.pageContainer, SignupStyle.pageContainerFlex]}>
    <Text style={SignupStyle.pageText}>Ranch Details</Text>

    <View style={SignupStyle.pageContentContainer}>
      <Text style={signupPages.years.fieldText}>How many years have you been at this ranch?</Text>
      <Dropdown
        data={dropdownData}
        labelField='label'
        valueField='value'
        onChange={(item) => setYrsRanching(item.value)}
        placeholder='select'
        selectedTextStyle={SignupStyle.dropdownSelectedText}
        placeholderStyle={SignupStyle.dropdownSelectedText}
        style={SignupStyle.dropdown}
      />

      <Text style={signupPages.years.fieldText}>How many years have you spent Holistic Ranching?</Text>
      <Dropdown
        data={dropdownData}
        labelField='label'
        valueField='value'
        onChange={(item) => setYrsHolistic(item.value)}
        placeholder='select'
        selectedTextStyle={SignupStyle.dropdownSelectedText}
        placeholderStyle={SignupStyle.dropdownSelectedText}
        style={SignupStyle.dropdown}
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

export default RanchDetailsPage;
