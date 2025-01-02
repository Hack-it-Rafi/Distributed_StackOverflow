import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Card, Col, Divider, Row, Typography, Space } from "antd";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { TUser } from "../types/user.types";
import { primaryButton } from "../config/themeConfig";
import { verifyToken } from "../utils/verifyToken";
import CForm from "../components/form/CForm";
import CInputField from "../components/form/CInputField";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Authenticating...");

    try {
      const res = await login(data as { email: string; password: string });
      if (res.error) {
        toast.error("Invalid login credentials", { id: toastId });
      } else if (res.data.data.accessToken) {
        const user = verifyToken(res.data.data.accessToken) as TUser;
        dispatch(setUser({ user, token: res.data.data.accessToken }));
        toast.success(res.data.message, { id: toastId });
        navigate("/");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", { id: toastId });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "20px",
      }}
    >
      <Card
        className="login-card"
        style={{
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          padding: "24px",
          borderRadius: "8px",
        }}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Title level={2} style={{ textAlign: "center", color: "#1890ff" }}>
            Login
          </Title>
          <CForm onSubmit={onSubmit}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <CInputField type="email" label="Email" name="email" />
              </Col>
              <Col span={24}>
                <CInputField type="password" label="Password" name="password" />
              </Col>
              <Col span={24}>
                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  style={{ ...primaryButton, borderRadius: "4px" }}
                >
                  Sign In
                </Button>
              </Col>
            </Row>
          </CForm>
          <Divider />
          <Text style={{ display: "block", textAlign: "center" }}>
            New user?{" "}
            <Link to="/signup" style={{ color: "#1890ff" }}>
              Create an account
            </Link>
          </Text>
        </Space>
      </Card>
    </div>
  );
};

export default Login;
