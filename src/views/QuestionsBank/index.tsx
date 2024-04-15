import { Breadcrumb, Card, Row } from "antd";
import { itemsBreadCrumb } from "../../utils/itemsBreadCrumb";
import routesObject from "../../utils/routes";
import { useHistory } from "react-router-dom";

const QuestionsBank = () => {
  const history = useHistory();
  return (
    <div>
      <h1 className="header-1" style={{ textAlign: "left" }}>
        Ngân hàng câu hỏi
      </h1>
      <Breadcrumb items={itemsBreadCrumb} />
      <Row className="btn-review-questions-wrapper">
        <Card
          title=""
          bordered={true}
          size="default"
          className="card-selected"
          onClick={() => {
            history.push(routesObject.reviewQuestions);
          }}
        >
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
    </div>
  );
};

export default QuestionsBank;
