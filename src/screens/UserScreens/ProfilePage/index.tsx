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
import ProfileBackgroundTopImage from '../../../assets/profile_background_top.svg';
import ProfileBackgroundMiddleImage from '../../../assets/profile_background_middle.svg';
import ProfileGrassImage from '../../../assets/profile_grass.svg';
import DefaultCowGreenImage from '../../../assets/default_cow_green.svg';
import DefaultCowBlueImage from '../../../assets/default_cow_blue.svg';

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
      await dispatch(updateHerd({
        id: selectedHerd.id,
        teamId: selectedTeam.id,
        breed: editBreed,
        count: editCount,
        breedingDate: editBreedingPeriod as Date,
        calvingDate: editCalvingDate as Date,
      }));
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={ProfileStyle.backgroundMiddleView}>
          <ProfileBackgroundMiddleImage />
        </View>
        <View style={ProfileStyle.backgroundTopView}>
          <ProfileBackgroundTopImage />
        </View>
        <View style={ProfileStyle.headerView}>
          <View style={ProfileStyle.subHeaderLeft}>
            <Text style={ProfileStyle.headerTitle}>Profile Page</Text>
          </View>
          <View style={ProfileStyle.subHeaderRight}>
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
                <View
                  style={ProfileStyle.textContainer}
                >
                  <Text style={ProfileStyle.textContent}>{selectedTeam.yrsRanch}</Text>
                </View>
                <Text style={ProfileStyle.fieldTitle}>Years Holistic Ranching:</Text>
                <View
                  style={ProfileStyle.textContainer}
                >
                  <Text style={ProfileStyle.textContent}>{selectedTeam.yrsHolMang}</Text>
                </View>
                <Text style={ProfileStyle.sectionHeading}>Ranching Information</Text>
                <Text style={ProfileStyle.fieldTitle}>Ranch Address:</Text>
                <View
                  style={ProfileStyle.textContainer}
                >
                  <Text style={ProfileStyle.textContent}>{selectedTeam.address}</Text>
                </View>
                <Text style={ProfileStyle.fieldTitle}>Land Area:</Text>
                <View
                  style={ProfileStyle.textContainer}
                >
                  <Text style={ProfileStyle.textContent}>{selectedTeam.acreSize}</Text>
                </View>
                <Text style={ProfileStyle.fieldTitle}>Cattle Breed:</Text>
                <View
                  style={ProfileStyle.textContainer}
                >
                  <Text style={ProfileStyle.textContent}>{selectedHerd.breed}</Text>
                </View>
                <Text style={ProfileStyle.fieldTitle}># of Cattle in Herd:</Text>
                <View
                  style={ProfileStyle.textContainer}
                >
                  <Text style={ProfileStyle.textContent}>{selectedHerd.count}</Text>
                </View>
                <Text style={ProfileStyle.sectionHeading}>Critical Dates</Text>
                <Text style={ProfileStyle.fieldTitle}>Breeding Period:</Text>
                <View
                  style={ProfileStyle.textContainer}
                >
                  <Text style={ProfileStyle.textContent}>{selectedHerd.breedingDate.toString()}</Text>
                </View>
                <Text style={ProfileStyle.fieldTitle}>Calving Date:</Text>
                <View
                  style={ProfileStyle.textContainer}
                >
                  <Text style={ProfileStyle.textContent}>{selectedHerd.calvingDate.toString()}</Text>
                </View>
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
        <View
          style={{
            paddingBottom: 200,
          }}
        >
        </View>
        <View style={ProfileStyle.backgroundGrassView}>
          <ProfileGrassImage />
        </View>
        <View
          style={ProfileStyle.greenCowView}
        >
          <DefaultCowGreenImage />
        </View>
        <View
          style={ProfileStyle.blueCowView}
        >
          <DefaultCowBlueImage />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfilePage;
