export interface ChildrenProps {
  children: JSX.Element;
}
export type LoginType = {
  emailOrPhoneNumber: string;
  password: string;
  keepLogin: boolean;
};
export type loginWithZaloType = {
  phone: string;
};

export type verifyLoginWithZaloType = {
  OTP: string;
};
