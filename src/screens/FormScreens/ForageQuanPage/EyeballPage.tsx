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
import { AppButton, AppTextInput, PaddockSelector } from '../../../components';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';


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
            width: 310,
          }}
        >
          <PaddockSelector
            data={plotData}
            placeholder={!plotIdFocus ? plotName : '...'}
            value={selectedPlotId}
            focus={plotIdFocus}
            onFocus={() => setPlotIdFocus(true)}
            onBlur={() => setPlotIdFocus(false)}
            onChange={item => {
              setPlotName(item.label);
              setSelectedPlotId(item.data);
            }}
          />
        </View>
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
    </>
  );
};

export default StacPage;