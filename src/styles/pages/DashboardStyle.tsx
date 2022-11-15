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
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  card: {
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
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
  },

  cardNumber: {
    ...TextStyles.subHeading,
    color: Colors.primary.vibrantGreen,
  },

  cardText: {
    ...TextStyles.body,
    color: Colors.neutral[8],
    textAlign: 'left',
  },
});

export default DashboardStyle;
