/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AutoComplete,
  Breadcrumb,
  Button,
  Modal,
  Row,
  Select,
  Tabs,
  TabsProps,
} from "antd";
import { itemsBreadCrumb } from "../../../utils/itemsBreadCrumb";
import { Form, type FormProps } from "antd";
import { createContext, useReducer, useState } from "react";
import QuantityQuestions from "../../../components/QuantityQuestions";
import { typeQuestions } from "../../../utils/typeQuestions";
import ListImageQuestion from "../ListImageQuestion";
import { useForm } from "antd/es/form/Form";
import { subjects } from "../../../utils/optionSelect/subjectsOption";
import { gradeOptions } from "../../../utils/optionSelect/gradeOptions";
import { questionApi } from "../../../api/questionApi";
import { Option } from "antd/es/mentions";
import { approvalQuestionReducer } from "../../../reducer/ApprovalQuestion";
import { CloseOutlined } from "@ant-design/icons";
type FieldType = {
  grade: string;
  domain: string;
  topic: string;
};
interface Option {
  label: string;
  value: string;
  valueCode: string;
}
const CustomContext = createContext({
  isModalOpen: false,
  dataModalReviewQuestion: {},
});

const ReviewQuestions = () => {
  const [state, dispatch] = useReducer(approvalQuestionReducer, {
    dataModalReviewQuestion: {},
  });
  const { dataModalReviewQuestion } = state;
  const itemsBreadCrumbCurrent = [
    ...itemsBreadCrumb,
    { title: "Duyệt câu hỏi" },
  ];

  const [topicOptions, setTopicOptions] = useState<Option[]>();
  const [grade, setGrade] = useState<any>();
  const [subject, setSubject] = useState<any>();
  const [listQuestion, setListQuestion] = useState<any[]>([]);
  const [listQuestionApproved, setListQuestionApproved] = useState<any[]>([]);
  const [listQuestionNotApproved, setListQuestionNotApproved] = useState<any[]>(
    []
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Câu hỏi chưa duyệt (${listQuestionNotApproved.length})`,
      children: (
        <ListImageQuestion
          listQuestion={
            listQuestionNotApproved.length > 0 ? listQuestionNotApproved : []
          }
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          dispatch={dispatch}
        />
      ),
    },
    {
      key: "2",
      label: `Câu hỏi đã duyệt (${listQuestionApproved.length})`,
      children: (
        <ListImageQuestion
          listQuestion={
            listQuestionApproved.length > 0 ? listQuestionApproved : []
          }
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          dispatch={dispatch}
        />
      ),
    },
  ];

  const [form] = useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  //   auto complete

  const onSelect = async (data: string, option: any) => {
    console.log("onSelect", data);
    console.log("option", option);
    const result: any = await questionApi.fetchQuestionForTopic({
      domain: {
        value: subject.value,
        label: subject.value,
      },
      grade: {
        value: grade.value,
        label: grade.value,
      },
      topics: [{ label: option.label, value: option.valueCode }],
    });

    console.log(">>> check fetch question", result);
    const resultApproved = result?.filter((item: any) => item.status === "1");
    const resultNotApproved = result?.filter(
      (item: any) => item.status === "0"
    );
    console.log(">>> check approval", resultApproved);
    setListQuestionApproved(resultApproved as any);
    setListQuestionNotApproved(resultNotApproved as any);
  };

  const onChange = (dataInput: string) => {
    console.log("dataInput", dataInput);
    if (typeof dataInput === "string") {
      const filteredOptions = topicOptions?.filter((data) =>
        data.label.toLowerCase().includes(dataInput.toLowerCase())
      );
      setTopicOptions(filteredOptions);
    }
  };

  const onChangeTabs = (key: string) => {
    console.log(key);
  };

  const fetchTopicForGradeAndSubject = async ({
    grade,
    domain,
  }: {
    grade: string;
    domain: string;
  }) => {
    const result: any = await questionApi.fetchTopic({
      grade,
      domain,
    });
    console.log(">>> check result abc", result);
    console.log(">>> check result", result);
    const optionResult: Option[] = result?.map((item: any) => {
      return {
        label: item.label,
        value: item.label,
        valueCode: item.value,
      };
    });
    console.log(">>> check result abc", optionResult);
    setTopicOptions(optionResult);
  };

  return (
    <CustomContext.Provider
      value={{ isModalOpen: false, dataModalReviewQuestion: {} }}
    >
      <div className="review-questions-wrapper">
        <Modal
          title={
            <>
              <CloseOutlined onClick={() => setIsModalOpen(false)} />
              Phân loại câu hỏi
            </>
          }
          footer={null}
          styles={{
            header: { display: "flex", alignItems: "center" },
          }}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          closeIcon={<Button>Đóng</Button>}
          // mask={false}
          className="modal-review-questions-wrapper"
          width={window.innerWidth}
        >
          <img src={dataModalReviewQuestion?.image_url} alt="" />

          <div className="difficulty">
            <span className="title">Độ khó</span>
            <div className="btn-wrapper">
              <Button className="" type="primary">
                Cơ bản
              </Button>
              <Button className="">Nâng cao</Button>
              <Button className="">Chuyên</Button>
            </div>
          </div>

          <div className="level">
            <span className="title">Mức độ vận dụng</span>
            <div className="btn-wrapper">
              <Button className="" type="primary">
                Vận dụng thấp
              </Button>
              <Button className="">Vận dụng cao</Button>
              <Button className="">Tổng hợp</Button>
            </div>
          </div>
        </Modal>
        <h1 className="header-1" style={{ textAlign: "left" }}>
          Ngân hàng câu hỏi
        </h1>
        <Breadcrumb items={itemsBreadCrumbCurrent} />

        <span className="review-questions-title">Bộ lọc</span>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="inline"
          className="search-questions-form"
          form={form}
        >
          <Form.Item<FieldType>
            name="grade"
            rules={[{ required: true, message: "Please input your grade!" }]}
            className="w-100"
          >
            <Select
              placeholder="Khối lớp"
              options={gradeOptions}
              onChange={() => {
                if (
                  form.getFieldValue("grade") &&
                  form.getFieldValue("domain")
                ) {
                  fetchTopicForGradeAndSubject({
                    grade: form.getFieldValue("grade"),
                    domain: form.getFieldValue("domain"),
                  });
                }
              }}
              onSelect={(_data, option) => {
                console.log(">>> check option1 ", option);
                setGrade(option);
              }}
            />
          </Form.Item>

          <Form.Item<FieldType>
            name="domain"
            rules={[{ required: true, message: "Please input your subject!" }]}
            className="w-100"
          >
            <Select
              placeholder="Môn học"
              options={subjects}
              onChange={() => {
                if (
                  form.getFieldValue("grade") &&
                  form.getFieldValue("domain")
                ) {
                  fetchTopicForGradeAndSubject({
                    grade: form.getFieldValue("grade"),
                    domain: form.getFieldValue("domain"),
                  });
                  ``;
                }
              }}
              onSelect={(_data, option) => {
                setSubject(option);
              }}
            />
          </Form.Item>
          <Form.Item<FieldType>
            name="topic"
            rules={[{ required: true, message: "Please input your topic!" }]}
            className="w-100"
          >
            <AutoComplete
              options={topicOptions}
              onSelect={onSelect}
              // onSearch={(text) => setOptions(getPanelValue(text))}
              placeholder="Lựa chọn khung kiến thức"
              onChange={onChange}
              allowClear
              value={"hihi"}
              onClear={() => {
                if (
                  form.getFieldValue("grade") &&
                  form.getFieldValue("domain")
                ) {
                  fetchTopicForGradeAndSubject({
                    grade: form.getFieldValue("grade"),
                    domain: form.getFieldValue("domain"),
                  });
                }
              }}
            />
          </Form.Item>
          {/* <Form.Item className="w-100">
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item> */}
        </Form>

        <div className="quantity-questions-wrapper">
          <span className="review-questions-title">Số lượng câu hỏi</span>
          <Row className="quantity-question-row">
            <QuantityQuestions
              quantity={128}
              typeQuestion={typeQuestions.BASIC}
            />
            <QuantityQuestions
              quantity={142}
              typeQuestion={typeQuestions.ADVANCED}
            />
            <QuantityQuestions
              quantity={2523}
              typeQuestion={typeQuestions.SPECIALIZED}
            />
          </Row>
        </div>

        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onChangeTabs}
          className="tabs-list-question"
        />
      </div>
    </CustomContext.Provider>
  );
};

export default ReviewQuestions;
