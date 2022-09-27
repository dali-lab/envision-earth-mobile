import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';

const ErrorPage = () => {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text style={TextStyles.title}>
        503
      </Text>
      <Text style={TextStyles.subTitle}>
        Could not connect to backend. (Is the backend running?)
      </Text>
    </SafeAreaView>
  );
};

export default ErrorPage;
