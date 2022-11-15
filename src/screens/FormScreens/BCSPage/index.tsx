import React, { useState, Dispatch, SetStateAction, ReactNode } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions, Image } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createCowCensus, locallyCreateCowCensus } from '../../../redux/slices/cowCensusSlice';
import Accordion from '../../../components/Accordion';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import ScrollPick from '../../../components/ScrollPick';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import BCSEntry from '../../../components/Entries/BCSEntry';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, Colors, DropdownStyle } from '../../../styles';
import { BCS_TEXT, IBCSText } from '../../../utils/sampleInfo/BCSInfo/BCSText';


const BCSPage = () => {
  const isWifi = useIsConnected();
  const dispatch = useAppDispatch();

  const { selectedHerd } = useAppSelector((state) => state.herds);
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const loading: boolean = useAppSelector((state) => state.cowCensuses.loading);

  // TODO: Need to update this?
  const plotData = Object.keys(allPlots).map((plotId: string) => ({
    label: allPlots[plotId].name,
    data: plotId,
  }));
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');
  const [plotIdFocus, setPlotIdFocus] = useState(false);
  const [plotName, setPlotName] = useState('Select paddock...');

  const bcsDisplayElements: Array<ReactNode> = [];
  BCS_TEXT.forEach((e: IBCSText) => {
    bcsDisplayElements.push(
      <Image
        key={e.val}
        style={{
          width: Dimensions.get('window').width * (2 / 7),
          height: Dimensions.get('window').width * (2 / 7),
        }}
        source={{ uri: e.imageUri }}
      />,
    );
  });

  const [selectedIdx, setSelectedIdx] = useState<number>(0);

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
  const [imageOverlay, setImageOverlay] = useState<boolean>(false);

  const [tag, setTag] = useState<string>(''); // TODO: New implementation for tag

  const [notes, setNotes] = useState<string>('');
  const [notesOverlay, setNotesOverlay] = useState<boolean>(false);

  const [submitOverlay, setSubmitOverlay] = useState<boolean>(false);

  const handleCreateCowCensus = async () => {
    if (loading) {
      return;
    }
    
    if (!selectedHerd) {
      alert('Error: no selected herd');
    } else if (!allPlots[selectedPlotId]?.id) {
      alert('Error: no selected plot');
    } else if (!bcsArr) {
      alert('Error: no BCS arr');
    } else if (bcsArr.length < 1) {
      alert('Error: no elements in BCS arr');
    } else {
      if (isWifi) {
        await dispatch(createCowCensus({
          herdId: selectedHerd?.id as string,
          plotId: allPlots[selectedPlotId]?.id as string,
          bcs: bcsArr,
          notes: (notes + ' '),
          tag: (tag + ' '),
          photo: image,
        })).then((res) => {
          if (res.payload) {
            setSubmitOverlay(true);
          }
        });
      } else {
        dispatch(locallyCreateCowCensus({
          herdId: selectedHerd?.id as string,
          bcs: bcsArr,
          notes,
          tag,
          photo: image,
        }));
      }
    }
  };

  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
        style={{
          width: Dimensions.get('window').width,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Ionicons
              name='ios-arrow-back'
              size={32}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <Text
            style={[TextStyles.title, { color: Colors.primary.mainOrange }]}
          >
            BCS
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
          </View>
        </View>
        <View
          style={{
            width: 310,
          }}
        >
          <Dropdown
            style={[DropdownStyle.dropdown, plotIdFocus && { borderColor: 'blue' }]}
            containerStyle={DropdownStyle.dropdownContainerStyle}
            placeholderStyle={DropdownStyle.dropdownPlaceholderStyle}
            selectedTextStyle={DropdownStyle.dropdownSelectedTextStyle}
            itemContainerStyle={DropdownStyle.dropdownItemContainerStyle}
            itemTextStyle={DropdownStyle.dropdownItemTextStyle}
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
        <ScrollPick
          elements={bcsDisplayElements}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
          offsetWidth={Dimensions.get('window').width * (2 / 7)}
        />
        <Text style={TextStyles.subHeading}>
          See identifiers
        </Text>
        <View>
          <Accordion
            title={'BCS ' + (selectedIdx + 1)}
          >
            <Text style={TextStyles.small}>
              { BCS_TEXT[selectedIdx].description }
            </Text>
            <Text style={TextStyles.small}>
              { BCS_TEXT[selectedIdx].tail }
            </Text>
            <Text style={TextStyles.small}>
              { BCS_TEXT[selectedIdx].ribs }
            </Text>
            <Text style={TextStyles.small}>
              { BCS_TEXT[selectedIdx].shoulder }
            </Text>
            <Text style={TextStyles.small}>
              { BCS_TEXT[selectedIdx].brisket }
            </Text>
          </Accordion>
        </View>
        {
          bcsArr.map((bcs, index) => (
            <View
              key={index}
            >
              <BCSEntry
                bcs={bcs}
                onBCSEdit={(value) => handleEditBcs(value, index)}
                onBCSDelete={() => handleDeleteBcs(index)}
              />
            </View>
          ))
        }
        <AppButton
          onPress={() => handleAddBcs()}
          title={'add new BCS entry'}
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
          disabled={loading}
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

export default BCSPage;
