import { SearchOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";
import imgAvt from "../../assets/images/avatar.png";

const Header = () => {
  console.log("window.innerWidth", window.innerWidth);
  return (
    <Row className="" justify={"space-between"} align={"middle"}>
      <Col>
        <SearchOutlined className="icon-search-header" />
      </Col>
      <Col>
        <Avatar
          size={
            window.innerWidth >= 1024 ? 58 : window.innerWidth >= 768 ? 48 : 42
          }
          icon={<img src={imgAvt} alt="" />}
        />
      </Col>
    </Row>
  );
};

export default Header;
