import React from 'react';
import { ScrollView, SafeAreaView, Text, View, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import NavType from '../../../utils/NavType';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';

const AboutStacPage = () => {
  const navigation = useNavigation<NavType>();

  return (
    <SafeAreaView style={GlobalStyle.container}>
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
            STAC Method
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
            alignItems: 'center',
            padding: 20,
          }}
        >
          <Text
            style={[TextStyles.body, { color: Colors.primary.vibrantGreen }]}
          >
            Take a STAC reading every 
            <Text
              style={{ color: Colors.secondary.deepTeal }}
            >
              5 steps aiming 
            </Text>
            for 10 readings per area/transect (approximately 200 yards). 
          </Text>
          <Text
            style={[TextStyles.body, { color: Colors.primary.vibrantGreen }]}
          >
            Pick a point on the horizon and walk toward it taking your normal stride.
            At each reading, look down at your foot and 
            <Text
              style={{ color: Colors.secondary.deepTeal }}
            >
              determine the height of dense grazeable material compared to your boot
            </Text>
            marking S=Sole, T=Toe, A=Ankle, C=Calf,
            Th=Thigh, P=Pocket. 
            <Text
              style={{ color: Colors.secondary.deepTeal }}
            >
              Take note if you step on bare soil.
            </Text>
          </Text>
          <Text
            style={[TextStyles.body, { color: Colors.primary.vibrantGreen }]}
          >
            Remember to look at the bulk of the plant and not the highest point of the plant to determine the most accurate estimate.
            <Text
              style={{ color: Colors.secondary.deepTeal }}
            >
              Ignore seed heads and stalks, focusing on the dense leaf material. 
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutStacPage;