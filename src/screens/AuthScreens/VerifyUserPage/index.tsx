import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { resendCode, verifyUser } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';

const VerifyUserPage = () => {
  const dispatch = useAppDispatch();
  const { id, email } = useAppSelector((state) => state.auth);
  const [code, setCode] = useState<string>('');

  const handleSubmit = () => {
    // Send only if all fields filled in
    if (!code) alert('Please enter a code!');
    else {
      dispatch(verifyUser({ id, email, code }));
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text style={TextStyles.title}>Verify User</Text>
      <AppTextInput
        onChangeText={(text) => setCode(text)}
        value={code}
        placeholder='Type your code'
      />
      <AppButton
        onPress={handleSubmit}
        title={'Submit'}
      />
      <AppButton
        onPress={() => dispatch(resendCode({ id, email }))}
        title={'Resend Code'}
      />
    </SafeAreaView>
  );
};

export default VerifyUserPage;
