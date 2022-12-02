import React, { useState } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createDungCensus } from '../../../redux/slices/dungCensusSlice';
import { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import DungEntry from '../../../components/Entries/DungEntry';
import NavType from '../../../utils/NavType';
import { FormsStyle, GlobalStyle } from '../../../styles';
import { AddEntryButton, AddNotesButton, AddPhotoButton, FormHeader, PaddockDropdown, SubmitButton } from '../../../components/Forms';

const DungPage = () => {
  const isWifi = useIsConnected();
  const dispatch = useAppDispatch();

  const { selectedHerd } = useAppSelector((state) => state.herds);
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const loading: boolean = useAppSelector((state) => state.dungCensuses.loading);

  // TODO: Need to update this?
  const plotData = Object.keys(allPlots).map((plotId: string) => ({
    label: allPlots[plotId].name,
    data: plotId,
  }));
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');

  const [dungArr, setDungArr] = useState<number[]>([0]);
  const handleAddDung = () => {
    const newArr: number[] = [...dungArr];
    newArr.push(0); // default value does not matter
    setDungArr(newArr);
  };
  const handleEditDung = (value: number, index: number) => {
    const newArr: number[] = [...dungArr];
    newArr[index] = value;
    setDungArr(newArr);
  };
  const handleDeleteDung = (index: number) => {
    const newArr: number[] = [...dungArr];
    newArr.splice(index, 1);
    setDungArr(newArr);
  };

  const [image, setImage] = useState<IPhotoInput>();

  // TODO: Add tag

  const [notes, setNotes] = useState<string>('');

  // TODO: fix this so that submitting the form correctly sets this state
  // (currently handed off to the submit button/overlay component)
  const [submitOverlay, setSubmitOverlay] = useState<boolean>(false);

  const handleCreateDungCensus = async () => {
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
    if (!dungArr) {
      alert('Error: no dung arr');
      return;
    }
    if (dungArr.length < 1) {
      alert('Error: no elements in dung arr');
      return;
    }

    // Success condition
    if (isWifi) {
      await dispatch(createDungCensus({
        herdId: selectedHerd?.id as string,
        plotId: allPlots[selectedPlotId]?.id as string,
        ratings: dungArr,
        notes: (notes + ' '),
        photo: image,
      })).then((res) => {
        if (res.payload) {
          setSubmitOverlay(true);
        }
      });
    }
  };

  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <FormHeader
          title="Dung Condition"
          nav={navigation}
        />

        <View style={FormsStyle.sectionTop}>
          <PaddockDropdown
            data={plotData}
            plotId={selectedPlotId}
            setPlotId={setSelectedPlotId}
          />
        </View>

        <View style={FormsStyle.sectionBottom}>
          {
            dungArr.map((rating, index) => (
              <View
                key={index}
              >
                <DungEntry
                  rating={rating}
                  onDungEdit={(value) => handleEditDung(value, index)}
                  onDungDelete={() => handleDeleteDung(index)}
                />
              </View>
            ))
          }
          <AddEntryButton
            onPress={handleAddDung}
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
              onSubmit={handleCreateDungCensus}
              loadingState={loading}
              goBack={navigation.goBack}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DungPage;
