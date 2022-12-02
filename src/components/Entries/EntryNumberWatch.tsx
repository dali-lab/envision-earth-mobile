import { Text, View } from 'react-native';
import { TextStyles, Colors } from '../../styles';

const EntryNumberWatch = (props: {
  val: string
}) => {
  return <View
    style={{
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      width: '100%',
      marginTop: 10,
    }}
  >
    <Text
      style={{
        ...TextStyles.body,
        minWidth: 50,
        textAlign: 'center',
        color: Colors.primary.vibrantGreen,
        backgroundColor: Colors.secondary.white,
        borderRadius: 10,
      }}
    >
      {props.val}
    </Text>
  </View >;
};

export default EntryNumberWatch;
