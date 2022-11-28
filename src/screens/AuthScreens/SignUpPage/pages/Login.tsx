import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { LoginData } from '../pageData';

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

  return <View>
    <View>
      <Text>Welcome to Grazing Earth</Text>
      <Text>let's get started</Text>
    </View>

    <View>
      <AppTextInput
        onChangeText={(val) => setUname(val)}
        value={uname}
        placeholder='username'
      />

      <AppTextInput
        onChangeText={(val) => setEmail(val)}
        value={email}
        placeholder='email address'
      />

      <AppTextInput
        onChangeText={(val) => setPwd(val)}
        value={pwd}
        placeholder='password'
        secureTextEntry={true}
      />

      <AppTextInput
        onChangeText={(val) => setConfirm(val)}
        value={confirm}
        placeholder='confirm password'
        secureTextEntry={true}
      />

      <AppButton
        onPress={onPressSubmit}
        title='create account'
      />
    </View>
  </View>;
};

export default LoginPage;
