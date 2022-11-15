import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { IPlot, setSelectedPlotId } from '../../../redux/slices/plotsSlice';
import PaddockEntry from '../../../components/Entries/PaddockEntry';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';
import { ROUTES } from '../../../utils/constants';

const PaddockPage = () => {
  const dispatch = useAppDispatch();
  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);
  const navigation = useNavigation<NavType>();

  return (
    <>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[TextStyles.subHeading, { paddingTop: 10, paddingBottom: 10 }]}>
          Paddocks
        </Text>
        <View style={GlobalStyle.horizontalLine} />
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {
            Object.keys(allPlots).map((id, idx) => {
              return (
                <TouchableOpacity
                  key={idx}
                  style={{
                    padding: 5,
                  }}
                  onPress={() => {
                    dispatch(setSelectedPlotId(id));
                    navigation.navigate(ROUTES.SELECTED_PADDOCK_PAGE);
                  }}
                >
                  <PaddockEntry
                    value={allPlots[id].name}
                  />
                </TouchableOpacity>
              );
            })
          }
        </View>
      </View>
    </>
  );
};

export default PaddockPage;