/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AutoComplete,
  Breadcrumb,
  Button,
  Drawer,
  Row,
  Select,
  Tabs,
  TabsProps,
  notification,
} from "antd";
import { itemsBreadCrumb } from "../../../utils/itemsBreadCrumb";
import { Form, type FormProps } from "antd";
import { createContext, useEffect, useReducer, useState } from "react";
import QuantityQuestions from "../../../components/QuantityQuestions";
import {
  typeQuestions,
  typeQuestionsShort,
} from "../../../utils/typeQuestions";
import ListImageQuestion from "../ListImageQuestion";
import { useForm } from "antd/es/form/Form";
import { subjects } from "../../../utils/optionSelect/subjectsOption";
import { gradeOptions } from "../../../utils/optionSelect/gradeOptions";
import { questionApi } from "../../../api/questionApi";
import { Option } from "antd/es/mentions";
import { approvalQuestionReducer } from "../../../reducer/ApprovalQuestion";
import { levelQuestions } from "../../../utils/levelQuestions";
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

interface DataButtonModalReviewQuestion {
  difficulty: string;
  level: string;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [dataButtonModalReviewQuestion, setDataButtonModalReviewQuestion] =
    useState<DataButtonModalReviewQuestion>({
      difficulty: "cb",
      level: "NB",
    });
  const [key, setKey] = useState<string>("1");

  const [topicOptionSelected, setTopicOptionSelected] = useState<Option>();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Câu hỏi chưa duyệt (${listQuestionNotApproved.length})`,
      children: (
        <ListImageQuestion
          listQuestion={listQuestion.length > 0 ? listQuestion : []}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          dispatch={dispatch}
          isApproved={false}
          loading={loading}
          setLoading={setLoading}
        />
      ),
    },
    {
      key: "2",
      label: `Câu hỏi đã duyệt (${listQuestionApproved.length})`,
      children: (
        <ListImageQuestion
          listQuestion={listQuestion.length > 0 ? listQuestion : []}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          dispatch={dispatch}
          isApproved={true}
          loading={loading}
          setLoading={setLoading}
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

  const onSelect = async (_data: string, option: any) => {
    console.log(">>> check option", option);
    setTopicOptionSelected(option);
    await fetchQuestion(option);
  };

  const onChangeTabs = (keyTab: string) => {
    console.log(keyTab);
    setKey(keyTab);
  };

  const fetchTopicForGradeAndSubject = async ({
    grade,
    domain,
  }: {
    grade: string;
    domain: string;
  }) => {
    setLoading(true);
    await questionApi
      .fetchTopic({
        grade,
        domain,
      })
      .then((response: any) => {
        setLoading(false);
        const optionResult: Option[] = response?.map((item: any) => {
          return {
            label: item.label,
            value: item.label,
            valueCode: item.value,
          };
        });
        setTopicOptions(optionResult);
      });
  };

  const handleChangeDifficulty = async (type: string) => {
    try {
      const result: any = await questionApi.changeDifficultyQuestion(
        dataModalReviewQuestion.id,
        type
      );
      if (result === 200) {
        notification.success({
          message: "Thành công",
          description: "Thay đổi độ khó thành công",
        });
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra",
      });
    }
  };

  const handleChangeLevel = async (id: number, level: string) => {
    try {
      const result = await questionApi.changLevelQuestion(id, level);
      notification.success({
        message: "Thành công",
        description: "Thay đổi level thành công",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra",
      });
    }
  };

  const fetchQuestion = async (option: any) => {
    setLoading(true);
    const resultApproved = await questionApi
      .fetchQuestionForTopic({
        domain: {
          value: subject.value,
          label: subject.value,
        },
        grade: {
          value: grade.value,
          label: grade.value,
        },
        topics: [{ label: option.label, value: option.valueCode }],
        status: 1,
      })
      .then((response: any) => {
        setLoading(false);
        setListQuestionApproved(response);
        // setListQuestionNotApproved(resultNotApproved as any);
        return response;
      });
    const resultNotApproved = await questionApi
      .fetchQuestionForTopic({
        domain: {
          value: subject.value,
          label: subject.value,
        },
        grade: {
          value: grade.value,
          label: grade.value,
        },
        topics: [{ label: option.label, value: option.valueCode }],
        status: 0,
      })
      .then((response: any) => {
        setLoading(false);
        setListQuestionNotApproved(response);
        // setListQuestionNotApproved(resultNotApproved as any);
        return response;
      });
    setLoading(false);
    console.log(">>> check asfbiasbfiuasbuif", [
      ...resultApproved,
      ...resultNotApproved,
    ]);
    return [...resultApproved, ...resultNotApproved];
  };

  const handleApproveQuestion = async (id: number) => {
    try {
      const result = await questionApi.approveQuestion(id);
      setIsOpenDrawer(false);
      notification.success({
        message: "Thành công",
        description: "Duyệt câu hỏi thành công",
      });
      await fetchQuestion(topicOptionSelected);
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra",
      });
    }
  };

  useEffect(() => {
    setDataButtonModalReviewQuestion({
      difficulty: dataModalReviewQuestion.question_difficulty,
      level: dataModalReviewQuestion.question_level,
    });
  }, [dataModalReviewQuestion, isOpenDrawer, listQuestion]);
  useEffect(() => {
    setListQuestion(
      key === "1" ? listQuestionNotApproved : listQuestionApproved
    );
  }, [key, listQuestionNotApproved, listQuestionApproved]);
  return (
    <CustomContext.Provider
      value={{ isModalOpen: false, dataModalReviewQuestion: {} }}
    >
      <div className="review-questions-wrapper">
        <Drawer
          title="Phân loại câu hỏi"
          onClose={() => setIsOpenDrawer(false)}
          open={isOpenDrawer}
          placement={"bottom"}
          extra={<Button onClick={() => setIsOpenDrawer(false)}>Đóng</Button>}
          size="large"
        >
          <img src={dataModalReviewQuestion?.image_url} alt="" />

          <div className="difficulty">
            <span className="title">Độ khó</span>
            <div className="btn-wrapper">
              <Button
                className=""
                type={
                  dataButtonModalReviewQuestion.difficulty === "cb"
                    ? "primary"
                    : "default"
                }
                onClick={async () => {
                  if (dataModalReviewQuestion.status === "0") {
                    await handleChangeDifficulty(typeQuestionsShort.BASIC);
                    const result = await fetchQuestion(topicOptionSelected);
                    const dataModalNew = result?.filter(
                      (item: any) => item.id === dataModalReviewQuestion.id
                    );
                    console.log(">>> check dataModalNew[0] ", dataModalNew[0]);
                    dispatch({ data: dataModalNew[0] });
                  }
                }}
              >
                Cơ bản
              </Button>
              <Button
                className=""
                onClick={async () => {
                  if (dataModalReviewQuestion.status === "0") {
                    await handleChangeDifficulty(typeQuestionsShort.ADVANCED);
                    const result = await fetchQuestion(topicOptionSelected);
                    const dataModalNew = result?.filter(
                      (item: any) => item.id === dataModalReviewQuestion.id
                    );
                    dispatch({ data: dataModalNew[0] });
                  }
                }}
                type={
                  dataButtonModalReviewQuestion.difficulty === "nc"
                    ? "primary"
                    : "default"
                }
              >
                Nâng cao
              </Button>
              <Button
                className=""
                onClick={async () => {
                  if (dataModalReviewQuestion.status === "0") {
                    await handleChangeDifficulty(
                      typeQuestionsShort.SPECIALIZED
                    );
                    const result = await fetchQuestion(topicOptionSelected);
                    const dataModalNew = result?.filter(
                      (item: any) => item.id === dataModalReviewQuestion.id
                    );
                    dispatch({ data: dataModalNew[0] });
                  }
                }}
                type={
                  dataButtonModalReviewQuestion.difficulty === "c"
                    ? "primary"
                    : "default"
                }
              >
                Chuyên
              </Button>
            </div>
          </div>

          <div className="level">
            <span className="title">Mức độ vận dụng</span>
            <div className="btn-wrapper">
              <Button
                className=""
                type={
                  dataButtonModalReviewQuestion.level === levelQuestions.NB
                    ? "primary"
                    : "default"
                }
                onClick={async () => {
                  if (dataModalReviewQuestion.status === "0") {
                    await handleChangeLevel(
                      dataModalReviewQuestion.id,
                      levelQuestions.NB
                    );
                    const result = await fetchQuestion(topicOptionSelected);
                    const dataModalNew = result?.filter(
                      (item: any) => item.id === dataModalReviewQuestion.id
                    );
                    dispatch({ data: dataModalNew[0] });
                  }
                }}
              >
                Vận dụng thấp
              </Button>
              <Button
                className=""
                type={
                  dataButtonModalReviewQuestion.level === levelQuestions.VDC
                    ? "primary"
                    : "default"
                }
                onClick={async () => {
                  if (dataModalReviewQuestion.status === "0") {
                    await handleChangeLevel(
                      dataModalReviewQuestion.id,
                      levelQuestions.VDC
                    );
                    const result = await fetchQuestion(topicOptionSelected);
                    const dataModalNew = result?.filter(
                      (item: any) => item.id === dataModalReviewQuestion.id
                    );
                    dispatch({ data: dataModalNew[0] });
                  }
                }}
              >
                Vận dụng cao
              </Button>
              <Button
                className=""
                type={
                  dataButtonModalReviewQuestion.level === levelQuestions.TH
                    ? "primary"
                    : "default"
                }
                onClick={async () => {
                  if (dataModalReviewQuestion.status === "0") {
                    await handleChangeLevel(
                      dataModalReviewQuestion.id,
                      levelQuestions.TH
                    );
                    const result = await fetchQuestion(topicOptionSelected);
                    const dataModalNew = result?.filter(
                      (item: any) => item.id === dataModalReviewQuestion.id
                    );
                    dispatch({ data: dataModalNew[0] });
                  }
                }}
              >
                Tổng hợp
              </Button>
            </div>
          </div>
          {dataModalReviewQuestion.status === "1" ? (
            <></>
          ) : (
            <div className="approval">
              <Button
                type="primary"
                onClick={() =>
                  handleApproveQuestion(dataModalReviewQuestion.id)
                }
              >
                Duyệt câu hỏi
              </Button>
            </div>
          )}
        </Drawer>
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
              placeholder="Lựa chọn khung kiến thức"
              allowClear
              filterOption
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
            <div
              onClick={() => {
                setListQuestion(
                  (key === "1"
                    ? listQuestionNotApproved
                    : listQuestionApproved
                  ).filter(
                    (item) =>
                      item.question_difficulty === typeQuestionsShort.BASIC
                  )
                );
              }}
            >
              <QuantityQuestions
                quantity={
                  (key === "1"
                    ? listQuestionNotApproved
                    : listQuestionApproved
                  ).filter((item: any) => item.question_difficulty === "cb")
                    .length
                }
                typeQuestion={typeQuestions.BASIC}
              />
            </div>
            <div
              onClick={() => {
                setListQuestion(
                  (key === "1"
                    ? listQuestionNotApproved
                    : listQuestionApproved
                  ).filter(
                    (item) =>
                      item.question_difficulty === typeQuestionsShort.ADVANCED
                  )
                );
              }}
            >
              <QuantityQuestions
                quantity={
                  (key === "1"
                    ? listQuestionNotApproved
                    : listQuestionApproved
                  ).filter((item: any) => item.question_difficulty === "nc")
                    .length
                }
                typeQuestion={typeQuestions.ADVANCED}
              />
            </div>
            <div
              onClick={() => {
                setListQuestion(
                  (key === "1"
                    ? listQuestionNotApproved
                    : listQuestionApproved
                  ).filter(
                    (item) =>
                      item.question_difficulty ===
                      typeQuestionsShort.SPECIALIZED
                  )
                );
              }}
            >
              <QuantityQuestions
                quantity={
                  (key === "1"
                    ? listQuestionNotApproved
                    : listQuestionApproved
                  ).filter((item: any) => item.question_difficulty === "c")
                    .length
                }
                typeQuestion={typeQuestions.SPECIALIZED}
              />
            </div>
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
