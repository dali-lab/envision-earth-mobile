import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';
import Colors from '../../../utils/styles/Colors';

const FormRootPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text style={TextStyles.subHeading}>Monitor Animals</Text>
      <AppButton
        onPress={() => navigation.navigate(ROUTES.BCS_PAGE)}
        title='Body Condition Score'
        backgroundColor={Colors.primary.lightOrange}
        textColor={Colors.primary.mainOrange}
        width={250}
      />
      <AppButton
        onPress={() => navigation.navigate(ROUTES.DUNG_PAGE)}
        title='Dung Condition'
        backgroundColor={Colors.primary.lightOrange}
        textColor={Colors.primary.mainOrange}
        width={250}
      />

      <Text style={[TextStyles.subHeading, { paddingTop: 20 }]}>Monitor Ecosystem</Text>
      <AppButton
        onPress={() => navigation.navigate(ROUTES.FORAGE_QUALITY_PAGE)}
        title='Forage Quality'
        backgroundColor={Colors.primary.murkGreen}
        textColor={Colors.secondary.white}
        width={250}
      />
      <AppButton
        onPress={() => navigation.navigate(ROUTES.FORAGE_QUANTITY_PAGE)}
        title='Forage Quantity'
        backgroundColor={Colors.primary.murkGreen}
        textColor={Colors.secondary.white}
        width={250}
      />
    </SafeAreaView>
  );
};

export default FormRootPage;
