import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import useAppSelector from './../hooks/useAppSelector';
import useAppDispatch from './../hooks/useAppDispatch';
// import { UserScopes } from './../redux/slices/usersSlice';
import { checkConnection, clearConnection } from '../redux/slices/connectionSlice';
import { initCredentials, clearAuth } from '../redux/slices/authSlice';
import { getTeamByUserId } from '../redux/slices/teamsSlice';
import {
  // ErrorPage, 
  // ForbiddenPage, 
  ResourcesPage, 
  UsersPage, 
  SignInPage, 
  SignUpPage,
  VerifyUserPage,
  JoinTeamPage,
  FrontPage,
  FormRootPage,
  BCSPage,
  DungPage,
  RumenPage,
  SheenPage,
  SettingsPage,
  HelpGuidesPage,
  ForagePage,
  CalendarPage,
} from './../screens';
import { ROUTES } from '../utils/constants';

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const FormStack = createStackNavigator();
const AnalyticsStack = createStackNavigator();
const SettingsDrawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={ROUTES.SIGNIN} component={SignInPage} />
      <AuthStack.Screen name={ROUTES.SIGNUP} component={SignUpPage} />
      <AuthStack.Screen name={ROUTES.VERIFY_USER} component={VerifyUserPage} />
    </AuthStack.Navigator>
  );
};

const NoTeamStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={ROUTES.JOIN_TEAM} component={JoinTeamPage} />
    </AuthStack.Navigator>
  );
};

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name={ROUTES.HOME} component={FrontPage} />
      <DashboardStack.Screen name={ROUTES.USERS} component={UsersPage} />
      <DashboardStack.Screen name={ROUTES.RESOURCES} component={ResourcesPage} />
    </DashboardStack.Navigator>
  );
};

const FormStackScreen = () => {
  return (
    <FormStack.Navigator>
      <FormStack.Screen name={ROUTES.FORM_ROOT_PAGE} component={FormRootPage} />
      <FormStack.Screen name={ROUTES.BCS_PAGE} component={BCSPage} />
      <FormStack.Screen name={ROUTES.DUNG_PAGE} component={DungPage} />
      <FormStack.Screen name={ROUTES.RUMEN_PAGE} component={RumenPage} />
      <FormStack.Screen name={ROUTES.SHEEN_PAGE} component={SheenPage} />
      <FormStack.Screen name={ROUTES.FORAGE_PAGE} component={ForagePage} />
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

const SettingsDrawerNavigator = () => {
  return (
    <SettingsDrawer.Navigator
      useLegacyImplementation={true}
      initialRouteName='User Settings'
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'back',
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label='Logout' onPress={() => alert('TODO')} />
          </DrawerContentScrollView>
        );
      }}
    >
      <SettingsDrawer.Screen name='User Settings' component={SettingsPage} />
      <SettingsDrawer.Screen name='Help Guides' component={HelpGuidesPage} />
    </SettingsDrawer.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      // screenOptions={{ header: () => null }}
    >
      <Tab.Screen name='Home' component={DashboardStackScreen} />
      <Tab.Screen name='Manage Forms' component={FormStackScreen} />
      <Tab.Screen name='Data Analytics' component={AnalyticsStackScreen} />
      <Tab.Screen name='Settings' component={SettingsDrawerNavigator} />
    </Tab.Navigator>
  );
};

const RootNavigation = () => {
  // const { isConnected } = useAppSelector((state) => state.connection);
  const { authenticated } = useAppSelector((state) => state.auth);
  const { id }  = useAppSelector((state) => state.auth); // userId
  const { selectedTeam } = useAppSelector((state) => state.teams); 
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkConnection()).finally(() => { });
  }, []);
  useEffect(() => {
    dispatch(initCredentials({})).finally(() => { });
  }, []);
  useEffect(() => {
    if (authenticated) {
      dispatch(getTeamByUserId({ userId: id }));
    }
  }, [authenticated]);

  // if (!isConnected) return <ErrorPage />

  if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthStackScreen />
      </NavigationContainer>
    );
  } else if (authenticated && !selectedTeam) {
    return (
      <NavigationContainer>
        <NoTeamStackScreen />
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
