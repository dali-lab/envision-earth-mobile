import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../styles';

const AddEntryButton = (props: {
  onPress: () => void,
}) => {
  return <TouchableOpacity
    onPress={props.onPress}
  >
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Text
        style={{
          color: Colors.secondary.white,
          backgroundColor: Colors.primary.mainOrange,
          marginRight: 5,
          width: 15,
          textAlign: 'center',
        }}
      >
        +
      </Text>
      <Text
        style={{
          color: Colors.primary.mainOrange,
          textDecorationLine: 'underline',
        }}
      >
        add more
      </Text>
    </View>
  </TouchableOpacity>;
};

export default AddEntryButton;
