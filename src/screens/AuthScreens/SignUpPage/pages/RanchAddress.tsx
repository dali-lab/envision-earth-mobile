import { AppTextInput, AppButton } from '../../../../components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { RanchAddressData } from '../pageData';

const RanchAddressPage = (props: {
  onSubmit: (data: RanchAddressData) => void,
}) => {
  const [addr, setAddr] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const onPressSubmit = () => {
    if (addr === '') {
      alert('Please enter a street address');
      return;
    } else if (city === '') {
      alert('Please enter a city');
      return;
    } else if (state === '') {
      alert('Please enter a state');
      return;
    } else if (zip === '') {
      alert('Please enter a zip code');
      return;
    } else if (country === '') {
      alert('Please enter a country');
      return;
    }
    props.onSubmit({ address: addr, city, state, zip, country });
  };

  return <View>
    <Text>Ranch Address</Text>

    <View>
      <Text>Street Address</Text>
      <AppTextInput
        value={addr}
        onChangeText={(val) => setAddr(val)}
        placeholder=''
      />

      <View>
        <View>
          <Text>City</Text>
          <AppTextInput
            value={city}
            onChangeText={(val) => setCity(val)}
            placeholder=''
          />
        </View>

        <View>
          <Text>State</Text>
          <AppTextInput
            value={state}
            onChangeText={(val) => setState(val)}
            placeholder=''
          />
        </View>
      </View>

      <View>
        <View>
          <Text>Zip</Text>
          <AppTextInput
            value={zip}
            onChangeText={(val) => setZip(val)}
            placeholder=''
          />
        </View>

        <View>
          <Text>Country</Text>
          <AppTextInput
            value={country}
            onChangeText={(val) => setCountry(val)}
            placeholder=''
          />
        </View>
      </View>
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='→'
    />
  </View>;
};

export default RanchAddressPage;
