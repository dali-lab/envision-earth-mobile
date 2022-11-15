import { AppButton, AppTextInput } from '../../../components';
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ProfileStyle from '../../../styles/pages/ProfileStyle';
import { Colors, TextStyles } from '../../../styles';

type PageModes = 'view' | 'edit';

const ProfilePage = () => {
  const [pageMode, setPageMode] = useState<PageModes>('view');

  const [yearsRanching, setYearsRanching] = useState<number>(0);
  const [yearsHolistic, setYearsHolistic] = useState<number>(0);

  const [ranchAddress, setRanchAddress] = useState<string>('');
  const [landArea, setLandArea] = useState<number>(0);
  const [cattleBreed, setCattleBreed] = useState<string>('');
  const [numCattle, setNumCattle] = useState<number>(0);

  const [breedingPeriod, setBreedingPeriod] = useState<string>('');
  const [calvingDate, setCalvingDate] = useState<string>('');

  const ranchID = 277467268; // Example

  const onPressView = () => {
    setPageMode('view');
  };
  const onPressEdit = () => {
    setPageMode('edit');
  };

  return <SafeAreaView>
    <ScrollView>
      <View style={ProfileStyle.headerLayout}>
        <Text style={ProfileStyle.headerTitle}>Profile Page</Text>
        <AppButton
          title="View"
          onPress={onPressView}
          backgroundColor={pageMode === 'view' ? Colors.primary.vibrantGreen : Colors.primary.lightGreen}
          textColor={pageMode === 'view' ? Colors.primary.lightestGreen : Colors.secondary.mediumGreen}
          textStyle={TextStyles.body}
        />
        <AppButton
          title="Edit"
          onPress={onPressEdit}
          backgroundColor={pageMode === 'edit' ? Colors.primary.vibrantGreen : Colors.primary.lightGreen}
          textColor={pageMode === 'edit' ? Colors.primary.lightestGreen : Colors.secondary.mediumGreen}
          textStyle={TextStyles.body}
        />
      </View>

      <View style={ProfileStyle.nameCircleOuter}>
        <View style={ProfileStyle.nameCircle}>
          <Text style={ProfileStyle.nameTitle}>John Deere</Text>
          <Text style={ProfileStyle.nameSubtitle}>Ranch ID {ranchID}</Text>
        </View>
      </View>

      <View style={ProfileStyle.fieldsContainer}>
        <Text style={ProfileStyle.sectionHeading}>Experience</Text>
        <Text style={ProfileStyle.fieldTitle}>Years Ranching:</Text>
        <AppTextInput
          onChangeText={value => setYearsRanching(parseInt(value))}
          value={yearsRanching.toString()}
          placeholder=""
        />
        <Text style={ProfileStyle.fieldTitle}>Years Holistic Ranching:</Text>
        <AppTextInput
          onChangeText={value => setYearsHolistic(parseInt(value))}
          value={yearsHolistic.toString()}
          placeholder=""
        />

        <Text style={ProfileStyle.sectionHeading}>Ranching Information</Text>
        <Text style={ProfileStyle.fieldTitle}>Ranch Address:</Text>
        <AppTextInput
          onChangeText={value => setRanchAddress(value)}
          value={ranchAddress}
          placeholder=""
        />
        <Text style={ProfileStyle.fieldTitle}>Land Area:</Text>
        <AppTextInput
          onChangeText={value => setLandArea(parseInt(value))}
          value={landArea.toString()}
          placeholder=""
        />
        <Text style={ProfileStyle.fieldTitle}>Cattle Breed:</Text>
        <AppTextInput
          onChangeText={value => setCattleBreed(value)}
          value={cattleBreed}
          placeholder=""
        />
        <Text style={ProfileStyle.fieldTitle}># of Cattle in Herd:</Text>
        <AppTextInput
          onChangeText={value => setNumCattle(parseInt(value))}
          value={numCattle.toString()}
          placeholder=""
        />

        <Text style={ProfileStyle.sectionHeading}>Critical Dates</Text>
        <Text style={ProfileStyle.fieldTitle}>Breeding Period:</Text>
        <AppTextInput
          onChangeText={value => setBreedingPeriod(value)}
          value={breedingPeriod}
          placeholder=""
        />
        <Text style={ProfileStyle.fieldTitle}>Calving Date:</Text>
        <AppTextInput
          onChangeText={value => setCalvingDate(value)}
          value={calvingDate}
          placeholder=""
        />
      </View>
    </ScrollView>
  </SafeAreaView>;
};

export default ProfilePage;
