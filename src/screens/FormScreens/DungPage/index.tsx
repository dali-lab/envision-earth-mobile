import React, { useState, Dispatch, SetStateAction } from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createDungCensus } from '../../../redux/slices/dungCensusSlice';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import DungEntry from '../../../components/Entries/DungEntry';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import Colors from '../../../utils/styles/Colors';
import TextStyles from '../../../utils/styles/TextStyles';

const DungPage = () => {
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

  const [dungArr, setDungArr] = useState<number[]>([0]);
  const handleAddDung = () => {
    const newArr: number[] = [...dungArr];
    newArr.push(0); // default value does not matter
    setDungArr(newArr);
  };
  const handleEditDung = (value: number, index: number) => {
    const newArr: number[] = [...dungArr];
    newArr[index] = value;
    setDungArr(newArr);
  };
  const handleDeleteDung = (index: number) => {
    const newArr: number[] = [...dungArr];
    newArr.splice(index, 1);
    setDungArr(newArr);
  };

  const [image, setImage] = useState<IPhotoInput>();
  const [imageOverlay, setImageOverlay] = useState<boolean>(false);

  // TODO: Add tag

  const [notes, setNotes] = useState<string>('');
  const [notesOverlay, setNotesOverlay] = useState<boolean>(false);

  const [submitOverlay, setSubmitOverlay] = useState<boolean>(false);

  const handleCreateCowCensus = async () => {
    if (!selectedHerd) {
      alert('Error: no selected herd');
    } else if (!allPlots[selectedPlotId]?.id) {
      alert('Error: no selected plot');
    } else if (!dungArr) {
      alert('Error: no dung arr');
    } else if (dungArr.length < 1) {
      alert('Error: no elements in dung arr');
    } else {
      if (isWifi) {
        console.log({
          herdId: selectedHerd?.id as string,
          plotId: allPlots[selectedPlotId]?.id as string,
          ratings: dungArr,
          notes,
          photo: image,
        });
          
        await dispatch(createDungCensus({
          herdId: selectedHerd?.id as string,
          plotId: allPlots[selectedPlotId]?.id as string,
          ratings: dungArr,
          notes: (notes + ' '),
          photo: image,
        })).then(() => {
          setSubmitOverlay(true);
        });
      }
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
          Dung Condition
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
          dungArr.map((rating, index) => (
            <View
              key={index}
            >
              <DungEntry
                rating={rating}
                onDungEdit={(value) => handleEditDung(value, index)}
                onDungDelete={(e) => handleDeleteDung(index)}
              />
            </View>
          ))
        }
        <AppButton
          onPress={() => handleAddDung()}
          title={'add new dung entry'}
          backgroundColor={Colors.primary.mainOrange}
          textColor={Colors.secondary.white}
        />
        <AppButton
          onPress={() => setImageOverlay(!notesOverlay)}
          title={'take photo'}
          backgroundColor={Colors.primary.lightGreen}
          textColor={Colors.primary.deepGreen}
          width={215}
          height={44}
        />
        <AppButton
          onPress={() => setNotesOverlay(!notesOverlay)}
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
      <Overlay
        isVisible={imageOverlay}
        onBackdropPress={() => setImageOverlay(!imageOverlay)}
        overlayStyle={GlobalStyle.overlayModal}
      >
        <UploadImage
          image={image}
          setImage={setImage as Dispatch<SetStateAction<IPhotoInput>>}
        />
        <AppButton
          onPress={() => setImageOverlay(!imageOverlay)}
          title={'ok'}
          backgroundColor={Colors.primary.deepGreen}
          textColor={Colors.secondary.white}
          width={215}
          height={51}
        />
      </Overlay>
      <Overlay
        isVisible={notesOverlay} 
        onBackdropPress={() => setNotesOverlay(!notesOverlay)}
        overlayStyle={GlobalStyle.overlayModal}
      >
        <AppTextInput
          onChangeText={(text) => setNotes(text)}
          value={notes}
          placeholder='Notes'
          multiline={true}
          width={250}
        />
        <AppButton
          onPress={() => setNotesOverlay(!notesOverlay)}
          title={'ok'}
          backgroundColor={Colors.primary.deepGreen}
          textColor={Colors.secondary.white}
          width={215}
          height={51}
        />
      </Overlay>
      <Overlay 
        isVisible={submitOverlay} 
        onBackdropPress={() => setSubmitOverlay(!submitOverlay)}
        overlayStyle={GlobalStyle.overlayModal}
      >
        <View>
          <Text style={[TextStyles.title, { minWidth: 100, textAlign: 'center' }]}>Data recorded!</Text>
          <AppButton
            onPress={() => setSubmitOverlay(!submitOverlay)}
            title={'enter more data'}
            backgroundColor={Colors.primary.lightOrange}
            textColor={Colors.primary.mainOrange}
            width={215}
            height={51}
          />
          <AppButton
            onPress={() => setSubmitOverlay(!submitOverlay)}
            title={'see my dashboard'}
            backgroundColor={Colors.primary.lightOrange}
            textColor={Colors.primary.mainOrange}
            width={215}
            height={51}
          />
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

export default DungPage;
