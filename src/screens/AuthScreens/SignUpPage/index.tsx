import React, { useRef, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signUp } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';
import { EmailPasswordData, FirstLastNameData, NotifPrefData, RanchInfo1Data, RanchInfo2Data } from './forms';
import PagerView from 'react-native-pager-view';
import EmailPasswordPage from './emailPassword';
import FirstLastNamePage from './firstLastName';
import RanchInfoPage from './ranchInfo';
import RanchInfo2Page from './ranchInfo2';
import NotifPrefPage from './notifPrefs';

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const pagesRef = useRef();

  const [emailPass, setEmailPass] = useState<EmailPasswordData>();
  const [firstLastName, setFirstLastName] = useState<FirstLastNameData>();
  const [ranchInfo1, setRanchInfo1] = useState<RanchInfo1Data>();
  const [ranchInfo2, setRanchInfo2] = useState<RanchInfo2Data>();
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefData>();

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

      {/* Sign up Pages */}
      <PagerView 
        initialPage={1}
        orientation='horizontal'
        // ref={pagesRef}
      >
        <View key={'1'}>
          <EmailPasswordPage />
        </View>
        <View key={'2'}>
          <FirstLastNamePage />
        </View>
        <View key={'3'}>
          <RanchInfoPage />
        </View>
        <View key={'4'}>
          <RanchInfo2Page />
        </View>
        <View key={'5'}>
          <NotifPrefPage />
        </View>
      </PagerView>

      <AppButton
        onPress={() => {
          // setPage()
        }}
        title={'Next'}
      />
    </SafeAreaView>
  );
};

export default SignUpPage;
