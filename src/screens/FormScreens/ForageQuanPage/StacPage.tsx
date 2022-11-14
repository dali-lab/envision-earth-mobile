import { View, ScrollView, Text, Button } from 'react-native';
import AppButton from '../../../components/AppButton';
import { Card, PageType, BootData, HeightData } from '.';
import { TextStyles } from '../../../styles';

const StacPage = (props: {
  cardData: Card[],
  pageInd: number,
  numCards: number,
  nextCard: () => void,
  prevCard: () => void,
  onSubmit: () => void,
  onSetBootData: (index: number, data: BootData) => void,
  onSetHeightData: (index: number, data: HeightData) => void,
}) => {

  const StacCard = ({ data: Card }) => {
    return (
      <View>
        <Text>Transect {props.pageInd}</Text>

        <Text style={[TextStyles.subHeading]}>What is your boot on?</Text>
        <View>
          <AppButton
            onPress={() => props.onSetBootData(props.pageInd, 'bare')}
            title='All bare soil'
          />
          <AppButton
            onPress={() => props.onSetBootData(props.pageInd, 'mix')}
            title='Bare soil and grass'
          />
          <AppButton
            onPress={() => props.onSetBootData(props.pageInd, 'grass')}
            title='All grass'
          />
        </View>

        <Text style={[TextStyles.subHeading]}>Rate Forage:</Text>
        <View>
          <AppButton
            onPress={() => props.onSetHeightData(props.pageInd, 's')}
            title='S'
          />
          <AppButton
            onPress={() => props.onSetHeightData(props.pageInd, 't')}
            title='T'
          />
          <AppButton
            onPress={() => props.onSetHeightData(props.pageInd, 'a')}
            title='A'
          />
          <AppButton
            onPress={() => props.onSetHeightData(props.pageInd, 'c')}
            title='C'
          />
          <AppButton
            onPress={() => props.onSetHeightData(props.pageInd, 'th')}
            title='TH'
          />
          <AppButton
            onPress={() => props.onSetHeightData(props.pageInd, 'p')}
            title='P'
          />
        </View>
      </View>
    );
  };
  return (<ScrollView>
    <Text>measurement guide</Text>
    <Text>Learn more about STAC method</Text>

    <Text>Score Forage</Text>

    <Text>{props.pageInd}</Text>
    <Text>{props.numCards}</Text>

    <StacCard data={props.cardData[props.pageInd]} />

    {/* [0, 1, 2, 3, 4].map(num => <StacCard index={num} key={num} />) */}

    <AppButton
      onPress={props.nextCard}
      title='Next'
    />

    <AppButton
      onPress={props.prevCard}
      title='Prev'
    />

    <AppButton
      onPress={props.onSubmit}
      title='submit'
    />
  </ScrollView>);
};

export default StacPage;
