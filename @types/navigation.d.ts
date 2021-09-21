export {};

declare global {
  export type RootStackType = {
    LoginStack: LoginStackType;
    MainTab: MainTabType;
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
      isLogin: boolean;
      phoneNumber: string;
      password: string;
    };
    SignUpSuccess: undefined;
  };

  export type MainTabType = {};
}
