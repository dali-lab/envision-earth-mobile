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
    // email, password, name 
    await dispatch(signUp({ email: loginPageData.email, password: loginPageData.pwd, name: namePageData.fname })).then(() => {
      navigation.navigate(ROUTES.AUTHLAUNCH);
    });
  };

  const nextPage = () => {
    setPageInd(val => val + 1);
  };

  const pages = [
    <LoginPage onSubmit={(data: LoginData) => setLoginPageData(data)} />,
    <RanchRolePage onSubmit={(data: RanchRoleData) => setRanchRolePageData(data)} />,
    <FirstLastNamePage onSubmit={(data: FirstLastNameData) => setNamePageData(data)} />,
    <RanchAddressPage onSubmit={(data: RanchAddressData) => setRanchAddrPageData(data)} />,
    <RanchDetailsPage onSubmit={(data: RanchDetailsData) => setRanchDetailsPageData(data)} />,
    <CattleDetailsPage onSubmit={(data: CattleDetailsData) => setCattlePageData(data)} />,
    <PaddocksDetailsPage onSubmit={(data: PaddocksDetailsData) => setPaddockPageData(data)} />,
    <BreedingDatePage onSubmit={(data: BreedingDateData) => setBreedingPageData(data)} />,
    <CalvingDatePage onSubmit={(data: CalvingDateData) => setCalvingPageData(data)} />,
  ];

  return (
    <SafeAreaView style={GlobalStyle.container}>
      <View>
        {pages[pageInd]}
      </View>

      <Text
        style={[
          TextStyles.title,
          { color: Colors.secondary.deepTeal },
        ]}
      >
        Sign Up
      </Text>
      <AppTextInput
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='email'
        width={331}
        height={59}
      />
      <AppTextInput
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder='password'
        secureTextEntry={true}
        width={331}
        height={59}
      />
      <AppTextInput
        onChangeText={(text) => setName(text)}
        value={name}
        placeholder='name'
        width={331}
        height={59}
      />
      <AppButton
        onPress={handleSubmit}
        title={'sign up'}
        backgroundColor={Colors.primary.mainOrange}
        textColor={Colors.secondary.white}
        width={331}
        height={59}
      />
    </SafeAreaView>
  );
};

export default SignUpPage;
