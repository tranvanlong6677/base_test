import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  type FormProps,
  Input,
  notification,
} from "antd";
import zaloImg from "../../assets/images/zalo.png";
import { authApi } from "../../api/authApi";
import { LoginType } from "../../types";
import { useHistory } from "react-router-dom";
import routesObject from "../../utils/routes";

const Login = () => {
  const history = useHistory();
  const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
    if (values.keepLogin === undefined) {
      values.keepLogin = false;
    }
    console.log("Success:", values);
    const { emailOrPhoneNumber, password } = values;
    try {
      const res = await authApi.login({ emailOrPhoneNumber, password });
      console.log(">>> check res", res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      notification.success({
        message: "Đăng nhập thành công",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response?.status === 401) {
        notification.error({
          message: "Có lỗi xảy ra",
          description:
            "Bạn đã nhập sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại",
        });
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: "Error",
        });
      }
    }
  };

  const onFinishFailed: FormProps<LoginType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  console.log(import.meta.env.VITE_REACT_APP_API_ENDPOINT);
  return (
    <>
      <p className="introduction">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis
        pharetra ex, finibus porttitor elit pretium ut. Sed cursu
      </p>
      <Form
        name="basic"
        // labelCol={{ span: 8 }}
        // wrapperCol={{ span: 16 }}
        style={{ maxWidth: 460 }}
        // initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="login-form"
      >
        <Form.Item<LoginType>
          name="emailOrPhoneNumber"
          rules={[
            { required: true, message: "Hãy nhập số điện thoại hoặc email!" },
          ]}
        >
          <Input
            placeholder="Số điện thoại hoặc Email"
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item<LoginType>
          name="password"
          rules={[{ required: true, message: "Hãy nhập mật khẩu!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
        </Form.Item>
        <div className="keep-login-wrapper">
          <Form.Item<LoginType>
            name="keepLogin"
            valuePropName="checked"
            className="keep-login-input"
          >
            <Checkbox>Giữ đăng nhập</Checkbox>
          </Form.Item>
          <a className="forget-password">Quên mật khẩu?</a>
        </div>

        <Form.Item style={{ marginBottom: "15px" }}>
          <Button type="primary" htmlType="submit" className="btn btn-success">
            Đăng nhập
          </Button>
        </Form.Item>

        <Button
          className="login-zalo"
          onClick={() => {
            history.push(routesObject.loginWithZalo);
          }}
        >
          <img src={zaloImg} alt="" />
          <span>Đăng nhập bằng Zalo</span>
        </Button>
      </Form>
    </>
  );
};

export default Login;
