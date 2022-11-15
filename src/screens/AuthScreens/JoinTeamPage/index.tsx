// NEED TO CHANGE INPUTS/REDUX FOR RANCH

import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { createMembership } from '../../../redux/slices/membershipSlice';
import { getTeamByUserId } from '../../../redux/slices/teamsSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

const JoinTeamPage = () => {
  const dispatch = useAppDispatch();
  const { id } = useAppSelector((state) => state.auth);
  const [teamId, setTeamId] = useState<string>('ab98e8aee-0f7b-4ac8-9fd5-5bb982c0367d');

  const handleSubmit = async () => {
    // Send only if all fields filled in
    if (!teamId) alert('Please enter a ranch id!');
    else {
      await dispatch(createMembership({ teamId, userId: id })).then(() => {
        dispatch(getTeamByUserId({ userId: id }));
      });
    }
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <Text
        style={[
          TextStyles.title,
          { color: Colors.secondary.deepTeal, paddingBottom: 15 },
        ]}
      >
        Join Ranch
      </Text>
      <AppTextInput
        onChangeText={(text) => setTeamId(text)}
        value={teamId}
        placeholder='Type Ranch ID'
        width={331}
        height={59}
      />
      <AppButton
        onPress={handleSubmit}
        title={'Submit'}
        backgroundColor={Colors.primary.mainOrange}
        textColor={Colors.secondary.white}
        width={331}
        height={59}
      />
    </SafeAreaView>
  );
};

export default JoinTeamPage;
