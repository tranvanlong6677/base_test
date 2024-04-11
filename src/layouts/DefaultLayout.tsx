import { Col, Row } from "antd";
import Sidebar from "../components/Sidebar";
import { ChildrenProps } from "../types";
import Header from "../components/Header";
import { useState } from "react";

const DefaultLayout = ({ children }: ChildrenProps) => {
  const [collapsed, setCollapsed] = useState(
    window.innerWidth > 900 ? false : true
  );
  return (
    <div className="wrapper">
      <Row style={{ width: "100%" }}>
        <Col className="sidebar-wrapper-col">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Col>
        {!collapsed && window.innerWidth <= 900 ? (
          <></>
        ) : (
          <Col style={{ flex: "1", width: "100%" }} span={16}>
            <Row style={{ width: "100%" }} className="header-wrapper">
              <Col style={{ width: "100%", alignItems: "center" }}>
                <Header />
              </Col>
            </Row>
            <Row>
              <Col>
                <>{children}</>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default DefaultLayout;
