import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../Colors';
import TextStyles from '../TextStyles';

const SignupStyle = StyleSheet.create({
  pageContainer: {
    height: '100%',
    width: Dimensions.get('window').width * 0.85,
  },

  pageContainerFlex: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: Dimensions.get('window').height * 0.1,
  },

  title: {
    fontSize: TextStyles.title.fontSize,
    fontFamily: TextStyles.subHeading.fontFamily,
    color: Colors.secondary.deepTeal,
  },

  subtitle: {
    ...TextStyles.subHeading,
    fontFamily: TextStyles.body.fontFamily,
    color: Colors.secondary.mediumGreen,
  },

  pageText: {
    fontSize: TextStyles.subHeading.fontSize,
    fontFamily: TextStyles.body.fontFamily,
    color: Colors.primary.mainOrange,
    textAlign: 'center',
  },

  pageContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: Colors.primary.lightGreen,
    padding: Dimensions.get('window').width * 0.05,
    borderRadius: 10,
  },

  dropdown: {
    backgroundColor: Colors.secondary.white,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: Dimensions.get('window').width * 0.3,
    borderRadius: 10,
  },

  dropdownSelectedText: {
    color: Colors.primary.vibrantGreen,
    fontFamily: TextStyles.subHeading.fontFamily,
  },

  globeView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

const login = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  titleContainer: {
    marginVertical: 20,
  },

  title: {
    marginBottom: 10,
  },

  input: {
    marginVertical: 10,
  },
});

const ranchrole = StyleSheet.create({
  title: {
    fontSize: TextStyles.subHeading.fontSize,
  },
});

const firstlastname = StyleSheet.create({
  input: {
    marginVertical: 20,
  },
});

const address = StyleSheet.create({
  horizontalFieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  fieldText: {
    marginBottom: 10,
  },

  vertSpaceContainer: {
    marginVertical: 10,
  },
});

const years = StyleSheet.create({
  fieldText: {
    marginVertical: 20,
  },
});

const cattle = StyleSheet.create({
  fieldText: {
    marginVertical: 20,
  },
});

const paddocks = StyleSheet.create({
  allPaddocksContainer: {
    maxHeight: Dimensions.get('window').height * 0.3,
    height: Dimensions.get('window').height * 0.3,
  },

  paddockContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const dates = StyleSheet.create({
  fieldText: {
    color: Colors.secondary.deepTeal,
    fontSize: TextStyles.body.fontSize,
    fontFamily: TextStyles.body.fontFamily,
    textAlign: 'center',
    marginBottom: 50,
  },
});

export const signupPages = {
  login,
  ranchrole,
  firstlastname,
  address,
  years,
  cattle,
  paddocks,
  dates,
};

export default SignupStyle;
