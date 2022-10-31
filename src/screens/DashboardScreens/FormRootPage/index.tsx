import React from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';

const FormRootPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <View>
          <Text style={TextStyles.subTitle}>Monitor Animals</Text>
          <View>
            <AppButton
              onPress={() => navigation.navigate(ROUTES.BCS_PAGE)}
              title='Log Body Condition Score'
            />
            <AppButton
              onPress={() => navigation.navigate(ROUTES.DUNG_PAGE)}
              title='Log Dung Condition'
            />
          </View>
        </View>

        <View>
          <Text style={TextStyles.subTitle}>Monitor Ecosystem</Text>
          <View>
            <AppButton
              onPress={() => navigation.navigate(ROUTES.FORAGE_QUALITY_PAGE)}
              title='Log Forage Quality'
            />
            <AppButton
              onPress={() => navigation.navigate(ROUTES.FORAGE_QUANTITY_PAGE)}
              title='Log Forage Quantity'
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormRootPage;
