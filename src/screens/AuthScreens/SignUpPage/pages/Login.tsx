import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { LoginData } from '../pageData';
import { Colors, SignupStyle, signupPages } from '../../../../styles';
import MediumGlobeImage from '../../../../assets/medium_globe.svg';

const LoginPage = (props: {
  onSubmit: (data: LoginData) => void,
}) => {
  const [uname, setUname] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [confirm, setConfirm] = useState('');

  const onPressSubmit = () => {
    if (uname === '') {
      alert('Please enter a username');
      return;
    } else if (email === '') {
      alert('Please enter an email');
      return;
    } else if (pwd.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    } else if (pwd !== confirm) {
      alert('Password must match password confirmation');
      return;
    }
    props.onSubmit({ uname, email, pwd });
  };

  return <View style={[SignupStyle.pageContainer, signupPages.login.container]}>
    <View style={SignupStyle.globeView}>
      <MediumGlobeImage />
    </View>
    <View style={signupPages.login.titleContainer}>
      <Text style={[SignupStyle.title, signupPages.login.title]}>Welcome to Grazing Earth</Text>
      <Text style={SignupStyle.subtitle}>let's get started</Text>
    </View>

    <View>
      <View style={signupPages.login.input}>
        <AppTextInput
          onChangeText={(val) => setUname(val)}
          value={uname}
          placeholder='username'
        />
      </View>

      <View style={signupPages.login.input}>
        <AppTextInput
          onChangeText={(val) => setEmail(val)}
          value={email}
          placeholder='email address'
        />
      </View>

      <View style={signupPages.login.input}>
        <AppTextInput
          onChangeText={(val) => setPwd(val)}
          value={pwd}
          placeholder='password'
          secureTextEntry={true}
        />
      </View>

      <View style={signupPages.login.input}>
        <AppTextInput
          onChangeText={(val) => setConfirm(val)}
          value={confirm}
          placeholder='confirm password'
          secureTextEntry={true}
        />
      </View>
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='create account'
      backgroundColor={Colors.primary.mainOrange}
      textColor={Colors.secondary.white}
    />
  </View>;
};

export default LoginPage;
