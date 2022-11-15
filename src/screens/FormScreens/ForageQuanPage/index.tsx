import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import EyeballPage from './EyeballPage';
import StacPage from './StacPage';
import { AppButton } from '../../../components';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

const ForageQuanPage = () => {
  const navigation = useNavigation<NavType>();
  const [isEyeballPage, setIsEyeballPage] = useState<boolean>(true);

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={GlobalStyle.contentContainerScroll}
        style={{
          width: Dimensions.get('window').width,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Ionicons
              name='ios-arrow-back'
              size={32}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <Text
            style={[TextStyles.title, { color: Colors.primary.mainOrange }]}
          >
            Forage Quantity
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 10,
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
        {
          isEyeballPage ?
            <EyeballPage />
            : 
            <StacPage />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForageQuanPage;