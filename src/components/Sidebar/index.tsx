import type { MenuProps } from "antd";
import { Button, Layout, Menu } from "antd";
import logoImg from "../../assets/images/logo.png";
import logoImgSmall from "../../assets/images/logoSmall.png";
import imgAvt from "../../assets/images/avatar.png";
import documentIcon from "../../assets/images/svg/documentIcon.svg";
import resumeTeacherIcon from "../../assets/images/svg/resumeTeacherIcon.svg";
import InfoUser from "../InfoUser";
import Sider from "antd/es/layout/Sider";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import routesObject from "../../utils/routes";
import { useHistory } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
interface IProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
  onTitleClick?: (route: string) => void
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
    onTitleClick,
  } as MenuItem;
}
const propsInfo = {
  imgAvt: imgAvt,
  name: "Nguyễn Đắc Thắng",
  email: "tranthanhuet@gmail.com",
};

const Sidebar = (props: IProps) => {
  const history = useHistory();
  const { collapsed, setCollapsed } = props;
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const items: MenuProps["items"] = [
    getItem(
      <div style={{ textAlign: "left" }}>
        {!collapsed ? (
          <img src={logoImg} alt="" className="logo" />
        ) : (
          <div className=" d-flex justify-center">
            <img src={logoImgSmall} alt="" className="logo-small" />
          </div>
        )}
      </div>,
      "sub1",
      <></>
    ),
    getItem(
      <InfoUser infoUser={propsInfo} collapsed={collapsed} />,
      "sub2",
      <></>
    ),
    getItem(
      "",
      "sub3",
      <span
        className={
          !collapsed
            ? "sidebar-item-wrapper-bank-questions"
            : "sidebar-item-wrapper-bank-questions d-flex justify-center align-center w-100"
        }
      >
        <img src={documentIcon} alt="" className="icon-sidebar" />
        {!collapsed ? <span>Ngân hàng câu hỏi</span> : <></>}
      </span>,
      [
        getItem("Navigation Item", "g1", null),
        getItem("Navigation Item", "g2", null),
      ],
      "" as "group",
      () => {
        onClickQuestionsBank(routesObject.questionsBank);
      }
    ),
    getItem(
      "",
      "sub4",
      <span
        className={
          !collapsed
            ? "sidebar-item-wrapper-resumes"
            : "sidebar-item-wrapper-resumes d-flex justify-center align-center w-100"
        }
      >
        <img src={resumeTeacherIcon} alt="" className="icon-sidebar" />
        {!collapsed ? <span>Hồ sơ giáo viên</span> : <></>}
      </span>
    ),
  ];
  const onClickQuestionsBank = (route: string) => {
    history.push(route);
  };
  return (
    <>
      {/* <img src={logoImg} alt="" className="logo" /> */}
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={window.innerWidth >= 900 ? 300 : window.innerWidth - 160}
        >
          <Menu
            onClick={onClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            items={items}
            // expandIcon={<img src={arrowRight} alt="" />}
            expandIcon={!collapsed ? <RightOutlined /> : <></>}
            mode="vertical"
            subMenuCloseDelay={0.2}
            subMenuOpenDelay={0.2}
            triggerSubMenuAction="hover"
          />
        </Sider>
        <Button
          onClick={toggleCollapsed}
          className="btn-collapse"
          shape="circle"
          icon={!collapsed ? <LeftOutlined /> : <RightOutlined />}
        >
          {/* <img src={leftArrowIcon} alt="" /> */}
        </Button>
      </Layout>
    </>
  );
};

export default Sidebar;
