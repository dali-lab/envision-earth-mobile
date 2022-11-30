import { Dimensions, StyleSheet } from 'react-native';
import Colors from '../Colors';
import TextStyles from '../TextStyles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProfileStyle = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  subHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
  },
  subHeaderRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 20,
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
    color: '#597415',
    ...TextStyles.subHeading,
  },
  fieldTitle: {
    paddingTop: 15,
    paddingBottom: 10,
    color: Colors.primary.deepGreen,
    ...TextStyles.body,
  },
  textContainer: {
    borderColor: 'lightgrey',
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    backgroundColor: '#E1E5D7',
  },
  textContent: {
    ...TextStyles.body,
    textColor: Colors.primary.deepGreen,
    textAlign: 'center',
  },
  backgroundTopView: {
    position: 'absolute',
    top: 0,
  },
  backgroundMiddleView: {
    position: 'absolute',
    top: 680,
  },
  backgroundGrassView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  greenCowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 130,
    left: 80,
  },
  blueCowView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 100,
    right: 70,
  },
});

export default ProfileStyle;
