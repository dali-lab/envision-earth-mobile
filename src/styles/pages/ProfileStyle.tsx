import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../Colors';
import TextStyles from '../TextStyles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProfileStyle = StyleSheet.create({
  headerLayout: {
    flex: 1,
    flexDirection: 'row',
    padding: WIDTH * 0.05,
  },

  headerTitle: {
    ...TextStyles.subHeading,
    color: Colors.secondary.white,
  },

  nameCircleOuter: {
    backgroundColor: Colors.primary.lightOrange,
    padding: WIDTH * 0.05,
    borderRadius: WIDTH * 0.4,
    marginHorizontal: WIDTH * 0.1,
    height: WIDTH * 0.8,
  },

  nameCircle: {
    backgroundColor: Colors.primary.mainOrange,
    padding: WIDTH * 0.05,
    borderRadius: WIDTH * 0.35,
    height: WIDTH * 0.7,
    textAlign: 'center',
    textAlignVertical: 'center',

    justifyContent: 'center',
    alignItems: 'center',
  },

  nameTitle: {
    color: Colors.secondary.white,
    ...TextStyles.subHeading,
    fontSize: TextStyles.title.fontSize,
  },

  nameSubtitle: {
    color: Colors.secondary.white,
    ...TextStyles.subHeading,
  },

  fieldsContainer: {
    padding: WIDTH * 0.1,
  },

  sectionHeading: {
    paddingTop: 30,
    color: Colors.primary.deepGreen,
    ...TextStyles.subHeading,
  },

  fieldTitle: {
    paddingTop: 15,
    paddingBottom: 10,
    color: Colors.primary.deepGreen,
    ...TextStyles.body,
  },
});

export default ProfileStyle;
