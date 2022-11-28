import { Dimensions, StyleSheet } from 'react-native';
import TextStyles from '../TextStyles';
import GlobalStyle from '../GlobalStyle';
import Colors from '../Colors';

const SignInPageStyle = StyleSheet.create({
  globeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 40,
    top: 50,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: 230,
    left: 30,
  },
  emailButtonView: {
    paddingTop: 25,
    paddingBottom: 25,
  },
  passwordButtonView: {
    paddingTop: 25,
    paddingBottom: 25,
  },
});

export default SignInPageStyle;