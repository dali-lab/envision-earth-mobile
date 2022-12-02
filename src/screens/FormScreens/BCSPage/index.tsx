import React, { useState, ReactNode } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions, Image } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import Carousel from 'react-native-reanimated-carousel';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createCowCensus, locallyCreateCowCensus } from '../../../redux/slices/cowCensusSlice';
import Accordion from '../../../components/Accordion';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import BCSEntry from '../../../components/Entries/BCSEntry';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, BCSStyle, FormsStyle } from '../../../styles';
import { BCS_TEXT, IBCSText } from '../../../utils/sampleInfo/BCSInfo/BCSText';
import FormGrassImage from '../../../assets/form_grass.svg';

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

  const bcsDisplayElements: Array<ReactNode> = [];
  BCS_TEXT.forEach((e: IBCSText) => {
    bcsDisplayElements.push(
      <View>
        <Image
          key={e.val}
          style={{
            width: 125,
            height: 125,
          }}
          source={{ uri: e.imageUri }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: Colors.primary.mainOrange,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[TextStyles.body, { color: Colors.secondary.white, width: 20, height: 20, paddingLeft: 5 }]}
          >
            { e.val }
          </Text> 
        </View>
      </View>,
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

  const [tag, setTag] = useState<string>(''); // TODO: New implementation for tag

  const [notes, setNotes] = useState<string>('');

  // TODO: fix this so that submitting the form correctly sets this state
  // (currently handed off to the submit button/overlay component)
  const [submitOverlay, setSubmitOverlay] = useState<boolean>(false);

  const handleCreateCowCensus = async () => {
    if (loading) {
      return;
    }

    if (!selectedHerd) {
      alert('Error: no selected herd');
      return;
    }
    if (!allPlots[selectedPlotId]?.id) {
      alert('Error: no selected plot');
      return;
    }
    if (!bcsArr) {
      alert('Error: no BCS entries');
      return;
    }
    if (bcsArr.length < 1) {
      alert('Error: no BCS entries');
      return;
    }

    // Success condition
    const payload = {
      herdId: selectedHerd?.id as string,
      plotId: allPlots[selectedPlotId]?.id as string,
      bcs: bcsArr,
      notes: (notes + ' '),
      tag: (tag + ' '),
      photo: image,
    };
    if (isWifi) {
      await dispatch(createCowCensus(payload)).then((res) => {
        if (res.payload) {
          setSubmitOverlay(true);
        }
      });
    } else {
      dispatch(locallyCreateCowCensus(payload));
    }

  };

  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={[GlobalStyle.container, { backgroundColor: Colors.secondary.white }]}>
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
              paddingLeft: 20,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primary.lightOrange,
                borderRadius: 10,
              }}
            >
              <AntDesign
                name='left'
                size={32}
                onPress={() => {
                  navigation.goBack();
                }}
                color={Colors.primary.mainOrange}
              />
            </View>
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
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: '100%',
            paddingTop: 10,
            paddingBottom: 50,
            paddingLeft: 20,
          }}
        >
          <Text
            style={[TextStyles.subHeading, { color: Colors.primary.deepGreen, paddingBottom: 10 }]}
          >
            paddock
          </Text>
          <Dropdown
            style={[DropdownStyle.dropdown, { width: 200 }, plotIdFocus && { borderColor: 'blue' }]}
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
        <Carousel
          loop
          width={Dimensions.get('window').width}
          height={125}
          autoPlay={false}
          data={bcsDisplayElements}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setSelectedIdx(index)}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 250,
          }}
          renderItem={({ item, index }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {item}
            </View>
          )}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingTop: 20,
            paddingLeft: 20,
            width: '100%',
          }}
        >
          <Text
            style={[TextStyles.subHeading, { color: Colors.primary.deepGreen, paddingBottom: 10 }]}
          >
            see identifiers
          </Text>
        </View>
        <View
          style={{
            paddingBottom: 50,
          }}
        >
          <Accordion
            title={'BCS ' + (selectedIdx + 1)}
          >
            <Text style={TextStyles.small}>
              {BCS_TEXT[selectedIdx].description}
            </Text>
            <Text style={TextStyles.small}>
              {BCS_TEXT[selectedIdx].tail}
            </Text>
            <Text style={TextStyles.small}>
              {BCS_TEXT[selectedIdx].ribs}
            </Text>
            <Text style={TextStyles.small}>
              {BCS_TEXT[selectedIdx].shoulder}
            </Text>
            <Text style={TextStyles.small}>
              {BCS_TEXT[selectedIdx].brisket}
            </Text>
          </Accordion>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 455,
          }}
        >
          <FormGrassImage />
        </View>
        <View
          style={{
            backgroundColor: Colors.primary.lightestGreen,
            width: Dimensions.get('window').width,
            minHeight: Dimensions.get('window').height - 310,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 40,
          }}
        >
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
          <View>
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
          </View>
        </View>
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
        <View style={{ alignItems: 'center' }}>
          <Text style={[TextStyles.title,
            {
              minWidth: 100,
              textAlign: 'center',
              color: Colors.secondary.deepTeal,
            }]}>
            Data Recorded!
          </Text>
          <AppButton
            onPress={() => setSubmitOverlay(!submitOverlay)}
            title={'Log new data'}
            backgroundColor={Colors.primary.lightOrange}
            textColor={Colors.primary.mainOrange}
            width={215}
            height={51}
          />
          <AppButton
            onPress={() => setSubmitOverlay(!submitOverlay)}
            title={'See my dashboard'}
            backgroundColor={Colors.primary.lightOrange}
            textColor={Colors.primary.mainOrange}
            width={215}
            height={51}
          />


          <View style={FormsStyle.sectionButtons}>
            <AddPhotoButton
              image={image}
              setImage={setImage}
            />
            <AddNotesButton
              notes={notes}
              setNotes={setNotes}
            />
            <SubmitButton
              onSubmit={handleCreateCowCensus}
              loadingState={loading}
              goBack={navigation.goBack}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BCSPage;
