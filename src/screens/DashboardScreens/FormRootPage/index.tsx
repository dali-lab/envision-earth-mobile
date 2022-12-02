import React from 'react';
import { Dimensions, SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';
import AppButton from '../../../components/AppButton';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';
import FormBackgroundImage from '../../../assets/form_background.svg';
import OuterSunImage from '../../../assets/outer_sun.svg';
import InnerSunImage from '../../../assets/inner_sun.svg';

const FormRootPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView 
      style={[GlobalStyle.container, { backgroundColor: Colors.secondary.white }]}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
        }}
      >
        <OuterSunImage />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'absolute',
          top: 16,
          right: 18,
        }}
      >
        <InnerSunImage />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          position: 'absolute',
          top: 70,
          left: 40,
        }}
      >
        <Text
          style={[TextStyles.title, { color: Colors.secondary.deepTeal, paddingBottom: 10 }]}
        >
          Forms
        </Text>
      </View>
      <View style={{
        height: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
      }}>
        <FormBackgroundImage />
      </View>
      <Text style={[TextStyles.subHeading, { color: Colors.secondary.deepTeal, paddingTop: 60 }]}>Monitor Animals</Text>
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

      <Text style={[TextStyles.subHeading, { color: Colors.secondary.deepTeal, paddingTop: 20 }]}>Monitor Ecosystem</Text>
      <AppButton
        onPress={() => navigation.navigate(ROUTES.FORAGE_QUALITY_PAGE)}
        title='Forage Quality'
        backgroundColor={Colors.primary.vibrantGreen}
        textColor={Colors.secondary.white}
        width={250}
      />
      <AppButton
        onPress={() => navigation.navigate(ROUTES.FORAGE_QUANTITY_PAGE)}
        title='Forage Quantity'
        backgroundColor={Colors.primary.vibrantGreen}
        textColor={Colors.secondary.white}
        width={250}
      />

    </SafeAreaView>
  );
};

export default FormRootPage;
