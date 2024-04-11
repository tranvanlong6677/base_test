import { ChildrenProps } from "../types";
import logoImg from "../assets/images/logo.png";

const DefaultLayoutLogin = ({ children }: ChildrenProps) => {
  return (
    <div className="wrapper-login">
      <span className="logo-wrapper">
        <img src={logoImg} alt="" className="logo" />
      </span>

      <h1 className="header-1 header-login">Hệ thống nhập liệu</h1>
      <>{children}</>
    </div>
  );
};

export default DefaultLayoutLogin;
