import { ChildrenProps } from "../types";
import logoImg from "../assets/images/logo.png";

const DefaultLayoutLogin = ({ children }: ChildrenProps) => {
  return (
    <div className="wrapper-login">
      <img src={logoImg} alt="" className="logo" />
      <h1 className="header-1 header-login">Hệ thống nhập liệu</h1>
      <>{children}</>
    </div>
  );
};

export default DefaultLayoutLogin;
