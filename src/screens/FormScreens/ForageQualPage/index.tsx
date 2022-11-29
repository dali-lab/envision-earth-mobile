import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dimensions, ScrollView, SafeAreaView, View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { AntDesign } from '@expo/vector-icons';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createForageQualityCensus } from '../../../redux/slices/forageQualityCensusSlice';
import { AppButton, AppTextInput, PaddockSelector } from '../../../components';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, Colors, DropdownStyle } from '../../../styles';
import FormGrassImage from '../../../assets/form_grass.svg';

const ForageQualPage = () => {
  const isWifi = useIsConnected();
  const dispatch = useAppDispatch();

  const { selectedHerd } = useAppSelector((state) => state.herds);
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const loading: boolean = useAppSelector((state) => state.forageQuality.loading);

  // TODO: Need to update this?
  const plotData = Object.keys(allPlots).map((plotId: string) => ({
    label: allPlots[plotId].name,
    data: plotId,
  }));
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');
  const [plotIdFocus, setPlotIdFocus] = useState(false);
  const [plotName, setPlotName] = useState('Select paddock...');

  const [rating, setRating] = useState<number>(5);

  const [image, setImage] = useState<IPhotoInput>();
  const [imageOverlay, setImageOverlay] = useState<boolean>(false);

  const [notes, setNotes] = useState<string>('');
  const [notesOverlay, setNotesOverlay] = useState<boolean>(false);

  const [submitOverlay, setSubmitOverlay] = useState<boolean>(false);

  const handleCreateForageQualityCensus = async () => {
    if (loading) {
      return;
    }

    if (!selectedHerd) {
      alert('Error: no selected herd');
    } else if (!allPlots[selectedPlotId]?.id) {
      alert('Error: no selected plot');
    } else {
      if (isWifi) {
        await dispatch(createForageQualityCensus({
          plotId: allPlots[selectedPlotId]?.id as string,
          rating,
          notes: (notes + ' '),
          photo: image,
        })).then((res) => {
          if (res.payload) {
            setSubmitOverlay(true);
          }
        });
      }
    }
  };

  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={[GlobalStyle.container, { backgroundColor: Colors.secondary.white }]}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
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
            Forage Quality
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 152,
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
          <View>
            <Text
              style={[TextStyles.subHeading, { color: Colors.primary.deepGreen, paddingTop: 20 }]}
            >
              rate forage
            </Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Slider
                style={GlobalStyle.slider}
                minimumValue={1}
                maximumValue={9}
                onValueChange={(val) => setRating(val)}
                step={1}
                value={rating}
                minimumTrackTintColor={Colors.primary.vibrantGreen}
                thumbTintColor={Colors.primary.vibrantGreen}
              />
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
                  <Text>
                    1
                  </Text>
                </View>
                <View>
                  <Text>
                    5
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  <Text>
                    9
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  width: '100%',
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.secondary.white,
                    borderRadius: 10,
                  }}
                >
                  <Text style={[
                    TextStyles.subHeading,
                    { minWidth: 100, textAlign: 'center', color: Colors.primary.vibrantGreen }]}
                  >
                    {rating}
                  </Text>
                </View>
              </View>
            </View>
          </View>
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
            onPress={handleCreateForageQualityCensus}
            title={'submit'}
            backgroundColor={Colors.primary.deepGreen}
            textColor={Colors.secondary.white}
            width={215}
            height={51}
            disabled={loading}
          />
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
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

export default ForageQualPage;
