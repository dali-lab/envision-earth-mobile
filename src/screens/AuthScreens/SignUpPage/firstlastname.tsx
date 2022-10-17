import { View } from 'react-native';
import AppTextInput from '../../../components/AppTextInput';
import { useState } from 'react';

const FirstLastNamePage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');

  const handleSubmit = () => {
    const missingFields: string[] = [];
    if (!firstName) missingFields.push('first name');
    if (!lastName) missingFields.push('last name');

    if (missingFields.length === 0) {
    } else {
      const missingFormatted = 
        !firstName && !lastName ? 'first name and last name' :
          !firstName ? 'first name' :
            'lastName' ;
      alert('Please enter ' + missingFormatted);
    }
  };

  return (
    <View>
      <AppTextInput
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
        placeholder='first name'
      />
      <AppTextInput
        onChangeText={(text) => setLastName(text)}
        value={lastName}
        placeholder='last name'
      />
    </View>
  );
};

export default FirstLastNamePage;
