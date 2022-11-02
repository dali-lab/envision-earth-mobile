export enum AuthStackRoutes {
  AUTHLAUNCH = 'Welcome',
  SIGNIN = 'Sign In',
  SIGNUP = 'Sign Up',
}

export type AuthStackParamList = {
  [AuthStackRoutes.AUTHLAUNCH]: Record<string, unknown>;
  [AuthStackRoutes.SIGNIN]: Record<string, unknown>;
  [AuthStackRoutes.SIGNUP]: Record<string, unknown>;
};