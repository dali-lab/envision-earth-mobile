import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import useAppSelector from './hooks/useAppSelector';
import useAppDispatch from './hooks/useAppDispatch';
import { UserScopes } from './redux/slices/usersSlice';
import { checkConnection } from './redux/slices/connectionSlice';
import { initCredentials } from './redux/slices/authSlice';
import {
  // ErrorPage,
  ForbiddenPage,
  FrontPage,
  ResourcesPage,
  SignInPage,
  SignUpPage,
  UsersPage,
  VerifyPage,
} from './screens';

const ProtectedRoute = (allowableScopes: UserScopes[]) => {
  const { authenticated, role } = useAppSelector((state) => state.auth);

  return (allowableScopes.includes(role) && authenticated);
};

const Index = () => {
  const Stack = createStackNavigator();

  // const { isConnected } = useAppSelector((state) => state.connection)
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(checkConnection()).finally(() => {});
  }, []);
  useEffect(() => {
    dispatch(initCredentials({})).finally(() => {});
  }, []);

  // if (!isConnected) return <ErrorPage />

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Front Page'
          component={FrontPage}
        />
        <Stack.Screen name='Sign In' component={SignInPage} />
        <Stack.Screen name='Sign Up' component={SignUpPage} />
        <Stack.Screen
          name='Users'
          component={
            ProtectedRoute([UserScopes.Admin])
              ? UsersPage
              : ForbiddenPage
          }
        />
        <Stack.Screen
          name='Resources'
          component={
            ProtectedRoute([UserScopes.User, UserScopes.Admin])
              ? ResourcesPage
              : ForbiddenPage
          }
        />
        <Stack.Screen
          name='Verify'
          component={
            ProtectedRoute([UserScopes.Unverified])
              ? VerifyPage
              : ForbiddenPage
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
