import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CattleDetailsData } from '../pageData';
import { Colors, SignupStyle, signupPages } from '../../../../styles';

const dropdownData = Array.from(
  { length: 100 },
  (_, i) => i)
  .map((val) => {
    return { label: val.toString(), value: val };
  });

const CattleDetailsPage = (props: {
  onSubmit: (data: CattleDetailsData) => void,
}) => {
  const [breed, setBreed] = useState('');
  const [numCattle, setNumCattle] = useState(-1);

  const onPressSubmit = () => {
    if (breed === '') {
      alert('Please enter a cattle breed');
      return;
    } else if (numCattle === -1) {
      alert('Please enter the number of cattle');
      return;
    }
    props.onSubmit({ cattleBreed: breed, numCattle });
  };

  return <View style={[SignupStyle.pageContainer, SignupStyle.pageContainerFlex]}>
    <Text style={SignupStyle.pageText}>Cattle Details</Text>

    <View style={SignupStyle.pageContentContainer}>
      <Text style={signupPages.cattle.fieldText}>What Cattle Breed do you have at your ranch?</Text>
      <AppTextInput
        placeholder=''
        value={breed}
        onChangeText={(val) => setBreed(val)}
      />

      <Text style={signupPages.cattle.fieldText}>How many cattle are in your herd?</Text>
      <Dropdown
        data={dropdownData}
        labelField='label'
        valueField='value'
        onChange={(item) => setNumCattle(item.value)}
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

export default CattleDetailsPage;
