import React, { useState } from 'react';
import { Image, ScrollView, View, SafeAreaView, Text } from 'react-native';
import useAppSelector from '../../../hooks/useAppSelector';
import { DAYS_OF_WEEK } from '../../../utils/constants';
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
import OuterSunImage from '../../../assets/outer_sun.svg';
import InnerSunImage from '../../../assets/inner_sun.svg';
import DashboardCowOneImage from '../../../assets/dashboard_cow_one.svg';
import DashboardCowTwoImage from '../../../assets/dashboard_cow_two.svg';
import DashboardHillImage from '../../../assets/dashboard_hill.svg';
import DashboardBackgroundImage from '../../../assets/dashboard_background.svg';
import DashboardGrassImage from '../../../assets/dashboard_grass.svg';

const FrontPage = () => {
  const { allPlots } = useAppSelector((state) => state.plots);
  const { name } = useAppSelector((state) => state.auth);
  const selectedHerd: IHerd = useAppSelector((state) => state.herds.selectedHerd);
  const latestCowCensus: ICowCensus = useAppSelector((state) => state.cowCensuses.indices.latest);
  const latestDungCensus: IDungCensus = useAppSelector((state) => state.dungCensuses.indices.latest);
  const forageQualityByPlot: Record<string, IForageQualityCensus[]> = useAppSelector((state) => state.forageQuality.byPlot);
  const forageQuantityByPlot: Record<string, IForageQuantityCensus[]> = useAppSelector((state) => state.forageQuantity.byPlot);

  const [isOpenGraph, setIsOpenGraph] = useState<boolean>(false);

  return (
    <SafeAreaView style={[GlobalStyle.container, { backgroundColor: Colors.secondary.white }]}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <View style={DashboardStyle.sectionWelcome}>
          <Text style={DashboardStyle.title}>Welcome, {name}</Text>
          <View style={DashboardStyle.subSectionDate}>
            <Text style={DashboardStyle.date}>
              {DAYS_OF_WEEK[new Date().getDay()]}, {new Date().getMonth() + 1}/{new Date().getDate()}
            </Text>
          </View>
        </View>
        <View style={DashboardStyle.outerSunView}>
          <OuterSunImage />
        </View>
        <View style={DashboardStyle.innerSunView}>
          <InnerSunImage />
        </View>
        <View style={DashboardStyle.backgroundHillView}>
          <DashboardHillImage />
        </View>
        <DashboardBackgroundImage style={DashboardStyle.backgroundDashboard} />
        <View style={{
          paddingBottom: 70,
        }}>
          <Text style={DashboardStyle.subtitle}>Your Ranch</Text>

          <View style={DashboardStyle.section}>
            <Text style={DashboardStyle.sectionTitle}>Critical Period Countdown</Text>

            <View style={DashboardStyle.critPeriodLayout}>
              {/* Cow Image */}
              <DashboardCowOneImage />
              <View>
                <Text style={DashboardStyle.critDays}>{diffDays(new Date(selectedHerd.calvingDate), new Date())} days</Text>
                <Text style={DashboardStyle.critText}>to calving</Text>
              </View>
            </View>

            <View style={DashboardStyle.critPeriodLayout}>
              {/* Cow Image */}
              <DashboardCowTwoImage />
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
        <View style={DashboardStyle.backgroundGrassView}>
          <DashboardGrassImage />
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
