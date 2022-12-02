import { View, Text } from 'react-native';
import AppButton from '../AppButton';
import { Colors, GlobalStyle, TextStyles } from '../../styles';
import { Overlay } from 'react-native-elements';
import { useState } from 'react';

const SubmitButton = (props: {
  onSubmit: () => Promise<void> | void,
  loadingState: boolean,
  goBack: () => void,
}) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return <View>
    <AppButton
      onPress={props.onSubmit}
      title={'submit'}
      backgroundColor={Colors.primary.deepGreen}
      textColor={Colors.secondary.white}
      width={215}
      height={51}
      disabled={props.loadingState}
    />

    <Overlay
      isVisible={showOverlay}
      onBackdropPress={() => setShowOverlay((val) => !val)}
      overlayStyle={GlobalStyle.overlayModal}
    >
      <View style={{ alignItems: 'center' }}>
        <Text style={[TextStyles.title, {
          minWidth: 100,
          textAlign: 'center',
          color: Colors.secondary.deepTeal,
        }]}>Data Recorded!</Text>
        <AppButton
          onPress={() => setShowOverlay((val) => !val)}
          title={'Log new data'}
          backgroundColor={Colors.primary.lightOrange}
          textColor={Colors.primary.mainOrange}
          width={215}
          height={51}
        />
        <AppButton
          onPress={() => {
            setShowOverlay((val) => !val);
            props.goBack();
          }}
          title={'See my dashboard'}
          backgroundColor={Colors.primary.lightOrange}
          textColor={Colors.primary.mainOrange}
          width={215}
          height={51}
        />
      </View>
    </Overlay>
  </View>;
};

export default SubmitButton;
