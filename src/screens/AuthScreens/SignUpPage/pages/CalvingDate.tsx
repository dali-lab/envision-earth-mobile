import { AppButton, AppTextInput } from 'components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { CalvingDateData } from '../pageData';

const CalvingDatePage = (props: {
  onSubmit: (data: CalvingDateData) => void,
}) => {
  const [date, setDate] = useState('');

  const onPressSubmit = () => {
    const dateRegex = /\d{2}\/\d{2}\/\d{4}/;
    if (!dateRegex.test(date) || Date.parse(date) === NaN) {
      alert('Please enter a date in the form mm/dd/yyyy');
    }
    props.onSubmit({ date: new Date(date) });
  };

  return <View>
    <Text>When will you be calving your cows?</Text>

    <View>
      <Text>select date</Text>
      <AppTextInput
        value={date}
        onChangeText={(val) => setDate(val)}
        placeholder='mm/dd/yyyy'
      />
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='→'
    />
  </View>;
};

export default CalvingDatePage;
