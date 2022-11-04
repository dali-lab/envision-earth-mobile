import { AppButton, AppTextInput, PaddockSelector } from '../../../components';
import { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import StacPage from './StacPage';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';
import Colors from '../../../utils/styles/Colors';

export type PageType = 'stac' | 'eyeball';
export type BootData = 'bare' | 'mix' | 'grass';
export type HeightData = 't' | 's' | 'a' | 'c' | 'th' | 'p';
export interface Card {
  boot: BootData;
  height: HeightData;
}

const ForageQuanPage = () => {
  // Page state
  const [pageType, setPageType] = useState<PageType>('stac');
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');
  const [plotIdFocus, setPlotIdFocus] = useState(false);
  const [plotName, setPlotName] = useState('Select paddock...');

  // STAC state
  const [cardData, setCardData] = useState<Card[]>([]);
  const [pageInd, setPageInd] = useState<number>(0);
  const [numCards, setNumCards] = useState<number>(5);

  //Eyeball state
  const [forageAmt, setForageAmt] = useState<number>(0);

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

  const MethodView = () => {
    if (pageType === 'stac') {
      // TODO: Refactor, put some of the functions in the Stac Page file
      return <StacPage
        cardData={cardData}
        pageInd={pageInd}
        numCards={numCards}
        nextCard={nextCard}
        prevCard={prevCard}
        onSubmit={onSubmit}
        onSetBootData={onSetBootData}
        onSetHeightData={onSetHeightData}
      />;
    } else {
      return (
        <View>
          <Text>paddock</Text>

          <AppTextInput
            onChangeText={(val) => setForageAmt(parseInt(val))}
            value={forageAmt.toString()}
            placeholder=''
          />

          <AppButton
            onPress={() => { }}
            title='take photo'
          />
          <AppButton
            onPress={() => { }}
            title='add note'
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text
        style={[TextStyles.title, { color: Colors.primary.mainOrange }]}
      >
        Forage Quantity
      </Text>

      {/* TODO: Should be a dropdown */}
      <Text>Paddock:</Text>
      <PaddockSelector
        placeholder={!plotIdFocus ? plotName : '...'}
        value={selectedPlotId}
        focus={plotIdFocus}
        onFocus={() => setPlotIdFocus(true)}
        onBlur={() => setPlotIdFocus(false)}
        onChange={item => {
          setPlotName(item.label);
          setSelectedPlotId(item.data);
        }}
      />

      <Text>What method are you using?</Text>
      <AppButton
        onPress={() => setPageType('eyeball')}
        title='eyeballing'
      />
      <AppButton
        onPress={() => setPageType('stac')}
        title='STAC'
      />

      <MethodView />
    </SafeAreaView>
  );
};

export default ForageQuanPage;
