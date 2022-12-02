import { useState } from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements';
import AppButton from '../AppButton';
import { Colors, GlobalStyle } from '../../styles';
import AppTextInput from '../AppTextInput';

const AddNotesButton = (props: {
  notes: string,
  setNotes: (value: React.SetStateAction<string>) => void,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return <View>
    <AppButton
      onPress={() => setShowOverlay(val => !val)}
      title={'add note'}
      backgroundColor={Colors.primary.lightOrange}
      textColor={Colors.primary.mainOrange}
      width={215}
      height={44}
    />
    <Overlay
      isVisible={showOverlay}
      onBackdropPress={() => setShowOverlay(val => !val)}
      overlayStyle={GlobalStyle.overlayModal}
    >
      <AppTextInput
        onChangeText={(text) => props.setNotes(text)}
        value={props.notes}
        placeholder='Notes'
        multiline={true}
        width={250}
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

export default AddNotesButton;
