import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList, AuthStackRoutes } from '../../../navigation/routes';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signUp } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';
import Colors from '../../../utils/styles/Colors';

const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList, AuthStackRoutes.SIGNUP>>();

  const handleSubmit = async () => {
    // Send only if all fields filled in
    if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else if (!name) alert('Please enter a name!');
    else {
      await dispatch(signUp({ email, password, name })).then(() => {
        navigation.navigate(AuthStackRoutes.AUTHLAUNCH, {});
      });
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
        Sign Up
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
      <AppTextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder='name'
        width={331}
        height={59}
      />
      <AppButton
        onPress={handleSubmit}
        title={'sign up'}
        backgroundColor={Colors.primary.mainOrange}
        textColor={Colors.secondary.white}
        width={331}
        height={59}
      />
    </SafeAreaView>
  );
};

export default SignUpPage;
