import { AppButton, AppTextInput } from '../../../../components';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { PaddocksDetailsData } from '../pageData';

const PaddocksDetailsPage = (props: {
  onSubmit: (data: PaddocksDetailsData) => void,
}) => {
  const [paddocks, setPaddocks] = useState<string[]>([]);
  const addPaddock = () => {
    setPaddocks(paddocks.concat(['']));
  };
  const removePaddock = (idx: number) => {
    setPaddocks([...paddocks.slice(0, idx), ...paddocks.slice(idx + 1, -1)]);
  };
  const editPaddock = (value: string, padInd: number) => {
    setPaddocks((arr) => {
      arr[padInd] = value;
      return arr;
    });
  };

  const onPressSubmit = () => {
    if (paddocks.length === 0) {
      alert('Please enter at least one paddock');
      return;
    }
    props.onSubmit({ paddocks });
  };

  return <View>
    <View>
      {paddocks.map((paddock, idx) => <View>
        <Text>{idx}.</Text>
        <AppTextInput
          onChangeText={(value) => editPaddock(value, idx)}
          value={paddock}
          placeholder={'Paddock ' + (idx + 1).toString()}
        />
        <AppButton
          onPress={() => removePaddock(idx)}
          title='-'
        />
      </View>)}

      <AppButton
        onPress={addPaddock}
        title='+'
      />
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='→'
    />
  </View>;
};

export default PaddocksDetailsPage;
