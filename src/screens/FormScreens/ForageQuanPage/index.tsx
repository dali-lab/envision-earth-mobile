import AppButton from '../../../components/AppButton';
import { useState } from 'react';
import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type BootData = 'bare' | 'mix' | 'grass';
type HeightData = 't' | 's' | 'a' | 'c' | 'th' | 'p';
interface Card {
  boot: BootData;
  height: HeightData;
}

const ForageQuanPage = () => {
  const [cardData, setCardData] = useState<Card[]>([]);
  const [pageInd, setPageInd] = useState<number>(0);
  const [numCards, setNumCards] = useState<number>(5);

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

  const loadNewCard = () => {
    setNumCards(num => num + 1);
  };

  const nextCard = () => {
    if (pageInd === numCards) {
      loadNewCard();
    }
    setPageInd(ind => ind + 1);
    // TODO: If we're at the limit, add more
  };

  const prevCard = () => {
    if (pageInd > 0) {
      setPageInd(ind => ind - 1);
    }
  };

  const onSubmit = () => {

  };

  const StacCard = ({ data: Card }) => {
    return (
      <View>
        <Text>Transect {pageInd}</Text>

        <Text>What is your boot on?</Text>
        <View>
          <AppButton
            onPress={() => onSetBootData(pageInd, 'bare')}
            title='All bare soil'
          />
          <AppButton
            onPress={() => onSetBootData(pageInd, 'mix')}
            title='Bare soil and grass'
          />
          <AppButton
            onPress={() => onSetBootData(pageInd, 'grass')}
            title='All grass'
          />
        </View>

        <Text>Rate Forage:</Text>
        <View>
          <AppButton
            onPress={() => onSetHeightData(pageInd, 't')}
            title='T'
          />
          <AppButton
            onPress={() => onSetHeightData(pageInd, 's')}
            title='S'
          />
          <AppButton
            onPress={() => onSetHeightData(pageInd, 'a')}
            title='A'
          />
          <AppButton
            onPress={() => onSetHeightData(pageInd, 'c')}
            title='C'
          />
          <AppButton
            onPress={() => onSetHeightData(pageInd, 'th')}
            title='TH'
          />
          <AppButton
            onPress={() => onSetHeightData(pageInd, 'p')}
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
      <ScrollView>
        <Text>measurement guide</Text>
        {/* TODO: Insert image of STAC guide */}
        <Text>Learn more about STAC method</Text>

        <Text>Score Forage</Text>

        <Text>{pageInd}</Text>
        <Text>{numCards}</Text>

        {/* 
        <FlatList
          data={cardData}
          renderItem={StacCard}
          keyExtractor={(item, index) => index}
          onEndReachedThreshold={0}
          onEndReached={loadNewCard} />
        */}

        <StacCard data={cardData[pageInd]} />

        {/* [0, 1, 2, 3, 4].map(num => <StacCard index={num} key={num} />) */}

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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForageQuanPage;
