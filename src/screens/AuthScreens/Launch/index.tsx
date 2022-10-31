import AppButton from '../../../components/AppButton';
import { SafeAreaView, Text } from 'react-native';
import { ROUTES } from '../../../utils/constants';
import NavType from 'utils/NavType';
import { useNavigation } from '@react-navigation/native';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';

const LaunchScreen = () => {
  const navigation = useNavigation<NavType>();

  const onPressLogin = () => {
    navigation.navigate(ROUTES.SIGNIN);
  };
  const onPressSignUp = () => {
    navigation.navigate(ROUTES.SIGNUP);
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text style={TextStyles.title}>Grazing Earth</Text>
      <AppButton title='Log In' onPress={onPressLogin} />
      <AppButton title='Sign Up' onPress={onPressSignUp} />
    </SafeAreaView>
  );
};

export default LaunchScreen;
