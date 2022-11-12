import AppButton from '../../../components/AppButton';
import { SafeAreaView, Text } from 'react-native';
import { ROUTES } from '../../../utils/constants';
import NavType from 'utils/NavType';
import { useNavigation } from '@react-navigation/native';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

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
      style={[
        GlobalStyle.container,
      ]}
    >
      <Text style={TextStyles.title}>Grazing Earth</Text>
      <AppButton
        title='log in'
        onPress={onPressLogin}
        backgroundColor={Colors.secondary.white}
        textColor={Colors.primary.mainOrange}
        width={331}
        height={59}
      />
      <AppButton
        title='sign up'
        onPress={onPressSignUp}
        backgroundColor={Colors.primary.mainOrange}
        textColor={Colors.secondary.white}
        width={331}
        height={59}
      />
    </SafeAreaView>
  );
};

export default LaunchScreen;
