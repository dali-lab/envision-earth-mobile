import React, { useState } from 'react';
import { ScrollView, SafeAreaView, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import EyeballPage from './EyeballPage';
import StacPage from './StacPage';
import { AppButton, FormHeader } from '../../../components';
import NavType from '../../../utils/NavType';
import { GlobalStyle, Colors, TextStyles, QuanStyle, FormsStyle } from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
          style={FormsStyle.sectionTop}
        >
          <Text
            style={[TextStyles.subHeading, { color: Colors.primary.deepGreen, paddingBottom: 0 }]}
          >
            What method are you using?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: Dimensions.get('window').width * 0.5,
            }}
          >
            <TouchableOpacity onPress={() => { setIsEyeballPage(true); }}>
              <View style={isEyeballPage ? QuanStyle.methodContainerEnabled : QuanStyle.methodContainerDisabled}>
                <Text style={isEyeballPage ? QuanStyle.methodTitleEnabled : QuanStyle.methodTitleDisabled}>Eyeballing</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { setIsEyeballPage(false); }}>
              <View style={!isEyeballPage ? QuanStyle.methodContainerEnabled : QuanStyle.methodContainerDisabled}>
                <Text style={!isEyeballPage ? QuanStyle.methodTitleEnabled : QuanStyle.methodTitleDisabled}>STAC</Text>
              </View>
            </TouchableOpacity>
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
