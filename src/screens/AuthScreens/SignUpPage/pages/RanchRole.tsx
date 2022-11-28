import { AppButton } from '../../../../components';
import { View, Text, Dimensions } from 'react-native';
import { RanchRole, RanchRoleData } from '../pageData';
import { Colors, signupPages, SignupStyle } from '../../../../styles';
import { useState } from 'react';

const RanchRolePage = (props: {
  onSubmit: (data: RanchRoleData) => void,
}) => {
  const [role, setRole] = useState<RanchRole>();

  const onPressSubmit = () => {
    if (role === undefined) {
      alert('Please select a role in the ranch');
      return;
    }
    props.onSubmit({ role });
  };

  return <View style={[SignupStyle.pageContainer, SignupStyle.pageContainerFlex]}>
    <Text style={[SignupStyle.title, signupPages.ranchrole.title]}>are you a...</Text>

    <View>
      <AppButton
        title='ranch owner'
        onPress={() => setRole('owner')}
        backgroundColor={
          role === 'owner' ? Colors.primary.mainOrange : Colors.secondary.white
        }
        textColor={
          role === 'owner' ? Colors.secondary.white : Colors.primary.mainOrange
        }
      />
      <AppButton
        title='ranch collaborator'
        onPress={() => setRole('collaborator')}
        backgroundColor={
          role === 'collaborator' ? Colors.primary.mainOrange : Colors.secondary.white
        }
        textColor={
          role === 'collaborator' ? Colors.secondary.white : Colors.primary.mainOrange
        }
      />
    </View>

    <AppButton
      onPress={onPressSubmit}
      title='next →'
      textColor={Colors.secondary.white}
      backgroundColor={Colors.primary.vibrantGreen}
      width={Dimensions.get('window').width * 0.3}
    />
  </View>;
};

export default RanchRolePage;
