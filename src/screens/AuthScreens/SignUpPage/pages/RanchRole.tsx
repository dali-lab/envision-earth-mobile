import { AppButton } from 'components';
import { View, Text } from 'react-native';

type RanchRole = 'owner' | 'collaborator';

const RanchRolePage = (props: {
  onSubmit: (role: RanchRole) => null,
}) => {
  const onPressOwner = () => {
    props.onSubmit('owner');
  };

  const onPressCollaborator = () => {
    props.onSubmit('collaborator');
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
