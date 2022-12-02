import { View, Text, GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FormsStyle } from '../../styles';

const EntryLabel = (props: {
  title: string,
  deleteCallback: (event: GestureResponderEvent) => void,
}) => {
  return <View
    style={{
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    }}
  >
    <Text style={FormsStyle.entryTitle}>
      {props.title}
    </Text>
    <Ionicons
      name='trash-outline'
      size={26}
      onPress={props.deleteCallback}
      style={{ alignSelf: 'center' }}
    />
  </View>;
};

export default EntryLabel;
