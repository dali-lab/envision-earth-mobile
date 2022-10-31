import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signUp } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';
import { EmailPasswordData, FirstLastNameData, NotifPrefData, RanchInfo1Data, RanchInfo2Data } from './forms';
import PagerView from 'react-native-pager-view';
import { EmailPasswordPage, FirstLastNamePage, RanchInfoPage, RanchInfo2Page, NotifPrefPage } from './pages';

const SignUpPage = () => {
  const dispatch = useAppDispatch();
  const pagesRef = useRef();

  const [emailPass, setEmailPass] = useState<EmailPasswordData>();
  const [firstLastName, setFirstLastName] = useState<FirstLastNameData>();
  const [ranchInfo1, setRanchInfo1] = useState<RanchInfo1Data>();
  const [ranchInfo2, setRanchInfo2] = useState<RanchInfo2Data>();
  const [notifPrefs, setNotifPrefs] = useState<NotifPrefData>();

  /*
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
  */
  const styles = StyleSheet.create({
    pagerView: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={GlobalStyle.container}>

      <Text>Beep</Text>
      {/* Sign up Pages */}
      <PagerView
        initialPage={0}
        style={styles.pagerView}
        orientation='horizontal'
      // ref={pagesRef}
      >
        <View key={1}>
          <Text>1</Text>
          <EmailPasswordPage />
        </View>
        <View key={2}>
          <Text>2</Text>
          <FirstLastNamePage />
        </View>
        <View key={3}>
          <Text>3</Text>
          <RanchInfoPage />
        </View>
        <View key={4}>
          <Text>4</Text>
          <RanchInfo2Page />
        </View>
        <View key={5}>
          <Text>5</Text>
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
