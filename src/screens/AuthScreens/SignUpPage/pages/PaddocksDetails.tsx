import { AppButton, AppTextInput } from 'components';
import { useState } from 'react';
import { View, Text } from 'react-native';

const PaddocksDetailsPage = (props: {
  onSubmit: (paddocks: string[]) => null,
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
      onPress={() => props.onSubmit(paddocks)}
      title='→'
    />
  </View>;
};

export default PaddocksDetailsPage;
