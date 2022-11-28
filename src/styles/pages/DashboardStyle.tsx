import { Dimensions, StyleSheet } from 'react-native';
import TextStyles from '../TextStyles';
import GlobalStyle from '../GlobalStyle';
import Colors from '../Colors';

const DashboardStyle = StyleSheet.create({
  title: {
    ...GlobalStyle.title,
  },
  subtitle: {
    color: Colors.primary.deepGreen,
    ...TextStyles.subHeading,
  },
  subSectionDate: {
    width: '50%',
    borderRadius: 10,
    backgroundColor: Colors.primary.lightOrange,
  },
  date: {
    color: Colors.primary.mainOrange,
    backgroundColor: Colors.primary.lightOrange,
    width: 'auto',
    borderRadius: 10,
    padding: 3,
    marginVertical: 10,
    ...TextStyles.subHeading,
  },
  section: {
    backgroundColor: Colors.secondary.white,
    borderRadius: 10,
    width: Dimensions.get('window').width * 0.8,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginVertical: 15,
  },
  sectionWelcome: {
    backgroundColor: Colors.secondary.white,
    width: '100%',
    padding: 40,
  },
  sectionPaddockStatus: {
    backgroundColor: Colors.secondary.mediumGreen,
    padding: 20,
    height: 300,
  },
  sectionTitle: {
    color: Colors.primary.deepGreen,
    ...TextStyles.subHeading,
  },
  critPeriodLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  critDays: {
    color: Colors.primary.vibrantGreen,
    ...TextStyles.subHeading,
  },
  critText: {
    color: Colors.primary.deepGreen,
    ...TextStyles.body,
  },
  livestockLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 7,
    borderRadius: 10,
  },
  livestockStatTitle: {
    ...TextStyles.body,
  },
  livestockStatScore: {
    ...TextStyles.subHeading,
  },
  livestockStatMsg: {
    ...TextStyles.small,
  },
  livestockNutriToggle: {
    textDecorationLine: 'underline',
    color: Colors.secondary.deepTeal,
    marginTop: 10,
  },
  livestockNutriContainer: {
    backgroundColor: '#B0D1CD28',
    borderRadius: 5,
    padding: 10,
  },
  livestockNutriText: {
    color: Colors.secondary.deepTeal,
  },
  paddockStatusTitle: {
    color: Colors.secondary.white,
    marginHorizontal: 25,
    ...TextStyles.subHeading,
  },
  cardLayout: {
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'stretch',
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
    width: 200,
    backgroundColor: Colors.secondary.white,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
  },
  cardTitle: {
    color: Colors.primary.mainOrange,
    backgroundColor: Colors.primary.lightOrange,
    borderRadius: 10,
    overflow: 'hidden',
    textAlign: 'center',
    padding: 3,
    width: 'auto',
    ...TextStyles.subHeading,
  },
  cardRowLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  cardRowItem: {
    flex: 1,
    width: 100,
  },
  cardNumber: {
    ...TextStyles.subHeading,
    color: Colors.primary.vibrantGreen,
  },
  cardText: {
    ...TextStyles.body,
    color: Colors.primary.deepGreen,
    textAlign: 'left',
  },
  outerSunView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 120,
    right: 80,
  },
  innerSunView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 136,
    right: 98,
  },
  backgroundHillView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    top: 166,
    right: 0,
  },
  backgroundDashboard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 130,
  },
  backgroundGrassView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default DashboardStyle;
