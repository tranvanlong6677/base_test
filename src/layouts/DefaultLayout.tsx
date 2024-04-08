import Header from "../components/Header";
// import { ChildrenProps } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DefaultLayout = ({ children }: any) => {
  return (
    <div className="wrapper">
      <Header />
      <hr />
      <>{children}</>
    </div>
  );
};

export default DefaultLayout;
