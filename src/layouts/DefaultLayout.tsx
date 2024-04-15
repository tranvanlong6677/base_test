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
      <Row className="w-100">
        <Col className="sidebar-wrapper-col">
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </Col>
        {!collapsed && window.innerWidth <= 900 ? (
          <></>
        ) : (
          <Col style={{ flex: "1" }} className="w-100">
            <Row className="header-wrapper w-100">
              <Col style={{ alignItems: "center" }} className="w-100">
                <Header />
              </Col>
            </Row>
            <Row>
              <Col className="w-100">
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
