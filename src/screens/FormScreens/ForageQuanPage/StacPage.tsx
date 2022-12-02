import React, { useState, Dispatch, SetStateAction } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useIsConnected } from 'react-native-offline';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import { AppButton, AppTextInput, PaddockDropdown } from '../../../components';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';

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

  return <View>
    <View>
      <PaddockDropdown
        data={plotData}
        plotId={selectedPlotId}
        setPlotId={setSelectedPlotId}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.ABOUT_STAC_PAGE)}
      >
        <Text
          style={[TextStyles.body, {
            color: Colors.secondary.deepTeal,
          }]}
        >
          Learn more about STAC method
        </Text>
      </TouchableOpacity>
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
        <Text style={[TextStyles.title, {
          minWidth: 100,
          textAlign: 'center',
          color: Colors.secondary.deepTeal,
        }]}>Data Recorded!</Text>
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
  </View>;
};

export default StacPage;
