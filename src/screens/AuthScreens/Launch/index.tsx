import AppButton from '../../../components/AppButton';
import { SafeAreaView, View } from 'react-native';
import { ROUTES } from '../../../utils/constants';
import NavType from 'utils/NavType';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';
import { LaunchStyle } from '../../../styles/pages';
import SmallGlobeImage from '../../../assets/small_globe.svg';
import TitleImage from '../../../assets/title.svg';
import ShortGrassImage from '../../../assets/short_grass.svg';
import TallGrassImage from '../../../assets/tall_grass.svg';

const LaunchScreen = () => {
  const navigation = useNavigation<NavType>();

  const onPressLogin = () => {
    navigation.navigate(ROUTES.SIGNIN);
  };
  const onPressSignUp = () => {
    navigation.navigate(ROUTES.SIGNUP);
  };

  return (
    <SafeAreaView
      style={{
        ...GlobalStyle.container,
        backgroundColor: Colors.primary.lightestGreen,
      }}
    >
      <View style={LaunchStyle.globeView}>
        <SmallGlobeImage />
      </View>
      <View style={LaunchStyle.titleView}>
        <TitleImage />
      </View>
      <View style={LaunchStyle.logInButtonView}>
        <AppButton
          title='log in'
          onPress={onPressLogin}
          backgroundColor={Colors.secondary.white}
          textColor={Colors.primary.mainOrange}
          width={331}
          height={59}
        />
      </View>
      <View style={LaunchStyle.signUpButtonView}>
        <AppButton
          title='sign up'
          onPress={onPressSignUp}
          backgroundColor={Colors.primary.mainOrange}
          textColor={Colors.secondary.white}
          width={331}
          height={59}
        />
      </View>
      <View style={LaunchStyle.footer}>
        <TallGrassImage />
      </View>
      <View style={LaunchStyle.footer}>
        <ShortGrassImage />
      </View>
    </SafeAreaView>
  );
};

export default LaunchScreen;
