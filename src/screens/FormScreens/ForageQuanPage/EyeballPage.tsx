import React, { useState, Dispatch, SetStateAction } from 'react';
import { ScrollView, SafeAreaView, View, Text, TextInput } from 'react-native';
import { Overlay } from 'react-native-elements';
import { useIsConnected } from 'react-native-offline';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import { AddNotesButton, AddPhotoButton, AppButton, AppTextInput, PaddockDropdown, SubmitButton } from '../../../components';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';


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
  );
};

export default EyeballPage;
