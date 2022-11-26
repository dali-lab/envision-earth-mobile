import { AppButton, AppTextInput } from 'components';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { CattleDetailsData } from '../pageData';

const dropdownData = Array.from(
  { length: 100 },
  (_, i) => i)
  .map((val) => {
    return { label: val.toString(), value: val };
  });

const CattleDetailsPage = (props: {
  onSubmit: (data: CattleDetailsData) => void,
}) => {
  const [breed, setBreed] = useState('');
  const [numCattle, setNumCattle] = useState(0);

  return <View>
    <Text>Cattle Details</Text>

    <View>
      <Text>What Cattle Breed do you have at your ranch?</Text>
      <AppTextInput
        placeholder=''
        value={breed}
        onChangeText={(val) => setBreed(val)}
      />

      <Text>How many cattle are in your herd?</Text>
      <Dropdown
        data={dropdownData}
        labelField='label'
        valueField='value'
        onChange={(item) => setNumCattle(item.value)}
        placeholder='select'
      />
    </View>
    <AppButton
      onPress={() => props.onSubmit({ cattleBreed: breed, numCattle })}
      title='→'
    />
  </View>;
};

export default CattleDetailsPage;
