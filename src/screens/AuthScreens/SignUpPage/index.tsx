import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signUp } from '../../../redux/slices/authSlice';
import { IUser } from '../../../redux/slices/usersSlice';
import { createTeam, ITeam } from '../../../redux/slices/teamsSlice';
import { createHerd } from '../../../redux/slices/herdsSlice';
import { createPlots } from '../../../redux/slices/plotsSlice';
import { createMembership } from '../../../redux/slices/membershipSlice';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';
import { AuthStyle } from '../../../styles';
import {
  BreedingDatePage,
  CalvingDatePage,
  CattleDetailsPage,
  FirstLastNamePage,
  LoginPage,
  PaddocksDetailsPage,
  RanchAddressPage,
  RanchDetailsPage,
  RanchRolePage,
} from './pages';
import {
  BreedingDateData,
  BreedingDateDefaultData,
  CalvingDateData,
  CalvingDateDefaultData,
  CattleDetailsData,
  CattleDetailsDefaultData,
  FirstLastNameData,
  FirstLastNameDefaultData,
  LoginData,
  LoginDefaultData,
  PaddocksDetailsData,
  PaddocksDetailsDefaultData,
  RanchAddressData,
  RanchAddressDefaultData,
  RanchDetailsData,
  RanchDetailsDefaultData,
  RanchRoleData,
  RanchRoleDefaultData,
} from './pageData';

const SignUpPage = () => {
  const dispatch = useAppDispatch();

  // States from each of the pages in the signup flow 
  const [breedingPageData, setBreedingPageData] = useState<BreedingDateData>(BreedingDateDefaultData);
  const [calvingPageData, setCalvingPageData] = useState<CalvingDateData>(CalvingDateDefaultData);
  const [cattlePageData, setCattlePageData] = useState<CattleDetailsData>(CattleDetailsDefaultData);
  const [namePageData, setNamePageData] = useState<FirstLastNameData>(FirstLastNameDefaultData);
  const [loginPageData, setLoginPageData] = useState<LoginData>(LoginDefaultData);
  const [paddockPageData, setPaddockPageData] = useState<PaddocksDetailsData>(PaddocksDetailsDefaultData);
  const [ranchAddrPageData, setRanchAddrPageData] = useState<RanchAddressData>(RanchAddressDefaultData);
  const [ranchDetailsPageData, setRanchDetailsPageData] = useState<RanchDetailsData>(RanchDetailsDefaultData);
  const [ranchRolePageData, setRanchRolePageData] = useState<RanchRoleData>(RanchRoleDefaultData);

  const [pageInd, setPageInd] = useState<number>(0);

  const navigation = useNavigation<NavType>();

  function onPageSubmit<Type>(data: Type, stateSet: (value: React.SetStateAction<Type>) => void): void {
    stateSet(data);
    setPageInd(val => val + 1);
  }

  async function onFinalSubmit<Type>(data: Type, stateSet: (value: React.SetStateAction<Type>) => void): Promise<void> {
    stateSet(data);
    const user: IUser = await (await dispatch(signUp({ email: loginPageData.email, password: loginPageData.pwd, name: namePageData.fname }))).payload.user;
    // TODO: shouldn't there be different flows depending on ranchRolePageData.role?
    const team: ITeam = await (await dispatch(createTeam({
      name: 'default',  // TODO: Entry for team name
      acreSize: 0,      // TODO: Entry for acreSize
      address: ranchAddrPageData.address,
      yrsRanch: ranchDetailsPageData.yrsRanching,
      yrsHolMang: ranchDetailsPageData.yrsHolistic,
    }))).payload;
    await dispatch(createHerd({
      teamId: team.id,
      breed: cattlePageData.cattleBreed,
      count: cattlePageData.numCattle,
      breedingDate: breedingPageData.date,
      calvingDate: calvingPageData.date,
    }));
    for (let plotName of paddockPageData.paddocks) {
      if (plotName === '') {
        plotName = ' ';
      }
      await dispatch(createPlots({
        teamId: team.id,
        photoId: null,
        latitude: 0,  // TBD
        longitude: 0, // TBD
        length: 0,    // TBD
        width: 0,     // TBD
        name: plotName,
      }));
    }
    await dispatch(createMembership({
      teamId: team.id,
      userId: user.id,
    }));
  }

  const pages = [
    <LoginPage onSubmit={(data: LoginData) => onPageSubmit(data, setLoginPageData)} />,
    <RanchRolePage onSubmit={(data: RanchRoleData) => onPageSubmit(data, setRanchRolePageData)} />,
    <FirstLastNamePage onSubmit={(data: FirstLastNameData) => onPageSubmit(data, setNamePageData)} />,
    <RanchAddressPage onSubmit={(data: RanchAddressData) => onPageSubmit(data, setRanchAddrPageData)} />,
    <RanchDetailsPage onSubmit={(data: RanchDetailsData) => onPageSubmit(data, setRanchDetailsPageData)} />,
    <CattleDetailsPage onSubmit={(data: CattleDetailsData) => onPageSubmit(data, setCattlePageData)} />,
    <PaddocksDetailsPage onSubmit={(data: PaddocksDetailsData) => onPageSubmit(data, setPaddockPageData)} />,
    <BreedingDatePage onSubmit={(data: BreedingDateData) => onPageSubmit(data, setBreedingPageData)} />,
    <CalvingDatePage onSubmit={(data: CalvingDateData) => onFinalSubmit(data, setCalvingPageData).then(() => navigation.navigate(ROUTES.AUTHLAUNCH))} />,
  ];

  return (
    <SafeAreaView style={AuthStyle.container}>
      <View>
        {pages[pageInd]}
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;
