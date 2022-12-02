import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dimensions, View, Text, TextInput } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import { AddNotesButton, AddPhotoButton, AppButton, AppTextInput, PaddockDropdown, SubmitButton } from '../../../components';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { GlobalStyle, TextStyles, Colors, DropdownStyle  } from '../../../styles';
import FormGrassImage from '../../../assets/form_grass.svg';

const EyeballPage = () => {
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
  const [plotIdFocus, setPlotIdFocus] = useState(false);
  const [plotName, setPlotName] = useState('Select paddock...');

  const [rating, setRating] = useState<string>('0');

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
      return;
    }
    if (!allPlots[selectedPlotId]?.id) {
      alert('Error: no selected plot');
      return;
    }
    if (rating == '') {
      alert('Error: rating can\'t be empty');
      return;
    }

    // Success condition
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
  };

  return (
    <View>
      <View>
        <PaddockDropdown
          data={plotData}
          plotId={selectedPlotId}
          setPlotId={setSelectedPlotId}
        />

        <Text style={[TextStyles.subHeading, { minWidth: 100, textAlign: 'center' }]}>Amount of forage (acres):</Text>
        <TextInput
          onChangeText={value => setRating(value)}
          value={rating}
          placeholder={'enter forage...'}
          placeholderTextColor={Colors.primary.lightGreen}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 325,
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
          <Text
            style={[TextStyles.subHeading, { color: Colors.primary.deepGreen, paddingTop: 20, paddingBottom: 10 }]}
          >
            Amount of forage (acres)
          </Text>
          <TextInput
            onChangeText={value => setRating(value)}
            value={rating}
            placeholder={'enter forage...'}
            placeholderTextColor={Colors.primary.lightGreen}
            style={{
              ...TextStyles.body,
              borderColor: 'lightgrey',
              borderRadius: 12,
              borderWidth: 1,
              width: '75%',
              padding: 10,
              textAlign: 'center',
              backgroundColor: Colors.secondary.white,
            }}
            keyboardType="numeric"
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
          setImage={setImage}
        />
        <AddNotesButton
          notes={notes}
          setNotes={setNotes}
        />
        <SubmitButton
          onSubmit={handleCreateForageQualityCensus}
          loadingState={loading}
          goBack={useNavigation().goBack}
        />
      </View>
    </View>
  );
};

export default EyeballPage;
