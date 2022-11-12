import React, { useEffect } from 'react';
import { Image, ScrollView, View, SafeAreaView, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { logout } from '../../../redux/slices/authSlice';
import AppButton from '../../../components/AppButton';
import NavType from '../../../utils/NavType';
import { ROUTES, DAYS_OF_WEEK } from '../../../utils/constants';
import LogoImage from '../../../assets/dali_dark.png';
import { getTeamByUserId } from '../../../redux/slices/teamsSlice';
import { getPlotsByTeamId } from '../../../redux/slices/plotsSlice';
import { getHerdByTeamId } from '../../../redux/slices/herdsSlice';
import { getCowCensusesByHerdId } from '../../../redux/slices/cowCensusSlice';
import { getDungCensusesByHerdId } from '../../../redux/slices/dungCensusSlice';
import { getForageQualityCensusesByPlotId } from '../../../redux/slices/forageQualityCensusSlice';
import { GlobalStyle, TextStyles } from '../../../utils/styles';

const FrontPage = () => {
  const navigation = useNavigation<NavType>();
  const dispatch = useAppDispatch();

  const { id } = useAppSelector((state) => state.auth); // userId
  const { selectedTeam } = useAppSelector((state) => state.teams);
  const { allPlots } = useAppSelector((state) => state.plots);
  const { selectedHerd } = useAppSelector((state) => state.herds);
  const { name } = useAppSelector((state) => state.auth);

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

  // TODO: Move these card components to a separate file
  const LivestockStatusMessages = {
    dung: {
      low: 'score too low',
      medium: 'score just right, keep it up!',
      high: 'score too high',
    },
    bcs: {
      low: 'score too low, see recommended nutrient cycle',
      medlow: 'score average, increase for optimal BCS',
      medium: 'optimal BCS score, keep it up!',
      medhigh: 'score approaching too high, see recommended cycle',
      high: 'score too high, see recommended nutrient cycle',
    },
  };
  const LivestockStatusCard = (props: {
    type: 'dung' | 'bcs',
    score: number,
  }) => {
    const title = props.type === 'dung' ? 'Dung' : 'BCS';
    let message: string;
    if (props.type === 'dung') {
      const scoreInterval =
        props.score < -0.5 ? 'low' :
          props.score > 0.5 ? 'high' :
            'medium';
      message = LivestockStatusMessages.dung[scoreInterval];
    } else {
      const scoreInterval =
        props.score < 4 ? 'low' :
          props.score == 4 ? 'medlow' :
            props.score == 5 ? 'medium' :
              props.score == 6 ? 'medhigh' :
                'high';
      message = LivestockStatusMessages.bcs[scoreInterval];
    }

    return <View>
      <Text>{title}:</Text>
      <Text>{props.score}</Text>
      <Text>{message}</Text>
    </View>;
  };

  const PaddockStatusCard = (props: {
    title: string,
    days: number,
    forage: number,
  }) => {
    return <View>
      <Text>{props.title}</Text>
      <View>

        <View>
          <Text>{props.days}</Text>
          <Text>days grazing/acre</Text>
        </View>

        <View>
          <Text>{props.forage}</Text>
          <Text>forage quality</Text>
        </View>

      </View>
    </View>;
  };

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <View>
          <Text>Welcome, {name}</Text>
          <Text>{DAYS_OF_WEEK[new Date().getDay()]}, {new Date().getMonth() + 1}/{new Date().getDate()}</Text>
        </View>

        <View>
          <Text>Your Ranch</Text>

          <View>
            <Text>Critical Period Countdown</Text>

            <View>
              {/* Cow Image */}

              <View>
                <Text>{} days</Text>
                <Text>to calving</Text>
              </View>
            </View>

            <View>
              {/* Cow Image */}

              <View>
                <Text>{} days</Text>
                <Text>to breeding</Text>
              </View>
            </View>
          </View>

          <View>
            <Text>Livestock status</Text>

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
          </View>
        </View>

        <View>
          <Text>Paddock Status</Text>

          <ScrollView>
            {
              ['West Field', 'DALI Paddock', 'Appa Poddock', 'Momo Poddock'].map(
                (paddock: string) =>
                  <PaddockStatusCard
                    title={paddock}
                    forage={4}
                    days={69}
                  />,
              )
            }

          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default FrontPage;
