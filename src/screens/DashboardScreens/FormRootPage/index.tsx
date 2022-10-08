import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';

const FormRootPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <AppButton
          onPress={() => navigation.navigate(ROUTES.BCS_PAGE)}
          title={ROUTES.BCS_PAGE}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.DUNG_PAGE)}
          title={ROUTES.DUNG_PAGE}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.RUMEN_PAGE)}
          title={ROUTES.RUMEN_PAGE}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.SHEEN_PAGE)}
          title={ROUTES.SHEEN_PAGE}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.FORAGE_PAGE)}
          title={ROUTES.FORAGE_PAGE}
          isArrow={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormRootPage;