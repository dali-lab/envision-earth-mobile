import React from 'react';
import { ScrollView, SafeAreaView, Text } from 'react-native';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';

const SettingsPage = () => {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <Text style={[TextStyles.body, { paddingTop: 20 }]}>
          Setting Page intentionally left blank for now.
        </Text>
        <Text style={[TextStyles.body, { paddingTop: 20 }]}>
          (Swiping right does bring up a drawer navigator)
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsPage;