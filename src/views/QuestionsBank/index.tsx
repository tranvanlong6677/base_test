import { Breadcrumb, Card, Row } from "antd";
import { itemsBreadCrumb } from "../../utils/itemsBreadCrumb";

const QuestionsBank = () => {
  return (
    <>
      <h1 className="header-1" style={{ textAlign: "left" }}>
        Ngân hàng câu hỏi
      </h1>
      <Breadcrumb items={itemsBreadCrumb} />
      <Row className="btn-review-questions-wrapper">
        <Card title="" bordered={true} size="default" className="card-selected">
          <span>Duyệt câu hỏi</span>
        </Card>

        <Card title="" bordered={true} size="default" className="">
          <span>Duyệt câu hỏi</span>
        </Card>

        <Card title="" bordered={true} size="default" className="">
          <span>Duyệt câu hỏi</span>
        </Card>

        <Card title="" bordered={true} size="default" className="">
          <span>Duyệt câu hỏi</span>
        </Card>

        <Card title="" bordered={true} size="default" className="">
          <span>Duyệt câu hỏi</span>
        </Card>
      </Row>
    </>
  );
};

export default QuestionsBank;
