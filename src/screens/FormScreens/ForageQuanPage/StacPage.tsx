import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import { AppButton, AppTextInput, PaddockDropdown } from '../../../components';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { GlobalStyle, TextStyles, Colors, DropdownStyle } from '../../../styles';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';
import FormGrassImage from '../../../assets/form_grass.svg';

const StacPage = () => {
  const isWifi = useIsConnected();
  const dispatch = useAppDispatch();

  const { selectedHerd } = useAppSelector((state) => state.herds);
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const loading: boolean = useAppSelector((state) => state.forageQuantity.loading);

  // TODO: Need to update this?
  const plotData = Object.keys(allPlots).map((plotId: string) => ({
    label: allPlots[plotId].name,
    data: plotId,
  }));
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');

  const [rating, setRating] = useState<string>('0');

  const [image, setImage] = useState<IPhotoInput>();
  const [imageOverlay, setImageOverlay] = useState<boolean>(false);

  const [notes, setNotes] = useState<string>('');
  const [notesOverlay, setNotesOverlay] = useState<boolean>(false);

  const [submitOverlay, setSubmitOverlay] = useState<boolean>(false);

  const navigation = useNavigation<NavType>();

  const handleCreateForageQualityCensus = async () => {
    if (loading) {
      return;
    }

    if (!selectedHerd) {
      alert('Error: no selected herd');
    } else if (!allPlots[selectedPlotId]?.id) {
      alert('Error: no selected plot');
    } else if (rating == '') {
      alert('Error: rating can\'t be empty');
    } else {
      if (isWifi) {
        await dispatch(createForageQuantityCensus({
          plotId: allPlots[selectedPlotId]?.id as string,
          rating: parseInt(rating),
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

  return (
    <>
      <>
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
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            width: '100%',
            paddingBottom: 40,
            paddingRight: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(ROUTES.ABOUT_STAC_PAGE)}
          >
            <Text
              style={[TextStyles.body, {
                color: Colors.secondary.deepTeal,
                textDecorationLine: 'underline',
              }]}
            >
              Learn more about STAC method
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 385,
          }}
        >
          <FormGrassImage />
        </View>
        <View
          style={{
            backgroundColor: Colors.primary.lightestGreen,
            width: Dimensions.get('window').width,
            minHeight: 0.42 * Dimensions.get('window').height,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 40,
          }}
        >
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
      </>
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
          onPress={() => setSubmitOverlay(!submitOverlay)}
          title={'See my dashboard'}
          backgroundColor={Colors.primary.lightOrange}
          textColor={Colors.primary.mainOrange}
          width={215}
          height={51}
        />
      </View>
    </Overlay>
  </View>;
};

export default StacPage;
