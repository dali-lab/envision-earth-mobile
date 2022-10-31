import React from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
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
      <ScrollView>
        <View>
          <Text style={TextStyles.subHeading}>Monitor Animals</Text>
          <View>
            <AppButton
              onPress={() => navigation.navigate(ROUTES.BCS_PAGE)}
              title='Body Condition Score'
              backgroundColor={Colors.primary.lightOrange}
              textColor={Colors.primary.mainOrange}
            />
            <AppButton
              onPress={() => navigation.navigate(ROUTES.DUNG_PAGE)}
              title='Dung Condition'
              backgroundColor={Colors.primary.lightOrange}
              textColor={Colors.primary.mainOrange}
            />
          </View>
        </View>

        <View>
          <Text style={TextStyles.subHeading}>Monitor Ecosystem</Text>
          <View>
            <AppButton
              onPress={() => navigation.navigate(ROUTES.FORAGE_QUALITY_PAGE)}
              title='Log Forage Quality'
              backgroundColor={Colors.primary.lightOrange}
              textColor={Colors.primary.mainOrange}
            />
            <AppButton
              onPress={() => navigation.navigate(ROUTES.FORAGE_QUANTITY_PAGE)}
              title='Log Forage Quantity'
              backgroundColor={Colors.primary.murkGreen}
              textColor={Colors.secondary.white}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormRootPage;
