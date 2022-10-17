import { SafeAreaView, TextComponent } from 'react-native';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';

const NotifPrefPage = () => {
  const [notifSelect, setNotifSelect] = useState('');

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <TextComponent>almost done!</TextComponent>
      <TextComponent>How often would you like to receive notifications from Grazing Earth?</TextComponent>
      <AppButton
        onPress={() => setNotifSelect('daily')}
        title={'daily'}
      />
      <AppButton
        onPress={() => setNotifSelect('weekly')}
        title={'weekly'}
      />
      <AppButton
        onPress={() => setNotifSelect('monthly')}
        title={'monthly'}
      />
      <AppButton
        onPress={() => setNotifSelect('never')}
        title={'never'}
      />
      <AppButton
        onPress={() => setNotifSelect('custom')}
        title={'custom'}
      />
    </SafeAreaView>
  );
};

export default NotifPrefPage;
