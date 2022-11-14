import { StyleSheet } from 'react-native';
import Colors from '../Colors';
import TextStyles from '../TextStyles';

const Dropdown = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary.lightOrange,
  },
  dropdownContainerStyle: {
    backgroundColor: Colors.primary.lightOrange,
  },
  dropdownPlaceholderStyle: {
    ...TextStyles.body,
    color: Colors.primary.mainOrange,
  },
  dropdownSelectedTextStyle: {
    ...TextStyles.body,
    color: Colors.primary.mainOrange,
  },
  dropdownItemContainerStyle: {
    backgroundColor: Colors.primary.lightOrange,
  },
  dropdownItemTextStyle: {
    ...TextStyles.body,
    color: Colors.primary.mainOrange,
  },
});

export default Dropdown;
