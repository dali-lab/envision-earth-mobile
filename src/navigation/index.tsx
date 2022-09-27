import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useAppSelector from './../hooks/useAppSelector';
import useAppDispatch from './../hooks/useAppDispatch';
// import { UserScopes } from './../redux/slices/usersSlice';
import { checkConnection } from './../redux/slices/connectionSlice';
import { initCredentials } from './../redux/slices/authSlice';
import {
  // ErrorPage, 
  // ForbiddenPage, 
  ResourcesPage, 
  UsersPage, 
  SignInPage, 
  SignUpPage,
  VerifyPage,
  FrontPage,
  AnimalRootPage,
  BCSPage,
  DungPage,
  RumenPage,
  SheenPage,
  SettingsPage,
  ForagePage,
  CalendarPage,
} from './../screens';

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const AnimalStack = createStackNavigator();
const EcosystemStack = createStackNavigator();
const AnalyticsStack = createStackNavigator();
const UserStack = createStackNavigator();

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='Sign In' component={SignInPage} />
      <AuthStack.Screen name='Sign Up' component={SignUpPage} />
      <AuthStack.Screen name='Verify' component={VerifyPage} />
    </AuthStack.Navigator>
  );
};

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name='Front Page' component={FrontPage} />
      <DashboardStack.Screen name='Users' component={UsersPage} />
      <DashboardStack.Screen name='Resources' component={ResourcesPage} />
    </DashboardStack.Navigator>
  );
};

const AnimalStackScreen = () => {
  return (
    <AnimalStack.Navigator>
      <AnimalStack.Screen name='Animal Root' component={AnimalRootPage} />
      <AnimalStack.Screen name='BCS Form' component={BCSPage} />
      <AnimalStack.Screen name='Dung Form' component={DungPage} />
      <AnimalStack.Screen name='Rumen Form' component={RumenPage} />
      <AnimalStack.Screen name='Sheen Form' component={SheenPage} />
    </AnimalStack.Navigator>
  );
};

const EcosystemStackScreen = () => {
  return (
    <EcosystemStack.Navigator>
      <EcosystemStack.Screen name='Forage' component={ForagePage} />
    </EcosystemStack.Navigator>
  );
};

const AnalyticsStackScreen = () => {
  return (
    <AnalyticsStack.Navigator>
      <AnalyticsStack.Screen name='Calendar Page' component={CalendarPage} />
    </AnalyticsStack.Navigator>
  );
};

const UserStackScreen = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name='Settings' component={SettingsPage} />
    </UserStack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={DashboardStackScreen} />
      <Tab.Screen name='Manage Animals' component={AnimalStackScreen} />
      <Tab.Screen name='Manage Ecosystem' component={EcosystemStackScreen} />
      <Tab.Screen name='Data Analytics' component={AnalyticsStackScreen} />
      <Tab.Screen name='User Profile' component={UserStackScreen} />
    </Tab.Navigator>
  );
};

const RootNavigation = () => {
  // const { isConnected } = useAppSelector((state) => state.connection);
  const { authenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkConnection()).finally(() => { });
  }, []);
  useEffect(() => {
    dispatch(initCredentials({})).finally(() => { });
  }, []);

  // if (!isConnected) return <ErrorPage />

  if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthStackScreen />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ header: () => null }}
        >
          <RootStack.Screen name="MainStack" component={TabNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
};

export default RootNavigation;