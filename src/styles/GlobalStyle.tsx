import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../styles/Colors';
import TextStyles from '../styles/TextStyles';

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

  slider: {
    width: 329,
  },

  title: {
    color: Colors.secondary.deepTeal,
    ...TextStyles.title,
  },

  overlayModal: {
    height: 350,
    width: 300,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: Dimensions.get('window').width,
  },
});

export default GlobalStyle;
