import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signIn } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';
import Colors from '../../../utils/styles/Colors';

const SignInPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    // Send only if all fields filled in
    if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else {
      await dispatch(signIn({ email, password }));
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text 
        style={[
          TextStyles.title,
          { color: Colors.secondary.deepTeal },
        ]}
      >
        Welcome Back
      </Text>
      <AppTextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='email'
        width={331}
        height={59}
      />
      <AppTextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder='password'
        secureTextEntry={true}
        width={331}
        height={59}
      />
      <AppButton
        onPress={handleSubmit}
        title={'log in'}
        backgroundColor={Colors.primary.mainOrange}
        textColor={Colors.secondary.white}
        width={331}
        height={59}
      />
    </SafeAreaView>
  );
};

export default SignInPage;

// TODO: Placeholder text color?
