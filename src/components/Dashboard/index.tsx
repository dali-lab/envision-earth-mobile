import { View, Text } from 'react-native';

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
  return <View>
    <Text>{props.title}</Text>
    <View> {/* vertical stack */}
      <View> {/* horizontal */}
        <Text>{props.days}</Text>
        <Text>days grazing/acre</Text>
      </View>
      <View> {/* horizontal */}
        <Text>{props.forage}</Text>
        <Text>forage quality</Text>
      </View>
    </View>
  </View>;
};

export { LivestockStatusCard, PaddockStatusCard };
