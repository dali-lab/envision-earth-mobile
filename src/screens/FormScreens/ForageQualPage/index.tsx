import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
} from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
<<<<<<< HEAD
import { createForageQualityCensus, locallyCreateForageQualityCensus } from '../../../redux/slices/forageQualityCensusSlice';
import { AppButton, AppTextInput } from '../../../components';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
=======
import { createForageQualityCensus } from '../../../redux/slices/forageQualityCensusSlice';
import {
  AddPhotoButton,
  AddNotesButton,
  SubmitButton,
  PaddockDropdown,
  FormHeader,
} from '../../../components';
import { IPhotoInput } from '../../../components/UploadImage';
>>>>>>> d3ce8b92802746b510b456f0226f5e3a5e1a89c3
import { IPlot } from '../../../redux/slices/plotsSlice';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, Colors, DropdownStyle } from '../../../styles';
import FormGrassImage from '../../../assets/form_grass.svg';
import StockForageQualityOne from '../../../assets/fqual_stock_1.svg';
import StockForageQualityFive from '../../../assets/fqual_stock_5.svg';
import StockForageQualityNine from '../../../assets/fqual_stock_9.svg';

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

  const [rating, setRating] = useState<number>(5);

  const [image, setImage] = useState<IPhotoInput>();

  const [notes, setNotes] = useState<string>('');

  const [submitOverlay, setSubmitOverlay] = useState<boolean>(false);

  const handleCreateForageQualityCensus = async () => {
    if (loading) {
      return;
    }

    if (!selectedHerd) {
      alert('Error: no selected herd');
      return;
    } if (!allPlots[selectedPlotId]?.id) {
      alert('Error: no selected plot');
<<<<<<< HEAD
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
      } else {
        dispatch(locallyCreateForageQualityCensus({
          plotId: allPlots[selectedPlotId]?.id as string,
          rating,
          notes: (notes + ' '),
          photo: image,
        }));
      }
=======
      return;
    }

    // Success condition
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
>>>>>>> d3ce8b92802746b510b456f0226f5e3a5e1a89c3
    }
  };

  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={[GlobalStyle.container, { backgroundColor: Colors.secondary.white }]}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <FormHeader
          title='Forage Quality'
          nav={navigation}
        />

        <PaddockDropdown
          data={plotData}
          plotId={selectedPlotId}
          setPlotId={setSelectedPlotId}
        />

        <Text style={[TextStyles.subHeading, { minWidth: 100, textAlign: 'center' }]}>Rate Forage: {rating}</Text>
        <Slider
          style={GlobalStyle.slider}
          minimumValue={1}
          maximumValue={9}
          onValueChange={(val) => setRating(val)}
          step={1}
          value={rating}
        />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForageQualPage;
