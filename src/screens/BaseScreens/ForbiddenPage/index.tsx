import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

const ForbiddenPage = () => {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text style={TextStyles.title}>
        403 - Forbidden
      </Text>
      <Text style={TextStyles.subHeading}>
        You do not have permissions to view this page.
      </Text>
    </SafeAreaView>
  );
};

export default ForbiddenPage;
