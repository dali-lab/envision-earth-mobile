import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import FormPage from './FormPage';
import PaddockPage from './PaddockPage';
import { AppButton } from '../../../components';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

const LogPage = () => {
  const navigation = useNavigation<NavType>();
  const [isByForm, setIsByForm] = useState<boolean>(true);

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
          <Text
            style={[TextStyles.title, { color: Colors.primary.mainOrange }]}
          >
            Review Old Logs
          </Text>
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
              setIsByForm(true);
            }}
            title={'By Form'}
            backgroundColor={isByForm ? Colors.primary.mainOrange : Colors.secondary.white}
            textColor={isByForm ? Colors.secondary.white : Colors.primary.mainOrange}
            width={150}
            height={50}
          />
          <AppButton
            onPress={() => {
              setIsByForm(false);
            }}
            title={'By Paddock'}
            backgroundColor={isByForm ? Colors.secondary.white : Colors.primary.mainOrange}
            textColor={isByForm ? Colors.primary.mainOrange : Colors.secondary.white}
            width={150}
            height={50}
          />
        </View>
        {
          isByForm ?
            <FormPage />
            : 
            <PaddockPage />
        }
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogPage;