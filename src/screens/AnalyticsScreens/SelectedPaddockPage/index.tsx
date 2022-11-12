import React from 'react';
import { ScrollView, SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { ICowCensus } from '../../../redux/slices/cowCensusSlice';
import { IDungCensus } from '../../../redux/slices/dungCensusSlice';
import { IForageQualityCensus } from '../../../redux/slices/forageQualityCensusSlice';
import NavType from '../../../utils/NavType';
import LogEntry from '../../../components/Entries/LogEntry';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

function average(arr: number[]) {
  let sum = 0;
  arr.forEach((i) => {
    sum += i;
  });

  return sum / arr.length;
}

const SelectedPaddockPage = () => {
  const dispatch = useAppDispatch();
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const selectedPlotId: string = useAppSelector((state) => state.plots.selectedPlotId);
  const allCowCensuses: Record<string, ICowCensus> = useAppSelector((state) => state.cowCensuses.all);
  const allDungCensuses: Record<string, IDungCensus> = useAppSelector((state) => state.dungCensuses.all);
  const allForageQualityCensuses: Record<string, IForageQualityCensus> = useAppSelector((state) => state.forageQuality.all);

  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Ionicons
              name='ios-arrow-back'
              size={32}
              onPress={() => {
                navigation.goBack();
              }}
            />
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
                        value={average(allCowCensuses[id].bcs).toFixed(2)}
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
                        value={average(allDungCensuses[id].ratings).toFixed(2)}
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
                        value={allForageQualityCensuses[id].rating}
                      />
                    </View>
                  );
                }
              })
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectedPaddockPage;
