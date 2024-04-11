import { UserOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, GetProp, Input, notification } from "antd";
import { authApi } from "../../../api/authApi";
import { loginWithZaloType, verifyLoginWithZaloType } from "../../../types";
import { useEffect, useState } from "react";
import routesObject from "../../../utils/routes";
import { useHistory } from "react-router-dom";

const Index = () => {
  const history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isShowVerification, setIsShowVerification] = useState<boolean>(false);
  const onFinish: FormProps<loginWithZaloType>["onFinish"] = async (values) => {
    console.log("Success:", values);

    setPhoneNumber(values.phone);
    try {
      const res = await authApi.loginWithZalo({
        phone: values.phone,
        sentAt: Date.now(),
      });
      console.log(">>> check res", res);
      setIsShowVerification(true);
    } catch (error) {
      notification.error({
        message: "Có lỗi xảy ra",
      });
    }
  };
  const onFinishVerifyCode: FormProps<verifyLoginWithZaloType>["onFinish"] =
    async (values) => {
      console.log("Success:", values);
      try {
        const result = (await authApi.verificationCodeLoginZalo({
          phone: phoneNumber ?? "",
          OTP: values.OTP,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        })) as any;
        console.log(">>>> check result ", result);
        if (result && result.access_token) {
          localStorage.setItem("access_token", result.access_token);
        }
        setIsShowVerification(true);
        notification.success({
          message: "Đăng nhập thành công",
        });
        history.push(routesObject.home);
      } catch (error) {
        console.log(">>> check error", error);
      }
    };

  const onFinishFailed: FormProps<loginWithZaloType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const onFinishFailedVerify: FormProps<verifyLoginWithZaloType>["onFinishFailed"] =
    (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

  const onChange: GetProp<typeof Input.OTP, "onChange"> = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps = {
    onChange,
  };

  useEffect(() => {}, []);
  return (
    <>
      <p className="introduction">
        Mã xác thực sẽ được gửi qua Zalo, vui lòng không chia sẻ mã xác thực.
      </p>
      {isShowVerification ? (
        <Form
          name="basic"
          style={{ maxWidth: 460 }}
          onFinish={onFinishVerifyCode}
          onFinishFailed={onFinishFailedVerify}
          autoComplete="off"
          className="login-form"
        >
          <Form.Item<verifyLoginWithZaloType>
            name="OTP"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input.OTP
              length={4}
              formatter={(str) => str.toUpperCase()}
              {...sharedProps}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-success"
            >
              Xác nhận mã
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          name="basic"
          style={{ maxWidth: 460 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="login-form"
        >
          <Form.Item<loginWithZaloType>
            name="phone"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Số điện thoại đã đăng ký"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-success"
            >
              Gửi mã xác nhận
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default Index;
