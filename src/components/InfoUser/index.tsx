import { Card } from "antd";
interface IProps {
  infoUser: {
    imgAvt: string;
    name: string;
    email: string;
  };
  collapsed: boolean;
}
const Index = (props: IProps) => {
  const { name, email, imgAvt } = props.infoUser;
  const { collapsed } = props;
  return (
    <Card>
      <div
        className={
          !collapsed
            ? "user-info-wrapper"
            : "user-info-wrapper d-flex justify-center align-center"
        }
      >
        <img
          src={imgAvt}
          alt=""
          className={!collapsed ? "" : "avt-logo-collapsed"}
        />

        <div>
          {!collapsed ? (
            <>
              <span className="name">{name}</span>
              <br />
              <span>{email}</span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Card>
  );
};
export default Index;
