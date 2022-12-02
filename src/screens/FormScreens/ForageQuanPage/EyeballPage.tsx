import React, { useState } from 'react';
import { Dimensions, View, Text, TextInput } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createForageQuantityCensus, locallyCreateForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import { AddNotesButton, AddPhotoButton, AppButton, AppTextInput, PaddockDropdown, SubmitButton } from '../../../components';
import { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { GlobalStyle, TextStyles, Colors, DropdownStyle, FormsStyle } from '../../../styles';
import FormGrassImage from '../../../assets/form_grass.svg';
import { useNavigation } from '@react-navigation/native';

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

  const [rating, setRating] = useState<string>('0');

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
    }
    if (!allPlots[selectedPlotId]?.id) {
      alert('Error: no selected plot');
      return;
    }
    if (rating == '') {
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
    </View>

    <FormGrassImage />

    <View
      style={FormsStyle.sectionBottom}
    >
      <View
        style={{
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Colors.primary.deepGreen,
            paddingTop: 20,
            paddingBottom: 10,
            ...TextStyles.subHeading,
          }}
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
      </View>

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
          goBack={useNavigation().goBack}
        />
      </View>
    </View>
  </View>;
};

export default EyeballPage;
