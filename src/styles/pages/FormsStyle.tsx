import { Dimensions, StyleSheet } from 'react-native';
import TextStyles from '../../styles/TextStyles';
import Colors from '../../styles/Colors';

const WIDTH = Dimensions.get('window').width;

const FormsStyle = StyleSheet.create({
  sectionTop: {
    width: '100%',
    paddingHorizontal: WIDTH * 0.1,
    marginBottom: 20,
  },

  sectionBottom: {
    backgroundColor: Colors.primary.lightestGreen,
    width: '100%',
    padding: WIDTH * 0.1,
  },

  sectionButtons: {
    paddingBottom: WIDTH * 0.15,
    paddingHorizontal: WIDTH * 0.15,
  },

  entryTitle: {
    backgroundColor: Colors.secondary.white,
    color: '#646464',
    ...TextStyles.body,
    minWidth: 100,
    textAlign: 'center',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

const BCSStyle = StyleSheet.create({
  identifiersLabel: {
    ...TextStyles.subHeading,
    alignSelf: 'flex-start',
    color: Colors.primary.deepGreen,
    marginTop: 20,
  },

  identifierContainer: {
    width: WIDTH * 0.75,
    borderColor: Colors.primary.mainOrange,
    borderWidth: 1,
    padding: WIDTH * 0.025,
  },

  identifierTitle: {
    fontFamily: TextStyles.subHeading.fontFamily,
    fontSize: TextStyles.body.fontSize,
  },

  identifierDesc: {
    textAlign: 'center',
  },

  identifierHorizContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    paddingTop: WIDTH * 0.025,
  },

  identifierPicture: {
    width: WIDTH * 0.15,
    height: WIDTH * 0.15,
  },

  identifierListContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: WIDTH * 0.025,
    width: WIDTH * 0.5,
  },

  identifierListItem: {
    marginBottom: 5,
  },
});

const QuanStyle = StyleSheet.create({
  methodContainerDisabled: {
    borderColor: Colors.primary.mainOrange,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: Colors.secondary.white,
    padding: 10,
  },
  methodContainerEnabled: {
    borderColor: Colors.primary.vibrantGreen,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: Colors.primary.mainOrange,
    padding: 10,
  },
  methodTitleDisabled: {
    color: Colors.primary.mainOrange,
    ...TextStyles.subHeading,
  },
  methodTitleEnabled: {
    color: Colors.secondary.white,
    ...TextStyles.subHeading,
  },
});

export default FormsStyle;
export {
  BCSStyle,
  QuanStyle,
};
