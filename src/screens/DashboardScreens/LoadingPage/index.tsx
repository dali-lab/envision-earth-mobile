import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View, SafeAreaView, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import NavType from '../../../utils/NavType';
import { loadData } from '../../../redux/slices/syncSlice';
import { Colors, GlobalStyle } from '../../../styles';

const LoadingPage = () => {
  const dispatch = useAppDispatch();
  const userId: string = useAppSelector((state) => state.auth.id); // userId

  useEffect(() => {
    dispatch(loadData(userId));
  }, []);

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <ScrollView
        contentContainerStyle={GlobalStyle.contentContainerScroll}
      >
        <Text>Loading...</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoadingPage;
