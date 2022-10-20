import React, { useEffect } from 'react';
import { Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import AppButton from '../../../components/AppButton';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';
import LogoImage from '../../../assets/dali_dark.png';
import { getTeamByUserId } from '../../../redux/slices/teamsSlice';
import { getPlotsByTeamId } from '../../../redux/slices/plotsSlice';
import { getHerdByTeamId } from '../../../redux/slices/herdsSlice';
import { getCowCensusesByHerdId } from '../../../redux/slices/cowCensusSlice';
import { getDungCensusesByHerdId } from '../../../redux/slices/dungCensusSlice';
import { getForageQualityCensusesByPlotId } from '../../../redux/slices/forageQualityCensusSlice';
// import { loadTeamData } from '../../../redux/slices/syncSlice';

const FrontPage = () => {
  const navigation = useNavigation<NavType>();
  const dispatch = useAppDispatch();

  const { id }  = useAppSelector((state) => state.auth); // userId
  const { selectedTeam } = useAppSelector((state) => state.teams); 
  const { allPlots } = useAppSelector((state) => state.plots);
  const { selectedHerd } = useAppSelector((state) => state.herds);

  useEffect(() => {
    dispatch(getTeamByUserId({ userId: id }));
  }, []);
  useEffect(() => {
    if (selectedTeam) {
      dispatch(getHerdByTeamId({ teamId: selectedTeam?.id as string }));
    }
  }, [selectedTeam]);
  useEffect(() => {
    if (allPlots) {
      dispatch(getPlotsByTeamId({ teamId: selectedTeam?.id as string }));
    }
  }, [selectedTeam]);
  useEffect(() => {
    if (selectedHerd) {
      dispatch(getCowCensusesByHerdId({ herdId: selectedHerd?.id as string }));
    }
  }, [selectedHerd]);
  useEffect(() => {
    if (selectedHerd) {
      dispatch(getDungCensusesByHerdId({ herdId: selectedHerd?.id as string }));
    }
  }, [selectedHerd]);
  useEffect(() => {
    if (allPlots) {
      Object.keys(allPlots).forEach((plotId: string) => {
        dispatch(getForageQualityCensusesByPlotId({ plotId }));
      });
    }
  }, [allPlots]);

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView>
        <Image
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width * (3 / 7),
          }}
          source={{ uri: Image.resolveAssetSource(LogoImage).uri }}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.SIGNIN)}
          title={'Sign In'}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.SIGNUP)}
          title={'Sign Up'}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.VERIFY_USER)}
          title={'Verify'}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.USERS)}
          title={'Users (admin only)'}
          isArrow={true}
        />
        <AppButton
          onPress={() => navigation.navigate(ROUTES.RESOURCES)}
          title={'Resources (user or admin)'}
          isArrow={true}
        />
        <AppButton
          onPress={() => dispatch(logout({}))}
          title={'Logout'}
          isArrow={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default FrontPage;
