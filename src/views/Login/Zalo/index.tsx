import { UserOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, GetProp, Input, notification } from "antd";
import { authApi } from "../../../api/authApi";
import { loginWithZaloType, verifyLoginWithZaloType } from "../../../types";
import { useState } from "react";

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isShowVerification, setIsShowVerification] = useState<boolean>(false);
  const onFinish: FormProps<loginWithZaloType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    setPhoneNumber(values.phone);
    try {
      await authApi.loginWithZalo({
        phone: values.phone,
        sentAt: Date.now(),
      });
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
        const result = await authApi.verificationCodeLoginZalo({
          phone: phoneNumber ?? "",
          OTP: values.OTP,
        });
        console.log(">>>> check result ", result);
        setIsShowVerification(true);
        notification.success({
          message: "Đăng nhập thành công",
        });
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
