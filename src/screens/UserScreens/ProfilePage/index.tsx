import { AppButton, AppTextInput } from '../../../components';
import { useState } from 'react';
import { SafeAreaView, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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
      <View>
        <Text>Profile Page</Text>
        <AppButton
          title="View"
          onPress={onPressView}
        />
        <AppButton
          title="Edit"
          onPress={onPressEdit}
        />
      </View>

      <View>
        <Text>John Deere</Text>
        <Text>Ranch ID {ranchID}</Text>
      </View>

      <View>
        <Text>Experience</Text>
        <Text>Years Ranching:</Text>
        <AppTextInput
          onChangeText={value => setYearsRanching(parseInt(value))}
          value={yearsRanching.toString()}
          placeholder=""
        />
        <Text>Years Holistic Ranching:</Text>
        <AppTextInput
          onChangeText={value => setYearsHolistic(parseInt(value))}
          value={yearsHolistic.toString()}
          placeholder=""
        />

        <Text>Ranching Information</Text>
        <Text>Ranch Address:</Text>
        <AppTextInput
          onChangeText={value => setRanchAddress(value)}
          value={ranchAddress}
          placeholder=""
        />
        <Text>Land Area:</Text>
        <AppTextInput
          onChangeText={value => setLandArea(parseInt(value))}
          value={landArea.toString()}
          placeholder=""
        />
        <Text>Cattle Breed:</Text>
        <AppTextInput
          onChangeText={value => setCattleBreed(value)}
          value={cattleBreed}
          placeholder=""
        />
        <Text># of Cattle in Herd:</Text>
        <AppTextInput
          onChangeText={value => setNumCattle(parseInt(value))}
          value={numCattle.toString()}
          placeholder=""
        />

        <Text>Critical Dates</Text>
        <Text>Breeding Period:</Text>
        <AppTextInput
          onChangeText={value => setBreedingPeriod(value)}
          value={breedingPeriod}
          placeholder=""
        />
        <Text>Calving Date:</Text>
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
