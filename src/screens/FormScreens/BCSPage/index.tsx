import React, { useState, Dispatch, SetStateAction } from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createCowCensus, locallyCreateCowCensus } from '../../../redux/slices/cowCensusSlice';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import ScrollPick from '../../../components/ScrollPick';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import Colors from '../../../utils/styles/Colors';
import TextStyles from '../../../utils/styles/TextStyles';
import { Picker } from '@react-native-picker/picker';

const BCSPage = () => {
  const isWifi = useIsConnected();

  const { selectedHerd } = useAppSelector((state) => state.herds);
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const dispatch = useAppDispatch();

  const BCS_ELEMENTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedPlot, setSelectedPlot] = useState<IPlot>();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [image, setImage] = useState<IPhotoInput>();
  const [tag, setTag] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleCreateCowCensus = async () => {
    // TODO: which fields are necessary, and which are optional?

    if (isWifi) {
      await dispatch(createCowCensus({
        herdId: selectedHerd?.id as string,
        plotId: selectedPlot?.id as string,
        bcs: [BCS_ELEMENTS[selectedIdx]],
        notes,
        tag,
        photo: image,
      }));
    } else {
      dispatch(locallyCreateCowCensus({
        herdId: selectedHerd?.id as string,
        bcs: BCS_ELEMENTS[selectedIdx],
        notes,
        tag,
        photo: image,
      }));
    }
  };

  // TODO: Plot selection modal

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <Text
          style={[TextStyles.title, { color: Colors.primary.mainOrange }]}
        >
          BCS
        </Text>
        <View>
          <Picker
            selectedValue={selectedPlot}
            onValueChange={(item) => {
              console.log(item);
              setSelectedPlot(item);
            }}
            style={{ height: 200, width: 300 }}
            mode="dropdown"
          >
            { 
              allPlots && Object.values(allPlots).map((plot) => {
                return (
                  <Picker.Item label={plot.name} value={plot} key={plot.id} />
                );
              })
            }
          </Picker>
        </View>
        <ScrollPick
          elements={BCS_ELEMENTS}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <UploadImage
          image={image}
          setImage={setImage as Dispatch<SetStateAction<IPhotoInput>>}
        />
        <AppTextInput
          onChangeText={(text) => setTag(text)}
          value={tag}
          placeholder='Tag'
        />
        <AppTextInput
          onChangeText={(text) => setNotes(text)}
          value={notes}
          placeholder='Notes'
        />
        <AppButton
          onPress={() => console.log()}
          title={'take photo'}
          backgroundColor={Colors.primary.lightGreen}
          textColor={Colors.primary.deepGreen}
          width={215}
          height={44}
        />
        <AppButton
          onPress={() => console.log()}
          title={'add note'}
          backgroundColor={Colors.primary.lightOrange}
          textColor={Colors.primary.mainOrange}
          width={215}
          height={44}
        />
        <AppButton
          onPress={handleCreateCowCensus}
          title={'submit'}
          backgroundColor={Colors.primary.deepGreen}
          textColor={Colors.secondary.white}
          width={215}
          height={51}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BCSPage;