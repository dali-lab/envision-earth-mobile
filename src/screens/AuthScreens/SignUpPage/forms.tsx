export interface EmailPasswordData {
  email: string;
  password: string;
} 

export interface FirstLastNameData {
  firstName: string;
  lastName: string;
}

export interface RanchInfo1Data {
  ranchId: string;
  yearsAtRanch: number;
  yearsHolisticRanching: number;
  landSize: number;
}

export interface RanchInfo2Data {
  ranchAddress: string;
  cattleBreed: string;
  numCattle: number;
}

export interface NotifPrefData {
  notifFrequency: 'daily' | 'weekly' | 'monthly' | 'custom' ;
}

export interface EmailPasswordProps {
  setData: (data: EmailPasswordData) => null;
}

export interface FirstLastNameProps {
  setData: (data: FirstLastNameData) => null;
}

export interface RanchInfo1Props {
  setData: (data: RanchInfo1Data) => null;
}

export interface RanchInfo2Props {
  setData: (data: RanchInfo2Data) => null;
}

export interface NotifPrefsProps {
  setData: (data: NotifPrefData) => null;
}
