import React, { useState, Dispatch, SetStateAction } from 'react';
import { ScrollView, SafeAreaView, View } from 'react-native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createCowCensus } from '../../../redux/slices/cowCensusSlice';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import AppButton from '../../../components/AppButton';
import AppTextInput from '../../../components/AppTextInput';
import ScrollPick from '../../../components/ScrollPick';
import UploadImage, { IPhotoInput } from '../../../components/UploadImage';

const BCSPage = () => {
  const { selectedHerd } = useAppSelector((state) => state.herds);
  const dispatch = useAppDispatch();

  const BCS_ELEMENTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [image, setImage] = useState<IPhotoInput>();
  const [tag, setTag] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const handleCreateCowCensus = async () => {
    // TODO: which fields are necessary, and which are optional?

    dispatch(createCowCensus({ 
      herdId: selectedHerd?.id as string,
      bcs: BCS_ELEMENTS[selectedIdx],
      notes,
      tag,
      photo: image,
    }));
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <ScrollPick
          elements={BCS_ELEMENTS}
          selectedIdx={selectedIdx}
          setSelectedIdx={setSelectedIdx}
        />
        <UploadImage
          image={image}
          setImage={setImage as Dispatch<SetStateAction<IPhotoInput>>}
        />
        <View style={GlobalStyle.innerContainer}>
          <AppTextInput
            onChangeText={(text) => setTag(text)}
            value={tag}
            placeholder='Tag'
          />
          <AppTextInput
            onChangeText={(text) => setNotes(text)}
            value={notes}
            placeholder='Notes'
          />
          <AppButton
            onPress={handleCreateCowCensus}
            title={'Create Cow Census'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BCSPage;