import React, { useEffect } from 'react';
import { Text } from 'react-native';
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
import { checkConnection } from '../redux/slices/connectionSlice';
import { initCredentials } from '../redux/slices/authSlice';
import { getTeamByUserId } from '../redux/slices/teamsSlice';
import { UserScopes } from '../redux/slices/usersSlice';
import {
  // ErrorPage, 
  // ForbiddenPage, 
  ResourcesPage,  // deprecated
  UsersPage,      // deprecated
  SignInPage,
  SignUpPage,
  VerifyUserPage,
  JoinTeamPage,
  FrontPage,
  FormRootPage,
  BCSPage,
  DungPage,
  AboutStacPage,
  SettingsPage,
  HelpGuidesPage,
  ProfilePage,
  ForageQualPage,
  ForageQuanPage,
  LogPage,
  SelectedPaddockPage,
  LoadingPage,
} from './../screens';
import { ROUTES } from '../utils/constants';
import { LaunchScreen } from '../screens/AuthScreens';
import { Colors } from '../styles';
import { AntDesign, Octicons, Ionicons } from '@expo/vector-icons';

const AuthStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const FormStack = createStackNavigator();
const AnalyticsStack = createStackNavigator();
const SettingsDrawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ header: () => null }}
    >
      <AuthStack.Screen name={ROUTES.AUTHLAUNCH} component={LaunchScreen} />
      <AuthStack.Screen name={ROUTES.SIGNIN} component={SignInPage} />
      <AuthStack.Screen name={ROUTES.SIGNUP} component={SignUpPage} />
    </AuthStack.Navigator>
  );
};

const NoTeamStackScreen = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ header: () => null }}
    >
      <AuthStack.Screen name={ROUTES.JOIN_TEAM} component={JoinTeamPage} />
    </AuthStack.Navigator>
  );
};

const DashboardStackScreen = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{ header: () => null }}
    >
      <DashboardStack.Screen name={ROUTES.HOME} component={FrontPage} />
    </DashboardStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ header: () => null }}
    >
      <ProfileStack.Screen name={ROUTES.PROFILE} component={ProfilePage} />
    </ProfileStack.Navigator>
  );
};

const FormStackScreen = () => {
  return (
    <FormStack.Navigator
      screenOptions={{ header: () => null }}
    >
      <FormStack.Screen name={ROUTES.FORM_ROOT_PAGE} component={FormRootPage} />
      <FormStack.Screen name={ROUTES.BCS_PAGE} component={BCSPage} />
      <FormStack.Screen name={ROUTES.DUNG_PAGE} component={DungPage} />
      <FormStack.Screen name={ROUTES.FORAGE_QUALITY_PAGE} component={ForageQualPage} />
      <FormStack.Screen name={ROUTES.FORAGE_QUANTITY_PAGE} component={ForageQuanPage} />
      <FormStack.Screen name={ROUTES.ABOUT_STAC_PAGE} component={AboutStacPage} />
    </FormStack.Navigator>
  );
};

const AnalyticsStackScreen = () => {
  return (
    <AnalyticsStack.Navigator
      screenOptions={{ header: () => null }}
      initialRouteName={ROUTES.LOG_PAGE}
    >
      <AnalyticsStack.Screen name={ROUTES.LOG_PAGE} component={LogPage} />
      <AnalyticsStack.Screen name={ROUTES.SELECTED_PADDOCK_PAGE} component={SelectedPaddockPage} />
    </AnalyticsStack.Navigator>
  );
};

// Deprecated
const SettingsDrawerNavigator = () => {
  return (
    <SettingsDrawer.Navigator
      useLegacyImplementation={true}
      initialRouteName={ROUTES.USER_PROFILE}
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'back',
        header: () => null,
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
      <SettingsDrawer.Screen name={ROUTES.USER_PROFILE} component={ProfilePage} />
      <SettingsDrawer.Screen name={ROUTES.USER_SETTINGS} component={SettingsPage} />
      <SettingsDrawer.Screen name={ROUTES.HELP_GUIDES} component={HelpGuidesPage} />
    </SettingsDrawer.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        header: () => null,
        tabBarStyle: {
          backgroundColor: Colors.primary.mainOrange,
        },
        tabBarActiveTintColor: Colors.primary.lightOrange,
        tabBarInactiveTintColor: Colors.secondary.darkGreen,
      }}
      initialRouteName='home'
    >
      <Tab.Screen
        name='profile'
        component={ProfileStackScreen}
        options={{
          tabBarLabel: (props) => {
            return (
              <Text style={{ color: props.color }}>profile</Text>
            );
          },
          tabBarIcon: (props) => (
            <Ionicons name='person-outline' color={props.color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='data'
        component={AnalyticsStackScreen}
        options={{
          tabBarLabel: (props) => {
            return (
              <Text style={{ color: props.color }}>data</Text>
            );
          },
          tabBarIcon: (props) => (
            <Octicons name='graph' color={props.color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='forms'
        component={FormStackScreen}
        options={{
          tabBarLabel: (props) => {
            return (
              <Text style={{ color: props.color }}>forms</Text>
            );
          },
          tabBarIcon: (props) => (
            <Ionicons name='leaf-outline' color={props.color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='home'
        component={DashboardStackScreen}
        options={{
          tabBarLabel: (props) => {
            return (
              <Text style={{ color: props.color }}>home</Text>
            );
          },
          tabBarIcon: (props) => (
            <AntDesign name='home' color={props.color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const RootNavigation = () => {
  // const { isConnected } = useAppSelector((state) => state.connection);
  const { authenticated } = useAppSelector((state) => state.auth);
  const { id, role } = useAppSelector((state) => state.auth); // userId
  const { selectedTeam } = useAppSelector((state) => state.teams);
  const { isDataLoaded } = useAppSelector((state) => state.sync);
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

  if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthStackScreen />
      </NavigationContainer>
    );
  } else if (authenticated && role === UserScopes.Unverified) {
    return (
      <NavigationContainer>
        <VerifyUserPage />
      </NavigationContainer>
    );
  } else if (authenticated && !selectedTeam) {
    return (
      <NavigationContainer>
        <NoTeamStackScreen />
      </NavigationContainer>
    );
  } else if (!isDataLoaded) {
    return (
      <NavigationContainer>
        <LoadingPage />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{ header: () => null }}
        >
          <RootStack.Screen
            name='MainStack'
            component={TabNavigator}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
};

export default RootNavigation;

// TODO: ative TextInput(user@gmail) is 9 events ahead of JS - try to make your JS faster.
