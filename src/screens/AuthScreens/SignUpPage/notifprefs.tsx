import React, { useState } from 'react';
import { View, Text } from 'react-native';
import AppButton from '../../../components/AppButton';

const NotifPrefPage = () => {
  const [notifSelect, setNotifSelect] = useState('');

  return (
    <View>
      <Text>almost done!</Text>
      <Text>How often would you like to receive notifications from Grazing Earth?</Text>
      <Text>{notifSelect}</Text>
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
    </View>
  );
};

export default NotifPrefPage;
