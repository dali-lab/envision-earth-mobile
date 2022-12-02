import React, { useState, Dispatch, SetStateAction } from 'react';
import { Dimensions, View, Text, TouchableOpacity } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
<<<<<<< HEAD
import { createForageQuantityCensus, locallyCreateForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import { AppButton, AppTextInput, PaddockSelector } from '../../../components';
=======
import { createForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import { AddNotesButton, AddPhotoButton, AppButton, AppTextInput, PaddockDropdown, SubmitButton } from '../../../components';
>>>>>>> d3ce8b92802746b510b456f0226f5e3a5e1a89c3
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { GlobalStyle, TextStyles, Colors, DropdownStyle, FormsStyle } from '../../../styles';
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
      } else {
        dispatch(locallyCreateForageQuantityCensus({
          plotId: allPlots[selectedPlotId]?.id as string,
          rating: parseInt(rating),
          notes: (notes + ' '),
          photo: image,
        }));
      }
    }
  };

  return <View style={{
    width: '100%',
  }}>
    <View style={FormsStyle.sectionTop}>
      <PaddockDropdown
        data={plotData}
        plotId={selectedPlotId}
        setPlotId={setSelectedPlotId}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate(ROUTES.ABOUT_STAC_PAGE)}
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          width: '100%',
          paddingBottom: 40,
          paddingRight: 20,
        }}
      >
        <Text
          style={{
            ...TextStyles.small,
            color: Colors.secondary.deepTeal,
            textDecorationLine: 'underline',
          }}
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
      style={FormsStyle.sectionBottom}
    >
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
          onSubmit={handleCreateForageQualityCensus}
          loadingState={loading}
          goBack={navigation.goBack}
        />
      </View>
    </View>
  </View >;
};

export default StacPage;
