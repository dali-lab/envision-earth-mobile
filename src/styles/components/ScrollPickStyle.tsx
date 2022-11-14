import { StyleSheet } from 'react-native';
import Colors from '../Colors';
import TextStyles from '../TextStyles';

const ScrollPickStyle = StyleSheet.create({
  unselectedOption: {
    fontSize: 44,
    fontWeight: 'bold',
    margin: 20,
  },
  selectedOption: {
    fontSize: 54,
    fontWeight: 'bold',
    margin: 15,
  },
  buffer: {
    width: 200,
  },
});

export default ScrollPickStyle;