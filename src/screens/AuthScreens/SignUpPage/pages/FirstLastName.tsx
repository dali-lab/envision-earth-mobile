import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { FirstLastNameData } from '../pageData';

const FirstLastNamePage = (props: {
  onSubmit: (data: FirstLastNameData) => void,
}) => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');

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
      onPress={() => props.onSubmit({ fname, lname })}
      title='→'
    />
  </View>;
};

export default FirstLastNamePage;
