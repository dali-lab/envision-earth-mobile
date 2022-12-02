import React, { useEffect, useState, useCallback } from 'react';
import { Text, View } from 'react-native';
import { useIsConnected } from 'react-native-offline';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import { loadData, uploadCensusData, setIsDataLoaded } from '../../redux/slices/syncSlice';

const LoadRefresh = () => {
  const dispatch = useAppDispatch();
  const userId: string = useAppSelector((state) => state.auth.id); // userId
  const isDataLoaded: boolean = useAppSelector((state) => state.sync.isDataLoaded);
  
  const isWifi = useIsConnected();
  const {
    _persist: { rehydrated },
  } = useAppSelector((state) => state);

  const [censusRefreshed, setCensusRefreshed] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isWifi) {
      setCensusRefreshed(false);
      setIsDataLoaded(false);
    }
  }, [isWifi]);

  const loadCensusData = useCallback(async () => {
    if (!isWifi && rehydrated && userId) return;
    setIsDataLoaded(true);
    await dispatch(loadData(userId));
  }, [isWifi, rehydrated, userId, setIsDataLoaded]);
  useEffect(() => {
    try {
      if (!isDataLoaded) {
        loadCensusData();
      }
    } catch (err) {
      alert(
        'Unable to load data. If your connection is reliable, this is likely due to a server error.',
      );
    }
  }, [loadCensusData, isDataLoaded]);

  const refreshCensusData = useCallback(async () => {
    if (!isWifi) return;
    await dispatch(uploadCensusData());
    setCensusRefreshed(true);
  }, [ setCensusRefreshed ]);
  useEffect(() => {
    try {
      if (!censusRefreshed) refreshCensusData();
    } catch (err) {
      alert(
        'Unable to upload census data. If your connection is reliable, this is likely due to a server error.',
      );
    }
  }, [refreshCensusData, censusRefreshed]);

  return (
    <View>
      {
        !isDataLoaded && <Text>Loading...</Text>
      }
    </View>
  );
};

export default LoadRefresh;
