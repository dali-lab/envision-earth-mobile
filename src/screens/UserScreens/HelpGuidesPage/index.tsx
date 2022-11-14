import React from 'react';
import { ScrollView, SafeAreaView, Text } from 'react-native';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

const HelpGuidesPage = () => {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <Text style={[TextStyles.body, { paddingTop: 20 }]}>
          Help guides page intentionally left blank for now.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpGuidesPage;
