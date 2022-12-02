import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import EyeballPage from './EyeballPage';
import StacPage from './StacPage';
import { AppButton, FormHeader } from '../../../components';
import NavType from '../../../utils/NavType';
import { GlobalStyle, Colors } from '../../../styles';

const ForageQuanPage = () => {
  const navigation = useNavigation<NavType>();
  const [isEyeballPage, setIsEyeballPage] = useState<boolean>(true);

  return (
    <SafeAreaView style={[GlobalStyle.container, { backgroundColor: Colors.secondary.white }]}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={GlobalStyle.contentContainerScroll}
        style={{
          width: Dimensions.get('window').width,
        }}
      >
        <FormHeader
          title='Forage Quantity'
          nav={navigation}
        />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingTop: 10,
            paddingBottom: 50,
            paddingLeft: 20,
          }}
        >
          <Text
            style={[TextStyles.subHeading, { color: Colors.primary.deepGreen, paddingBottom: 10 }]}
          >
            What method are you using?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <AppButton
              onPress={() => {
                setIsEyeballPage(true);
              }}
              title={'Eyeballing'}
              backgroundColor={isEyeballPage ? Colors.primary.mainOrange : Colors.secondary.white}
              textColor={isEyeballPage ? Colors.secondary.white : Colors.primary.mainOrange}
              width={150}
              height={50}
            />
            <AppButton
              onPress={() => {
                setIsEyeballPage(false);
              }}
              title={'STAC'}
              backgroundColor={isEyeballPage ? Colors.secondary.white : Colors.primary.mainOrange}
              textColor={isEyeballPage ? Colors.primary.mainOrange : Colors.secondary.white}
              width={150}
              height={50}
            />
          </View>
        </View>
        {
          isEyeballPage ?
            <EyeballPage /> :
            <StacPage />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForageQuanPage;
