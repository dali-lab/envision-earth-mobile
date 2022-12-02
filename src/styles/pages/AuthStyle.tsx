import { StyleSheet } from 'react-native';
import GlobalStyle from '../../styles/GlobalStyle';
import Colors from '../Colors';

const AuthStyle = StyleSheet.create({
  container: {
    ...GlobalStyle.container,
    backgroundColor: Colors.primary.lightestGreen,
  },
  title: {
    color: Colors.secondary.deepTeal,
  },
  verifyTitle: {
    paddingBottom: 15,
  },
  button: {
    backgroundColor: Colors.primary.mainOrange,
    color: Colors.secondary.white,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary.white,
    color: Colors.primary.mainOrange,
  },
});

export default AuthStyle;
