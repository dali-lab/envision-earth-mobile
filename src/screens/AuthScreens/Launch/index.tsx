import AppButton from '../../../components/AppButton';
import { SafeAreaView, Text } from 'react-native';
import { ROUTES } from '../../../utils/constants';
import NavType from 'utils/NavType';
import { useNavigation } from '@react-navigation/native';

const LaunchScreen = () => {
  const navigation = useNavigation<NavType>();

  const onPressLogin = () => {
    navigation.navigate(ROUTES.SIGNIN);
  };
  const onPressSignUp = () => {
    navigation.navigate(ROUTES.SIGNUP);
  };

  return (<SafeAreaView>
    <Text>Grazing Earth</Text>
    <AppButton title='log in' onPress={onPressLogin} />
    <AppButton title='sign up' onPress={onPressSignUp} />
  </SafeAreaView>);
};

export default LaunchScreen;
