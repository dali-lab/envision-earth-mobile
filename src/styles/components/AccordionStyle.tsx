import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../Colors';
import TextStyles from '../TextStyles';

const AccordionStyle = StyleSheet.create({
  title: {
    ...TextStyles.subHeading,
    // fontSize: 18,
    // fontWeight:'bold',
    color: 'white',
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  outer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    width: Dimensions.get('window').width * 0.9,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',
    fontWeight: 'bold',
    backgroundColor: Colors.primary.vibrantGreen,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  parentHr: {
    height: 1,
    color: 'white',
    width: '100%',
  },
  child: {
    padding: 16,
  },
});

export default AccordionStyle;
