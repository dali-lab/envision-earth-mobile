import React from 'react';
import { Dimensions, ScrollView, SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { ICowCensus } from '../../../redux/slices/cowCensusSlice';
import { IDungCensus } from '../../../redux/slices/dungCensusSlice';
import { IForageQualityCensus } from '../../../redux/slices/forageQualityCensusSlice';
import { IForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import NavType from '../../../utils/NavType';
import LogEntry from '../../../components/Entries/LogEntry';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';
import average from '../../../utils/average';
import AnalyticsGrassImage from '../../../assets/analytics_grass.svg';

const SelectedPaddockPage = () => {
  const dispatch = useAppDispatch();
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const selectedPlotId: string = useAppSelector((state) => state.plots.selectedPlotId);
  const allCowCensuses: Record<string, ICowCensus> = useAppSelector((state) => state.cowCensuses.all);
  const allDungCensuses: Record<string, IDungCensus> = useAppSelector((state) => state.dungCensuses.all);
  const allForageQualityCensuses: Record<string, IForageQualityCensus> = useAppSelector((state) => state.forageQuality.all);
  const allForageQuantityCensuses: Record<string, IForageQuantityCensus> = useAppSelector((state) => state.forageQuantity.all);

  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={[GlobalStyle.container, { backgroundColor: Colors.secondary.white }]}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 40,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              paddingLeft: 20,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.primary.lightOrange,
                borderRadius: 10,
              }}
            >
              <AntDesign
                name='left'
                size={32}
                onPress={() => {
                  navigation.goBack();
                }}
                color={Colors.primary.mainOrange}
              />
            </View>
          </View>
          <Text
            style={[TextStyles.title, { color: Colors.primary.mainOrange }]}
          >
            {allPlots[selectedPlotId].name}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}
          >
          </View>
        </View>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 45,
          }}
        >
          <AnalyticsGrassImage />
        </View>
        <View
          style={{
            backgroundColor: Colors.primary.lightGreen,
            width: Dimensions.get('window').width,
            minHeight: 0.75 * Dimensions.get('window').height,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 40,
          }}
        >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[TextStyles.subHeading, { paddingTop: 10, paddingBottom: 10 }]}>
              BCS Scores
            </Text>
            <View style={GlobalStyle.horizontalLine} />
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                Object.keys(allCowCensuses).map((id, idx) => {
                  if (selectedPlotId === allCowCensuses[id].plotId) {
                    return (
                      <View
                        key={idx}
                        style={{
                          padding: 5,
                        }}
                      >
                        <LogEntry
                          date={allCowCensuses[id].updatedAt}
                          value={average(allCowCensuses[id].bcs).toFixed(2)}
                          plotName={allPlots[selectedPlotId].name}
                        />
                      </View>
                    );
                  }
                })
              }
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[TextStyles.subHeading, { paddingTop: 10, paddingBottom: 10 }]}>
              Dung Condition
            </Text>
            <View style={GlobalStyle.horizontalLine} />
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                Object.keys(allDungCensuses).map((id, idx) => {
                  if (selectedPlotId === allDungCensuses[id].plotId) {
                    return (
                      <View
                        key={idx}
                        style={{
                          padding: 5,
                        }}
                      >
                        <LogEntry
                          date={allDungCensuses[id].updatedAt}
                          value={average(allDungCensuses[id].ratings).toFixed(2)}
                          plotName={allPlots[selectedPlotId].name}
                        />
                      </View>
                    );
                  }
                })
              }
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[TextStyles.subHeading, { paddingTop: 10, paddingBottom: 10 }]}>
              Forage Quality Census
            </Text>
            <View style={GlobalStyle.horizontalLine} />
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                Object.keys(allForageQualityCensuses).map((id, idx) => {
                  if (selectedPlotId === allForageQualityCensuses[id].plotId) {
                    return (
                      <View
                        key={idx}
                        style={{
                          padding: 5,
                        }}
                      >
                        <LogEntry
                          date={allForageQualityCensuses[id].updatedAt}
                          value={allForageQualityCensuses[id].rating}
                          plotName={allPlots[selectedPlotId].name}
                        />
                      </View>
                    );
                  }
                })
              }
            </View>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[TextStyles.subHeading, { paddingTop: 10, paddingBottom: 10 }]}>
              Forage Quantity Census
            </Text>
            <View style={GlobalStyle.horizontalLine} />
            <View style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {
                Object.keys(allForageQuantityCensuses).map((id, idx) => {
                  if (selectedPlotId === allForageQuantityCensuses[id].plotId) {
                    return (
                      <View
                        key={idx}
                        style={{
                          padding: 5,
                        }}
                      >
                        <LogEntry
                          date={allForageQuantityCensuses[id].updatedAt}
                          value={allForageQuantityCensuses[id].sda}
                          plotName={allPlots[selectedPlotId].name}
                        />
                      </View>
                    );
                  }
                })
              }
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectedPaddockPage;
