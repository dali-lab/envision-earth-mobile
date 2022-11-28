import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { FirstLastNameData } from '../pageData';
import { Colors, signupPages, SignupStyle } from '../../../../styles';

const FirstLastNamePage = (props: {
  onSubmit: (data: FirstLastNameData) => void,
}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

  const onPressSubmit = () => {
    if (fname === '') {
      alert('Please enter your first name');
      return;
    } else if (lname === '') {
      alert('Please enter your last name');
      return;
    }
    props.onSubmit({ fname, lname });
  };

  return <View style={[SignupStyle.pageContainer, SignupStyle.pageContainerFlex]}>
    <Text style={SignupStyle.pageText}>Introduce yourself!</Text>

    <View style={SignupStyle.pageContentContainer}>
      <View style={signupPages.firstlastname.input}>
        <AppTextInput
          value={fname}
          onChangeText={(val) => setFname(val)}
          placeholder='first name'
        />
      </View>
      <View style={signupPages.firstlastname.input}>
        <AppTextInput
          value={lname}
          onChangeText={(val) => setLname(val)}
          placeholder='last name'
        />
      </View>
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='next →'
      textColor={Colors.secondary.white}
      backgroundColor={Colors.primary.vibrantGreen}
      width={Dimensions.get('window').width * 0.3}
    />
  </View>;
};

export default FirstLastNamePage;
