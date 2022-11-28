import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { CalvingDateData } from '../pageData';
import { Colors, signupPages, SignupStyle } from '../../../../styles';

const CalvingDatePage = (props: {
  onSubmit: (data: CalvingDateData) => void,
}) => {
  const [date, setDate] = useState('');

  const onPressSubmit = () => {
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/;
    if (!dateRegex.test(date) || Date.parse(date) === NaN) {
      alert('Please enter a date in the form mm/dd/yyyy');
      return;
    }
    props.onSubmit({ date: new Date(date) });
  };

  return <View style={[SignupStyle.pageContainer, SignupStyle.pageContainerFlex]}>
    <Text style={SignupStyle.pageText}>When will you be calving your cows?</Text>

    <View style={SignupStyle.pageContentContainer}>
      <Text style={signupPages.dates.fieldText}>select date</Text>
      <AppTextInput
        value={date}
        onChangeText={(val) => setDate(val)}
        placeholder='mm/dd/yyyy'
      />
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='next →'
      textColor={Colors.secondary.white}
      backgroundColor={Colors.primary.vibrantGreen}
      width={Dimensions.get('window').width * 0.3}
    />
  </View >;
};

export default CalvingDatePage;
