import React from 'react';
import { Text, View } from 'react-native';
import useAppSelector from '../../../hooks/useAppSelector';
import { IPlot } from '../../../redux/slices/plotsSlice';
import { ICowCensus } from '../../../redux/slices/cowCensusSlice';
import { IDungCensus } from '../../../redux/slices/dungCensusSlice';
import { IForageQualityCensus } from '../../../redux/slices/forageQualityCensusSlice';
import { IForageQuantityCensus } from '../../../redux/slices/forageQuantityCensusSlice';
import LogEntry from '../../../components/Entries/LogEntry';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';
import average from '../../../utils/average';

const FormPage = () => {
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const allCowCensuses: Record<string, ICowCensus> = useAppSelector((state) => state.cowCensuses.all);
  const allDungCensuses: Record<string, IDungCensus> = useAppSelector((state) => state.dungCensuses.all);
  const allForageQualityCensuses: Record<string, IForageQualityCensus> = useAppSelector((state) => state.forageQuality.all);
  const allForageQuantityCensuses: Record<string, IForageQuantityCensus> = useAppSelector((state) => state.forageQuantity.all);

  return (
    <>
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
                  />
                </View>
              );
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
                  />
                </View>
              );
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
                  />
                </View>
              );
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
                  />
                </View>
              );
            })
          }
        </View>
      </View>
    </>
  );
};

export default FormPage;