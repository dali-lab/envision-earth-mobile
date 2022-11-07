import React from 'react';
import { ScrollView, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { IPlot, setSelectedPlotId } from '../../../redux/slices/plotsSlice';
import PaddockEntry from '../../../components/Entries/PaddockEntry';
import NavType from '../../../utils/NavType';
import GlobalStyle from '../../../utils/styles/GlobalStyle';
import TextStyles from '../../../utils/styles/TextStyles';
import Colors from '../../../utils/styles/Colors';
import { ROUTES } from '../../../utils/constants';

const PaddockPage = () => {
  const dispatch = useAppDispatch();

  const allPlots: Record<string, IPlot> = useAppSelector((state) => state.plots.allPlots);

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
            Logs By Paddock
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaddockPage;