import React, { useState } from 'react';
import { Dimensions, ScrollView, SafeAreaView, View, Text, TouchableOpacity } from 'react-native';
import FormPage from './FormPage';
import PaddockPage from './PaddockPage';
import { AppButton } from '../../../components';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

const LogPage = () => {
  const [isByForm, setIsByForm] = useState<boolean>(true);

  return (
    <SafeAreaView style={[GlobalStyle.container, { backgroundColor: Colors.secondary.white }]}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={GlobalStyle.contentContainerScroll}
        style={{
          width: Dimensions.get('window').width,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={[TextStyles.title, { color: Colors.primary.mainOrange }]}
          >
            Review Old Logs
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setIsByForm(true);
            }}
            style={{
              elevation: 8,
              backgroundColor: (isByForm ? Colors.primary.lightestGreen : '#9CB758'),
              borderTopLeftRadius: 12,
              paddingVertical: 10,
              paddingHorizontal: 12,
              marginTop: 30,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: 150,
              height: 50,
            }}
          >
            <Text
              style={{
                ...TextStyles.subHeading,
                color: (isByForm ? '#597415' : Colors.secondary.white),
              }}
            >
              By Form
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setIsByForm(false);
            }}
            style={{
              elevation: 8,
              backgroundColor: (isByForm ? '#9CB758' : Colors.primary.lightestGreen),
              borderTopRightRadius: 12,
              paddingVertical: 10,
              paddingHorizontal: 12,
              marginTop: 30,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              width: 150,
              height: 50,
            }}
          >
            <Text
              style={{
                ...TextStyles.subHeading,
                color: (isByForm ? Colors.secondary.white : '#597415'),
              }}
            >
              By Paddock
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: Colors.primary.lightestGreen,
            minHeight: 0.7 * Dimensions.get('window').height,
          }}
        >
          {
            isByForm ?
              <FormPage />
              : 
              <PaddockPage />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogPage;