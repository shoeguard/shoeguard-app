export {};

declare global {
  export type RootStackType = {
    LoginStack: LoginStackType;
    ConnectDevice: undefined;
    MainTab: MainParentTabType | MainChildTabType;
    ReportActive: {
      id: number;
    };
  };

  export type LoginStackType = {
    Onboarding: undefined;
    Terms: undefined;
    PhoneInput: {
      isLogin: boolean;
    };
    SmsAuthenticate: {
      isLogin: boolean;
      phoneNumber: string;
    };
    PasswordInput: {
      isLogin: boolean;
      phoneNumber: string;
    };
    NameInput: {
      phoneNumber: string;
      password: string;
    };
    SignUpSuccess: undefined;
    GenerateQRCode: undefined;
    ScanQRCode: undefined;
  };

  export type MainParentTabType = {
    DeviceStack: DeviceParentStackType;
    ReportStack: ReportParentStackType;
    HistoryStack: HistoryStackType;
    MenuStack: MenuStackType;
  };

  export type MainChildTabType = {
    DeviceStack: DeviceChildStackType;
    ReportStack: ReportChildStackType;
    HistoryStack: HistoryStackType;
    MenuStack: MenuStackType;
  };

  export type DeviceParentStackType = {
    Device: undefined;
    AddDevice: undefined;
  };

  export type DeviceChildStackType = {
    Device: undefined;
  };

  export type ReportParentStackType = {
    Report: undefined;
  };

  export type ReportChildStackType = {
    Report: undefined;
  };

  export type HistoryStackType = {
    History: undefined;
    Detail: {
      id: number;
    };
  };

  export type MenuStackType = {
    Menu: undefined;
    OSS: undefined;
  };
}
