import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from '../../../components/AppTextInput';
import GlobalStyle from '../../../utils/styles/GlobalStyle';

const EmailPasswordPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    const missingFields: string[] = [];
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');

    if (missingFields.length === 0) {
    } else {
      const missingFormatted = 
        !email && !password ? 'email and password' :
          !email ? 'email' :
            'password';
      alert('Please enter ' + missingFormatted);
    }
  };

  return (
    <View style={GlobalStyle.container}>
      <AppTextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='Email'
      />
      <AppTextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder='Email'
      />
    </View>
  );
};

export default EmailPasswordPage;
