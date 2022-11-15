import { AppButton, AppTextInput } from '../../../components';
import { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsConnected } from 'react-native-offline';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import ProfileStyle from '../../../styles/pages/ProfileStyle';
import { Colors, TextStyles } from '../../../styles';
import { ITeam, updateTeam } from '../../../redux/slices/teamsSlice';
import { IHerd, updateHerd } from '../../../redux/slices/herdsSlice';

type PageModes = 'view' | 'edit';

const ProfilePage = () => {
  const isWifi = useIsConnected();

  const dispatch = useAppDispatch();
  const { id, email, name } = useAppSelector((state) => state.auth);
  const selectedTeam: ITeam = useAppSelector((state) => state.teams.selectedTeam);
  const selectedHerd: IHerd = useAppSelector((state) => state.herds.selectedHerd);
  
  const [pageMode, setPageMode] = useState<PageModes>('view');

  const [editYrsRanch, setEditYrsRanch] = useState<number>(selectedTeam.yrsRanch);
  const [editYrsHolMang, setEditYrsHolMang] = useState<number>(selectedTeam.yrsHolMang);

  const [editAddress, setEditAddress] = useState<string>(selectedTeam.address);
  const [editAcreSize, setEditAcreSize] = useState<number>(selectedTeam.acreSize);
  const [editBreed, setEditBreed] = useState<string>(selectedHerd.breed);
  const [editCount, setEditCount] = useState<number>(selectedHerd.count);

  // TODO: Implement calendar select (probably a library)
  const [editBreedingPeriod, setEditBreedingPeriod] = useState<Date | string>(selectedHerd.breedingDate);
  const [editCalvingDate, setEditCalvingDate] = useState<Date | string>(selectedHerd.calvingDate);

  const onPressView = () => {
    setPageMode('view');
  };
  const onPressEdit = () => {
    setPageMode('edit');
  };

  const handleChangeProfileInfo = async () => {
    console.log('hi');
    
    if (!editYrsRanch) {
      alert('Error: no editYrsRanch');
    } else if (!editYrsHolMang) {
      alert('Error: no editYrsHolMang');
    } else if (!editAddress) {
      alert('Error: no editAddress');
    } else if (!editAcreSize) {
      alert('Error: no editAcreSize');
    } else if (!editBreed) {
      alert('Error: no editBreed');
    } else if (!editCount) {
      alert('Error: no editCount');
    } else if (!editBreedingPeriod) {
      alert('Error: no breedingPeriod');
    } else if (!editCalvingDate) {
      alert('Error: no calvingDate');
    } else {
      await dispatch(updateTeam({
        id: selectedTeam.id,
        acreSize: editAcreSize,
        address: editAddress,
        yrsRanch: editYrsRanch,
        yrsHolMang: editYrsHolMang,
      }));
      /*
      await dispatch(updateHerd({
        id: selectedHerd.id,
        teamId: selectedTeam.id,
        breed: editBreed,
        count: editCount,
        breedingDate: editBreedingPeriod as Date,
        calvingDate: editCalvingDate as Date,
      }));
      */
    }
  };

  return (
    <SafeAreaView>
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
        {
          (pageMode === 'view') ? 
            <>
              <View style={ProfileStyle.nameCircleOuter}>
                <View style={ProfileStyle.nameCircle}>
                  <Text style={ProfileStyle.nameTitle}>{name}</Text>
                  <Text style={ProfileStyle.nameSubtitle}>Ranch ID: {selectedTeam.id}</Text>
                </View>
              </View>

              <View style={ProfileStyle.fieldsContainer}>
                <Text style={ProfileStyle.sectionHeading}>Experience</Text>
                <Text style={ProfileStyle.fieldTitle}>Years Ranching:</Text>
                <Text style={styles.textContainer}>{selectedTeam.yrsRanch}</Text>
                <Text style={ProfileStyle.fieldTitle}>Years Holistic Ranching:</Text>
                <Text style={styles.textContainer}>{selectedTeam.yrsHolMang}</Text>
                <Text style={ProfileStyle.sectionHeading}>Ranching Information</Text>
                <Text style={ProfileStyle.fieldTitle}>Ranch Address:</Text>
                <Text style={styles.textContainer}>{selectedTeam.address}</Text>
                <Text style={ProfileStyle.fieldTitle}>Land Area:</Text>
                <Text style={styles.textContainer}>{selectedTeam.acreSize}</Text>
                <Text style={ProfileStyle.fieldTitle}>Cattle Breed:</Text>
                <Text style={styles.textContainer}>{selectedHerd.breed}</Text>
                <Text style={ProfileStyle.fieldTitle}># of Cattle in Herd:</Text>
                <Text style={styles.textContainer}>{selectedHerd.count}</Text>
                <Text style={ProfileStyle.sectionHeading}>Critical Dates</Text>
                <Text style={ProfileStyle.fieldTitle}>Breeding Period:</Text>
                <Text style={styles.textContainer}>{selectedHerd.breedingDate.toString()}</Text>
                <Text style={ProfileStyle.fieldTitle}>Calving Date:</Text>
                <Text style={styles.textContainer}>{selectedHerd.calvingDate.toString()}</Text>
              </View>
            </> 
            :
            <>
              <View style={ProfileStyle.nameCircleOuter}>
                <View style={ProfileStyle.nameCircle}>
                  <Text style={ProfileStyle.nameTitle}>{name}</Text>
                  <Text style={ProfileStyle.nameSubtitle}>Ranch ID: {selectedTeam.id}</Text>
                </View>
              </View>

              <View style={ProfileStyle.fieldsContainer}>
                <Text style={ProfileStyle.sectionHeading}>Experience</Text>
                <Text style={ProfileStyle.fieldTitle}>Years Ranching:</Text>
                <AppTextInput
                  onChangeText={value => setEditYrsRanch(parseInt(value))}
                  value={editYrsRanch.toString()}
                  placeholder=""
                />
                <Text style={ProfileStyle.fieldTitle}>Years Holistic Ranching:</Text>
                <AppTextInput
                  onChangeText={value => setEditYrsHolMang(parseInt(value))}
                  value={editYrsHolMang.toString()}
                  placeholder=""
                />

                <Text style={ProfileStyle.sectionHeading}>Ranching Information</Text>
                <Text style={ProfileStyle.fieldTitle}>Ranch Address:</Text>
                <AppTextInput
                  onChangeText={value => setEditAddress(value)}
                  value={editAddress}
                  placeholder=""
                />
                <Text style={ProfileStyle.fieldTitle}>Land Area:</Text>
                <AppTextInput
                  onChangeText={value => setEditAcreSize(parseInt(value))}
                  value={editAcreSize.toString()}
                  placeholder=""
                />
                <Text style={ProfileStyle.fieldTitle}>Cattle Breed:</Text>
                <AppTextInput
                  onChangeText={value => setEditBreed(value)}
                  value={editBreed}
                  placeholder=""
                />
                <Text style={ProfileStyle.fieldTitle}># of Cattle in Herd:</Text>
                <AppTextInput
                  onChangeText={value => setEditCount(parseInt(value))}
                  value={editCount.toString()}
                  placeholder=""
                />

                <Text style={ProfileStyle.sectionHeading}>Critical Dates</Text>
                <Text style={ProfileStyle.fieldTitle}>Breeding Period:</Text>
                <AppTextInput
                  onChangeText={value => setEditBreedingPeriod(value)}
                  value={editBreedingPeriod.toString()}
                  placeholder=""
                />
                <Text style={ProfileStyle.fieldTitle}>Calving Date:</Text>
                <AppTextInput
                  onChangeText={value => setEditCalvingDate(value)}
                  value={editCalvingDate.toString()}
                  placeholder=""
                />
                <AppButton
                  onPress={() => {
                    handleChangeProfileInfo();
                  }}
                  title={'save changes'}
                  backgroundColor={Colors.primary.deepGreen}
                  textColor={Colors.secondary.white}
                  width={215}
                  height={51}
                />
              </View>
            </>
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    ...TextStyles.body,
    borderColor: 'lightgrey',
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
    padding: 10,
    textAlign: 'center',
    textColor: Colors.primary.deepGreen,
  },
});

export default ProfilePage;
