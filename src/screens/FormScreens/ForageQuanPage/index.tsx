import AppButton from '../../../components/AppButton';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

type BootData = 'bare' | 'mix' | 'grass';
type HeightData = 't' | 's' | 'a' | 'c' | 'th' | 'p';
interface Card {
  boot: BootData;
  height: HeightData;
}

const ForageQuanPage = () => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [cardInd, setCardInd] = useState<number>(0);

  const onSetBootData = (index: number, data: BootData) => {
    setCardData(cards => {
      const ret = cards;
      const card: Card = { ...cards[index], boot: data };
      ret[index] = card;
      return ret;
    });
  };

  const onSetHeightData = (index: number, data: HeightData) => {
    setCardData(cards => {
      const ret = cards;
      const card: Card = { ...cards[index], height: data };
      ret[index] = card;
      return ret;
    });
  };

  const nextCard = () => {
    setCardInd(ind => ind + 1);
    // TODO: If we're at the limit, add more
  };

  const prevCard = () => {
    setCardInd(ind => ind - 1);
  };

  const onSubmit = () => {

  };

  const StacCard = (props: { index: number }) => {
    return (
      <View>
        <Text>Transect {props.index}</Text>

        <Text>What is your boot on?</Text>
        <View>
          <AppButton
            onPress={() => onSetBootData(props.index, 'bare')}
            title='All bare soil'
          />
          <AppButton
            onPress={() => onSetBootData(props.index, 'mix')}
            title='Bare soil and grass'
          />
          <AppButton
            onPress={() => onSetBootData(props.index, 'grass')}
            title='All grass'
          />
        </View>

        <Text>Rate Forage:</Text>
        <View>
          <AppButton
            onPress={() => onSetHeightData(props.index, 't')}
            title='T'
          />
          <AppButton
            onPress={() => onSetHeightData(props.index, 's')}
            title='S'
          />
          <AppButton
            onPress={() => onSetHeightData(props.index, 'a')}
            title='A'
          />
          <AppButton
            onPress={() => onSetHeightData(props.index, 'c')}
            title='C'
          />
          <AppButton
            onPress={() => onSetHeightData(props.index, 'th')}
            title='TH'
          />
          <AppButton
            onPress={() => onSetHeightData(props.index, 'p')}
            title='P'
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text>Forage Quantity</Text>

      <Text>paddock</Text>

      <Text>what method are you using?</Text>

      {/* STAC method; eyeball method will come later */}
      <View>
        <Text>measurement guide</Text>
        {/* TODO: Insert image of STAC guide */}
        <Text>Learn more about STAC method</Text>

        <Text>Score Forage</Text>

        <AppButton
          onPress={nextCard}
          title='Next'
        />

        <AppButton
          onPress={prevCard}
          title='Prev'
        />

        <AppButton
          onPress={onSubmit}
          title='submit'
        />
      </View>
    </SafeAreaView>
  );
};

export default ForageQuanPage;
