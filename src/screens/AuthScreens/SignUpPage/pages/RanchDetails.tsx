import { AppButton } from 'components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const dropdownData = Array.from(
  { length: 50 },
  (_, i) => i)
  .map((val) => {
    return { label: val.toString(), value: val };
  });

const RanchDetailsPage = (props: {
  onSubmit: (yrsRanching: number, yrsHolistic: number) => null,
}) => {
  const [yrsRanching, setYrsRanching] = useState<number>(0);
  const [yrsHolistic, setYrsHolistic] = useState<number>(0);

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
      onPress={() => props.onSubmit(yrsRanching, yrsHolistic)}
      title='→'
    />
  </View>;
};

export default RanchDetailsPage;
