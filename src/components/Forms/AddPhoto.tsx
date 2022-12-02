import { useState } from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements';
import AppButton from '../AppButton';
import { Colors, GlobalStyle } from '../../styles';
import UploadImage, { IPhotoInput } from '../../components/UploadImage';

const AddPhotoButton = (props: {
  image: IPhotoInput | undefined
  setImage: React.Dispatch<React.SetStateAction<IPhotoInput | undefined>>
}) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return <View>
    <AppButton
      onPress={() => setShowOverlay(val => !val)}
      title={'take photo'}
      backgroundColor={Colors.primary.lightGreen}
      textColor={Colors.primary.deepGreen}
      width={215}
      height={44}
    />

    <Overlay
      isVisible={showOverlay}
      onBackdropPress={() => setShowOverlay(val => !val)}
      overlayStyle={GlobalStyle.overlayModal}
    >
      <UploadImage
        image={props.image}
        setImage={props.setImage as React.Dispatch<React.SetStateAction<IPhotoInput>>}
      />
      <AppButton
        onPress={() => setShowOverlay(val => !val)}
        title={'ok'}
        backgroundColor={Colors.primary.deepGreen}
        textColor={Colors.secondary.white}
        width={215}
        height={51}
      />
    </Overlay>
  </View>;
};

export default AddPhotoButton;
