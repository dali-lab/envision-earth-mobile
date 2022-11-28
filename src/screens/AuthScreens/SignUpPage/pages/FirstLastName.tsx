import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { FirstLastNameData } from '../pageData';

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

  return <View>
    <Text>Introduce yourself!</Text>

    <View>
      <AppTextInput
        value={fname}
        onChangeText={(val) => setFname(val)}
        placeholder='first name'
      />
      <AppTextInput
        value={lname}
        onChangeText={(val) => setLname(val)}
        placeholder='last name'
      />
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='→'
    />
  </View>;
};

export default FirstLastNamePage;
