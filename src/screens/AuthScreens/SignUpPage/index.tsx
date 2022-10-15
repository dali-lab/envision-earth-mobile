import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signUp } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';
import { EmailPasswordPage, FirstLastNamePage, NotifPrefs, RanchInfo1, RanchInfo2 } from './forms';

const SignUpPage = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [emailPass, setEmailPass] = useState<EmailPasswordPage>();
  const [firstLastName, setFirstLastName] = useState<FirstLastNamePage>();
  const [ranchInfo1, setRanchInfo1] = useState<RanchInfo1>();
  const [ranchInfo2, setRanchInfo2] = useState<RanchInfo2>();
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefs>();

  const handleSubmit = () => {
    const data = {
      ...emailPass,
      ...firstLastName,
      ...ranchInfo1,
      ...ranchInfo2,
      ...notifPrefs,
    };
  };

  const handleSubmitEmailPass = (data: EmailPasswordPage) => {
    setEmailPass(data);
  };

  const handleSubmitFirstLastName = (data: FirstLastNamePage) => {
    setFirstLastName(data);
  };

  const handleSubmitRanchInfo1 = (data: RanchInfo1) => {
    setRanchInfo1(data);
  };

  const handleSubmitRanchInfo2 = (data: RanchInfo2) => {
    setRanchInfo2(data);
  };

  const handleSubmitNotifPrefs = (data: NotifPrefs) => {
    setNotifPrefs(data);
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <AppButton
        onPress={handleSubmit}
        title={'Sign Up'}
      />
    </SafeAreaView>
  );
};

export default SignUpPage;
