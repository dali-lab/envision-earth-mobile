import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import FormatStyle from '../../utils/FormatStyle';
import TextStyles from '../../utils/TextStyles';

const ErrorPage = () => {
  return (
    <SafeAreaView style={FormatStyle.container}>
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
