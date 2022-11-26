import { AppButton } from '../../../../components';
import { View, Text } from 'react-native';
import { RanchRoleData } from '../pageData';

const RanchRolePage = (props: {
  onSubmit: (data: RanchRoleData) => void,
}) => {
  const onPressOwner = () => {
    props.onSubmit({ role: 'owner' });
  };

  const onPressCollaborator = () => {
    props.onSubmit({ role: 'collaborator' });
  };

  return <View>
    <Text>are you a...</Text>
    <AppButton
      title='ranch owner'
      onPress={onPressOwner}
    />
    <AppButton
      title='ranch collaborator'
      onPress={onPressCollaborator}
    />
  </View>;
};

export default RanchRolePage;
