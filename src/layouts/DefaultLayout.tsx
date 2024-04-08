import Header from "../components/Header";
import { ChildrenProps } from "../types";

const DefaultLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="wrapper">
      <Header />
      <hr />
      <>{children}</>
    </div>
  );
};

export default DefaultLayout;
