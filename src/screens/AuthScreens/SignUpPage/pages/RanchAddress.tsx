import { AppTextInput, AppButton } from '../../../../components';
import { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { RanchAddressData } from '../pageData';
import { Colors, signupPages, SignupStyle } from '../../../../styles';

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

  return <View style={[SignupStyle.pageContainer, SignupStyle.pageContainerFlex]}>
    <Text style={SignupStyle.pageText}>Ranch Address</Text>

    <View style={SignupStyle.pageContentContainer}>
      <View style={signupPages.address.vertSpaceContainer}>
        <Text style={signupPages.address.fieldText}>Street Address</Text>
        <AppTextInput
          value={addr}
          onChangeText={(val) => setAddr(val)}
          placeholder=''
        />
      </View>

      <View style={signupPages.address.horizontalFieldContainer}>
        <View>
          <Text style={signupPages.address.fieldText}>City</Text>
          <AppTextInput
            value={city}
            onChangeText={(val) => setCity(val)}
            placeholder=''
            width={Dimensions.get('window').width * 0.35}
          />
        </View>

        <View>
          <Text style={signupPages.address.fieldText}>State</Text>
          <AppTextInput
            value={state}
            onChangeText={(val) => setState(val)}
            placeholder=''
            width={Dimensions.get('window').width * 0.35}
          />
        </View>
      </View>

      <View style={signupPages.address.horizontalFieldContainer}>
        <View>
          <Text style={signupPages.address.fieldText}>Zip</Text>
          <AppTextInput
            value={zip}
            onChangeText={(val) => setZip(val)}
            placeholder=''
            width={Dimensions.get('window').width * 0.35}
          />
        </View>

        <View>
          <Text style={signupPages.address.fieldText}>Country</Text>
          <AppTextInput
            value={country}
            onChangeText={(val) => setCountry(val)}
            placeholder=''
            width={Dimensions.get('window').width * 0.35}
          />
        </View>
      </View>
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='next →'
      textColor={Colors.secondary.white}
      backgroundColor={Colors.primary.vibrantGreen}
      width={Dimensions.get('window').width * 0.35}
    />
  </View >;
};

export default RanchAddressPage;
