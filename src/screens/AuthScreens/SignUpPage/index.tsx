import React, { useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { signUp } from '../../../redux/slices/authSlice';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import NavType from '../../../utils/NavType';
import { ROUTES } from '../../../utils/constants';
import { GlobalStyle, TextStyles, Colors } from '../../../styles';
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

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

  const handleSubmit = async () => {
    // Send only if all fields filled in
    /* if (!email) alert('Please enter an email address!');
    else if (!password) alert('Please enter a password!');
    else if (!name) alert('Please enter a name!'); */
    await dispatch(signUp({ email: loginPageData.email, password: loginPageData.pwd, name: namePageData.fname })).then(() => {
      navigation.navigate(ROUTES.AUTHLAUNCH);
    });
  };

  function onPageSubmit<Type>(data: Type, stateSet: (value: React.SetStateAction<Type>) => void): void {
    stateSet(data);
    setPageInd(val => val + 1);
  }

  async function onFinalSubmit<Type>(data: Type, stateSet: (value: React.SetStateAction<Type>) => void): Promise<void> {
    stateSet(data);
    await dispatch(signUp({ email: loginPageData.email, password: loginPageData.pwd, name: namePageData.fname })).then(() => {
      navigation.navigate(ROUTES.AUTHLAUNCH);
    });
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
    <CalvingDatePage onSubmit={(data: CalvingDateData) => onFinalSubmit(data, setCalvingPageData)} />,
  ];

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <View>
        {pages[pageInd]}
      </View>
    </SafeAreaView>
  );
};

export default SignUpPage;
