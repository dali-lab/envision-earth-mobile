export interface BreedingDateData {
  date: Date,
}
export const BreedingDateDefaultData: BreedingDateData = {
  date: new Date(),
};

export interface CalvingDateData {
  date: Date,
}
export const CalvingDateDefaultData: CalvingDateData = {
  date: new Date(),
};

export interface CattleDetailsData {
  cattleBreed: string,
  numCattle: number,
}
export const CattleDetailsDefaultData: CattleDetailsData = {
  cattleBreed: '',
  numCattle: 0,
};

export interface FirstLastNameData {
  fname: string,
  lname: string,
}
export const FirstLastNameDefaultData: FirstLastNameData = {
  fname: '',
  lname: '',
};

export interface LoginData {
  uname: string,
  email: string,
  pwd: string,
}
export const LoginDefaultData: LoginData = {
  uname: '',
  email: '',
  pwd: '',
};

export interface PaddocksDetailsData {
  paddocks: string[],
}
export const PaddocksDetailsDefaultData: PaddocksDetailsData = {
  paddocks: [],
};

export interface RanchAddressData {
  address: string,
  city: string,
  state: string,
  zip: string,
  country: string,
}
export const RanchAddressDefaultData: RanchAddressData = {
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
};

export interface RanchDetailsData {
  yrsRanching: number,
  yrsHolistic: number,
}
export const RanchDetailsDefaultData: RanchDetailsData = {
  yrsRanching: 0,
  yrsHolistic: 0,
};

export type RanchRole = 'owner' | 'collaborator';

export interface RanchRoleData {
  role: RanchRole,
}
export const RanchRoleDefaultData: RanchRoleData = {
  role: 'collaborator',
};
