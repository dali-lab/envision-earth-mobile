import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View, SafeAreaView, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import AppButton from '../../../components/AppButton';
import NavType from '../../../utils/NavType';
import { ROUTES, DAYS_OF_WEEK } from '../../../utils/constants';
import { IHerd } from '../../../redux/slices/herdsSlice';
import { ICowCensus } from '../../../redux/slices/cowCensusSlice';
import { IDungCensus } from '../../../redux/slices/dungCensusSlice';
import { IForageQualityCensus } from '../../../redux/slices/forageQualityCensusSlice';
import { IForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import { Colors, GlobalStyle } from '../../../styles';
import { LivestockStatusCard, PaddockStatusCard } from '../../../components/Dashboard';
import DashboardStyle from '../../../styles/pages/DashboardStyle';
import average from '../../../utils/average';
import { diffDays } from '../../../utils/dateUtil';

const FrontPage = () => {
  const navigation = useNavigation<NavType>();
  const dispatch = useAppDispatch();

  const { allPlots } = useAppSelector((state) => state.plots);
  const { name } = useAppSelector((state) => state.auth);
  const selectedHerd: IHerd = useAppSelector((state) => state.herds.selectedHerd);
  const latestCowCensus: ICowCensus = useAppSelector((state) => state.cowCensuses.indices.latest);
  const latestDungCensus: IDungCensus = useAppSelector((state) => state.dungCensuses.indices.latest);
  const forageQualityByPlot: Record<string, IForageQualityCensus[]> = useAppSelector((state) => state.forageQuality.byPlot);
  const forageQuantityByPlot: Record<string, IForageQuantityCensus[]> = useAppSelector((state) => state.forageQuantity.byPlot);

  const [isOpenGraph, setIsOpenGraph] = useState<boolean>(false);

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
                <Text style={DashboardStyle.critDays}>{diffDays(new Date(selectedHerd.calvingDate), new Date())} days</Text>
                <Text style={DashboardStyle.critText}>to calving</Text>
              </View>
            </View>

            <View style={DashboardStyle.critPeriodLayout}>
              {/* Cow Image */}
              <Image source={require('../../../assets/cow2.png')} />
              <View>
                <Text style={DashboardStyle.critDays}>{diffDays(new Date(selectedHerd.breedingDate), new Date())} days</Text>
                <Text style={DashboardStyle.critText}>to breeding</Text>
              </View>
            </View>
          </View>

          <View style={DashboardStyle.section}>
            <Text style={DashboardStyle.sectionTitle}>Livestock status</Text>

            <View>
              <LivestockStatusCard
                type='bcs'
                score={average(latestCowCensus?.bcs)}
              />
              <LivestockStatusCard
                type='dung'
                score={+average(latestDungCensus?.ratings).toFixed(1)}
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
              allPlots && forageQualityByPlot && forageQuantityByPlot && (
                Object.keys(allPlots).map((plotId, idx) => {
                  return (
                    <PaddockStatusCard
                      key={idx}
                      title={allPlots[plotId].name}
                      forage={forageQualityByPlot[plotId] ? forageQualityByPlot[plotId][0].rating : 0}
                      days={forageQuantityByPlot[plotId] ? forageQuantityByPlot[plotId][0].sda : 0}
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
