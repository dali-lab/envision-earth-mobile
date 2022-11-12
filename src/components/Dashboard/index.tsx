import { View, Text } from 'react-native';
import { DashboardStyle } from '../../styles';

// TODO: Move these card components to a separate file
const LivestockStatusMessages = {
  dung: {
    low: 'score too low',
    medium: 'score just right, keep it up!',
    high: 'score too high',
  },
  bcs: {
    low: 'score too low, see recommended nutrient cycle',
    medlow: 'score average, increase for optimal BCS',
    medium: 'optimal BCS score, keep it up!',
    medhigh: 'score approaching too high, see recommended cycle',
    high: 'score too high, see recommended nutrient cycle',
  },
};
const LivestockStatusCard = (props: {
  type: 'dung' | 'bcs',
  score: number,
}) => {
  const title = props.type === 'dung' ? 'Dung' : 'BCS';
  let message: string;
  if (props.type === 'dung') {
    const scoreInterval =
      props.score < -0.5 ? 'low' :
        props.score > 0.5 ? 'high' :
          'medium';
    message = LivestockStatusMessages.dung[scoreInterval];
  } else {
    const scoreInterval =
      props.score < 4 ? 'low' :
        props.score == 4 ? 'medlow' :
          props.score == 5 ? 'medium' :
            props.score == 6 ? 'medhigh' :
              'high';
    message = LivestockStatusMessages.bcs[scoreInterval];
  }

  return <View>
    <Text>{title}:</Text>
    <Text>{props.score}</Text>
    <Text>{message}</Text>
  </View>;
};

const PaddockStatusCard = (props: {
  title: string,
  days: number,
  forage: number,
}) => {
  return <View style={DashboardStyle.card}>
    <Text style={DashboardStyle.cardTitle}>{props.title}</Text>
    <View>
      <View style={DashboardStyle.cardRowLayout}>
        <Text style={[
          DashboardStyle.cardRowItem, DashboardStyle.cardNumber,
        ]}>
          {props.days}
        </Text>
        <Text style={[
          DashboardStyle.cardRowItem, DashboardStyle.cardText,
        ]}>
          days grazing/acre
        </Text>
      </View>

      <View style={DashboardStyle.cardRowLayout}>

        <Text style={[
          DashboardStyle.cardRowItem, DashboardStyle.cardNumber,
        ]}>
          {props.forage}
        </Text>
        <Text style={[
          DashboardStyle.cardRowItem, DashboardStyle.cardText,
        ]}>
          forage quality
        </Text>

      </View>
    </View>
  </View>;
};

export { LivestockStatusCard, PaddockStatusCard };
