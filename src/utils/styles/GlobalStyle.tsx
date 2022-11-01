import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../utils/styles/Colors';
import TextStyles from '../../utils/styles/TextStyles';

const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary.lightestGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainerScroll: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    width: Dimensions.get('window').width * (6 / 7),
    paddingBottom: 0,
  },

  button: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 100,
    backgroundColor: '#C4C4C4',
    marginTop: 60,
  },

  circle: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#C4C4C4',
    marginTop: 20,
  },

  lf: {
    fontSize: 27.5,
  },

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

  slider: {
    width: 329,
  },
});

export default GlobalStyle;
