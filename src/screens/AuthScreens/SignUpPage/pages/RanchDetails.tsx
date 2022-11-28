import { AppButton } from '../../../../components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RanchDetailsData } from '../pageData';

const dropdownData = Array.from(
  { length: 50 },
  (_, i) => i)
  .map((val) => {
    return { label: val.toString(), value: val };
  });

const RanchDetailsPage = (props: {
  onSubmit: (data: RanchDetailsData) => void,
}) => {
  const [yrsRanching, setYrsRanching] = useState<number>(-1);
  const [yrsHolistic, setYrsHolistic] = useState<number>(-1);

  const onPressSubmit = () => {
    if (yrsRanching === -1) {
      alert('Please enter the numbers of years you have been ranching');
      return;
    } else if (yrsHolistic === -1) {
      alert('Please enter the number of years you have been holistic ranching');
      return;
    }
    props.onSubmit({ yrsRanching, yrsHolistic });
  };

  return <View>
    <Text>Ranch Details</Text>

    <View>
      <Text>How many years have you been at this ranch?</Text>
      <Dropdown
        data={dropdownData}
        labelField='label'
        valueField='value'
        onChange={(item) => setYrsRanching(item.value)}
        placeholder='select'
      />

      <Text>How many years have you spent Holistic Ranching?</Text>
      <Dropdown
        data={dropdownData}
        labelField='label'
        valueField='value'
        onChange={(item) => setYrsHolistic(item.value)}
        placeholder='select'
      />
    </View>
    <AppButton
      onPress={onPressSubmit}
      title='→'
    />
  </View>;
};

export default RanchDetailsPage;
