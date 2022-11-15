import { View, Text } from 'react-native';
import { Colors, DashboardStyle } from '../../styles';

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
const Dunginfo = {
  low: {
    number: Colors.error.brightRed,
    title: Colors.error.brightRed,
    text: Colors.error.candyRed,
    bg: Colors.error.mutedRed,
    desc: 'score too low',
  },
  medium: {
    number: Colors.primary.mainOrange,
    title: Colors.secondary.neutralYellow,
    text: Colors.secondary.neutralYellow,
    bg: Colors.primary.lightOrange,
    desc: 'score just right, keep it up!',
  },
  high: {
    number: Colors.error.brightRed,
    title: Colors.error.brightRed,
    text: Colors.error.candyRed,
    bg: Colors.error.mutedRed,
    desc: 'score too high',
  },
};
const BCSinfo = [
  {},
  {
    number: Colors.error.brightRed,
    title: Colors.error.brightRed,
    text: Colors.error.candyRed,
    bg: Colors.error.mutedRed,
    desc: 'score too low',
  },
  {
    number: Colors.error.brightRed,
    title: Colors.error.brightRed,
    text: Colors.error.candyRed,
    bg: Colors.error.mutedRed,
    desc: 'score too low',
  },
  {
    number: Colors.primary.deepGreen,
    title: Colors.primary.deepGreen,
    text: Colors.primary.deepGreen,
    bg: Colors.neutral[1],
    desc: 'consult graph for ideal score',
  },
  {
    number: Colors.primary.deepGreen,
    title: Colors.primary.deepGreen,
    text: Colors.primary.deepGreen,
    bg: Colors.neutral[1],
    desc: 'consult graph for ideal score',
  },
  {
    number: Colors.primary.deepGreen,
    title: Colors.primary.deepGreen,
    text: Colors.primary.deepGreen,
    bg: Colors.neutral[1],
    desc: 'consult graph for ideal score',
  },
  {
    number: Colors.primary.deepGreen,
    title: Colors.primary.deepGreen,
    text: Colors.primary.deepGreen,
    bg: Colors.neutral[1],
    desc: 'consult graph for ideal score',
  },
  {
    number: Colors.primary.mainOrange,
    title: Colors.secondary.neutralYellow,
    text: Colors.secondary.neutralYellow,
    bg: Colors.primary.lightOrange,
    desc: 'score approaching too high',
  },
  {
    number: Colors.error.brightRed,
    title: Colors.error.brightRed,
    text: Colors.error.candyRed,
    bg: Colors.error.mutedRed,
    desc: 'score too high',
  },
  {
    number: Colors.error.brightRed,
    title: Colors.error.brightRed,
    text: Colors.error.candyRed,
    bg: Colors.error.mutedRed,
    desc: 'score too high',
  },
];
const LivestockStatusCard = (props: {
  type: 'dung' | 'bcs',
  score: number,
}) => {
  const title = props.type === 'dung' ? 'Dung' : 'BCS';
  let message: string;
  let scoreStyle: any;

  if (props.type === 'dung') {
    const scoreInterval =
      props.score < -0.5 ? 'low' :
        props.score > 0.5 ? 'high' :
          'medium';
    message = LivestockStatusMessages.dung[scoreInterval];
    const scoreInfo = Dunginfo[scoreInterval];
    scoreStyle = {
      title: { color: scoreInfo.title },
      scoreNumber: { color: scoreInfo.number },
      desc: { color: scoreInfo.text },
      container: { backgroundColor: scoreInfo.bg },
    };
    message = Dunginfo[scoreInterval].desc;
  } else {
    const scoreInterval =
      props.score < 4 ? 'low' :
        props.score == 4 ? 'medlow' :
          props.score == 5 ? 'medium' :
            props.score == 6 ? 'medhigh' :
              'high';
    const scoreInfo = BCSinfo[Math.round(props.score)];
    scoreStyle = {
      title: { color: scoreInfo.title },
      scoreNumber: { color: scoreInfo.number },
      desc: { color: scoreInfo.text },
      container: { backgroundColor: scoreInfo.bg },
    };
    message = BCSinfo[Math.round(props.score)].desc as string;
  }

  return <View style={[DashboardStyle.livestockLayout, scoreStyle.container]}>
    <Text style={[DashboardStyle.livestockStatTitle, scoreStyle.title]}>{title}:</Text>
    <Text style={[DashboardStyle.livestockStatScore, scoreStyle.scoreNumber]}>{props.score}</Text>
    <Text style={[DashboardStyle.livestockStatMsg, scoreStyle.desc]}>{message}</Text>
  </View>;
};

const PaddockStatusCard = (props: {
  title: string,
  days: number,
  forage: number,
}) => {
  return <View style={DashboardStyle.card}>
    <Text style={DashboardStyle.cardTitle}>{props.title}</Text>
    <>
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
    </>
  </View>;
};

export { LivestockStatusCard, PaddockStatusCard };
