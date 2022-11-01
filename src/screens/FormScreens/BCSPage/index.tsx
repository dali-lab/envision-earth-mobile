import React, { useState, Dispatch, SetStateAction } from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createCowCensus, locallyCreateCowCensus } from '../../../redux/slices/cowCensusSlice';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import BCSEntry from '../../../components/Entries/BCSEntry';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import Colors from '../../../utils/styles/Colors';
import TextStyles from '../../../utils/styles/TextStyles';

const BCSPage = () => {
  const isWifi = useIsConnected();
  const dispatch = useAppDispatch();

  const { selectedHerd } = useAppSelector((state) => state.herds);
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);

  // TODO: Need to update this?
  const plotData = Object.keys(allPlots).map((plotId: string) => ({
    label: allPlots[plotId].name,
    data: plotId,
  }));
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');
  const [plotIdFocus, setPlotIdFocus] = useState(false);
  const [plotName, setPlotName] = useState('Select paddock...');

  const [bcsArr, setBcsArr] = useState<number[]>([5]);
  const handleAddBcs = () => {
    const newArr: number[] = [...bcsArr];
    newArr.push(5); // default value does not matter
    setBcsArr(newArr);
  };
  const handleEditBcs = (value: number, index: number) => {
    const newArr: number[] = [...bcsArr];
    newArr[index] = value;
    setBcsArr(newArr);
  };
  const handleDeleteBcs = (index: number) => {
    const newArr: number[] = [...bcsArr];
    newArr.splice(index, 1);
    setBcsArr(newArr);
  };

  const [image, setImage] = useState<IPhotoInput>();
  const [tag, setTag] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleCreateCowCensus = async () => {
    // TODO: which fields are necessary, and which are optional?

    if (isWifi) {
      await dispatch(createCowCensus({
        herdId: selectedHerd?.id as string,
        plotId: allPlots[selectedPlotId]?.id as string,
        bcs: bcsArr,
        notes,
        tag,
        photo: image,
      }));
    } else {
      dispatch(locallyCreateCowCensus({
        herdId: selectedHerd?.id as string,
        bcs: bcsArr,
        notes,
        tag,
        photo: image,
      }));
    }
  };

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
        <View 
          style={{
            width: 310,
          }}
        >
          <Dropdown
            style={[GlobalStyle.dropdown, plotIdFocus && { borderColor: 'blue' }]}
            containerStyle={GlobalStyle.dropdownContainerStyle}
            placeholderStyle={GlobalStyle.dropdownPlaceholderStyle}
            selectedTextStyle={GlobalStyle.dropdownSelectedTextStyle}
            itemContainerStyle={GlobalStyle.dropdownItemContainerStyle}
            itemTextStyle={GlobalStyle.dropdownItemTextStyle}
            data={plotData}
            maxHeight={300}
            labelField='label'
            valueField='value'
            placeholder={!plotIdFocus ? plotName : '...'}
            value={selectedPlotId}
            onFocus={() => setPlotIdFocus(true)}
            onBlur={() => setPlotIdFocus(false)}
            onChange={item => {
              setPlotName(item.label);
              setSelectedPlotId(item.data);
            }}
          />
        </View>

        {
          bcsArr.map((bcs, index) => (
            <View
              key={index}
            >
              <BCSEntry
                bcs={bcs}
                onBCSEdit={(value) => handleEditBcs(value, index)}
                onBCSDelete={(e) => handleDeleteBcs(index)}
              />
            </View>
          ))
        }
        <AppButton
          onPress={() => handleAddBcs()}
          title={'add more'}
          backgroundColor={Colors.primary.mainOrange}
          textColor={Colors.secondary.white}
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