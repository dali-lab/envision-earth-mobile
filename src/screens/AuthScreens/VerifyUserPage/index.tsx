import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { resendCode, verifyUser } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

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
      <Text
        style={[
          TextStyles.title,
          { color: Colors.secondary.deepTeal, paddingBottom: 15 },
        ]}
      >
        Verify User
      </Text>
      <AppTextInput
        onChangeText={(text) => setCode(text)}
        value={code}
        placeholder='Type your code'
        width={331}
        height={59}
      />
      <AppButton
        onPress={handleSubmit}
        title={'Submit'}
        backgroundColor={Colors.primary.mainOrange}
        textColor={Colors.secondary.white}
        width={331}
        height={59}
      />
      <AppButton
        onPress={() => dispatch(resendCode({ id, email }))}
        title={'Resend Code'}
        backgroundColor={Colors.primary.mainOrange}
        textColor={Colors.secondary.white}
        width={331}
        height={59}
      />
    </SafeAreaView>
  );
};

export default VerifyUserPage;
