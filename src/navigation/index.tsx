import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
/*
import { 
  createDrawerNavigator, 
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
*/
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
  VerifyUserPage,
  VerifyTeamPage,
  FrontPage,
  FormRootPage,
  BCSPage,
  DungPage,
  RumenPage,
  SheenPage,
  // SettingsPage,
  // HelpGuidesPage,
  ForagePage,
  CalendarPage,
} from './../screens';

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const FormStack = createStackNavigator();
const AnalyticsStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const SettingsDrawer = createStackNavigator(); // createDrawerNavigator
const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name='Sign In' component={SignInPage} />
      <AuthStack.Screen name='Sign Up' component={SignUpPage} />
      <AuthStack.Screen name='Verify User' component={VerifyUserPage} />
      <AuthStack.Screen name='Verify Team' component={VerifyTeamPage} />
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

const FormStackScreen = () => {
  return (
    <FormStack.Navigator>
      <FormStack.Screen name='Forms' component={FormRootPage} />
      <FormStack.Screen name='BCS Form' component={BCSPage} />
      <FormStack.Screen name='Dung Form' component={DungPage} />
      <FormStack.Screen name='Rumen Form' component={RumenPage} />
      <FormStack.Screen name='Sheen Form' component={SheenPage} />
      <FormStack.Screen name='Forage Form' component={ForagePage} />
    </FormStack.Navigator>
  );
};

const AnalyticsStackScreen = () => {
  return (
    <AnalyticsStack.Navigator>
      <AnalyticsStack.Screen name='Calendar Page' component={CalendarPage} />
    </AnalyticsStack.Navigator>
  );
};

const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <RootStack.Navigator
        screenOptions={{ header: () => null }}
      >
        <RootStack.Screen name='SettingsDrawer' component={SettingsDrawerNavigator} />
      </RootStack.Navigator>
    </SettingsStack.Navigator>
  );
};

const SettingsDrawerNavigator = () => {
  /*
  return (
    <SettingsDrawer.Navigator drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label='Logout' onPress={() => console.log('TODO')} />
        </DrawerContentScrollView>
      );
    }}>
      <Tab.Screen name='User Settings' component={SettingsPage} />
      <Tab.Screen name='Help Guides' component={HelpGuidesPage} />
    </SettingsDrawer.Navigator>
  );
  */
  return (
    <SettingsDrawer.Navigator>

    </SettingsDrawer.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ header: () => null }}
    >
      <Tab.Screen name='Home' component={DashboardStackScreen} />
      <Tab.Screen name='Manage Forms' component={FormStackScreen} />
      <Tab.Screen name='Data Analytics' component={AnalyticsStackScreen} />
      <Tab.Screen name='Settings' component={SettingsStackScreen} />
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
          <RootStack.Screen name='MainStack' component={TabNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
};

export default RootNavigation;

// initialRouteName='Home' 