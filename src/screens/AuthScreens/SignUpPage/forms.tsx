export interface EmailPasswordPage {
    email: string;
    password: string;
} 

export interface FirstLastNamePage {
    firstName: string;
    lastName: string;
}

export interface RanchInfo1 {
    ranchId: string;
    yearsAtRanch: number;
    yearsHolisticRanching: number;
    landSize: number;
}

export interface RanchInfo2 {
    ranchAddress: string;
    cattleBreed: string;
    numCattle: number;
}

export interface NotifPrefs {
    notifFrequency: 'daily' | 'weekly' | 'monthly' | 'custom' ;
}

export interface EmailPasswordProps {
    setData: (data: EmailPasswordPage) => {};
}

export interface FirstLastNameProps {
    setData: (data: FirstLastNamePage) => {};
}

export interface RanchInfo1Props {
    setData: (data: RanchInfo1) => {};
}

export interface RanchInfo2Props {
    setData: (data: RanchInfo2) => {};
}

export interface NotifPrefsProps {
    setData: (data: NotifPrefs) => {};
}
