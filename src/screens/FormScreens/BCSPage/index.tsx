import React, { useState, ReactNode } from 'react';
import { ScrollView, SafeAreaView, View, Text, Dimensions, Image } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createCowCensus, locallyCreateCowCensus } from '../../../redux/slices/cowCensusSlice';
import Accordion from '../../../components/Accordion';
import ScrollPick from '../../../components/ScrollPick';
import { IPhotoInput } from '../../../components/UploadImage';
import { IPlot } from '../../../redux/slices/plotsSlice';
import BCSEntry from '../../../components/Entries/BCSEntry';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, BCSStyle, FormsStyle } from '../../../styles';
import { BCS_TEXT, IBCSText } from '../../../utils/sampleInfo/BCSInfo/BCSText';
import { FormHeader, PaddockDropdown, AddPhotoButton, AddNotesButton, SubmitButton, AddEntryButton } from '../../../components/Forms';

const BCSIdentifierContainer = (props: {
  title: string,
  points: string[],
}) => {
  return <View style={BCSStyle.identifierContainer}>
    <Text style={BCSStyle.identifierTitle}>{props.title}</Text>
    <View style={BCSStyle.identifierHorizContainer}>
      <Image
        source={require('../../../assets/bcs_identifier.png')}
        style={BCSStyle.identifierPicture}
      />
      <View style={BCSStyle.identifierListContainer}>
        {props.points.map(point => <Text style={BCSStyle.identifierListItem}>{point}</Text>)}
      </View>
    </View>
  </View>;
};

const BCSPage = () => {
  const isWifi = useIsConnected();
  const dispatch = useAppDispatch();

  const { selectedHerd } = useAppSelector((state) => state.herds);
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const loading: boolean = useAppSelector((state) => state.cowCensuses.loading);

  // TODO: Need to update this?
  const plotData = Object.keys(allPlots).map((plotId: string) => ({
    label: allPlots[plotId].name,
    data: plotId,
  }));
  const [selectedPlotId, setSelectedPlotId] = useState<string>('');

  const bcsDisplayElements: Array<ReactNode> = BCS_TEXT.map((e: IBCSText) => <Image
    key={e.val}
    style={{
      width: Dimensions.get('window').width * (2 / 7),
      height: Dimensions.get('window').width * (2 / 7),
    }}
    source={{ uri: e.imageUri }}
  />,
  );

  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const [bcsArr, setBcsArr] = useState<number[]>([5]);
  const handleAddBcs = () => {
    const newArr: number[] = [...bcsArr];
    newArr.push(5); // default value does not matter
    setBcsArr(newArr);
  };
  const handleEditBcs = (value: number, index: number) => {
    const newArr: number[] = [...bcsArr];
    newArr[index] = value;
    setBcsArr(newArr);
  };
  const handleDeleteBcs = (index: number) => {
    const newArr: number[] = [...bcsArr];
    newArr.splice(index, 1);
    setBcsArr(newArr);
  };

  const [image, setImage] = useState<IPhotoInput>();

  const [tag, setTag] = useState<string>(''); // TODO: New implementation for tag

  const [notes, setNotes] = useState<string>('');

  // TODO: fix this so that submitting the form correctly sets this state
  // (currently handed off to the submit button/overlay component)
  const [submitOverlay, setSubmitOverlay] = useState<boolean>(false);

  const handleCreateCowCensus = async () => {
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
    if (!bcsArr) {
      alert('Error: no BCS entries');
      return;
    }
    if (bcsArr.length < 1) {
      alert('Error: no BCS entries');
      return;
    }

    // Success condition
    const payload = {
      herdId: selectedHerd?.id as string,
      plotId: allPlots[selectedPlotId]?.id as string,
      bcs: bcsArr,
      notes: (notes + ' '),
      tag: (tag + ' '),
      photo: image,
    };
    if (isWifi) {
      await dispatch(createCowCensus(payload)).then((res) => {
        if (res.payload) {
          setSubmitOverlay(true);
        }
      });
    } else {
      dispatch(locallyCreateCowCensus(payload));
    }

  };

  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
        style={{
          width: Dimensions.get('window').width,
        }}
      >
        <FormHeader
          title="BCS"
          nav={navigation}
        />

        <View style={FormsStyle.sectionTop}>
          <PaddockDropdown
            data={plotData}
            plotId={selectedPlotId}
            setPlotId={setSelectedPlotId}
          />
          <ScrollPick
            elements={bcsDisplayElements}
            selectedIdx={selectedIdx}
            setSelectedIdx={setSelectedIdx}
            offsetWidth={Dimensions.get('window').width * (2 / 7)}
          />

          <Text style={BCSStyle.identifiersLabel}>
            See identifiers
          </Text>

          <View>
            <Accordion
              title={'BCS ' + (selectedIdx + 1)}
            >
              {BCS_TEXT[selectedIdx].description === '' ||
                <Text style={[TextStyles.small, BCSStyle.identifierContainer, BCSStyle.identifierDesc]}>
                  {BCS_TEXT[selectedIdx].description}
                </Text>
              }
              <BCSIdentifierContainer
                title='Tail Setting'
                points={BCS_TEXT[selectedIdx].tail}
              />
              <BCSIdentifierContainer
                title='Ribs and Spine'
                points={BCS_TEXT[selectedIdx].ribs}
              />
              <BCSIdentifierContainer
                title='Shoulder'
                points={BCS_TEXT[selectedIdx].shoulder}
              />
              <BCSIdentifierContainer
                title='Brisket'
                points={BCS_TEXT[selectedIdx].brisket}
              />
            </Accordion>
          </View>
        </View>


        <View style={FormsStyle.sectionBottom}>
          {
            bcsArr.map((bcs, index) => (
              <BCSEntry
                bcs={bcs}
                onBCSEdit={(value) => handleEditBcs(value, index)}
                onBCSDelete={() => handleDeleteBcs(index)}
                key={'BCS entry ' + index.toString()}
              />
            ))
          }
          <AddEntryButton
            onPress={handleAddBcs}
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
              onSubmit={handleCreateCowCensus}
              loadingState={loading}
              goBack={navigation.goBack}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BCSPage;
