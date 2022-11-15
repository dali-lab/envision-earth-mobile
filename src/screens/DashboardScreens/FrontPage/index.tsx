import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View, SafeAreaView, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import AppButton from '../../../components/AppButton';
import NavType from '../../../utils/NavType';
import { ROUTES, DAYS_OF_WEEK } from '../../../utils/constants';
import { getTeamByUserId } from '../../../redux/slices/teamsSlice';
import { getPlotsByTeamId } from '../../../redux/slices/plotsSlice';
import { getHerdByTeamId } from '../../../redux/slices/herdsSlice';
import { getCowCensusesByHerdId } from '../../../redux/slices/cowCensusSlice';
import { getDungCensusesByHerdId } from '../../../redux/slices/dungCensusSlice';
import { getForageQualityCensusesByPlotId } from '../../../redux/slices/forageQualityCensusSlice';
import { getForageQuantityCensusesByPlotId } from '../../../redux/slices/forageQuantityCensusSlice';
import { Colors, GlobalStyle } from '../../../styles';
import { LivestockStatusCard, PaddockStatusCard } from '../../../components/Dashboard';
import DashboardStyle from '../../../styles/pages/DashboardStyle';


const FrontPage = () => {
  const navigation = useNavigation<NavType>();
  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.auth); // userId
  const { selectedTeam } = useAppSelector((state) => state.teams);
  const { allPlots } = useAppSelector((state) => state.plots);
  const { selectedHerd } = useAppSelector((state) => state.herds);
  const { name } = useAppSelector((state) => state.auth);

  const [isOpenGraph, setIsOpenGraph] = useState<boolean>(false);

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
  useEffect(() => {
    if (allPlots) {
      Object.keys(allPlots).forEach((plotId: string) => {
        dispatch(getForageQuantityCensusesByPlotId({ plotId }));
      });
    }
  }, [allPlots]);

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <View style={DashboardStyle.sectionWelcome}>
          <Text style={DashboardStyle.title}>Welcome, {name}</Text>
          <Text style={DashboardStyle.date}>
            {DAYS_OF_WEEK[new Date().getDay()]}, {new Date().getMonth() + 1}/{new Date().getDate()}
          </Text>
        </View>

        <View>
          <Text style={DashboardStyle.subtitle}>Your Ranch</Text>

          <View style={DashboardStyle.section}>
            <Text style={DashboardStyle.sectionTitle}>Critical Period Countdown</Text>

            <View style={DashboardStyle.critPeriodLayout}>
              {/* Cow Image */}
              <Image source={require('../../../assets/cow1.png')} />
              <View>
                <Text style={DashboardStyle.critDays}>{} days</Text>
                <Text style={DashboardStyle.critText}>to calving</Text>
              </View>
            </View>

            <View style={DashboardStyle.critPeriodLayout}>
              {/* Cow Image */}
              <Image source={require('../../../assets/cow2.png')} />
              <View>
                <Text style={DashboardStyle.critDays}>{} days</Text>
                <Text style={DashboardStyle.critText}>to breeding</Text>
              </View>
            </View>
          </View>

          <View style={DashboardStyle.section}>
            <Text style={DashboardStyle.sectionTitle}>Livestock status</Text>

            <View>
              <LivestockStatusCard
                type='bcs'
                score={5}
              />
              <LivestockStatusCard
                type='dung'
                score={0}
              />
            </View>

            <Text
              onPress={() => setIsOpenGraph(val => !val)}
              style={DashboardStyle.livestockNutriToggle}
            >See Nutrition Graph</Text>
            {isOpenGraph && <View>
              <Image
                source={require('../../../assets/NutritionGraph.png')}
                style={{ marginTop: 20 }}
              />
              <Text
                style={[
                  DashboardStyle.livestockNutriText,
                  { paddingVertical: 10 },
                ]}
              >
                Key Reminders
              </Text>
              <View style={DashboardStyle.livestockNutriContainer}>
                <Text style={DashboardStyle.livestockNutriText}>Reach BCS 5 by calving time</Text>
                <Text style={DashboardStyle.livestockNutriText}>Then BCS can fall to 3 by breeding</Text>
                <Text style={DashboardStyle.livestockNutriText}>Rising plane of nutrition at breeding</Text>
              </View>
            </View>}
          </View>
        </View>

        <View style={DashboardStyle.sectionPaddockStatus}>
          <Text style={DashboardStyle.paddockStatusTitle}>Paddock Status</Text>
          <ScrollView
            horizontal={true}
            contentContainerStyle={DashboardStyle.cardLayout}
          >
            {
              allPlots && (
                Object.keys(allPlots).map((plotId, idx) => {
                  return (
                    <PaddockStatusCard
                      key={idx}
                      title={allPlots[plotId].name}
                      forage={-404} // TBD
                      days={-404} // TBD
                    />
                  );
                })
              )
            }
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default FrontPage;
