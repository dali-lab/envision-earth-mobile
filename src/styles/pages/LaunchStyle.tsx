import { Dimensions, StyleSheet } from 'react-native';
import TextStyles from '../TextStyles';
import GlobalStyle from '../GlobalStyle';
import Colors from '../Colors';

const LaunchStyle = StyleSheet.create({
  globeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    top: 60,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    left: 40,
  },
  logInButtonView: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  signUpButtonView: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default LaunchStyle;