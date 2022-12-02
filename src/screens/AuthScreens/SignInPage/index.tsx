import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signIn } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';
import { AuthStyle, SignInPageStyle } from '../../../styles/pages';
import LargeGlobeImage from '../../../assets/large_globe.svg';

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
    <SafeAreaView style={AuthStyle.container}>
      <View style={SignInPageStyle.globeView}>
        <LargeGlobeImage />
      </View>
      <View style={SignInPageStyle.titleView}>
        <Text
          style={[
            TextStyles.title,
            { color: Colors.secondary.deepTeal },
          ]}
        >
          Welcome Back
        </Text>
      </View>
      <View style={SignInPageStyle.emailButtonView}>
        <AppTextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder='email'
          width={331}
          height={59}
        />
      </View>
      <View style={SignInPageStyle.passwordButtonView}>
        <AppTextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder='password'
          secureTextEntry={true}
          width={331}
          height={59}
        />
      </View>
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
