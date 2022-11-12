import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

const ErrorPage = () => {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text style={TextStyles.title}>
        503
      </Text>
      <Text style={TextStyles.subHeading}>
        Could not connect to backend. (Is the backend running?)
      </Text>
    </SafeAreaView>
  );
};

export default ErrorPage;
